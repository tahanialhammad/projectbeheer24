<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormField extends Model
{
    /** @use HasFactory<\Database\Factories\FormFieldFactory> */
    use HasFactory;
       protected $fillable = [
        'service_id',
        'label',
        'name',
        'type',
        'options',
        'required',
    ];
     protected $casts = [
        'options' => 'array',
        'required' => 'boolean',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
