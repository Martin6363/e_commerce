<?php

namespace App\Filters;

class AttributeFilter extends QueryFilter
{
    /**
     * Filter by color attributes
     * 
     * Example api: /api/v1/attributes?colors=true
     */
    public function colors($value = true)
    {
        if ($value == true) {
            return $this->builder->where('type', 'color');
        }
    }

    /**
     * Filter by size attributes
     * 
     * Example api: /api/v1/attributes?sizes=true
     */
    public function sizes($value = true)
    {
        if ($value == true) {
            return $this->builder->where('type', 'size');
        }
    }

    public function name($value = '')
    {
        return $this->builder->where('name', $value);
    }

    /**
     * Filter by multiple attribute names
     * 
     * Example api: /api/v1/attributes?names=Color,Size
     */
    public function names($value)
    {
        $namesArray = $this->paramToArray($value);
        return $this->builder->whereIn('name', $namesArray);
    }
}
