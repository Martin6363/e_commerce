<?php

namespace Database\Seeders;

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
        \App\Models\Product::factory(300)->create();
        \App\Models\Images::factory(300)->create();
        \App\Models\Size::factory(50)->create();
        \App\Models\Color::factory(25)->create();
        \App\Models\Material::factory(15)->create();
        \App\Models\Brand::factory(10)->create();
        \App\Models\Promotion::factory(5)->create();
        \App\Models\DisCount::factory(20)->create();
        // \App\Models\ProductEntry::factory(5)->create();
        
        
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
