<?php

use App\Http\Controllers\Api\v1\AuthUserController;
use App\Http\Controllers\api\v1\BrandController;
use App\Http\Controllers\api\v1\FavoriteController;
use App\Http\Controllers\api\v1\ProductCategoryController;
use App\Http\Controllers\api\v1\ProductController;
use App\Http\Controllers\api\v1\PromotionController;
use App\Http\Controllers\api\v1\VerificationController;
use App\Http\Controllers\api\v1\AttributeController;
use App\Http\Middleware\AdminAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::controller(AuthUserController::class)->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login')->name('login');
    });

    // Verify Email
    Route::get('email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify');

    // Product Routes
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
    Route::match(['PUT', 'PATCH'], '/products/{product}', [ProductController::class, 'update']);

    // Category Routes
    Route::apiResource('/categories', ProductCategoryController::class);

    // Brand Routes
    Route::get('/brands', [BrandController::class, 'index']);
    Route::get('/brands/{brand}', [BrandController::class, 'show']);
    Route::post('/brands', [BrandController::class, 'store']);
    Route::match(['PUT', 'PATCH'], '/brands/{brand}', [BrandController::class, 'update']);

    // Promotion Route
    Route::get('/promotions', [PromotionController::class, 'index']);
    Route::get('promotions/{promotion}', [PromotionController::class, 'show']);


    Route::middleware('auth:sanctum')->group(function () {
        Route::post('favorites/toggle', [FavoriteController::class, 'toggle']);
        Route::get('favorite', [FavoriteController::class, 'index']);
        Route::post('logout', [AuthUserController::class, 'logout']);
    });
    Route::post('/products', [ProductController::class, 'store']);

    // Attribute Route
    Route::controller(AttributeController::class)->group(function () {
        Route::get('/attributes', 'index');
        Route::post('/attributes', 'store');
        Route::get('/attributes/{id}', 'show');
        Route::put('/attributes/{id}', 'update');
        Route::delete('/attributes/{id}', 'destroy');
    });
});

Route::middleware(['auth:sanctum', AdminAuth::class])->prefix('v1')->group(function () {
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    Route::get('/admin', function (Request $request) {
        return $request->user();
    });
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::middleware(['auth:sanctum'])->get('v1/user', [AuthUserController::class, 'authUser']);

Route::get('/linkstorage', function () {
    Artisan::call('storage:link');
});
