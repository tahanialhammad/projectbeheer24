<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
      public function index(Request $request)
    {
        return response()->json($request->user()->notifications);
    }

    public function unread(Request $request)
    {
        return    $request->user()->unreadNotifications;
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

    return response()->json(['message' => 'Gemarkeerd als gelezen.']);
}
}
