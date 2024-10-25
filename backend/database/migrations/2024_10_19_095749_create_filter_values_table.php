<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('filter_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('filter_id')->constrained('filters')->onDelete('cascade');
            $table->string('value');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('filter_values');
    }
};
