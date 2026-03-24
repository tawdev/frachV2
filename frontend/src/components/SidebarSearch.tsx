'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Folder, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SidebarSearch() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<{ products: any[]; categories: any[] }>({ products: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Handle search suggestions with debounce
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions({ products: [], categories: [] });
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3001/products/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data);
          setShowDropdown(true);
        }
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`/products?${params.toString()}`);
    setShowDropdown(false);
  };

  const backendUrl = 'http://localhost:3001';

  const formatUrl = (url: string) => {
    if (!url) return '/images/placeholder.jpg';
    if (url.startsWith('http')) return url;
    const cleanPath = url.startsWith('/') ? url.substring(1) : url;
    return `${backendUrl}/${cleanPath}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={18} />
        <form onSubmit={handleSearch}>
            <input 
                ref={inputRef}
                name="q"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.length >= 2 && setShowDropdown(true)}
                placeholder="Rechercher..." 
                className="w-full pl-12 pr-12 py-4 bg-white border border-gray-100 rounded-3xl shadow-sm focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all font-medium text-sm"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {loading && <Loader2 size={16} className="animate-spin text-secondary" />}
              {query && (
                <button 
                  type="button"
                  onClick={() => { setQuery(''); router.push('/products'); }}
                  className="text-text-muted hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
        </form>
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && (suggestions.products.length > 0 || suggestions.categories.length > 0) && (
        <div className="absolute top-full mt-3 left-0 w-full bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-[60] animate-slide-up flex flex-col max-h-[500px]">
          <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
            
            {/* Categories Suggestions */}
            {suggestions.categories.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-secondary rounded-full" />
                  <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Suggestions de Catégories</h3>
                </div>
                <div className="space-y-1">
                  {suggestions.categories.map(cat => (
                    <Link 
                      key={cat.id} 
                      href={`/products?category=${cat.name}`}
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 text-sm text-primary transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-text-muted group-hover:bg-secondary group-hover:text-white transition-all">
                        <Folder size={14} />
                      </div>
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Products Suggestions */}
            {suggestions.products.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-secondary rounded-full" />
                  <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Suggestions de Produits</h3>
                </div>
                <div className="space-y-3">
                  {suggestions.products.map(prod => {
                    const imgUrl = prod.images?.[0]?.url || prod.image;
                    const fullImg = formatUrl(imgUrl);
                    
                    return (
                      <Link 
                        key={prod.id} 
                        href={`/products/${prod.id}`}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-4 p-2 rounded-2xl hover:bg-gray-50 transition-all group"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-sm">
                          <img src={fullImg} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-primary truncate">{prod.name}</h4>
                          <p className="text-xs text-secondary font-bold mt-0.5">{Number(prod.price).toLocaleString()} DHS</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Footer */}
            <div className="pt-2 border-t border-gray-50 text-center">
              <button 
                onClick={handleSearch}
                className="text-xs font-bold text-secondary uppercase tracking-widest hover:tracking-[0.15em] transition-all py-2 inline-block"
              >
                Voir tous les résultats
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
