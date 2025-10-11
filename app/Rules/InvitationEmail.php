<?php

namespace App\Rules;

use App\Models\ProjectAccess;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class InvitationEmail implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $existingAccess = ProjectAccess::query()
            ->where('email',$value)
            ->where('project_id',request()->route()->project->id)
            ->whereNotNull('accepted_at')
            ->exists();

        if($existingAccess || request()->route()->project->user->email === $value){
            $fail('The :attribute is already invited to this project.');
        }
    }
}
