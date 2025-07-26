
"use client";

import React, { useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';

interface ProductDetailsProps {
  product: Product;
}

const colorMap: { [key: string]: string } = {
  Negro: 'black',
  'Verde Limon': 'limegreen',
  Blanco: 'white',
  Miel: '#E6B422',
  Multicolor: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
  Mora: '#781F1F',
  Crema: '#F5F5DC',
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product.color);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product, selectedSize);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  
  const hasDiscount = product.fullPrice && product.fullPrice > product.price;

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          {product.title}
        </h1>
        <p className="text-xl text-muted-foreground">{product.brand}</p>
      </div>

      <div className="flex items-baseline space-x-2">
        {hasDiscount ? (
          <>
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(product.fullPrice)}
            </span>
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <Badge variant="outline">SKU: {product.sku}</Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium">Color: <span className="font-normal">{selectedColor}</span></h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.availableColors?.map((color) => (
            <button
              key={color}
              type="button"
              className={cn(
                'h-8 w-8 rounded-full border-2 transition-transform transform hover:scale-110',
                selectedColor === color ? 'ring-2 ring-primary ring-offset-2 border-primary' : 'border-gray-300',
                color === 'Blanco' && 'border-gray-400'
              )}
              style={{
                background: colorMap[color] || color.toLowerCase(),
              }}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium">Select Size</h3>
        <RadioGroup
          value={selectedSize ?? ''}
          onValueChange={setSelectedSize}
          className="mt-2 flex flex-wrap gap-2"
        >
          {Array.isArray(product.sizes) &&
            product.sizes.filter(Boolean).map((size) => (
            <Label
              key={size}
              htmlFor={`size-${size}`}
              className={cn(`flex cursor-pointer items-center justify-center rounded-md border p-3 px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground`,
                selectedSize === size
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'bg-card'
              )}
            >
              <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
              {size}
            </Label>
          ))}
        </RadioGroup>
      </div>

      <Button
        size="lg"
        onClick={handleAddToCart}
        disabled={!selectedSize}
        className="w-full shadow-lg"
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {selectedSize ? 'Add to Cart' : 'Select a size'}
      </Button>
      
      <div className="prose prose-sm max-w-none text-muted-foreground">
        <h3 className="font-medium text-foreground">Product Details</h3>
        <div dangerouslySetInnerHTML={{ __html: product.details }}></div>
      </div>
    </div>
  );
}
