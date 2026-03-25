'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const sortOptions = [
  { label: 'Nouveautés', value: 'newest' },
  { label: 'Prix : Croissant', value: 'price-asc' },
  { label: 'Prix : Décroissant', value: 'price-desc' },
  { label: 'Nom : A-Z', value: 'name-asc' },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeSort = searchParams.get('sort') || 'newest';
  const activeLabel = sortOptions.find(opt => opt.value === activeSort)?.label || 'Nouveautés';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/products?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <span>Trier par :</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl font-bold text-primary hover:border-secondary transition-all shadow-sm"
        >
          {activeLabel}
          <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={14} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-[60] py-2 animate-slide-up">
          <div className="px-1 py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSort(option.value)}
                className={`group flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-all ${
                  activeSort === option.value
                    ? 'bg-secondary/10 text-secondary font-bold'
                    : 'text-primary hover:bg-gray-50'
                }`}
              >
                {option.label}
                {activeSort === option.value && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
