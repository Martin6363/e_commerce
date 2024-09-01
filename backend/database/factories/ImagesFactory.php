<?php

namespace Database\Factories;

use App\Models\Images;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Images>
 */

class ImagesFactory extends Factory
{
    protected $model = Images::class;

    public function definition(): array
    {
        $dir = storage_path('app/public/product_images');
        $productId = Product::pluck('id')->random();

        if (!File::exists($dir)) {
            File::makeDirectory($dir, 0755, true);
        }

        return [
            "image" => 'product_images/model_female_triplelayer_black_solid_mask_3000px.webp', 
            "product_id" => $productId,
        ];
    }
}
