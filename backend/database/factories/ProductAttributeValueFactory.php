<?php

namespace Database\Factories;

use App\Models\AttributeValue;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductAttributeValueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productId = Product::pluck('id')->random();
        $attributeValueId = AttributeValue::pluck('id')->random();
        return [
            'product_id' => $productId,
            'attribute_value_id' => $attributeValueId
        ];
    }
}
