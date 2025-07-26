"use client";

import React from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from './ui/card';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  return (
    <section>
      <h2 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
        You Might Also Like
      </h2>
      <Carousel
        opts={{ align: 'start', loop: true }}
        className="mt-6 w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
              <Card className="overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                      data-ai-hint="product fashion"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="truncate font-semibold">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                    <p className="mt-2 font-medium text-primary">{formatPrice(product.price)}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-[-1.5rem]" />
        <CarouselNext className="right-[-1.5rem]" />
      </Carousel>
    </section>
  );
}
