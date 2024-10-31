<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryFilterResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryWithProductsResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Services\CategoryService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    use ApiResponse;

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
            ? $this->successResponse(CategoryResource::collection($categoryWithProducts))
            : response()->noContent();
    }

    public function store(CategoryRequest $request)
    {
        $category = $this->categoryService->createCategory($request->validated());

        return $this->successResponse(new CategoryResource($category), "Category created successfully");
    }

    public function show(Category $category)
    {
        $category = Category::withCount("products")->find($category->id);

        return $category
            ? $this->successResponse(new CategoryWithProductsResource($category))
            : response()->json(['message' => 'Category not found'], 404);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->categoryService->updateCategory($category, $request->validated());

        return $this->successResponse(null, "Category updated successfully");
    }


    public function destroy(Category $category)
    {
        $category = Category::find($category->id);

        if ($category) {
            $this->categoryService->deleteCategory($category);
            return $this->successResponse(null, "Category deleted successfully");
        }
    }

    public function getCategoryFilters($categoryId)
    {
        $category = Category::with('filters')->findOrFail($categoryId);
        return response()->json([
            'category_name' => $category->name,
            'filters' => CategoryFilterResource::collection($category->filters)
        ]);
    }
    
}
