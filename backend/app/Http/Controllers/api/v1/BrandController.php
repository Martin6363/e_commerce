<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\BrandResource;
use App\Http\Resources\ShowBrandResource;
use App\Models\Brand;
use Exception;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::with('products')->orderByDesc('id')->get();

        if ($brands) {
            return response()->json([
                'code' => 200,
                'data' => BrandResource::collection($brands)
            ]);
        } else {
            return response()->json([
                'message' => "Data not found"
            ]);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        try {
            $brandsWithProducts = Brand::with("products")->find($brand->id);
            if ($brandsWithProducts) {
                return response()->json([
                    'code' => 200,
                    'data' => new ShowBrandResource($brandsWithProducts)
                ]);
            } else {
                return response()->json([
                    'message' => "Data not found"
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
