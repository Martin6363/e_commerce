<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filter extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'type'];

    public function categories() {
        return $this->belongsToMany(Category::class, 'category_filters');
    }

    public function filterValues() {
        return $this->hasMany(FilterValue::class);
    }
}
