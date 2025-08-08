<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'image',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function scopeFilterByName($query, ?string $name)
    {
        if ($name) {
            return $query->where('name', 'LIKE', '%' . $name . '%');
        }
        return $query;
    }

    public function scopeFilterByCode($query, ?string $code)
    {
        if ($code) {
            return $query->where('code', 'LIKE', '%' . $code . '%');
        }
        return $query;
    }
}