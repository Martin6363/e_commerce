<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PromotionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categoryId = Category::inRandomOrder()->first();

        return [
            'name' => $this->faker->words(3, true),
            "image" => "promotion_images/slider_img_2.jpg",
            "slug" => Str::slug($this->faker->unique()->name),
            "category_id" => $categoryId ? $categoryId->id : '',
        ];
    }
}
