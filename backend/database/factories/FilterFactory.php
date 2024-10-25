<?php

namespace Database\Factories;

use App\Models\Filter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Filter>
 */
class FilterFactory extends Factory
{
    protected $model = Filter::class;
    public function definition(): array
    {

        return [
            'name' => $this->faker->randomElement(['Color', 'Size', 'Material', 'Storage']),
            'type' => $this->faker->randomElement(['checkbox', 'radio'])
        ];
    }
}
