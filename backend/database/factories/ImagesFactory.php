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
            "image" => $this->faker->randomElement([
                'product_images/product_Img_1.jpg',
                'product_images/product_Img_2.jpg',
                'product_images/product_Img_3.jpg',
                'product_images/product_Img_4.jpg',
                'product_images/product_Img_5.jpg',
                'product_images/product_Img_6.jpg',
                'product_images/product_Img_7.jpg',
                'product_images/product_Img_8.jpg',
                'product_images/product_Img_9.jpg',
                'product_images/product_Img_10.jpg',
                'product_images/product_Img_11.jpg',
                'product_images/product_Img_12.jpg',
                'product_images/product_Img_13.jpg',
                'product_images/apple_watch.png'
            ]),
            "product_id" => $productId,
        ];
    }
}
