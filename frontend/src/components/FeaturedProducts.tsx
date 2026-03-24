'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';
import { Eye, ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: { name: string };
  category_name?: string;
  type?: string;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 8)); // Display 8 newest products
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-80" />
        ))}
      </div>
    );
  }

  const backendUrl = 'http://localhost:3001';

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => {
          const imageSrc = product.image 
            ? (product.image.startsWith('http') ? product.image : `${backendUrl}/${product.image}`)
            : '/images/placeholder.jpg';
          
          return (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 shrink-0">
                <Link href={`/products/${product.id}`} className="block h-full w-full">
                  <img 
                    src={imageSrc} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </Link>
                {product.type === 'sur-mesure' && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full z-10">
                    Sur Mesure
                  </div>
                )}
                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-4 px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <AddToCartButton 
                      product={product} 
                      className="w-full py-3 shadow-lg"
                      showIcon={true}
                    />
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-2">
                    {product.category?.name || product.category_name || 'Mobilier'}
                  </p>
                  <Link href={`/products/${product.id}`}>
                    <h4 className="text-lg font-serif text-primary hover:text-secondary transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </h4>
                  </Link>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto">
                    <span className="text-xl font-bold text-primary">
                      {product.price.toLocaleString()} <span className="text-xs font-medium text-text-muted">DHS</span>
                    </span>
                    <Link 
                      href={`/products/${product.id}`} 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 text-text-muted hover:text-secondary hover:border-secondary transition-all" 
                      title="Détails"
                    >
                      <Eye size={18} />
                    </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
        <Link href="/products" className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-medium rounded-full hover:bg-secondary transition-all hover:scale-105 active:scale-95 group">
          Tout Explorer
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
