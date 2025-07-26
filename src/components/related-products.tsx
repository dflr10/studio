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
import { CardBody, CardContainer, CardItem } from './ui/3d-card';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <section>
      <h2 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
        También te podría gustar
      </h2>
      <Carousel
        opts={{ align: 'start', loop: true }}
        className="mt-6 w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <CardContainer>
                <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] p-6 hover:shadow-2xl dark:border-white/[0.2] dark:bg-black dark:hover:shadow-emerald-500/[0.1]">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {product.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
                  >
                    {product.brand}
                  </CardItem>
                  <CardItem translateZ="100" className="mt-4 w-full">
                    <div className="relative aspect-square h-60 w-full">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="rounded-xl object-contain group-hover/card:shadow-xl"
                        data-ai-hint="product fashion"
                      />
                    </div>
                  </CardItem>
                  <div className="mt-20 flex items-center justify-between">
                    <CardItem
                      translateZ={20}
                      as="p"
                      className="px-4 py-2 text-xl font-normal text-primary dark:text-white"
                    >
                      {formatPrice(product.price)}
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
                    >
                      Ver producto
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-[-1.5rem]" />
        <CarouselNext className="right-[-1.5rem]" />
      </Carousel>
    </section>
  );
}
