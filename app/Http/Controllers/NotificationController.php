<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    //oude manier zonder inertia : API-stijl , .n je laadt het niet via een Inertia-route, maar via useEffect() + fetch() in React
    //dit is beter want , Je wilt notificaties ophalen in useEffect(),  Het component is globaal en niet gebonden aan 1 pagina,
    //Je wil losse API-endpoint voor frontend
    public function index(Request $request)
    {
        //  return response()->json($request->user()->notifications);
        // Alleen ongelezen notificaties
        // return response()->json($request->user()->unreadNotifications);

        //sorterern :
        return response()->json(
            $request->user()->unreadNotifications()->latest()->get()
        );
    }

    // NIET Handig nu want : Inertia::render is alleen van toepassing voor pagina’s, niet voor losse API-achtige componenten.
    // public function index()
    // {
    //     $notifications = auth()->user()->notifications;

    //     return Inertia::render('Dashboard', [ 
    //         'notifications' => $notifications
    //     ]);
    // }

    public function unread(Request $request)
    {
        return  $request->user()->unreadNotifications;
    }
    
    // public function markAllAsRead(Request $request)
    // {
    //     $request->user()->unreadNotifications->markAsRead();
    //     return redirect()->back()->with('success', 'Alle notificaties gemarkeerd als gelezen.');
    // }

    public function markAsRead(Request $request, $id)
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();

        return redirect()->back();
    }
}
