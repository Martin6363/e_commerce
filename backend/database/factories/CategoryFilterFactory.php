<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Filter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CategoryFilterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $filter = Filter::inRandomOrder()->first() ?? Filter::factory()->create();
        $category = Category::whereNotNull('parent_id')->inRandomOrder()->first() ?? Category::factory()->create();
        
        return [
            'category_id' => $category->id,
            'filter_id' => $filter->id
        ];
    }
}
