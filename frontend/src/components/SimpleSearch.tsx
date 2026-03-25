'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SimpleSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  // Debounced URL updates for "Letter by Letter" search
  useEffect(() => {
    // Skip initial mount and when query is already in sync with URL
    if (query === (searchParams.get('q') || '')) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      // Use replace to avoid filling history with every keystroke
      router.replace(`/products?${params.toString()}`, { scroll: false });
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already being handled by useEffect
  };

  return (
    <form onSubmit={handleSearch} className="relative group mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher par nom..."
        className="w-full pl-10 pr-10 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-sm font-medium"
      />
      <Search 
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-secondary transition-colors" 
        size={16} 
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery('');
            const params = new URLSearchParams(searchParams.toString());
            params.delete('q');
            router.push(`/products?${params.toString()}`);
          }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-red-500 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </form>
  );
}
