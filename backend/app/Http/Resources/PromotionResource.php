<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PromotionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image_url' => $this->image ? asset('storage/' . $this->image) : null,
            'slug' => $this->slug,
            'category' => $this->category->name ?? null,
            'total_products' => $this->products_count,
            'discounted_products' => ProductResource::collection($this->products),
        ];
    }
}
