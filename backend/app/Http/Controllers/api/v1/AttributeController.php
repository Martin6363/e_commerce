<?php

namespace App\Http\Controllers\api\v1;

use App\Filters\AttributeFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\AttributeRequest;
use App\Http\Resources\AttributeResource;
use App\Models\Attribute;
use App\Traits\ApiResponse;

class AttributeController extends Controller
{
    use ApiResponse;
    public function index(AttributeFilter $filters)
    {
        $attributes = Attribute::filter($filters)
            ->with('attributeValues')
            ->get();

        return $this->successResponse(AttributeResource::collection($attributes));
    }

    public function store(AttributeRequest $request)
    {
        $attribute = Attribute::create($request->validated());

        if ($request->has('values')) {
            foreach ($request->input('values') as $value) {
                $attribute->values()->create(['value' => $value]);
            }
        }

        return $this->successResponse(null, "Attribute created successfully");
    }

    public function show($id)
    {
        $attribute = Attribute::with('attributeValues')->findOrFail($id);

        return $this->successResponse(new AttributeResource($attribute));
    }

    public function update(AttributeRequest $request, $id)
    {
        $attribute = Attribute::findOrFail($id);
        $attribute->update($request->validated());

        if ($request->has('values')) {
            $attribute->values()->delete();
            foreach ($request->input('values') as $value) {
                $attribute->attributeValues()->create(['value' => $value]);
            }
        }

        return $this->successResponse(null, message: "Attribute updated successfully");
    }

    public function destroy(string $id)
    {
        $attribute = Attribute::findOrFail($id);
        $attribute->values()->delete();
        $attribute->delete();

        return response()->noContent();
    }
}
