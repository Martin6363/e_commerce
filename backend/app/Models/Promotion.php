<?php

namespace App\Models;

use App\Traits\Discountable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory, Discountable;

    protected $fillable = [
        'name',
        'image',
        'slug',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'promotion_products')
            ->withPivot('discount')
            ->withTimestamps();
    }
}
