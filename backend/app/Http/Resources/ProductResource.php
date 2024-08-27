<?php

namespace App\Http\Resources;

use App\Models\Currency;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $currencyCode = $request->input('currency', 'USD'); 
        $currency = Currency::where('code', $currencyCode)->first();
        
        return [
            'id'=> $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'rating' => $this->rating,
            'price'=> $this->getPriceInCurrency($currency),
            'description' => $this->description,
            'images' => ImageResource::collection($this->images) ?? null,
            'category' => $this->category->name ?? null,
            'brand' => $this->brand->b_name ?? null,
            'about_product' => ProductEntryResource::collection($this->productEntry) ?? null,
            'dis_count' => $this->discounts->percent ?? null,
            'vendor_code' => $this->vendor_code ?? null
        ];
    }
}
