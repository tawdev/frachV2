import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, category, image }) => {
  return (
    <div className="group relative glass rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold">
          {category}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800'} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10 flex flex-col items-center justify-center gap-4">
          <Link 
            href={`/products/${id}`}
            className="w-40 py-3 bg-white text-bg-primary rounded-full text-xs font-bold uppercase tracking-widest text-center hover:bg-accent-gold transition-colors"
          >
            Voir Détails
          </Link>
          <button className="w-40 py-3 border border-white/20 hover:border-white rounded-full text-xs font-bold uppercase tracking-widest transition-colors backdrop-blur-sm">
            Ajouter
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-heading mb-2 group-hover:text-accent-gold transition-colors">{name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-accent-gold font-bold">{price.toLocaleString()} DH</span>
          <div className="flex gap-1">
             <div className="w-2 h-2 rounded-full bg-white/20" />
             <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
