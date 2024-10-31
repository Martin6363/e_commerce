<?php

namespace App\Http\Controllers\api\v1;

use App\Filters\ProductFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Images;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    use ApiResponse;
    const PER_PAGE = 30;
    public function index(ProductFilter $filters)
    {
        $status = request()->query('status', 'published');
        $query = Product::filter($filters);
        
        if ($status === 'published') {
            $products = $query->where('published', true);
        } elseif ($status === 'unpublished') {
            $products = $query->where('published', false);
        } else {
            return response()->noContent();
        }

        return ProductResource::collection($products->paginate(self::PER_PAGE)->withQueryString())
            ->response()->getData(true);
    }


    public function store(ProductRequest $request)
    {
        $product = Product::create(array_merge($request->validated(), ["slug" => $request->name, "vendor_code" => ""]));
        $product->images()->createMany(Images::upload($request->file('images')));

        return $this->successResponse(new ProductResource($product), "Product created successfully", 201);
    }

    public function show(Product $product)
    {
        $product->load([
            'category:id,name', 
            'images:id,product_id,image', 
            'brand:id,b_name', 
            'discount:id,percent',
            'productAttributeValues.attributeValue:id,value,attribute_id', 
            'productAttributeValues.attributeValue.attribute:id,name'
        ]);
        $similarProducts = $product->similar_products;

        return response()->json([
            'data' =>  new ProductResource($product),
            'recommended' => ProductResource::collection($similarProducts),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update(array_merge($request->validated(), ["slug" => $request->name, "vendor_code" => ""]));

        if ($request->hasFile('images')) {
            $uploadedImages = Images::upload($request->file('images'), $product->id);
            $product->images()->createMany($uploadedImages);
        }

        if ($request->has('remove_images')) {
            Images::removeImages($request->input('remove_images'));
        }

        $product->refresh();

        return $this->successResponse(null, "Product updated successfully");
    }



    public function destroy(Product $product)
    {
        $productWithDetails = Product::with('category', 'Images', 'brand')->findOrFail($product->id);

        foreach ($productWithDetails->images as $image) {
            Storage::disk('public')->delete($image->image);
        }

        $productWithDetails->images()->delete();
        $productWithDetails->delete();

        return response()->noContent();
    }
}
