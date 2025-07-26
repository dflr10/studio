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
    const data = await res.json();
    // The endpoint returns an array, so we take the first element
    const product = Array.isArray(data) ? data[0] : data;

    if (!product || !product.items || product.items.length === 0) {
      return null;
    }

    const firstItem = product.items?.[0];
    const imageUrl = firstItem?.images?.[0]?.imageUrl;

    const availableColors = Array.from(new Set(product.items.map((item: any) => item.Color?.[0]).filter(Boolean)));

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
      availableColors: availableColors,
      sizes: product.items?.map((item: any) => item.Talla?.[0]).filter(Boolean) || [],
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
    return (data || []).map((product: any) => {
      const firstItem = product.items?.[0];
      const imageUrl = firstItem?.images?.[0]?.imageUrl;
      const availableColors = Array.from(new Set(product.items.map((item: any) => item.Color?.[0]).filter(Boolean)));
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
        availableColors: availableColors,
        sizes: product.items?.map((item: any) => item.Talla?.[0]).filter(Boolean) || [],
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
          <AlertTitle>Error al Cargar el Producto</AlertTitle>
          <AlertDescription>
            No pudimos cargar la información del producto. Por favor, inténtalo de nuevo más tarde.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <ProductClientPage product={product} relatedProducts={relatedProducts} />
  );
}
