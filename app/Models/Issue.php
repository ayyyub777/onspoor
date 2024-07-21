<?php

namespace App\Models;

use App\Enums\Priority;
use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'status', 'priority', 'assignee', "user_id"];

    protected $casts = [
        'status' => Status::class,
        'priority' => Priority::class,
        'created_at' => 'datetime',
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
