<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'service_id',
        'quantity',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
    public function fieldValues()
    {
        return $this->hasMany(OrderFieldValue::class);
    }
    // fieldValues with label
    public function valuesWithLabels()
    {
        return $this->fieldValues()->with('formField');
    }
}
