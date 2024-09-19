<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\BrandRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\ShowBrandResource;
use App\Models\Brand;
use App\Services\BrandService;
use App\Traits\ApiResponse;

class BrandController extends Controller
{
    use ApiResponse;
    protected $brandService;

    public function __construct(BrandService $brandService)
    {
        $this->brandService = $brandService;
    }

    public function index()
    {
        $brands = Brand::with('products')->orderByDesc('id')->get();

        return $brands->isNotEmpty()
            ? $this->successResponse(BrandResource::collection($brands))
            : response()->noContent();
    }

    public function store(BrandRequest $request)
    {
        $brand = $this->brandService->createBrand($request->validated());

        return $this->successResponse(new BrandResource($brand), "Brand created successfully");
    }

    public function show(Brand $brand)
    {
        $brand->load('products');

        return $brand
            ? $this->successResponse(new BrandResource($brand))
            : response()->json(['message' => 'Brand not found']);
    }

    public function update(BrandRequest $request, Brand $brand)
    {
        $this->brandService->updateBrand($brand, $request->validated());

        return $this->successResponse(null, "Brand updated successfully");
    }

    public function destroy(Brand $brand)
    {
        $brand = Brand::find($brand->id);

        if ($brand) {
            $this->brandService->deleteBrand($brand);
            return $this->successResponse(null, message: "Brand deleted successfully");
        }
    }
}
