<?php

namespace App\Traits;

use App\Models\Currency;

trait Discountable
{
    public function getDiscountedPrice(Currency $currency)
    {
        $discountedPercent =  $this->discount ? $this->discount->percent : null;
        $priceInCurrency = $this->getPriceInCurrency($currency);

        if ($discountedPercent === null || $discountedPercent == 0) {
            return null;
        }

        return round($priceInCurrency * (1 - $discountedPercent / 100), 0);
    }
}
