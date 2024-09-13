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
        return [
            'attribute_id' => Attribute::factory(),
            'value' => $this->faker->word,
        ];
    }

    public function ramValues() {
        return $this->state([
            'value' => $this->faker->randomElement(['4GB', '8GB', '16GB', '64GB', '128GB']),
        ]);
    }

    public function colorValues()
    {
        return $this->state([
            'value' => $this->faker->safeColorName(),
        ]);
    }

    public function sizeValues()
    {
        return $this->state([
            'value' => $this->faker->randomElement(['S', 'M', 'L', 'XL']),
        ]);
    }
}
