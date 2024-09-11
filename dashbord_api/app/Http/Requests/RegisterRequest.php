<?php

namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
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
            'name' => 'required|min:3|regex:/^\S.*\S$/',
            'email' => 'required|email|unique:users',
            'password' => 'required|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/',
            'password_confirm' => 'required',
        ];
       
    }

    public function messages()
{
    return [
        'name.required' => 'The login field is required.',
        'name.min' => 'The login field must contain at least 3 characters.',
        'name.regex:/^\S.*\S$/' => 'The login field must not contain a space neither at the beginning nor at the end.',
        'email.required' => 'The email field is required.',
        'email.email' => 'The email must be in the form .....@......',
        'password.required' => 'The password field is required.',
        'password.regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/' => 'The password must contain at least (8 characters, uppercase, lowercase, number, special character).',
    ];
}

protected function failedValidation(Validator $validator)
{
    throw new HttpResponseException(
        response()->json($validator->errors(), 422)
    );
}

};

