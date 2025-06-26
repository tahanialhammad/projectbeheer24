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
        Schema::create('form_fields', function (Blueprint $table) {
            $table->id();
                $table->foreignId('service_id')->constrained()->onDelete('cascade'); // gekoppeld aan de service
    $table->string('label');       // bv. "Wat is je domeinnaam?"
    $table->string('name');        // bv. "domain_name"
    $table->string('type');        // text, textarea, select, checkbox, etc.
    $table->json('options')->nullable(); // alleen nodig bij select/checkbox/radio
    $table->boolean('required')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_fields');
    }
};
