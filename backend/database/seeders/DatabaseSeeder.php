<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Brand;
use App\Models\ProductAttributeValue;
use App\Models\PromotionProduct;
use App\Models\User;
use App\Models\Role;
use App\Models\Category;
use App\Models\CategoryFilter;
use App\Models\DisCount;
use App\Models\Filter;
use App\Models\FilterValue;
use App\Models\Images;
use App\Models\Product;
use App\Models\Promotion;
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
        Category::factory()->count(3)->create([
            'parent_id' => null
        ]);
        Category::factory(27)->create();
        DisCount::factory(30)->create();
        Product::factory(100)->create();
        Images::factory(100)->create();
        Brand::factory(10)->create();
        Promotion::factory(5)->create();
        PromotionProduct::factory(40)->create();
        Attribute::factory(3)->create()
            ->each(function ($attribute) {
                AttributeValue::factory(5)
                    ->create(['attribute_id' => $attribute->id]);
            });

        ProductAttributeValue::factory(100)->create();

        Filter::factory(5)
        ->create()->each(function ($filter) {
            FilterValue::factory()
                ->count(5)
                ->create(['filter_id' => $filter->id]);
        });
        CategoryFilter::factory(30)->create();

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
