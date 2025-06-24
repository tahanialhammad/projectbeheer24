<?php

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

});

// Admin
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('services', ServiceController::class);

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
