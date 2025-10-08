<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Project;
use App\Models\Task;

class TaskController
{
    public function store(Project $project, StoreTaskRequest $request)
    {
        $project->tasks()->create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'user_id' => $request->user_id === 0 ? null : $request->user_id,
        ]);

        return redirect()->route('project.show', $project);
    }

    public function update(Project $project, UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return redirect()->route('project.show', $project);

    }

}
