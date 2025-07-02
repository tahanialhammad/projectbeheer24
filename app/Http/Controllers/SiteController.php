<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class SiteController extends Controller
{
    public function welcome()
    {
        return Inertia::render('home/welcome');
    }

    public function services()
    {
        return Inertia::render('services/services', [
            "services" => Service::all()
        ]);
    }

    public function posts()
    {
        //  return Inertia::render('blog/posts');

        $spaceId = env('CONTENTFUL_SPACE_ID');
        $accessToken = env('CONTENTFUL_ACCESS_TOKEN');

        $response = Http::get("https://cdn.contentful.com/spaces/{$spaceId}/environments/master/entries", [
            'access_token' => $accessToken,
            'content_type' => 'blogPost',
        ]);

        $data = $response->json();

        // Stuur alleen de ruwe data door naar de view of frontend
        return Inertia::render('blog/posts', [
            'posts' => $data['items']
            ]);
    }
}
