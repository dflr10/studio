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
    const product = await res.json();
    const firstItem = product.items?.[0];
    const imageUrl = firstItem?.images?.[0]?.imageUrl;

    return {
      id: product.productId,
      sku: firstItem?.itemId,
      title: product.productName,
      brand: product.brand,
      image: imageUrl,
      images: firstItem?.images.map((img: any) => img.imageUrl) || [],
      price: firstItem?.sellers?.[0]?.commertialOffer?.Price,
      fullPrice: firstItem?.sellers?.[0]?.commertialOffer?.ListPrice,
      color: firstItem?.Color?.[0],
      sizes: product.items?.map((item: any) => item.Talla[0]) || [],
      details: product.description,
      stock: firstItem?.sellers?.[0]?.commertialOffer?.AvailableQuantity,
    };
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
    return (data.products || []).map((product: any) => {
      const firstItem = product.items?.[0];
      const imageUrl = firstItem?.images?.[0]?.imageUrl;
      return {
        id: product.productId,
        sku: firstItem?.itemId,
        title: product.productName,
        brand: product.brand,
        image: imageUrl,
        images: firstItem?.images.map((img: any) => img.imageUrl) || [],
        price: firstItem?.sellers?.[0]?.commertialOffer?.Price,
        fullPrice: firstItem?.sellers?.[0]?.commertialOffer?.ListPrice,
        color: firstItem?.Color?.[0],
        sizes: product.items?.map((item: any) => item.Talla[0]) || [],
        details: product.description,
        stock: firstItem?.sellers?.[0]?.commertialOffer?.AvailableQuantity,
      };
    });
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
