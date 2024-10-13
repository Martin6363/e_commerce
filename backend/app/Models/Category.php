<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'parent_id',
        'name',
        'slug',
        'description',
        'picture',
        'filters'
    ];

    protected $casts = [
        'filters' => 'array', 
    ];

    public function Products() {
        return $this->hasMany(Product::class);
    }

    public function children() {
        return $this->hasMany(Category::class, 'parent_id')->with('children')->withCount('products');
    }

    public function child() {
        return $this->hasMany(Category::class, 'parent_id');
    }
}
