<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\FavoriteResource;
use App\Models\Favorite;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();
    
            if (!$user) {
                return response()->json([
                    'status' => 'unauthorized',
                    'message' => 'Unauthorized. Please log in to toggle favorites.'
                ], 401);
            }
    
            $favorites = Favorite::where('user_id', $user->id)
                ->with('product')
                ->get();
    
            $totalFavorites = $favorites->count();
    
            return response()->json([
                'status' => 'success',
                'total_favorites' => $totalFavorites,
                'data' => FavoriteResource::collection($favorites),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    } 
    

    public function toggle(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
            ]);
    
            $user = Auth::user();
    
            if (!$user) {
                return response()->json([
                    'status' => 'unauthorized',
                    'message' => 'Unauthorized. Please log in to toggle favorites.'
                ], 401);
            }
    
            $product_id = $request->input('product_id');
    
            $favorite = Favorite::where('user_id', $user->id)
                                ->where('product_id', $product_id)
                                ->first();
    
            if ($favorite) {
                $favorite->delete();
                return response()->json([
                    'message' => 'Product has been removed from favorites'
                ], 200);
            } else {
                Favorite::create([
                    'user_id' => $user->id,
                    'product_id' => $product_id
                ]);
    
                return response()->json([
                    'message' => 'Product has been added to favorites'
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
}
