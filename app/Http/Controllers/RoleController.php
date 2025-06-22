<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;


class RoleController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/roles/index', [
            // 'roles' => Role::all(),
            'roles' => Role::with('permissions')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //  $this->authorize('create', Role::class);  //werkt niet goed 

        if (!auth()->user()->can('roles.create')) {
            abort(403);
        }

        return Inertia::render('admin/roles/create', [
            'permissions' => Permission::pluck("name"),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'permissions' => 'required',
        ]);
        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions);
        return to_route('roles.index')->with('message', 'role was created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        $permissions = $role->permissions;

        return Inertia::render('admin/roles/show', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        if (!auth()->user()->can('roles.update')) {
            abort(403);
        }

        $role = Role::with('permissions')->findOrFail($id);

        return Inertia::render('admin/roles/edit', [
            'role' =>  $role,
            'permissions' => Permission::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $role = Role::findOrFail($id);

        $role->update([
            'name' => $validated['name'],
        ]);

        $role->syncPermissions($validated['permissions']);

        return to_route('roles.index')->with('message', 'Role was updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!auth()->user()->can('roles.delete')) {
            abort(403);
        }

        Role::destroy($id);
        return to_route('roles.index')->with('message', 'role was deleted!');
    }
}
