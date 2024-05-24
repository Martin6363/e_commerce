<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandResource extends JsonResource
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
            'b_name' => $this->b_name,
            'slug' => $this->slug,
            'logo' => asset($this->logo),
            'products' => ProductResource::collection($this->products),
        ];
    }
}