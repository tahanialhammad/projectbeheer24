<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    // Oude manier zonder Inertia: API-stijl. 
    // Nu laad je het niet via een Inertia-route, maar via useEffect() + fetch() in React. 
    // Dit is beter, omdat:
    // - Je notificaties wilt ophalen in useEffect()
    // - Het component globaal is en niet gebonden aan één specifieke pagina
    // - Je een los API-endpoint voor de frontend wilt gebruiken

    public function index(Request $request)
    {
        return response()->json(
            $request->user()->unreadNotifications()->latest()->get()
        );
    }

    public function unread(Request $request)
    {
        return  $request->user()->unreadNotifications;
    }

    public function markAsRead(Request $request, $id)
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();

        return redirect()->back();
    }
}
