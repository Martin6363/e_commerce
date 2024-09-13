<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\BrandRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\ShowBrandResource;
use App\Models\Brand;
use App\Services\BrandService;

class BrandController extends Controller
{

    protected $brandService;

    public function __construct(BrandService $brandService)
    {
        $this->brandService = $brandService;
    }

    public function index()
    {
        $brands = Brand::with('products')->orderByDesc('id')->get();

        return $brands->isNotEmpty()
            ? response()->json(['data' => BrandResource::collection($brands)], 200)
            : response()->noContent();
    }

    public function store(BrandRequest $request)
    {
        $brand = $this->brandService->createBrand($request->validated());

        return response()->json([
            'message' => 'Brand created successfully',
            'data' => new BrandResource($brand)
        ]);
    }

    public function show(Brand $brand)
    {
        $brand->load('products');

        return $brand
            ? response()->json(['data' => new ShowBrandResource($brand)])
            : response()->json(['message' => 'Brand not found']);
    }

    public function update(BrandRequest $request, Brand $brand)
    {
        $this->brandService->updateBrand($brand, $request->validated());

        return response()->json(['message' => 'Brand updated successfully']);
    }

    public function destroy(Brand $brand)
    {
        $brand = Brand::find($brand->id);

        if ($brand) {
            $this->brandService->deleteBrand($brand);
            return response()->json(['message' => 'Brand deleted successfully']);
        }
    }
}
