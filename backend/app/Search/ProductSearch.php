<?php
namespace App\Search;

use Illuminate\Contracts\Database\Eloquent\Builder;

class ProductSearch {
    protected $builder;

    public function __construct(Builder $builder) {
        $this->builder = $builder;
    }

    public function search($search_string = '') {
        return $this->builder->where('name', 'LIKE', "%$search_string%")
        ->orWhere('description', 'LIKE', "%$search_string%")
        ->orWhere('vendor_code', 'LIKE', "%$search_string%");
    }

    public function autocomplete($search_value = '') {
        return $this->builder->orderByRaw("CASE 
            WHEN name LIKE ? THEN 1 
            WHEN description LIKE ? THEN 2 
            ELSE 3 
            END", ["$search_value%", "$search_value%"])
        ->limit(7);
    }
}