<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'service'])->latest()->get();

        return Inertia::render('admin/orders/index', [
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
}
