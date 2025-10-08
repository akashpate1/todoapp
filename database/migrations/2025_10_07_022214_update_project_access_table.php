<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('project_accesses', function (Blueprint $table) {
            $table->foreignIdFor(\App\Models\User::class)->nullable()->change();
            $table->string('email')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_accesses', function (Blueprint $table) {
            $table->foreignIdFor(\App\Models\User::class)->change();
            $table->dropColumn('email');
        });
    }
};
