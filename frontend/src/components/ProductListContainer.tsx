'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import ViewToggle from './ViewToggle';
import ProductCard from './ProductCard';
import SortDropdown from './SortDropdown';

interface Product {
  id: number;
  name: string;
  price: number | string;
  image: string | null;
  category?: { name: string };
  category_name?: string;
  types_id?: number;
}

interface ProductListContainerProps {
  products: Product[];
  categoryName: string;
}

export default function ProductListContainer({ products, categoryName }: ProductListContainerProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [limit, setLimit] = useState(20);
  const [isLimitOpen, setIsLimitOpen] = useState(false);

  // Simplified Limit Dropdown (UI matching the image)
  const limitOptions = [10, 20, 50, 100];

  return (
    <div className="space-y-10">
      {/* Search Result Header / Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-3xl font-black text-[#1F2937] capitalize tracking-tight">
          {categoryName.toLowerCase()}
        </h2>

        <div className="flex items-center gap-4">
          <ViewToggle view={view} onViewChange={setView} />
          
          <div className="hidden sm:block">
            <SortDropdown />
          </div>

          {/* Limit Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLimitOpen(!isLimitOpen)}
              className="flex items-center gap-3 px-6 py-2 bg-white border border-[#EEEEEE] rounded-full font-bold text-[#1F2937] hover:border-[#B00020] transition-all h-10 min-w-[80px] justify-center"
            >
              {limit}
              <ChevronDown size={14} className={`transition-transform duration-300 ${isLimitOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLimitOpen && (
              <div className="absolute right-0 mt-2 w-24 rounded-xl bg-white shadow-xl ring-1 ring-black/5 z-50 py-1 overflow-hidden">
                {limitOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setLimit(opt);
                      setIsLimitOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 flex items-center justify-between ${limit === opt ? 'text-[#B00020] bg-red-50/50' : 'text-gray-600'}`}
                  >
                    {opt}
                    {limit === opt && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid or List Display */}
      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} view="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} view="list" />
          ))}
        </div>
      )}

      {products.length === 0 && (
        <div className="py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
           <p className="text-gray-400 font-medium">Aucun produit trouvé dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
}
