import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';
import { Eye, TrendingUp } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: { name: string };
  category_name?: string;
  type?: string;
}

export default function BestSellers({ products }: { products: Product[] }) {
  // Take 4 products to simulate best sellers, preferably different from featured if we had a view count
  const displayProducts = products?.slice(0, 4) || [];
  const backendUrl = (process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')';

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-secondary" size={24} />
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase">Coups de Coeur</h2>
            </div>
            <h3 className="text-3xl md:text-5xl font-serif text-primary">Produits les plus vendus</h3>
            <p className="text-text-muted mt-4 max-w-xl">
              Nos piÃ¨ces les plus prisÃ©es, plÃ©biscitÃ©es par nos clients pour leur design et leur confort exceptionnel.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {displayProducts.map((product) => {
            const imageSrc = product.image 
              ? (product.image.startsWith('http') ? product.image : `${backendUrl}/${product.image}`)
              : '/images/placeholder.jpg';
            
            return (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative"
              >
                {/* Bestseller Badge */}
                <div className="absolute top-4 left-4 bg-yellow-500 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full z-30 shadow-md flex items-center gap-1">
                  <span>â˜…</span> Best Seller
                </div>

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

                  {/* Quick Add Overlay */}
                  <div className="absolute inset-x-0 bottom-3 sm:bottom-4 px-2 sm:px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <AddToCartButton 
                        product={product} 
                        className="w-full py-2 sm:py-3 text-[10px] sm:text-xs shadow-lg bg-primary hover:bg-secondary text-white"
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
                        title="DÃ©tails"
                      >
                        <Eye className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                      </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

