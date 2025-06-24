<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteController extends Controller
{
      public function welcome()
    {
        return Inertia::render('home/welcome');
    }
        public function services()
    {
        return Inertia::render('services/services',[
             "services" => Service::all()
        ]);
    }
}
