<?php

namespace App\Listeners;

use App\Events\UserInvited;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use SendGrid\Mail\Mail;

class SendInvitationMail implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserInvited $event): void
    {
        $projectOwner = $event->projectAccess->project->user;

        $email =  new Mail();
        $email->setFrom(config('mail.from.address'), config('mail.from.name'));
        $email->setSubject('Project Invitation from ' . $projectOwner->name);
        $email->setTemplateId('d-ef09b54bafee4a77960417289db956b4');
        $email->addDynamicTemplateDatas([
            'project_name' => $event->projectAccess->project->name,
            'project_owner' => $projectOwner->name,
            'invitation_url' => url('/invitation/'.$event->projectAccess->invitation_token),
        ]);
        $email->addTo($event->projectAccess->email);

        $sendgrid = new \SendGrid(config('services.sendgrid.secret'));

        try {
            $sendgrid->send($email);
        }catch (\Exception $e){
            Log::error("Unable to send email ".$e->getMessage());
        }

    }
}
