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
        //return ['mail'];
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('De status van uw bestelling is bijgewerkt.')
            ->greeting('Dag ' . $notifiable->name . ' 👋')
            ->line('Je bestelling met nummer #' . $this->order->id . ' is bijgewerkt.')
            ->line('🔄 Nieuwe status: ' . $this->order->status)
            ->action('Bekijk bestelling', url('/orders/' . $this->order->id))
            ->line('Bedankt voor het gebruiken van onze diensten!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message' => 'Je bestelling #' . $this->order->id . ' is bijgewerkt naar status: ' . $this->order->status,
            'order_id' => $this->order->id,
            'status' => $this->order->status,
        ];
    }
}
