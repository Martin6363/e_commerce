<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\DisCount;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categoryId = Category::inRandomOrder()->first();
        $disCountId = DisCount::inRandomOrder()->first();
        $brandId = Brand::inRandomOrder()->first();
        
        return [
            "name"=> $this->faker->name(),
            "slug" => Str::slug($this->faker->unique()->name),
            "description" => $this->faker->paragraph(),
            "rating" => $this->faker->numberBetween(0.5, 5),
            "price"=> $this->faker->randomFloat(2, 10, 1000),
            "vendor_code" => $this->faker->numberBetween(1000000000, 9999999999),
            // "brand_id" => $brandId ? $brandId->id : 1,
            "published" => $this->faker->boolean(),
            "category_id" => $categoryId ? $categoryId->id : '',
            "disCount_id" => $disCountId ? $disCountId->id : '',
        ];
    }
}
