import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/contexts/cart-provider';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'E-legant Finds',
  description: 'Find your next elegant piece.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
