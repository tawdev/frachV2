import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Frachdark | Meubles Modernes et Élégants au Maroc',
  description: 'Découvrez notre collection exclusive de meubles modernes et élégants pour transformer votre intérieur. Qualité premium, livraison rapide partout au Maroc.',
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-text bg-background">
        <main className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 mt-20">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
