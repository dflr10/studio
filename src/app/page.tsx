import ProductClientPage from '@/components/product-client-page';
import type { Product } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

async function getProductData(): Promise<Product | null> {
  try {
    const res = await fetch(
      'https://api-frontend-production.up.railway.app/api/products/125829257'
    );
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

async function getRelatedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      'https://api-frontend-production.up.railway.app/api/products?ft=tenis'
    );
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Failed to fetch related products:', error);
    return [];
  }
}

export default async function Home() {
  const [product, relatedProducts] = await Promise.all([
    getProductData(),
    getRelatedProducts(),
  ]);

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Fetching Product</AlertTitle>
          <AlertDescription>
            We couldn't load the product information. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <ProductClientPage product={product} relatedProducts={relatedProducts} />
  );
}
