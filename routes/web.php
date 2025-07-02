<?php

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\UserController;

// Route::get('/', function () {
//     return Inertia::render('home/welcome');
// })->name('home');


// WEBSITE
Route::controller(SiteController::class)->group(function () {
    Route::get('/', 'welcome')->name('home');
    Route::get('/our-services', 'services')->name('services');
    Route::get('/post', 'posts')->name('posts');
});

// Admin
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // Userr
    Route::resource('users', UserController::class);
    // Roles
    Route::resource('roles', RoleController::class);
    // Services
    Route::resource('services', ServiceController::class);
    // Orders
    Route::resource('orders', OrderController::class);
    Route::get('/my-orders', [OrderController::class, 'userOrders'])->name('orders.user');
    // Notification
    Route::resource('notifications', NotificationController::class);
    // niet standaard route
    Route::get('/notifications/unread', [NotificationController::class, 'unread']);
  //  Route::post('/notifications/mark-as-read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead']);

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
