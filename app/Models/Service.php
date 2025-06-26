<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'image',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function formFields()
{
    return $this->hasMany(FormField::class);
}
}
