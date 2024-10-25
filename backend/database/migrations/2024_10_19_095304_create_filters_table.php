<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('filters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // Checkbox, dropdown, range
            $table->timestamps();
        });


        ## Pivot Table Category filter 
        Schema::create('category_filter', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('filter_id')->constrained('filters')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('filters');
        Schema::dropIfExists('category_filter');
    }
};
