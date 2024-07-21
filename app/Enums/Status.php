<?php

namespace App\Enums;

enum Status: string
{
    case BACKLOG = 'backlog';
    case TODO = 'todo';
    case IN_PROGRESS = 'in progress';
    case DONE = 'done';
    case CANCELED = 'canceled';

    public function label(): string
    {
        return match ($this) {
            self::BACKLOG => 'Backlog',
            self::TODO => 'Todo',
            self::IN_PROGRESS => 'In Progress',
            self::DONE => 'Done',
            self::CANCELED => 'Canceled',
        };
    }

    public function icon(): string
    {
        return match ($this) {
            self::BACKLOG => 'question-mark-circled',
            self::TODO => 'circle',
            self::IN_PROGRESS => 'stopwatch',
            self::DONE => 'check-circled',
            self::CANCELED => 'cross-circled',
        };
    }
}
