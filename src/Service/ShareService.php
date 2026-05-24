<?php

namespace App\Service;

use App\Exception\ShareSnapshotException;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;

class ShareService
{
    private const MAX_IMAGE_BYTES = 8_388_608;

    private const SNAPSHOT_METADATA_ROOT = '/var/snapshot/metadata';

    private const SNAPSHOT_IMAGE_ROOT = '/var/snapshot/image';

    private const LEGACY_SNAPSHOT_METADATA_ROOT = '/var/snapshot';

    private const LEGACY_SNAPSHOT_IMAGE_ROOT = '/public/snapshot';

    public function __construct(
        private readonly ParameterBagInterface $parameterBag,
        private readonly ToolCatalogService $toolCatalogService
    ) {
    }

    public function createSnapshot(
        string $category,
        string $slug,
        mixed $image,
        string $title,
        string $summary
    ): array {
        $tool = $this->resolveTool($category, $slug);

        if (!$image instanceof UploadedFile || !$image->isValid()) {
            throw new ShareSnapshotException('Upload a valid PNG snapshot.', JsonResponse::HTTP_BAD_REQUEST);
        }

        $snapshotImage = $this->inspectPngSnapshot($image);
        $snapshotId = bin2hex(random_bytes(16));
        $snapshotImageDir = $this->getSnapshotImageDir($tool['category_slug'], $tool['slug']);
        $snapshotMetadataDir = $this->getSnapshotMetadataDir($tool['category_slug'], $tool['slug']);

        if (!$this->ensureDirectory($snapshotImageDir) || !$this->ensureDirectory($snapshotMetadataDir)) {
            throw new ShareSnapshotException(
                'Failed to prepare snapshot storage.',
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        try {
            $image->move($snapshotImageDir, $snapshotId . '.png');
        } catch (FileException) {
            throw new ShareSnapshotException(
                'Failed to save the snapshot image.',
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        $metadata = [
            'title' => $this->normalizeText($title, 120, (string) $tool['title']),
            'summary' => $this->normalizeText(
                $summary,
                240,
                'Generated ' . (string) $tool['title'] . ' snapshot from InfraStack.'
            ),
            'width' => $snapshotImage['width'],
            'height' => $snapshotImage['height'],
            'createdAt' => gmdate('c'),
        ];

        $metadataWritten = file_put_contents(
            $this->getSnapshotMetadataPath($tool['category_slug'], $tool['slug'], $snapshotId),
            json_encode($metadata, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        if ($metadataWritten === false) {
            @unlink($this->getSnapshotImagePath($tool['category_slug'], $tool['slug'], $snapshotId));

            throw new ShareSnapshotException(
                'Failed to save the snapshot metadata.',
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return [
            'snapshotId' => $snapshotId,
            'metadata' => $metadata,
            'tool' => $tool,
        ];
    }

    public function readSnapshot(string $category, string $slug, string $snapshotId): array
    {
        $tool = $this->resolveTool($category, $slug);
        $this->validateSnapshotId($snapshotId);
        $imagePath = $this->getSnapshotImagePath($tool['category_slug'], $tool['slug'], $snapshotId);

        if (!is_file($imagePath)) {
            $imagePath = $this->getLegacySnapshotImagePath($tool['category_slug'], $tool['slug'], $snapshotId);
        }

        if (!is_file($imagePath)) {
            throw new ShareSnapshotException('Snapshot not found.', JsonResponse::HTTP_NOT_FOUND);
        }

        return [
            'snapshotId' => $snapshotId,
            'imagePath' => $imagePath,
            'metadata' => $this->readSnapshotMetadata($tool, $snapshotId),
            'tool' => $tool,
        ];
    }

    public function getSnapshotPublicImageUrl(
        string $category,
        string $slug,
        string $snapshotId,
        string $origin
    ): string {
        $tool = $this->resolveTool($category, $slug);
        $this->validateSnapshotId($snapshotId);

        return rtrim($origin, '/')
            . '/share/'
            . rawurlencode((string) $tool['category_slug'])
            . '/'
            . rawurlencode((string) $tool['slug'])
            . '/'
            . $snapshotId
            . '/image';
    }

    private function resolveTool(string $category, string $slug): array
    {
        $categorySlug = $this->toolCatalogService->normalizeSlug($category);
        $toolSlug = $this->toolCatalogService->normalizeSlug($slug);

        if ($categorySlug === '' || $toolSlug === '') {
            throw new ShareSnapshotException('Tool not found.', JsonResponse::HTTP_NOT_FOUND);
        }

        foreach ($this->toolCatalogService->getTools() as $tool) {
            if (
                ($tool['category_slug'] ?? '') === $categorySlug
                && ($tool['slug'] ?? '') === $toolSlug
            ) {
                return $tool;
            }
        }

        throw new ShareSnapshotException('Tool not found.', JsonResponse::HTTP_NOT_FOUND);
    }

    private function inspectPngSnapshot(UploadedFile $image): array
    {
        if ($image->getSize() === null || $image->getSize() <= 0 || $image->getSize() > self::MAX_IMAGE_BYTES) {
            throw new ShareSnapshotException('Snapshot image is too large.', JsonResponse::HTTP_BAD_REQUEST);
        }

        $imageSize = getimagesize((string) $image->getPathname());

        if ($imageSize === false || ($imageSize['mime'] ?? '') !== 'image/png') {
            throw new ShareSnapshotException('Snapshot must be a PNG image.', JsonResponse::HTTP_BAD_REQUEST);
        }

        $width = (int) ($imageSize[0] ?? 0);
        $height = (int) ($imageSize[1] ?? 0);

        if ($width < 320 || $height < 240 || $width > 2400 || $height > 1800) {
            throw new ShareSnapshotException(
                'Snapshot image dimensions are not supported.',
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        return [
            'width' => $width,
            'height' => $height,
        ];
    }

    private function normalizeText(string $value, int $maxLength, string $fallback): string
    {
        $normalized = preg_replace('/\s+/', ' ', strip_tags($value));
        $normalized = trim((string) $normalized);

        if ($normalized === '') {
            return $fallback;
        }

        return mb_substr($normalized, 0, $maxLength);
    }

    private function readSnapshotMetadata(array $tool, string $snapshotId): array
    {
        $metadataPath = $this->getSnapshotMetadataPath($tool['category_slug'], $tool['slug'], $snapshotId);

        if (!is_file($metadataPath)) {
            $metadataPath = $this->getLegacySnapshotMetadataPath($tool['category_slug'], $tool['slug'], $snapshotId);
        }

        $metadata = is_file($metadataPath)
            ? json_decode((string) file_get_contents($metadataPath), true)
            : [];

        if (!is_array($metadata)) {
            $metadata = [];
        }

        return [
            'title' => $this->normalizeText((string) ($metadata['title'] ?? ''), 120, (string) $tool['title']),
            'summary' => $this->normalizeText(
                (string) ($metadata['summary'] ?? ''),
                240,
                'Generated ' . (string) $tool['title'] . ' snapshot from InfraStack.'
            ),
            'width' => max(320, min(2400, (int) ($metadata['width'] ?? 1200))),
            'height' => max(240, min(1800, (int) ($metadata['height'] ?? 760))),
            'createdAt' => $this->normalizeText((string) ($metadata['createdAt'] ?? gmdate('c')), 40, gmdate('c')),
        ];
    }

    private function validateSnapshotId(string $snapshotId): void
    {
        if (!preg_match('/^[a-f0-9]{32}$/', $snapshotId)) {
            throw new ShareSnapshotException('Snapshot not found.', JsonResponse::HTTP_NOT_FOUND);
        }
    }

    private function ensureDirectory(string $path): bool
    {
        return is_dir($path) || (@mkdir($path, 0755, true) && is_dir($path));
    }

    private function getSnapshotMetadataDir(string $category, string $slug): string
    {
        return (string) $this->parameterBag->get('kernel.project_dir')
            . self::SNAPSHOT_METADATA_ROOT
            . '/'
            . $category
            . '/'
            . $slug;
    }

    private function getSnapshotImageDir(string $category, string $slug): string
    {
        return (string) $this->parameterBag->get('kernel.project_dir')
            . self::SNAPSHOT_IMAGE_ROOT
            . '/'
            . $category
            . '/'
            . $slug;
    }

    private function getLegacySnapshotMetadataDir(string $category, string $slug): string
    {
        return (string) $this->parameterBag->get('kernel.project_dir')
            . self::LEGACY_SNAPSHOT_METADATA_ROOT
            . '/'
            . $category
            . '/'
            . $slug;
    }

    private function getLegacySnapshotImageDir(string $category, string $slug): string
    {
        return (string) $this->parameterBag->get('kernel.project_dir')
            . self::LEGACY_SNAPSHOT_IMAGE_ROOT
            . '/'
            . $category
            . '/'
            . $slug;
    }

    private function getSnapshotImagePath(string $category, string $slug, string $snapshotId): string
    {
        return $this->getSnapshotImageDir($category, $slug) . '/' . $snapshotId . '.png';
    }

    private function getLegacySnapshotImagePath(string $category, string $slug, string $snapshotId): string
    {
        return $this->getLegacySnapshotImageDir($category, $slug) . '/' . $snapshotId . '.png';
    }

    private function getSnapshotMetadataPath(string $category, string $slug, string $snapshotId): string
    {
        return $this->getSnapshotMetadataDir($category, $slug) . '/' . $snapshotId . '.json';
    }

    private function getLegacySnapshotMetadataPath(string $category, string $slug, string $snapshotId): string
    {
        return $this->getLegacySnapshotMetadataDir($category, $slug) . '/' . $snapshotId . '.json';
    }
}
