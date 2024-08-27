<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'category_id',
        'disCount_id',
        'brand_id',
        'rating',
        'vendor_code'
    ];

    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        return $filter->apply($builder);
    }

    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => strtolower($value),
            set: fn() => strtolower(Str::slug($this->name, '-')),
        );
    }

    protected function vendorCode(): Attribute
    {
        return Attribute::make(
            set: fn(string $value) => $this->generateUniqueVendorCode(),
        );
    }

    private function generateUniqueVendorCode()
    {
        do {
            $vendorCode = random_int(1000000000, 9999999999);
        } while (Product::where('vendor_code', $vendorCode)->exists());

        return $vendorCode;
    }

    protected function similarProducts(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->getSimilarProducts(),
        );
    }

    private function getSimilarProducts()
    {
        return self::where('category_id', $this->category_id)
            ->with('category', 'discount', 'Images', 'brand', 'productEntry')
            ->limit(10)
            ->get();
    }

    public function getPriceInCurrency(Currency $currency)
    {
        return round($this->price * ($currency->exchange_rate));
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function discount()
    {
        return $this->belongsTo(DisCount::class);
    }

    public function Images()
    {
        return $this->hasMany(Images::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function productEntry()
    {
        return $this->hasMany(ProductEntry::class);
    }
}
