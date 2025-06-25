<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Service;
use App\Models\User;
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

    public function create(Request $request)
    {
        $services = Service::all();

        return Inertia::render('admin/orders/create', [
            'services' => $services,
            'selected_service_id' => $request->service_id, // vanuit query parameter
        ]);
    }


    public function store(Request $request)
    {

        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
        ]);

        //       $order = Order::create([
        //     'user_id' => auth()->id(),
        //     'service_id' => $request->service_id,
        //     'quantity' => 1,
        //     'status' => 'pending',
        // ]);

        Order::create([
            'user_id' => Auth::id(),
            'service_id' => $validated['service_id'],
        ]);

        // return back()->with('success', 'Service succesvol besteld!');
        return to_route('services')->with('success', 'Service succesvol besteld! !');
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
