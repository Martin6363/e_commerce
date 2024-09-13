<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryWithProductsResource;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    protected $categoryService;
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }
    public function index(Request $request)
    {
        $limit = $request->limit;
        $categoryWithProducts = Category::with('children')->whereNull('parent_id')
            ->limit(10)->offset($limit)
            ->get();

        return $categoryWithProducts->isNotEmpty()
            ? response()->json(['data' => CategoryResource::collection($categoryWithProducts)], 200)
            : response()->noContent();
    }


    public function store(CategoryRequest $request)
    {
        $category = $this->categoryService->createCategory($request->validated());

        return response()->json([
            'message' => 'Category created successfully',
            'data' => new CategoryResource($category)
        ]);
    }


    public function show(Category $category)
    {
        $category = Category::withCount("Products")->find($category->id);

        return $category
            ? response()->json(['data' => new CategoryWithProductsResource($category)])
            : response()->json(['message' => 'Category not found'], 404);
    }


    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->categoryService->updateCategory($category, $request->validated());

        return response()->json(['message' => 'Category updated successfully'], 204);
    }


    public function destroy(Category $category)
    {
        $category = Category::find($category->id);

        if ($category) {
            $this->categoryService->deleteCategory($category);
            return response()->json(['message' => 'Category deleted successfully']);
        }
    }
}
