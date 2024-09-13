<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use \Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:250', 'min:2'],
            'description' => ['required', 'string', 'max:1000', 'min:5'],
            'price' => ['required', 'numeric', 'between:0,9999999999.99'],
            'rating' => ['required', 'numeric', 'max:5', 'min:0'],
            'images' => ['nullable', 'array'], 
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], 
            'published' => ['boolean'],
            'brand_id' => ['nullable', 'int'],
            'category_id' => ['required', 'int'],
            'disCount_id' => ['nullable', 'int'], 
        ];
    }

    public function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'error' => true,
            'message' => 'Oops! Some errors occurred',
            'errorsList' => $validator->errors()
        ])); 
    }
}
