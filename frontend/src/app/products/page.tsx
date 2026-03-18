"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/ui/ProductCard';
import { api } from '@/lib/api';

const ProductListing = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pData, cData] = await Promise.all([
          api.products.getAll(activeCategory ? { categoryId: activeCategory } : undefined),
          api.categories.getAll(),
        ]);
        setProducts(pData);
        setCategories(cData);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-bg-primary pt-32">
      <Navbar />
      
      <div className="container">
        <header className="mb-16 border-b border-white/5 pb-12">
           <h1 className="text-5xl md:text-6xl font-heading mb-6 tracking-tight">Catalogue <span className="italic">Exclusif.</span></h1>
           <div className="flex flex-wrap gap-4 mt-8">
              <button 
                onClick={() => setActiveCategory(null)}
                className={`px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${!activeCategory ? 'bg-accent-gold text-bg-primary' : 'border border-white/10 hover:border-white'}`}
              >
                Tous
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-accent-gold text-bg-primary' : 'border border-white/10 hover:border-white'}`}
                >
                  {cat.name}
                </button>
              ))}
           </div>
        </header>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
             <div className="w-10 h-10 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pb-24">
            {products.length > 0 ? (
              products.map((p) => (
                <ProductCard 
                  key={p.id} 
                  id={p.id}
                  name={p.name}
                  price={Number(p.price)}
                  category={p.category_name || p.category?.name}
                  image={p.image}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                 <p className="text-text-secondary italic">Aucun produit trouvé dans cette catégorie.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
