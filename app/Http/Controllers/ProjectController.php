<?php

namespace App\Http\Controllers;

use App\Events\UserInvited;
use App\Http\Requests\InviteUesrRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\ProjectAccess;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        /** @var User $user */
        $user = $request->user();

        $projects = $user->projects();

        return Inertia::render('projects/index',[
            'projects' => $projects->paginate(9),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        /** @var User $user */
        $user = $request->user();

        $project = $user->projects()->create([
            ...$request->validated(),
            'slug' => Str::slug($request->get('name').'-'.Str::random(5)),
            'user_id' => $user->id,
        ]);

        // Create a new project access record for the user
        ProjectAccess::query()
            ->create([
                'user_id' => $user->id,
                'project_id' => $project->id,
                'invitation_token' => Str::uuid(),
                'expires_at' => now(),
                'accepted_at' => now(),
            ]);

        return to_route('project.show', $project->slug);
    }

    public function update(UpdateProjectRequest $request,Project $project)
    {
        if($project->user_id !== $request->user()->id){
            return to_route('project.index')->with('error','You are not authorized to update this project');
        }

        $project->update($request->validated());

        return to_route('project.index');

    }

    public function destroy(Project $project)
    {
        if($project->user_id !== request()->user()->id){
            return to_route('project.index')->with('error','You are not authorized to delete this project');
        }

        $project->delete();

        return to_route('project.index');
    }

    public function show(Project $project)
    {
        $project->load('users');
        $project->load('tasks');
        $project->load('tasks.user');

        return Inertia::render('projects/show',[
            'project' => $project,
        ]);
    }

    public function invite(InviteUesrRequest $request, Project $project)
    {
        $existingAccess = ProjectAccess::query()
            ->where('email',$request->get('email'))
            ->where('project_id',$project->id)
            ->whereNotNull('accepted_at')
            ->exists();

        if($existingAccess){
            return to_route('project.show',[$project])->with('error','User already have access to the project');
        }

        /** @var ProjectAccess $projectAccess */
        $projectAccess = $project->accesses()->create([
            'invitation_token' => Str::uuid(),
            'expires_at' => Carbon::now()->addDay()->toDateTimeString(),
            'email' => $request->get('email'),
        ]);

        event(new UserInvited($projectAccess));

        return to_route('project.show',[$project])->with('success','Invitation has been sent successfully');
    }
}
