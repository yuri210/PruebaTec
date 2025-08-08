<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique();
            $table->string('name', 255);
            $table->string('image', 500)->nullable();
            $table->timestamps();
            
            $table->index('code');
            $table->index('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};