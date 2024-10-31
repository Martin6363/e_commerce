<?php

namespace App\Models;

use App\Filters\QueryFilter;
use App\Traits\Discountable;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory, Discountable;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'category_id',
        'disCount_id',
        'brand_id',
        'rating',
        'vendor_code',
        'published',
        'created_at'
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
            ->with('category', 'Images', 'brand')
            ->limit(10)
            ->get();
    }

    public function getPriceInCurrency(Currency $currency)
    {
        return round($this->price * ($currency->exchange_rate));
    }

    public function productAttributeValues(): HasMany
    {
        return $this->hasMany(ProductAttributeValue::class);
    }

    public function attributeValues():BelongsToMany
    {
        return $this->belongsToMany(AttributeValue::class, 'product_attribute_values');
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function Images(): HasMany
    {
        return $this->hasMany(Images::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function discount(): BelongsTo
    {
        return $this->belongsTo(DisCount::class, 'disCount_id');
    }

    public function promotions(): BelongsToMany
    {
        return $this->belongsToMany(Promotion::class, 'promotion_product')
            ->withPivot('discount')
            ->withTimestamps();
    }

    public function attributes()
    {
        return $this->belongsToMany(AttributeValue::class, 'product_attribute_values', 'product_id', 'attribute_value_id');
    }
}
