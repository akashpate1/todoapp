<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvitationController;
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
    Route::get('dashboard', DashboardController::class)->name('dashboard');


    Route::get('project',[ProjectController::class,'index'])->name('project.index');
    Route::post('project',[ProjectController::class,'store'])->name('project.store');
    Route::get('project/{project:slug}',[ProjectController::class,'show'])->name('project.show');
    Route::put('project/{project:slug}',[ProjectController::class,'update'])->name('project.update');
    Route::delete('project/{project:slug}',[ProjectController::class,'destroy'])->name('project.destroy');

    Route::put('project/{project:slug}/invite',[ProjectController::class,'invite'])->name('project.invite');

    Route::get('invitation/{invitation:invitation_token}',[InvitationController::class,'show'])->name('invitation.show');
    Route::post('invitation/{invitation:invitation_token}/accept',[InvitationController::class,'accept'])->name('invitation.accept');


    Route::post('project/{project:slug}/task',[TaskController::class,'store'])->name('project.task.store');
    Route::put('project/{project:slug}/task/{task}',[TaskController::class,'update'])->name('project.task.update');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
