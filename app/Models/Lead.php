<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Lead extends Model
{
    /** @use HasFactory<\Database\Factories\LeadFactory> */
    use HasFactory, SoftDeletes;

    const STATUS_NEW = 'New';
    const STATUS_CONTACTED = 'Contacted';
    const STATUS_CONVERTED = 'Converted';

    const STATUSES = [
        self::STATUS_NEW,
        self::STATUS_CONTACTED,
        self::STATUS_CONVERTED,
    ];

    protected $fillable = [
        'name',
        'email',
        'phone',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
}
