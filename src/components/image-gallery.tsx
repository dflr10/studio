"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api || !mainApi) {
      return;
    }

    const handleSelect = () => {
      if (api.selectedScrollSnap() < images.length) {
        setCurrent(api.selectedScrollSnap());
        mainApi.scrollTo(api.selectedScrollSnap());
      }
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, mainApi, images.length]);


  const handleThumbClick = (index: number) => {
    api?.scrollTo(index);
    mainApi?.scrollTo(index);
    setCurrent(index);
  }

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <Card className="overflow-hidden rounded-lg shadow-lg">
          <CardContent className="relative aspect-square p-0">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Placeholder image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
              data-ai-hint="placeholder"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Carousel setApi={setMainApi} className="w-full">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden rounded-lg shadow-lg">
                <CardContent className="relative aspect-square p-0">
                  <Image
                    src={img}
                    alt={`${title} - image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    priority={index === 0}
                    data-ai-hint="product apparel"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
         <CarouselPrevious className="left-4" />
         <CarouselNext className="right-4" />
      </Carousel>

      <Carousel setApi={setApi} opts={{ align: 'start', slidesToScroll: 1, dragFree: true }} className="w-full">
        <CarouselContent className="-ml-2">
          {images.map((img, index) => (
            <CarouselItem key={index} className="basis-1/4 pl-2 md:basis-1/5">
                <Card 
                    className={cn(
                        'overflow-hidden rounded-md cursor-pointer transition-all',
                        current === index ? 'ring-2 ring-primary ring-offset-2' : 'ring-1 ring-transparent'
                    )}
                    onClick={() => handleThumbClick(index)}
                >
                    <CardContent className="relative aspect-square p-0">
                    <Image
                        src={img}
                        alt={`Thumbnail for ${title} ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 25vw, 10vw"
                        className="object-cover"
                        data-ai-hint="product apparel"
                    />
                    </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
