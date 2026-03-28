'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import AddToCartButton from './AddToCartButton';

interface Product {
  id: number;
  name: string;
  price: number | string;
  image: string | null;
  category?: { name: string };
  category_name?: string;
  types_id?: number;
}

interface ProductCardProps {
  product: Product;
  view: 'grid' | 'list';
}

export default function ProductCard({ product, view }: ProductCardProps) {
  const backendUrl = 'http://localhost:3001';
  const imageSrc = product.image 
    ? (product.image.startsWith('http') 
        ? product.image 
        : `${backendUrl}${product.image.startsWith('/') ? '' : '/'}${product.image}`) 
    : '/images/placeholder.jpg';

  const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

  if (view === 'list') {
    return (
      <div className="group flex flex-col sm:flex-row bg-white border border-[#F1F1F1] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-auto sm:h-64">
        {/* Product Image */}
        <div className="relative w-full sm:w-64 h-64 sm:h-full bg-white shrink-0 p-4">
          <Link href={`/products/${product.id}`} className="block relative w-full h-full">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
          
          {/* View Overlay (optional, seen in some designs) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 pointer-events-none">
             <Eye size={24} className="text-white drop-shadow-md" />
          </div>
        </div>

        {/* Product Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <Link href={`/products/${product.id}`}>
              <h3 className="text-xl font-bold text-[#1F2937] hover:text-[#B00020] transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
            
            {/* Avis removed */}

            <div className="mt-4">
               <span className="text-2xl font-black text-[#B00020]">
                {price.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} <span className="text-lg">MAD</span>
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
             <AddToCartButton 
                product={product} 
                className="bg-[#B00020] hover:bg-[#8B0018] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md hover:shadow-lg"
                text="Ajouter au panier"
                showIcon={false}
             />
             <Link 
                href={`/products/${product.id}`}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#F8F9FA] text-[#1F2937] hover:bg-[#EEEEEE] transition-all border border-[#EEEEEE]"
                title="Détails"
             >
                <Eye size={20} />
             </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Matches current design but improved)
  return (
    <div className="group bg-white rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full animate-slide-up">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F9FA] shrink-0 p-4 sm:p-6">
        <Link href={`/products/${product.id}`} className="block h-full w-full relative">
          <Image 
            src={imageSrc} 
            alt={product.name} 
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-1000 group-hover:scale-110" 
          />
        </Link>
        
        {/* Floating Badge */}
        <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
          {product.types_id === 1 && (
              <div className="bg-[#1e293b] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg backdrop-blur-sm">
                  Sur Mesure
              </div>
          )}
          {product.types_id === 2 && (
              <div className="bg-[#B00020] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg backdrop-blur-sm">
                  En Stock
              </div>
          )}
        </div>

        {/* Action Buttons - Centered or bottom overlay */}
        <div className="absolute inset-x-0 bottom-4 sm:bottom-6 px-2 sm:px-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 flex gap-1 sm:gap-2">
            <AddToCartButton 
              product={product} 
              className="flex-1 py-2 sm:py-4 shadow-xl text-[10px] sm:text-xs font-bold bg-[#B00020] text-white rounded-xl sm:rounded-2xl hover:bg-[#8B0018]"
              showIcon={true}
            />
            <Link 
              href={`/products/${product.id}`}
              className="w-8 sm:w-12 shrink-0 flex items-center justify-center shadow-xl bg-white text-[#1F2937] rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors"
              title="Détails"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
        </div>
      </div>
      
      <div className="p-4 sm:p-8 flex-1 flex flex-col justify-between bg-white">
        <div>
          <p className="text-[8px] sm:text-[10px] text-[#A51C30] font-bold uppercase tracking-[0.2em] mb-1 sm:mb-2">
              {product.category_name || 'Collection'}
          </p>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-sm sm:text-xl font-bold text-[#1F2937] hover:text-[#B00020] transition-colors line-clamp-2 leading-snug mb-2">
              {product.name}
            </h3>
          </Link>
          {/* Avis removed */}
        </div>
        
        <div className="flex flex-col pt-3 sm:pt-6 border-t border-gray-50 mt-auto">
            <span className="text-[10px] sm:text-xs text-[#9CA3AF] font-medium mb-0.5 sm:mb-1 uppercase tracking-tight">Prix à partir de</span>
            <span className="text-lg sm:text-2xl font-black text-[#1F2937]">
            {price.toLocaleString('fr-FR')} <span className="text-[10px] sm:text-sm font-bold text-[#9CA3AF]">DHS</span>
            </span>
        </div>
      </div>
    </div>
  );
}
