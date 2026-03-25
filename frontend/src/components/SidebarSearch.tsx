'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Folder, Loader2, ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SidebarSearch() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<{ products: any[]; categories: any[] }>({ products: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch categories
  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    const cat = searchParams.get('category_id');
    setSelectedCategory(cat ? parseInt(cat) : null);
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
    if (selectedCategory) {
      params.set('category_id', selectedCategory.toString());
    } else {
      params.delete('category_id');
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
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1.5 h-6 bg-secondary rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em]">Recherche</h2>
      </div>
      
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm focus-within:ring-[6px] focus-within:ring-secondary/5 focus-within:border-secondary/30 transition-all overflow-hidden group">
        <form onSubmit={handleSearch} className="flex items-center h-14">
            {/* Category Toggle */}
            <div className="relative h-full border-r border-gray-50 flex items-center px-4 bg-gray-50/30 group-hover:bg-gray-50/50 transition-colors">
              <select 
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
                className="appearance-none bg-transparent pl-1 pr-6 py-2 text-[10px] font-bold uppercase tracking-wider text-primary outline-none cursor-pointer"
              >
                <option value="">Tous</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>

            <div className="relative flex-1 flex items-center">
              <Search 
                className="absolute left-4 text-text-muted group-focus-within:text-secondary transition-all" 
                size={16} 
              />
              <input 
                  ref={inputRef}
                  name="q"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => query.length >= 2 && setShowDropdown(true)}
                  placeholder="Ex: Salon..." 
                  className="w-full pl-11 pr-10 py-2 bg-transparent outline-none font-medium text-sm placeholder:text-text-muted/40"
              />
              <div className="absolute right-3 flex items-center gap-2">
                {loading && <Loader2 size={14} className="animate-spin text-secondary" />}
                {query && (
                  <button 
                    type="button"
                    onClick={() => { setQuery(''); const p = new URLSearchParams(searchParams.toString()); p.delete('q'); router.push(`/products?${p.toString()}`); }}
                    className="text-text-muted hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
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
