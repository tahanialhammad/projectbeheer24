<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true); // bijv. "Web Design"
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence(),
            'image' => $this->faker->imageUrl(640, 480, 'business', true),
            'price' => $this->faker->randomFloat(2, 100, 999),
        ];
    }
}
