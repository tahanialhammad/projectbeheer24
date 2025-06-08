<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SiteController;


// Route::get('/', function () {
//     return Inertia::render('home/welcome');
// })->name('home');


// WEBSITE
Route::controller(SiteController::class)->group(function () {
    Route::get('/', 'welcome')->name('home');
    Route::get('/services', 'services')->name('services');

});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
