<?php

namespace App\Http\Requests;

use App\Rules\InvitationEmail;
use Illuminate\Foundation\Http\FormRequest;

class InviteUesrRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return request()->user()->id === request()->route()->project->user_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', new InvitationEmail()]
        ];
    }
}
