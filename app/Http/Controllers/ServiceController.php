<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\FormField;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;


class ServiceController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/services/index', [
            "services" => Service::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Service::class);

        // Alle master form fields ophalen
        $fields = FormField::all();

        return Inertia::render('admin/services/create', [
            'form_fields' => $fields,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'discount' => 'nullable|numeric|min:0',
            'discount_type' => 'required|in:fixed,percentage',
            'discount_expires_at' => 'nullable|date',

            'form_fields' => 'array',

        ]);

        // Voeg de slug toe
        $validated['slug'] = Str::slug($request->name);

        // Opslaan van image als aanwezig 
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('services', 'public');
        }
        //in Hostonger : cp -r storage/app/public/services/* public/storage/services/ 
        // Service::create($validated);
        $service = Service::create($validated);

        // ✅ ربط الحقول المختارة بالخدمة
        if ($request->has('form_fields')) {
            $service->formFields()->sync($request->form_fields);
        }

        // dd($service);
        return redirect()->route('services.index')->with('success', 'Service created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        $service = Service::with('formFields')->findOrFail($id);

        return Inertia::render('admin/services/show', [
            'service' => $service,
        ]);
    }




    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        $this->authorize('update', Service::class);
        // Laad de form fields via de pivot-tabel
        $service->load('formFields');

        return Inertia::render('admin/services/edit', compact('service'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric|min:0',
            'discount_type' => 'nullable|required_if:discount,>,0|in:fixed,percentage',
            'discount_expires_at' => 'nullable|required_if:discount,>,0|date',
            'image' => 'nullable|image|max:2048',
        ]);

        // Image upload , WERKT NIET
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('services', 'public');
        }

        // Slug automatisch bijwerken
        $validated['slug'] = Str::slug($validated['name']);

        $service->update($validated);

        return to_route('services.index')->with('success', 'Service updated successfully!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        // Service::destroy($service->id); // destroy() verwacht een ID 
        $service->delete();

        return to_route('services.index')->with('message', 'service was deleted!');
    }
}
