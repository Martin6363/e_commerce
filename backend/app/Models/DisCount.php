<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisCount extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'percent',
        'active'
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'disCount_id');
    }
}
