<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\ProductAttributeValue;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        \App\Models\Category::factory(30)->create();
        \App\Models\DisCount::factory(25)->create();
        \App\Models\Product::factory(100)->create();
        \App\Models\Images::factory(100)->create();
        \App\Models\Brand::factory(10)->create();
        \App\Models\Promotion::factory(5)->create();
        \App\Models\DisCount::factory(20)->create();
        
        $ramAttribute = Attribute::factory()->ram()->create();
        AttributeValue::factory()->ramValues()->for($ramAttribute)->createMany([
            ['value' => '4GB'],
            ['value' => '8GB'],
            ['value' => '16GB'],
        ]);

        $colorAttribute = Attribute::factory()->color()->create();
        AttributeValue::factory()->colorValues()->for($colorAttribute)->createMany([
            ['value' => 'Red'],
            ['value' => 'Green'],
            ['value' => 'Blue'],
            ['value' => 'Black'],
        ]);

        $sizeAttribute = Attribute::factory()->size()->create();
        AttributeValue::factory()->sizeValues()->for($sizeAttribute)->createMany([
            ['value' => 'S'],
            ['value' => 'M'],
            ['value' => 'L'],
            ['value' => 'XL'],
        ]);
        ProductAttributeValue::factory(100)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
