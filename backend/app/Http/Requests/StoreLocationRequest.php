<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreLocationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'required|string|max:10|unique:locations,code',
            'name' => 'required|string|max:255',
            'image' => 'nullable|url|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'Location code is required',
            'code.unique' => 'Location code already exists',
            'code.max' => 'Location code must not exceed 10 characters',
            'name.required' => 'Location name is required',
            'name.max' => 'Location name must not exceed 255 characters',
            'image.url' => 'Image must be a valid URL',
            'image.max' => 'Image URL must not exceed 500 characters',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'error' => [
                    'message' => 'Validation failed',
                    'code' => 'E_VALIDATION_FAILED',
                    'details' => $validator->errors()
                ]
            ], 422)
        );
    }
}