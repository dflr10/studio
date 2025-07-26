"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface PersonalizedRecommendationsProps {
  viewingHistory: string[];
  allProducts: Product[];
}

export default function PersonalizedRecommendations({
  viewingHistory,
  allProducts,
}: PersonalizedRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const result = await getPersonalizedRecommendations({ viewingHistory });
      const recommendedProducts = allProducts.filter((product) =>
        result.recommendations.includes(product.id.toString())
      );
      setRecommendations(recommendedProducts);
    } catch (err) {
      setError('Sorry, we couldn\'t get recommendations at this time.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  return (
    <section>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
          Just For You
        </h2>
        <Button onClick={handleGetRecommendations} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Recommendations...
            </>
          ) : (
            'Get Personalized Recommendations'
          )}
        </Button>
      </div>
      {error && (
         <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recommendations.map((product) => (
          <Card key={product.id} className="overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-xl">
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
        ))}
      </div>
    </section>
  );
}
