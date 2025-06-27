<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderStatusUpdated extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            // ->line('The introduction to the notification.')
            // ->action('Notification Action', url('/'))
            // ->line('Thank you for using our application!');
             ->subject('تم تحديث حالة طلبك')
            ->greeting('مرحبًا ' . $notifiable->name . ' 👋')
            ->line('طلبك رقم #' . $this->order->id . ' تم تحديث حالته.')
            ->line('🔄 الحالة الجديدة: ' . $this->order->status)
            ->action('عرض الطلب', url('/orders/' . $this->order->id))
            ->line('شكرًا لاستخدامك خدماتنا!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
