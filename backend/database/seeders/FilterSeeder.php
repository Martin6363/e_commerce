<?php

namespace Database\Seeders;

use App\Models\Filter;
use App\Models\FilterValue;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FilterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Filter::factory(5)
            ->create()->each(function ($filter) {
                FilterValue::factory()
                    ->count(10)
                    ->create(['filter_id' => $filter->id]);
            });;
    }
}
