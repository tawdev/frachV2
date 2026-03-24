'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronDown, Package, Folder, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<{ products: any[]; categories: any[] }>({ products: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch categories for dropdown
  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

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
        const catParam = selectedCategory ? `&category_id=${selectedCategory}` : '';
        const res = await fetch(`http://localhost:3001/products/search?q=${encodeURIComponent(query)}${catParam}`);
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
  }, [query, selectedCategory]);

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
    if (!query.trim()) return;
    
    const catParam = selectedCategory ? `&category=${selectedCategory}` : '';
    router.push(`/products?search=${encodeURIComponent(query)}${catParam}`);
    setShowDropdown(false);
    setIsOpen(false);
  };

  const backendUrl = 'http://localhost:3001';

  const formatUrl = (url: string) => {
    if (!url) return '/images/placeholder.jpg';
    if (url.startsWith('http')) return url;
    const cleanPath = url.startsWith('/') ? url.substring(1) : url;
    return `${backendUrl}/${cleanPath}`;
  };

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      {/* Search Toggle / Bar */}
      <div className={`flex items-center bg-gray-100 rounded-full border transition-all duration-300 ${
        isOpen ? 'w-[300px] md:w-[450px] border-secondary shadow-sm ring-2 ring-secondary/10 px-2' : 'w-10 h-10 border-transparent hover:bg-gray-200 cursor-pointer'
      } overflow-hidden`}
      onClick={() => !isOpen && setIsOpen(true)}
      >
        
        {/* Unified Search Icon (Acts as toggle when closed) */}
        {!isOpen ? (
          <div className="w-10 h-10 flex items-center justify-center text-primary shrink-0">
            <Search size={20} strokeWidth={2.5} />
          </div>
        ) : (
          <>
            {/* Category Select (Left) */}
            <div className="relative group shrink-0 border-r border-gray-200 flex items-center">
              <select 
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
                className="appearance-none bg-transparent pl-3 pr-7 py-2 text-[10px] font-bold uppercase tracking-wider text-primary outline-none cursor-pointer"
              >
                <option value="">Tous</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none group-hover:text-secondary transition-colors" />
            </div>

            {/* Input */}
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Rechercher..."
              className="flex-1 bg-transparent px-4 py-2 text-sm text-primary placeholder:text-text-muted/60 outline-none min-w-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.length >= 2 && setShowDropdown(true)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              autoFocus
            />

            {/* Action Buttons (Right) */}
            <div className="flex items-center pr-1 shrink-0">
              {query && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setQuery(''); inputRef.current?.focus(); }}
                  className="p-1.5 text-text-muted hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
              <button 
                onClick={(e) => { e.stopPropagation(); handleSearch(); }}
                className="p-2 rounded-full text-secondary transition-all"
              >
                {loading ? <Loader2 size={20} className="animate-spin text-secondary" /> : <Search size={20} strokeWidth={2.5} />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && (suggestions.products.length > 0 || suggestions.categories.length > 0) && (
        <div className="absolute top-full mt-3 right-0 w-[320px] md:w-[450px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[60] animate-slide-up flex flex-col max-h-[70vh]">
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
                      href={`/products?category_id=${cat.id}`}
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

      {/* Close button for search bar itself when open */}
      {isOpen && !query && (
        <button 
          onClick={() => setIsOpen(false)}
          className="ml-2 md:hidden p-2 text-text-muted hover:text-primary transition-colors"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
