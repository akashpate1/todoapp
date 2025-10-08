<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'user_id',
        'invitation_token',
        'expires_at',
        'email',
        'title',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function accesses(): HasMany
    {
        return $this->hasMany(ProjectAccess::class);
    }

    public function users()
    {
        return $this->hasManyThrough(User::class, ProjectAccess::class,'project_id', 'id', 'id', 'user_id');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
