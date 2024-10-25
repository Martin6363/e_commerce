<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class AttributeValue extends Model
{
    use HasFactory;
    protected $fillable = ['attribute_id', 'filter_id', 'value'];

    public function attribute(): BelongsTo
    {
        return $this->belongsTo(Attribute::class);
    }
}
