<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PromotionResource;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    public function index()
    {
        $promotions = Promotion::all();
        
        return response()->json([
            'status' => 'success',
            'data' => PromotionResource::collection($promotions),
        ]);
    }
    

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        $promotion = Promotion::findOrFail($id);
        $promotion->discounted_products = $promotion->getDiscountedProducts();

        return response()->json($promotion);
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
