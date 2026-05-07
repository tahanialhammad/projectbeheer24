<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProgress extends Model
{
    use HasFactory;

    protected $table = 'order_progress';

    protected $fillable = [
        'order_id',
        'admin_id',
        'label',
        'percentage',
        'note',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}
