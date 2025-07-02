<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use App\Notifications\OrderStatusUpdated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;


class OrderController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', Order::class);

        $orders = Order::with(['user', 'service'])->latest()->get();

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
        ]);
    }

    public function userOrders()
    {
        $orders = Order::with(['user', 'service'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('user/orders/index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        $order->load('fieldValues.formField', 'service');

        return Inertia::render('admin/orders/show', [
            'order' => [
                'id' => $order->id,
                'status' => $order->status,
                'service' => [
                    'name' => $order->service->name,
                ],
                'field_values' => $order->fieldValues->map(function ($value) {
                    return [
                        'id' => $value->id,
                        'value' => $value->value,
                        'form_field' => [
                            'label' => $value->formField->label,
                        ],
                    ];
                }),
            ],
        ]);
    }


    public function create(Request $request)
    {
        $service = Service::with('formFields')->findOrFail($request->service_id);

        return Inertia::render('admin/orders/create', [
            'service' => $service,
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'form_data' => 'array',
        ]);

        $service = Service::with('formFields')->findOrFail($request->service_id);

        $order = Order::create([
            'user_id' => Auth::id(),
            'service_id' => $validated['service_id'],
            'quantity' => 1,
            'status' => 'pending',
        ]);

        if ($request->has('form_data') && is_array($request->form_data)) {

            foreach ($service->formFields as $field) {
                if (isset($request->form_data[$field->name])) {
                    $order->fieldValues()->create([
                        'form_field_id' => $field->id,
                        'value' => $request->form_data[$field->name],
                    ]);
                }
            }
        }
        return redirect()->route('services')->with('success', 'Bestelling geplaatst!');
    }


    public function edit(Order $order)
    {
        $order->load('service'); // optioneel, als je service info wil tonen

        return Inertia::render('admin/orders/edit', [
            'order' => $order,
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
        ]);

        $order->update([
            'status' => $validated['status'],
        ]);

        // أرسل الإشعار للمستخدم المرتبط بالطلب
        $order->user->notify(new OrderStatusUpdated($order));

        return to_route('orders.index')->with('success', 'Order succesvol bijgewerkt!');
    }
    public function destroy(Order $order)
    {
        // Optioneel: controleer of gebruiker deze order mag verwijderen
        // if (auth()->id() !== $order->user_id) {
        //     abort(403);
        // }

        $order->delete();

        return to_route('orders.index')->with('success', 'Order succesvol verwijderd!');
    }
}
