<?php

namespace App\Service\Layout;

use App\Exception\Layout\ShareException;
use JsonException;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Response;

class ShareService
{
    private const MAX_PROJECT_BYTES = 1_048_576;

    private const MAX_ASSETS = 2_000;

    private const MAX_CONNECTIONS = 5_000;

    public function __construct(
        #[Autowire('%kernel.project_dir%')]
        private readonly string $projectDirectory
    ) {
    }

    public function create(array $project): array
    {
        $project = $this->validateProject($project);
        $shareId = bin2hex(random_bytes(16));
        $snapshot = [
            'schema_version' => '1.0',
            'share_id' => $shareId,
            'created_at' => gmdate('c'),
            'project' => $project,
        ];
        $encoded = $this->encode($snapshot);

        if (strlen($encoded) > self::MAX_PROJECT_BYTES) {
            throw new ShareException(
                'This project is too large to share.',
                Response::HTTP_REQUEST_ENTITY_TOO_LARGE
            );
        }

        $directory = $this->storageDirectory();
        if (!is_dir($directory) && !mkdir($directory, 0755, true) && !is_dir($directory)) {
            throw new ShareException(
                'Shared project storage is unavailable.',
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        $temporaryPath = $directory . '/' . $shareId . '.tmp';
        $snapshotPath = $this->snapshotPath($shareId);
        $written = file_put_contents($temporaryPath, $encoded, LOCK_EX);

        if ($written === false || !rename($temporaryPath, $snapshotPath)) {
            @unlink($temporaryPath);
            throw new ShareException(
                'The shared project could not be saved.',
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return $snapshot;
    }

    public function read(string $shareId): array
    {
        $this->validateShareId($shareId);
        $path = $this->snapshotPath($shareId);

        if (!is_file($path)) {
            throw new ShareException('Shared project not found.', Response::HTTP_NOT_FOUND);
        }

        try {
            $snapshot = json_decode((string) file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            throw new ShareException('Shared project is invalid.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        if (!is_array($snapshot) || !is_array($snapshot['project'] ?? null)) {
            throw new ShareException('Shared project is invalid.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $snapshot['project'] = $this->validateProject($snapshot['project']);

        return $snapshot;
    }

    private function validateProject(array $project): array
    {
        if (($project['tool'] ?? null) !== 'infrastack-studio') {
            throw new ShareException('Only InfraStack Studio projects can be shared.', Response::HTTP_BAD_REQUEST);
        }

        if (!str_starts_with((string) ($project['version'] ?? ''), '0.')) {
            throw new ShareException('This Studio project version is not supported.', Response::HTTP_BAD_REQUEST);
        }

        $assets = $project['assets'] ?? null;
        $connections = $project['connections'] ?? null;

        if (!is_array($assets) || !is_array($connections)) {
            throw new ShareException('The Studio project structure is incomplete.', Response::HTTP_BAD_REQUEST);
        }

        if (count($assets) > self::MAX_ASSETS || count($connections) > self::MAX_CONNECTIONS) {
            throw new ShareException('This project contains too many items to share.', Response::HTTP_BAD_REQUEST);
        }

        $project['name'] = mb_substr(trim(strip_tags((string) ($project['name'] ?? 'Shared Studio project'))), 0, 80);
        if ($project['name'] === '') {
            $project['name'] = 'Shared Studio project';
        }

        return $project;
    }

    private function validateShareId(string $shareId): void
    {
        if (preg_match('/^[a-f0-9]{32}$/', $shareId) !== 1) {
            throw new ShareException('Shared project not found.', Response::HTTP_NOT_FOUND);
        }
    }

    private function encode(array $value): string
    {
        try {
            return json_encode($value, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);
        } catch (JsonException) {
            throw new ShareException('The Studio project could not be encoded.', Response::HTTP_BAD_REQUEST);
        }
    }

    private function storageDirectory(): string
    {
        return $this->projectDirectory . '/var/studio/shares';
    }

    private function snapshotPath(string $shareId): string
    {
        return $this->storageDirectory() . '/' . $shareId . '.json';
    }
}
