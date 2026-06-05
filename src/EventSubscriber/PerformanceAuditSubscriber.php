<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class PerformanceAuditSubscriber implements EventSubscriberInterface
{
    public const HEADER_NAME = 'X-InfraStack-Performance-Audit';

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::RESPONSE => [
                ['removeDebugHeadersBeforeToolbar', -120],
                ['removeRobotsHeaderAfterSymfonyDebug', -300],
            ],
        ];
    }

    public function removeDebugHeadersBeforeToolbar(ResponseEvent $event): void
    {
        if (!$this->isPerformanceAuditRequest($event)) {
            return;
        }

        $headers = $event->getResponse()->headers;
        $headers->remove('X-Debug-Token');
        $headers->remove('X-Debug-Token-Link');
        $headers->remove('X-Debug-Error');
    }

    public function removeRobotsHeaderAfterSymfonyDebug(ResponseEvent $event): void
    {
        if (!$this->isPerformanceAuditRequest($event)) {
            return;
        }

        $event->getResponse()->headers->remove('X-Robots-Tag');
    }

    private function isPerformanceAuditRequest(ResponseEvent $event): bool
    {
        return $event->isMainRequest()
            && '1' === $event->getRequest()->headers->get(self::HEADER_NAME);
    }
}
