import React from 'react';
import ProductCard from '../ui/ProductCard';

const FeaturedProducts = () => {
  // Mock data for initial UI
  const products = [
    { id: 1, name: "Canapé Moderne Gris", price: 8990, category: "Salon", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Table en Bois Massif", price: 12900, category: "Salle à manger", image: "https://images.unsplash.com/photo-1577145946459-39a58c717a1c?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Lit Double Luxe", price: 6990, category: "Chambre", image: "https://images.unsplash.com/photo-1505693419173-42b9258a6347?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Vase Céramique", price: 790, category: "Décoration", image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <div>
            <span className="text-accent-gold uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">Sélection Exclusive</span>
            <h2 className="text-4xl md:text-5xl font-heading">Produits <span className="italic">Phare.</span></h2>
          </div>
          <Link href="/products" className="text-sm font-semibold uppercase tracking-widest border-b border-accent-gold pb-1 hover:text-accent-gold transition-colors">
            Voir Toute la Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

import Link from 'next/link';
export default FeaturedProducts;
