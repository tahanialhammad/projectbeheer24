<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
          Inertia::share([
        'unreadNotifications' => function () {
            return auth()->check()
                ? auth()->user()->unreadNotifications->map(function ($notification) {
                    return [
                        'id' => $notification->id,
                        'message' => $notification->data['message'] ?? 'Statusupdate',
                        'created_at' => $notification->created_at->diffForHumans(),
                    ];
                })
                : [];
        }
    ]);
    }
}
