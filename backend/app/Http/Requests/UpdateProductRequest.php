<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use \Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateProductRequest extends FormRequest
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
            'name' => ['string', 'max:250', 'min:2'],
            'description' => ['string', 'max:1000', 'min:5'],
            'price' => ['numeric', 'between:0,9999999999.99'],
            'images' => ['array', 'max:8'], 
            'images.*' => ['image', 'max:2048'],
            'remove_images' => ['array'],
            'remove_images.*' => ['integer', 'exists:images,id'],
            'category_id' => ['nullable', 'int'],
            'discount_id' => ['nullable', 'int']
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
