import { API_BASE_URL } from '@/lib/api-config';
﻿import Image from 'next/image';
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

export default function FeaturedProducts({ initialProducts }: { initialProducts: Product[] }) {
  const displayProducts = initialProducts?.slice(0, 8) || [];
  const backendUrl = API_BASE_URL;


  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {displayProducts.map((product, index) => {
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
                  <Image 
                    src={imageSrc} 
                    alt={product.name} 
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </Link>
                {product.type === 'sur-mesure' && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full z-10">
                    Sur Mesure
                  </div>
                )}
                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-3 sm:bottom-4 px-2 sm:px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <AddToCartButton 
                      product={product} 
                      className="w-full py-2 sm:py-3 text-[10px] sm:text-xs shadow-lg"
                      showIcon={true}
                    />
                </div>
              </div>
              
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[8px] sm:text-[10px] text-secondary font-bold uppercase tracking-widest mb-1 sm:mb-2">
                    {product.category?.name || product.category_name || 'Mobilier'}
                  </p>
                  <Link href={`/products/${product.id}`}>
                    <h4 className="text-sm sm:text-lg font-serif text-primary hover:text-secondary transition-colors line-clamp-2 leading-tight mb-2">
                      {product.name}
                    </h4>
                  </Link>
                </div>
                <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-50 mt-auto">
                    <span className="text-sm sm:text-xl font-bold text-primary">
                      {product.price.toLocaleString()} <span className="text-[10px] sm:text-xs font-medium text-text-muted">DHS</span>
                    </span>
                    <Link 
                      href={`/products/${product.id}`} 
                      className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 text-text-muted hover:text-secondary hover:border-secondary transition-all shrink-0 ml-2" 
                      title="Détails"
                    >
                      <Eye className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
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

