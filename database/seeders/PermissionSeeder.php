<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'users.view',
            'users.edit',
            'users.delete',
            'users.create',
            'roles.view',
            'roles.edit',
            'roles.delete',
            'roles.create',
        ];

        //   Permission::create(['name' => 'edit articles']);

        // foreach ($permission as $key => $value) {
        //     Permission::create(['name' => $value]);
        // }
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission, 'guard_name' => 'web']
            );
        }

        // Create Super Admin role
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin']);

        // Give all permissions to Super Admin
        $superAdminRole->syncPermissions(Permission::all());

        // Create a Super Admin user (if not exists)
        $user = User::firstOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
            ]
        );

        // Assign role to user
        $user->assignRole($superAdminRole);
    }
}
