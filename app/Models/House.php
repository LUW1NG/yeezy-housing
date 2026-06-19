<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class House extends Model
{
    use HasFactory;

    protected $fillable = ['address', 'city', 'country', 'zip_code'];
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}