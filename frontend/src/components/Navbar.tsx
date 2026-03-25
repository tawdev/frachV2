'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import GlobalSearch from './GlobalSearch';

export default function Navbar() {
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
    <header className="fixed top-0 w-full z-[60] bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="container h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-primary hover:text-secondary transition-colors z-[60] relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-primary">
            <span className="italic text-secondary">Frach</span>dark
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center transition-all">
          <Link href="/" className="text-sm font-medium hover:text-secondary transition-colors text-primary">Accueil</Link>
          <Link href="/products" className="text-sm font-medium hover:text-secondary transition-colors text-primary">Produits</Link>
          <Link href="/categories" className="text-sm font-medium hover:text-secondary transition-colors text-primary">Catégories</Link>
          <Link href="/about" className="text-sm font-medium hover:text-secondary transition-colors text-primary">À Propos</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-secondary transition-colors text-text-muted">Contact</Link>
        </nav>

        {/* Actions & Search */}
        <div className="flex items-center gap-4 text-primary">
          {pathname !== '/products' && <GlobalSearch />}

          <Link href="/cart" className="p-2 hover:text-secondary transition-colors relative" aria-label="Cart">
            <ShoppingBag size={20} strokeWidth={2.5} />
            <span className="absolute top-1 right-0 w-4 h-4 bg-secondary text-white text-[10px] flex items-center justify-center rounded-full font-bold animate-fade-in" key={getItemCount()}>
              {getItemCount()}
            </span>
          </Link>
        </div>
      </div>
    </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white bg-opacity-95 backdrop-blur-xl z-[55] transition-all duration-500 flex flex-col pt-32 pb-10 px-6 overflow-y-auto md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center gap-8 text-3xl font-serif text-primary w-full">
          <Link href="/" className="hover:text-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Accueil</Link>
          <Link href="/products" className="hover:text-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Produits</Link>
          <Link href="/categories" className="hover:text-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Catégories</Link>
          <Link href="/about" className="hover:text-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>À Propos</Link>
          <Link href="/contact" className="hover:text-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </nav>
      </div>
    </>
  );
}
