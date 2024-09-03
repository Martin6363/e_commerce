<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryService {
    public function createCategory(array $data) {
        $picture = $data['picture'];
        $category = new Category();
        $category->name = $data['name'];
        $category->slug =  str::slug($category->name, '-');
        $category->description = $data['description'];
        $category->parent_id = $data['parent_id'];

        $pictureName = time() . '_' . Str::random(10) . '_' . str_replace(' ', '_', $picture->getClientOriginalName());
        $path = "category_images/";
        Storage::disk('public')->put($path . $pictureName, file_get_contents($picture));
        $category->picture = $path . $pictureName;

        $category->save();

        return $category;
    }

    public function updateCategory(Category $category, array $data) {
        $category->name = $data['name'];
        $category->description = $data['description'];
        $category->slug =  str::slug($category->name, '-');
        $category->parent_id = $data['parent_id'];

        if (isset($data['picture'])) {
            if ($category->picture) {
                Storage::disk('public')->delete($category->picture);
            }
            
            $picture = $data['picture'];
            $pictureName = time() . '_' . Str::random(10) . '_' . str_replace(' ', '_', $picture->getClientOriginalName());
            $path = "category_images/";
            Storage::disk('public')->put($path . $pictureName, file_get_contents($picture));
            $category->picture = $path . $pictureName;
        }
        $category->update();
    }

    public function deleteCategory(Category $category)
    {
        if ($category->picture) {
            Storage::disk('public')->delete($category->picture);
        }

        $category->delete();
    }
}

