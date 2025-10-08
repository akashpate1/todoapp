<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::get('project',[ProjectController::class,'index'])->name('project.index');
    Route::post('project',[ProjectController::class,'store'])->name('project.store');
    Route::get('project/{project:slug}',[ProjectController::class,'show'])->name('project.show');
    Route::put('project/{project:slug}',[ProjectController::class,'update'])->name('project.update');
    Route::delete('project/{project:slug}',[ProjectController::class,'destroy'])->name('project.destroy');

    Route::put('project/{project:slug}/invite',[ProjectController::class,'invite'])->name('project.invite');


    Route::post('project/{project:slug}/task',[TaskController::class,'store'])->name('project.task.store');
    Route::put('project/{project:slug}/task/{task}',[TaskController::class,'update'])->name('project.task.update');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
