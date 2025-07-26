"use client";

import type { Product } from '@/lib/types';
import ImageGallery from './image-gallery';
import ProductDetails from './product-details';
import RelatedProducts from './related-products';
import PersonalizedRecommendations from './personalized-recommendations';
import { Separator } from './ui/separator';
import { useState, useEffect } from 'react';

interface ProductClientPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductClientPage({
  product,
  relatedProducts,
}: ProductClientPageProps) {
  const [viewingHistory, setViewingHistory] = useState<string[]>([]);

  useEffect(() => {
    // Add current product to viewing history on mount
    if (product?.id) {
      setViewingHistory((prev) => {
        const newHistory = [product.id.toString(), ...prev];
        // Keep history to a reasonable size, e.g., last 10 viewed items
        return [...new Set(newHistory)].slice(0, 10);
      });
    }
  }, [product?.id]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ImageGallery images={product.images} title={product.title} />
        </div>
        <div className="lg:col-span-3">
          <ProductDetails product={product} />
        </div>
      </div>
      <Separator className="my-12" />
      <RelatedProducts products={relatedProducts} />
      <Separator className="my-12" />
      <PersonalizedRecommendations
        allProducts={relatedProducts}
        viewingHistory={viewingHistory}
      />
    </div>
  );
}
