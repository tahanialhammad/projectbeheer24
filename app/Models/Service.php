<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'image',
        'discount',
        'discount_type',
        'discount_expires_at',
    ];

    // altijd meegeven in JSON/API
    protected $appends = ['discounted_price'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    // public function formFields()
    // {
    //     return $this->hasMany(FormField::class);
    // }

     public function formFields()
    {
        return $this->belongsToMany(FormField::class, 'service_form_field');
    }
    /**
     * Accessor: discounted_price
     */
    public function getDiscountedPriceAttribute()
    {
        // check of er een discount bestaat
        if (!$this->discount || $this->discount <= 0) {
            return $this->price;
        }

        // check of discount expired
        if ($this->discount_expires_at && Carbon::now()->greaterThan($this->discount_expires_at)) {
            return $this->price;
        }

        // percentage korting
        if ($this->discount_type === 'percentage') {
            return $this->price - ($this->price * ($this->discount / 100));
        }

        // vaste korting
        if ($this->discount_type === 'fixed') {
            return max(0, $this->price - $this->discount);
        }

        return $this->price;
    }
}
