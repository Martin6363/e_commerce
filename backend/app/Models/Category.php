<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'parent_id',
        'name',
        'slug',
        'description',
        'picture',
    ];

    public function products() {
        return $this->hasMany(Product::class);
    }

    public function children() {
        return $this->hasMany(Category::class, 'parent_id')->with('children')->withCount('products');
    }

    public function attributes(){
        return $this->hasMany(Attribute::class);
    }

    public function filters() {
        return $this->belongsToMany(Filter::class, 'category_filters')
                    ->with('filterValues');
    }
}
