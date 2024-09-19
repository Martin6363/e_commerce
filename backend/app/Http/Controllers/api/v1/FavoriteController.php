<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\FavoriteResource;
use App\Models\Favorite;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $user = Auth::user();
        $favorites = Favorite::where('user_id', $user->id)
            ->with('product')
            ->get();

        if (!$user) {
            return $this->errorResponse("Unauthorized. Please log in to toggle favorites.", 401);
        }

        return response()->json([
            'total_favorites' => $favorites->count(),
            'data' => FavoriteResource::collection($favorites),
        ], 200);
    }


    public function toggle(Request $request)
    {
        $user = Auth::user();
        $product_id = $request->input('product_id');
        $favorite = Favorite::where('user_id', $user->id)
            ->where('product_id', $product_id)
            ->first();

        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        if (!$user) {
            return $this->errorResponse("Unauthorized. Please log in to toggle favorites.", 401);
        }

        if ($favorite) {
            $favorite->delete();
            return $this->successResponse(null, "Product has been removed from favorites");
        } else {
            Favorite::create([
                'user_id' => $user->id,
                'product_id' => $product_id
            ]);
            return $this->successResponse(null, "Product has been added to favorites");
        }
    }
}
