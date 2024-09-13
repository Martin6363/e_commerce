<?php

namespace App\Services;
use App\Models\Brand;
use Illuminate\Support\Facades\Storage;
use  Illuminate\Support\Str;

class BrandService {

    public function createBrand(array $data) {
        $logo = $data['logo'];
        $brand = new Brand();
        $brand->b_name = $data['b_name'];
        $brand->slug = Str::slug($brand->b_name, '-');
        $brand->product_id = $data['product_id'];

        $logoName = time() . '_' . Str::random(10) . '_' . str_replace(' ', '_', $logo->getClientOriginalName());
        $path = "brand_images/";
        Storage::disk('public')->put($path . $logoName, file_get_contents($logo));
        $brand->logo = $path . $logoName;
        $brand->save();

        return $brand;
    }

    public function updateBrand (Brand $brand, array $data) {
        dd($data);
        $brand = new Brand();
        $brand->b_name = $data['b_name'];
        $brand->slug = str::slug($brand->b_name, '-');
        $brand->product_id = $data['product_id'];

        if ($data['logo']) {
            if ($brand->logo) {
                Storage::disk('public')->delete($brand->logo);
            }
            
            $logo = $data['logo'];
            $logoName = time() . '_' . Str::random(10) . '_' . str_replace(' ', '_', $logo->getClientOriginalName());
            $path = "brand_images/";
            Storage::disk('public')->put($path . $logoName, file_get_contents($logo));
            $brand->logo = $path . $logoName;
        }
        $brand->update();
    } 

    public function deleteBrand (Brand $brand) {
        if ($brand->logo) {
            Storage::disk('public')->delete($brand->logo);
        }
        $brand->delete();
    } 
}