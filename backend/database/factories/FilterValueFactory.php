<?php

namespace Database\Factories;

use App\Models\Filter;
use App\Models\FilterValue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FilterValue>
 */
class FilterValueFactory extends Factory
{
    protected $model = FilterValue::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $filter = Filter::inRandomOrder()->first() ?? Filter::factory()->create();

        $value = match ($filter->name) {
            'Color' => $this->faker->randomElement(['Red', 'Blue', 'Green', 'Yellow', 'Black']),
            'Size' => $this->faker->randomElement(['Small', 'Medium', 'Large']),
            'Material' => $this->faker->randomElement(['Cotton', 'Polyester', 'Leather']),
            'Brand' => $this->faker->randomElement(['Nike', 'Adidas', 'Puma']),
            default => $this->faker->word,
        };

        return [
            'filter_id' => $filter->id,
            'value' => $value,
        ];
    }
}
