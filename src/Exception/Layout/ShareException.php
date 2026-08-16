<?php

namespace App\Exception\Layout;

use RuntimeException;

class ShareException extends RuntimeException
{
    public function __construct(
        string $message,
        private readonly int $statusCode
    ) {
        parent::__construct($message);
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }
}
