<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Promotion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PromotionProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productId = Product::inRandomOrder()->first();
        $promotionId = Promotion::inRandomOrder()->first();

        return [
            'product_id' => $productId ? $productId->id : null,
            'promotion_id' => $promotionId ? $promotionId->id : null,
            'discount' => $this->faker->randomFloat(2, 5, 50),
        ];
    }
}

