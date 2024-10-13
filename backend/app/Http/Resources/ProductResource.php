<?php

namespace App\Http\Resources;

use App\Models\Currency;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Cache;

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
            'sale' => $this->discount->percent ?? null,
            'description' => $this->description,
            'images' => ImageResource::collection($this->images) ?? null,
            'category' => $this->category->name ?? null,
            'brand' => $this->brand->b_name ?? null,
            'attributes' => $this->getTransFormedAttributes(),
            'vendor_code' => $this->vendor_code ?? null,
            'published' => $this->published ?? null,
            'created_at' => $this->created_at->format('d/m/Y') ?? null
        ];
    }
    private function getTransFormedAttributes()
    {
        return Cache::remember("product_{$this->id}_attributes", 60 * 60, function () {
            return $this->productAttributeValues
                ->groupBy('attributeValue.attribute.name')
                ->map(function ($values, $attributeName) {
                    return [
                        'name' => $attributeName,
                        'values' => $values->map(function ($value) {
                            return [
                                'id' => $value->attributeValue->id,
                                'name' => $value->attributeValue->value,
                            ];
                        })->unique()->values()
                    ];
                })
                ->values()
                ->all();
        });
    }
}
