<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        if ($request->user()->hasAnyRole(['admin', 'Super Admin', 'super admin'])) {
            $stats = [
                'users_count' => User::count(),
                'orders_count' => Order::count(),
                'services_count' => Service::count(),
                'total_revenue' => Order::where('status', 'paid')
                    ->join('services', 'orders.service_id', '=', 'services.id')
                    ->sum('services.price'),
            ];

            // Monthly orders for chart (last 6 months)
            $ordersData = Order::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
                ->where('created_at', '>=', now()->subMonths(6))
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->pluck('count', 'month')
                ->toArray();
            
            $labels = [];
            $chartData = [];
            for ($i = 5; $i >= 0; $i--) {
                $month = now()->subMonths($i);
                $monthNum = $month->month;
                $labels[] = $month->format('M');
                $chartData[] = $ordersData[$monthNum] ?? 0;
            }

            return Inertia::render('admin/dashboard/dashboard', [
                'stats' => $stats,
                'chartData' => [
                    'labels' => $labels,
                    'data' => $chartData,
                ],
            ]);
        }

        return Inertia::render('user/dashboard/dashboard');
    }
}
