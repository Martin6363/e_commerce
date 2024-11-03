<?php
namespace App\Filters;

use Illuminate\Support\Facades\Cache;

class ProductFilter extends QueryFilter {
    public function category_id($ids = null) {
        return $this->builder->when($ids, function($query) use($ids) {
            $query->whereIn('category_id', $this->paramToArray($ids));
        });
    }

    public function min_price($price = null) {
        return $this->builder->where('price', '>=', $price);
    }

    public function max_price($price = null) {
        return $this->builder->where('price', '<=', $price);
    }

    public function search($search_string = '') {
        return $this->builder
            ->where('name', 'LIKE', "%$search_string%")
            ->orWhere('description', 'LIKE', "%$search_string%")
            ->orWhere('vendor_code', 'LIKE', "%$search_string%");
    }

    public function autocomplete($search_value = '') {
        return Cache::remember("autocomplete_{$search_value}", 60, function () use ($search_value) {
            return $this->builder
                ->where(function($query) use ($search_value) {
                    $query->where('name', 'LIKE', "$search_value%")
                          ->orWhere('description', 'LIKE', "$search_value%");
                })->orderByRaw("
                    CASE 
                        WHEN name LIKE ? THEN 1 
                        WHEN description LIKE ? THEN 2 
                        ELSE 3 
                    END", ["$search_value%", "$search_value%"])
                ->limit(7)
                ->get();   
        });
    }
    

    public function sort_by($sortOption = null) {
        return $this->builder->when($sortOption, function ($query) use ($sortOption) {
            switch ($sortOption) {
                case 'lowest_price': 
                    $query->orderBy('price', 'ASC');
                    break;
                case 'highest_price':
                    $query->orderBy('price', 'DESC');
                    break;
                case 'rating':
                    $query->orderBy('rating', 'DESC');
                    break;
                case 'newest':
                    $query->orderBy('created_at', 'DESC');
                    break;
                default:
                    break;
            }
        });
    }

    public function attributes($attributes) {
        foreach ($attributes as $attributeId => $valueIds) {
            $this->builder->whereHas('attributeValues', function ($query) use ($attributeId, $valueIds) {
                $query->where('attribute_values.attribute_id', $attributeId)
                  ->whereIn('attribute_values.id', $valueIds);
            });
        }
    }
}