<?php

namespace App\Http\Resources;

use App\Models\Currency;
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
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'rating' => $this->rating,
            'price' => $this->getPriceInCurrency($currency),
            'discounted_price' => $this->getDiscountedPrice($currency) ?? null,
            'dis_count' => $this->discount->percent ?? null,
            'description' => $this->description,
            'images' => ImageResource::collection($this->images) ?? null,
            'category' => $this->category->name ?? null,
            'brand' => $this->brand->b_name ?? null,
            'attributes' => $this->productAttributeValues ? $this->productAttributeValues->map(function ($productAttributeValue) {
                return [
                    'attribute_name' => $productAttributeValue->attributeValue->attribute->name ?? null,
                    'value' => $productAttributeValue->attributeValue->value ?? null,
                ];
            }) : null,
            'vendor_code' => $this->vendor_code ?? null,
            'published' => $this->published ?? null,
            'created_at' => $this->created_at->format('d/m/Y') ?? null
        ];
    }
}
