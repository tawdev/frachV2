import Link from 'next/link';
import { Filter, ChevronDown, Eye, Search, X, Tag, Package, Sparkles } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import SimpleSearch from '@/components/SimpleSearch';
import SortDropdown from '@/components/SortDropdown';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; types_id?: string; q?: string; sort?: string; type_category_id?: string }
}) {
  const activeCategory = searchParams.category || 'Tous';
  const activeTypeId = searchParams.types_id || '';
  const activeSubCatId = searchParams.type_category_id || '';
  const searchQuery = searchParams.q || '';
  const sort = searchParams.sort || 'newest';

  const categoryQuery = activeCategory === 'Tous' ? '' : activeCategory;

  let products = [];
  let categoriesData = [];
  let typesBaseData = [];

  try {
    const [prodRes, catRes, typeRes] = await Promise.all([
      fetch(`http://localhost:3001/products?category=${encodeURIComponent(categoryQuery)}&types_id=${activeTypeId}&type_category=${activeSubCatId}&q=${encodeURIComponent(searchQuery)}`, { cache: 'no-store' }),
      fetch('http://localhost:3001/categories', { cache: 'no-store' }),
      fetch('http://localhost:3001/categories/types-base', { cache: 'no-store' })
    ]);

    if (prodRes.ok) products = await prodRes.json();
    if (catRes.ok) categoriesData = await catRes.json();
    if (typeRes.ok) typesBaseData = await typeRes.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  // Local search filter (since backend might not support ?q= yet)
  if (searchQuery) {
    products = products.filter((p: any) => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const categoryList = ['Tous', ...categoriesData.map((c: any) => c.name)];

  // Sorting logic
  products.sort((a: any, b: any) => {
    if (sort === 'price-asc') return Number(a.price) - Number(b.price);
    if (sort === 'price-desc') return Number(b.price) - Number(a.price);
    if (sort === 'name-asc') return a.name.localeCompare(b.name);
    // newest (default) - assume id or createdAt
    return b.id - a.id;
  });

  return (
    <div className="bg-background min-h-screen py-12 pb-24">
      <div className="container px-4">
        {/* Header Section */}
        <div className="relative mb-16 text-center animate-fade-in">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 opacity-5">
             <Sparkles size={120} />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6 tracking-tight">Nos Collections</h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Découvrez l'élégance du design marocain contemporain, entre pièces en stock prêtes à livrer et créations uniques sur mesure.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-32 space-y-10">
              <SimpleSearch />
              {/* Filter Sections */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-10">
                <div className="flex items-center gap-3 text-primary font-serif text-xl border-b border-gray-50 pb-4">
                  <Filter size={20} className="text-secondary" />
                  <h2>Affiner par</h2>
                </div>

                {/* Selling Types Filter */}
                <div>
                  <h3 className="font-bold text-text mb-5 flex items-center gap-2 text-sm uppercase tracking-widest">
                    <Tag size={14} className="text-secondary" /> Type de vente
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Link 
                        href={{ pathname: '/products', query: { ...searchParams, types_id: undefined } }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${!activeTypeId ? 'bg-primary text-white border-primary shadow-md' : 'bg-gray-50 text-text-muted border-transparent hover:bg-gray-100'}`}
                    >
                        Tous
                    </Link>
                    {typesBaseData.map((t: any) => (
                      <Link 
                        key={t.id}
                        href={{ pathname: '/products', query: { ...searchParams, types_id: t.id } }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeTypeId === t.id.toString() ? 'bg-primary text-white border-primary shadow-md' : 'bg-gray-50 text-text-muted border-transparent hover:bg-gray-100'}`}
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Categories Filter */}
                <div>
                  <h3 className="font-bold text-text mb-5 flex items-center gap-2 text-sm uppercase tracking-widest">
                    <Package size={14} className="text-secondary" /> Catégories
                  </h3>
                  <ul className="space-y-3">
                    {categoryList.map((cat) => (
                      <li key={cat}>
                        <Link 
                          href={{ pathname: '/products', query: { ...searchParams, category: cat === 'Tous' ? undefined : cat, type_category_id: undefined } }}
                          className={`flex items-center justify-between group py-1 text-sm transition-all ${activeCategory === cat ? 'text-secondary font-bold translate-x-1' : 'text-text-muted hover:text-primary'}`}
                        >
                          <span>{cat}</span>
                          {activeCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clear All */}
                {(activeCategory !== 'Tous' || activeTypeId || searchQuery || activeSubCatId) && (
                  <Link 
                    href="/products" 
                    className="flex justify-center items-center gap-2 py-3 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors mt-4"
                  >
                    <X size={14} /> Réinitialiser
                  </Link>
                )}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-10">
                <p className="text-text-muted text-sm font-medium">
                    <span className="text-primary font-bold">{products.length}</span> résultats trouvés
                </p>
                <SortDropdown />
            </div>

            {/* Sub-categories (Category Types) Chips - Horizontal Top Bar */}
            {activeCategory !== 'Tous' && (
                <div className="mb-12 animate-fade-in">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-1 h-4 bg-secondary rounded-full" />
                      <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">
                          Modèles de {activeCategory}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link 
                            href={{ pathname: '/products', query: { ...searchParams, type_category_id: undefined } }}
                            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border ${!activeSubCatId ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'bg-white text-text-muted border-gray-100 hover:border-secondary/30 hover:bg-gray-50'}`}
                        >
                            Tous les modèles
                        </Link>
                        {categoriesData.find((c: any) => c.name === activeCategory)?.types_categories.map((type: any) => (
                            <Link 
                                key={type.id}
                                href={{ pathname: '/products', query: { ...searchParams, type_category_id: type.id } }}
                                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border ${activeSubCatId === type.id.toString() ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'bg-white text-text-muted border-gray-100 hover:border-secondary/30 hover:bg-gray-50'}`}
                            >
                                {type.name}
                            </Link>
                        ))}
                    </div>
                    <div className="h-px bg-gradient-to-r from-gray-100 via-gray-50 to-transparent mt-10" />
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {products.map((product: any, index: number) => {
                const imageSrc = product.image 
                  ? (product.image.startsWith('http') 
                    ? product.image 
                    : `http://localhost:3001${product.image.startsWith('/') ? '' : '/'}${product.image}`) 
                  : '/images/placeholder.jpg';
                
                return (
                  <div 
                    key={product.id} 
                    className="group animate-slide-up bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 shrink-0">
                      <Link href={`/products/${product.id}`} className="block h-full w-full">
                        <img 
                          src={imageSrc} 
                          alt={product.name} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        />
                      </Link>
                      
                      {/* Floating Badge */}
                      <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                        {product.types_id === 1 && (
                            <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg backdrop-blur-sm bg-primary/90">
                                Sur Mesure
                            </div>
                        )}
                        {product.types_id === 2 && (
                            <div className="bg-secondary text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg backdrop-blur-sm bg-secondary/90">
                                En Stock
                            </div>
                        )}
                      </div>

                      {/* Overlays */}
                      <div className="absolute inset-x-0 bottom-6 px-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 flex gap-2">
                          <AddToCartButton 
                            product={product} 
                            className="flex-1 py-4 shadow-xl text-xs font-bold"
                            showIcon={true}
                          />
                          <Link 
                            href={`/products/${product.id}`} 
                            className="w-14 flex items-center justify-center rounded-2xl bg-white text-primary hover:text-secondary hover:scale-110 transition-all shadow-xl"
                            title="Aperçu"
                          >
                            <Eye size={22} />
                          </Link>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                            <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.2em]">
                                {product.categories?.name || product.category || 'Collection'}
                            </p>
                        </div>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="text-xl font-serif text-primary hover:text-secondary transition-colors line-clamp-2 leading-snug mb-2 italic">
                            {product.name}
                          </h3>
                        </Link>
                      </div>
                      
                      <div className="flex justify-between items-end pt-6 border-t border-gray-50 mt-auto">
                        <div className="flex flex-col">
                            <span className="text-xs text-text-muted font-medium mb-1">Prix à partir de</span>
                            <span className="text-2xl font-bold text-primary">
                            {Number(product.price).toLocaleString()} <span className="text-sm font-medium opacity-60">DHS</span>
                            </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {products.length === 0 && (
              <div className="py-32 flex flex-col items-center text-text-muted bg-white rounded-[3rem] border border-dashed border-gray-200 mt-10">
                <Search size={64} className="mb-6 opacity-10" />
                <h3 className="text-xl font-serif text-primary mb-2">Aucun résultat trouvé</h3>
                <p>Essayez de modifier vos filtres ou effectuez une nouvelle recherche.</p>
                <Link href="/products" className="mt-8 text-secondary font-bold border-b-2 border-secondary pb-1 hover:opacity-70 transition-opacity">
                    Voir toute la boutique
                </Link>
              </div>
            )}
            
            {/* Pagination Placeholder */}
            {products.length > 0 && (
              <div className="mt-20 flex justify-center">
                <div className="p-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex gap-1">
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-lg">1</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-transparent text-text hover:bg-gray-50 transition-all font-medium">2</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-transparent text-text hover:bg-gray-50 transition-all font-medium">3</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

