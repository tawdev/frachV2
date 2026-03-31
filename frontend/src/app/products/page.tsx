import { API_BASE_URL } from '@/lib/api-config';
﻿import Link from 'next/link';
import Image from 'next/image';
import { Filter, ChevronDown, Eye, Search, X, Tag, Package, Sparkles } from 'lucide-react';

import AddToCartButton from '@/components/AddToCartButton';
import SimpleSearch from '@/components/SimpleSearch';
import SortDropdown from '@/components/SortDropdown';
import ProductListContainer from '@/components/ProductListContainer';

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
      fetch(`${API_BASE_URL}/products?category=${encodeURIComponent(categoryQuery)}&types_id=${activeTypeId}&type_category=${activeSubCatId}&q=${encodeURIComponent(searchQuery)}`, { cache: 'no-store' }),
      fetch(`${API_BASE_URL}/categories`, { cache: 'no-store' }),
      fetch(`${API_BASE_URL}/categories/types-base`, { cache: 'no-store' })
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
            DÃ©couvrez l'Ã©lÃ©gance du design marocain contemporain, entre piÃ¨ces en stock prÃªtes Ã  livrer et crÃ©ations uniques sur mesure.
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
                    <Package size={14} className="text-secondary" /> CatÃ©gories
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
                    <X size={14} /> RÃ©initialiser
                  </Link>
                )}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <ProductListContainer 
              products={products} 
              categoryName={activeCategory} 
            />

            {products.length === 0 && (
              <div className="py-32 flex flex-col items-center text-text-muted bg-white rounded-[3rem] border border-dashed border-gray-200 mt-10">
                <Search size={64} className="mb-6 opacity-10" />
                <h3 className="text-xl font-serif text-primary mb-2">Aucun rÃ©sultat trouvÃ©</h3>
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


