<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use \Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CategoryRequest extends FormRequest
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
            'description' => ['required', 'string', 'max:1000', 'min:2'],
            'picture' => ['image', 'mimes:jpg,png,jpeg,gif,svg',
                // 'dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000'
            ],
            'parent_id' => ['nullable', 'integer', 'exists:categories,id'],
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
