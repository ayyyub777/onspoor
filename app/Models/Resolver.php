<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resolver extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'user_id'];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
