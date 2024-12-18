<?php

namespace Database\Factories;

use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AttributeValue>
 */
class AttributeValueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = AttributeValue::class;
    public function definition(): array
    {
        $attribute = Attribute::inRandomOrder()->first() ?? Attribute::factory()->create();
        $value = match($attribute->name) {
            'Color' => $this->faker->randomElement(['Red', 'Blue', 'Green', 'Yellow', 'Black']),
            'Size' => $this->faker->randomElement(['Small', 'Medium', 'Large']),
            'Material' => $this->faker->randomElement(['Cotton', 'Polyester', 'Leather']),
            'Brand' => $this->faker->randomElement(['Nike', 'Adidas', 'Puma']),
            default => $this->faker->word,
        };

        return [
            'attribute_id' => $attribute->id,
            'value' => $value,
        ];
    }
}
