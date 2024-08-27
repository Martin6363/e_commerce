<?php

namespace App\Http\Controllers\api\v1;

use App\Filters\ProductFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Images;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    const PER_PAGE = 30;
    public function index(ProductFilter $request)
    {
        $products = Product::filter($request);
        return ProductResource::collection($products->paginate(self::PER_PAGE)->withQueryString())
            ->response()->getData(true);
    }


    public function store(ProductRequest $request)
    {
        $product = Product::create(array_merge($request->validated(), ["slug" => $request->name, "vendor_code" => ""]));
        
        if ($request->hasFile('images')) {
            $product->images()->createMany(Images::upload($request->file('images')));
        }

        return response()->json([
            'message' => 'Product created successfully',
            'data' => new ProductResource($product)
        ], 201);
    }

    public function show(Product $product)
    {
        $product->load('category', 'discount', 'Images', 'brand', 'productEntry');
        $similarProducts = $product->similar_products;

        return response()->json([
            'data' =>  new ProductResource($product),
            'recommended' => ProductResource::collection($similarProducts),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update(array_merge($request->validated(), ["slug" => $request->name, "vendor_code" => ""]));
        
        dd($request->file('images'));
        if ($request->hasFile('images')) {
            $uploadedImages = Images::upload($request->file('images'), $product->id);
            $product->images()->createMany($uploadedImages);
        }

        if ($request->has('remove_images')) {
            Images::removeImages($request->input('remove_images'));
        }
        
        $product->refresh();
    
        return response()->json([
            'message' => 'Product updated successfully',
            'data' => new ProductResource($product)
        ], 200);
    }
    


    public function destroy(Product $product)
    {
        $productWithDetails =
            Product::with('category', 'discount', 'Images', 'brand', 'productEntry.size', 'productEntry.color', 'productEntry.material')->findOrFail($product->id);

        foreach ($productWithDetails->images as $image) {
            Storage::disk('public')->delete($image->image);
        }

        $productWithDetails->images()->delete();
        $productWithDetails->delete();

        return response()->noContent();
    }
}
