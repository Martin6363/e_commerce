<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttributeRequest;
use App\Http\Resources\AttributeResource;
use App\Models\Attribute;
use Illuminate\Http\Request;

class AttributeController extends Controller
{

    public function index()
    {
        $attributes = Attribute::with('values')->get();
        
        return response()->json([
            'data' => AttributeResource::collection($attributes)
        ]);
    }

    public function store(AttributeRequest $request)
    {
        $attribute = Attribute::create($request->validated());

        if ($request->has('values')) {
            foreach ($request->input('values') as $value) {
                $attribute->values()->create(['value' => $value]);
            }
        }

        return response()->json([
            'message' => 'Attribute created successfully',
        ]);
    }

    public function show($id)
    {
        $attribute = Attribute::with('values')->findOrFail($id);

        return response()->json([
            'data' => new AttributeResource($attribute)
        ]);
    }

    public function update(AttributeRequest $request, $id)
    {
        $attribute = Attribute::findOrFail($id);
        $attribute->update($request->validated());

        if ($request->has('values')) {
            $attribute->values()->delete();
            foreach ($request->input('values') as $value) {
                $attribute->values()->create(['value' => $value]);
            }
        }

        return response()->json([
            'message' => 'Attribute updated successfully',
        ]);
    }

    public function destroy(string $id)
    {
        $attribute = Attribute::findOrFail($id);
        $attribute->values()->delete();
        $attribute->delete();

        return response()->noContent();
    }
}
