<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
   User::firstOrCreate(
            ['email' => 'test@example.com'], // zoek op email
            ['name' => 'Test User', 'password' => bcrypt('password')] // alleen invullen als hij nog niet bestaat
        );
        
        $this->call(PermissionSeeder::class);
        $this->call(ServiceSeeder::class);
    }
}
