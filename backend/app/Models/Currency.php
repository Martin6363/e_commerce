<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'code',
        'exchange_rate'
    ];

    public function getPriceInCurrency($price)
    {
        return round($price * $this->exchange_rate, 2);
    }
}
