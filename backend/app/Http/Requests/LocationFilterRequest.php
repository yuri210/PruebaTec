<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LocationFilterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => 'integer|min:1',
            'per_page' => 'integer|min:1|max:100',
            'name' => 'string|max:255',
            'code' => 'string|max:10',
        ];
    }

    public function messages(): array
    {
        return [
            'page.integer' => 'Page must be a valid integer',
            'page.min' => 'Page must be at least 1',
            'per_page.integer' => 'Per page must be a valid integer',
            'per_page.min' => 'Per page must be at least 1',
            'per_page.max' => 'Per page must not exceed 100',
            'name.string' => 'Name filter must be a string',
            'name.max' => 'Name filter must not exceed 255 characters',
            'code.string' => 'Code filter must be a string',
            'code.max' => 'Code filter must not exceed 10 characters',
        ];
    }
}