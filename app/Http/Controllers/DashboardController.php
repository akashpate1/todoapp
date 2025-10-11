<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;

class DashboardController
{
    public function __invoke()
    {
        /** @var User $user */
        $user = auth()->user();

        $projectIds = $user->projects()->pluck('project_id')->toArray();

        $tasks = Task::query()
            ->whereIn('project_id',$projectIds)
            ->where('user_id',$user->id)
            ->where('status','todo')
            ->with(['project','project.user'])
            ->get();

        return Inertia::render('dashboard',[
            'tasks' => $tasks,
            'projects' => count($projectIds),
            'in_progress_tasks' => Task::query()
                ->whereIn('project_id',$projectIds)
                ->where('user_id',$user->id)
                ->where('status','in_progress')->count(),
            'completed_tasks' => Task::query()
                ->whereIn('project_id',$projectIds)
                ->where('user_id',$user->id)
                ->where('status','done')->count(),
        ]);
    }
}
