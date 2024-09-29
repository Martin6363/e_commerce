<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        if(!Storage::drive('public')->exists('category_images')) {
            Storage::drive('public')->makeDirectory('category_images');
        }
        $parentCategoryId = Category::inRandomOrder()->first()?->id;

        return [
            "name"=> $this->faker->name,
            "slug"=> Str::slug($this->faker->unique()->name),
            "description" => $this->faker->paragraph,
            "picture" => "category_images/category_faker_image.webp",
            "parent_id" => $parentCategoryId
        ];
    }
}
