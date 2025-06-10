<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permission =[
            'users.view' ,
            'users.edit' ,
            'users.delete' ,
            'uses.create' ,
            'roles.view',
            'roles.edit',
            'roles.delete',
            'roles.create',
        ];

        //   Permission::create(['name' => 'edit articles']);

        foreach($permission as $key => $value ){
            Permission::create(['name' => $value]);
        }

    }
}
