<?php

namespace App\Http\Controllers;

use App\Models\ProjectAccess;
use Inertia\Inertia;

class InvitationController
{

    public function show(ProjectAccess $invitation)
    {
        $invitation->load('project');
        $invitation->load('project.user');

        return Inertia::render('invitation/show', [
            'invitation' => $invitation,
            'expired' => $invitation->expires_at < now() || $invitation->accepted_at != null || $invitation->email !== auth()->user()->email,
        ]);
    }

    public function accept(ProjectAccess $invitation)
    {
        $expired = $invitation->expires_at < now() || $invitation->accepted_at != null ||  $invitation->email !== auth()->user()->email;
        if($expired){
            return to_route('invitation.show');
        };

        $invitation->update([
            'accepted_at' => now(),
            'user_id' => auth()->user()->id,
        ]);
    }

}
