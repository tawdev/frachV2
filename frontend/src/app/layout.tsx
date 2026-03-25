import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Frachdark | Meubles Modernes et Élégants au Maroc',
  description: 'Découvrez notre collection exclusive de meubles modernes et élégants pour transformer votre intérieur. Qualité premium, livraison rapide partout au Maroc.',
};

import { CartProvider } from '@/context/CartContext';
import ClientLayout from '@/components/ClientLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-text bg-background">
        <CartProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </CartProvider>
      </body>
    </html>
  );
}
