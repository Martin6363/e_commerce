<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\ProductAttributeValue;
use App\Models\User;
use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

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
            ['value' => 'red'],
            ['value' => 'green'],
            ['value' => 'blue'],
            ['value' => 'black'],
        ]);

        $sizeAttribute = Attribute::factory()->size()->create();
        AttributeValue::factory()->sizeValues()->for($sizeAttribute)->createMany([
            ['value' => 'S'],
            ['value' => 'M'],
            ['value' => 'L'],
            ['value' => 'XL'],
        ]);
        ProductAttributeValue::factory(100)->create();

        Artisan::call('app:update-exchange-rates');

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->command->info('Exchange updates successfully');
        
        Role::create(['name' => 'superVizorAdmin', 'description' => 'Super Vizor Admin with full access']);
        Role::create(['name' => 'admin', 'description' => 'Administrator with limited superVizorAdmin access']);
        Role::create(['name' => 'user', 'description' => 'Regular user with limited access']);
    }
}
