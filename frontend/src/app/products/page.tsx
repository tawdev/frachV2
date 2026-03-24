import Link from 'next/link';
import { Filter, ChevronDown } from 'lucide-react';

// Placeholder data since API is not wired yet
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const activeCategory = searchParams.category || 'Tous';
  const categoryQuery = activeCategory === 'Tous' ? '' : activeCategory;

  let products = [];
  try {
    const res = await fetch(`http://localhost:3001/products?category=${encodeURIComponent(categoryQuery)}`, { cache: 'no-store' });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  const categories = ['Tous', 'Salon', 'Chambre', 'Salle à manger', 'Bureau', 'Décoration'];

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Nos Collections</h1>
          <p className="text-text-muted max-w-2xl mx-auto">Explorez notre gamme complète de meubles ou personnalisez vos propres créations sur mesure pour un intérieur unique.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-28">
              <div className="flex items-center gap-2 font-serif text-lg text-primary mb-6 border-b border-gray-200 pb-2">
                <Filter size={20} />
                <h2>Filtres</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-text mb-3 flex justify-between items-center cursor-pointer">
                    Catégories <ChevronDown size={16} />
                  </h3>
                  <ul className="space-y-2 text-sm text-text-muted">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <Link 
                          href={cat === 'Tous' ? '/products' : `/products?category=${cat}`}
                          className={`hover:text-secondary transition-colors block ${activeCategory === cat ? 'text-secondary font-medium' : ''}`}
                        >
                          {cat}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any, index: number) => {
                const imageSrc = product.image ? (product.image.startsWith('http') ? product.image : (product.image.startsWith('/') ? product.image : `/${product.image}`)) : '/images/placeholder.jpg';
                
                return (
                  <div 
                    key={product.id} 
                    className="group animate-slide-up bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link href={`/products/${product.id}`} className="block relative h-64 overflow-hidden bg-gray-100">
                      <img 
                        src={imageSrc} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      {product.type === 'sur-mesure' && (
                        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full z-10">
                          Sur Mesure
                        </div>
                      )}
                    </Link>
                    <div className="p-6">
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-2">{product.category}</p>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-lg font-serif text-primary hover:text-secondary transition-colors mb-3">{product.name}</h3>
                      </Link>
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-text">
                          {typeof product.price === 'string' && product.price.includes('DHS') ? product.price : `${Number(product.price).toLocaleString()} DHS`}
                        </p>
                        <Link href={`/products/${product.id}`} className="text-secondary text-sm font-medium link-hover">
                          Découvrir
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {products.length === 0 && (
              <div className="py-20 text-center text-text-muted">
                Aucun produit trouvé dans cette catégorie.
              </div>
            )}
            
            {/* Pagination Placeholder */}
            {products.length > 0 && (
              <div className="mt-16 flex justify-center">
                <div className="flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white">1</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-text hover:bg-gray-200 transition-colors transition-all duration-200">2</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-text hover:bg-gray-200 transition-colors transition-all duration-200">3</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
