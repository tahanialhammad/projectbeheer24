<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderFieldValue extends Model
{
    protected $fillable = ['order_id', 'form_field_id', 'value'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function formField()
    {
        return $this->belongsTo(FormField::class);
    }
}
