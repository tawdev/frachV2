'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

export default function CategorySlider() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Double for -50% infinite loop
          setCategories([...data, ...data]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || categories.length === 0) return null;

  const backendUrl = 'http://localhost:3001';

  return (
    <div className="relative overflow-hidden group">
      {/* Infinite Scroll Container */}
      <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] whitespace-nowrap py-10">
        {categories.map((cat, idx) => (
          <Link 
            key={`${cat.id}-${idx}`}
            href={`/products?category=${cat.name}`}
            className="inline-block w-[320px] h-[450px] mx-4 shrink-0 group/card relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 transition-opacity duration-500 group-hover/card:opacity-80" />
            
            {/* Image */}
            <img 
              src={cat.image.startsWith('http') ? cat.image : `${backendUrl}/${cat.image}`}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
            />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <span className="text-secondary-light text-xs font-bold tracking-[0.2em] uppercase mb-2 block opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                Découvrir
              </span>
              <h4 className="text-3xl font-serif text-white mb-2">{cat.name}</h4>
              <p className="text-gray-300 text-sm opacity-0 group-hover/card:opacity-100 transition-all duration-500 transform translate-y-4 group-hover/card:translate-y-0 line-clamp-2 italic">
                {cat.description || "Collection exclusive de meubles"}
              </p>
            </div>
            
            {/* Glass decoration */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity translate-x-4 group-hover/card:translate-x-0 transition-transform z-20">
              <span className="text-white">→</span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Gradient Fades for smoothness */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-30 pointer-events-none" />
    </div>
  );
}
