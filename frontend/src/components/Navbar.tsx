'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="container h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-primary hover:text-black">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-primary">
            <span className="italic text-secondary">Frach</span>dark
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-sm font-medium hover:text-secondary transition-colors text-primary">Accueil</Link>
          <Link href="/products" className="text-sm font-medium hover:text-secondary transition-colors text-primary">Produits</Link>
          <Link href="/categories" className="text-sm font-medium hover:text-secondary transition-colors text-primary">Catégories</Link>
          <Link href="/about" className="text-sm font-medium hover:text-secondary transition-colors text-primary">À Propos</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-secondary transition-colors text-text-muted">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 text-primary">
          <button className="p-2 hover:text-secondary transition-colors" aria-label="Search">
            <Search size={20} strokeWidth={2.5} />
          </button>
          <Link href="/cart" className="p-2 hover:text-secondary transition-colors relative" aria-label="Cart">
            <ShoppingBag size={20} strokeWidth={2.5} />
            <span className="absolute top-1 right-0 w-4 h-4 bg-secondary text-white text-[10px] flex items-center justify-center rounded-full font-bold">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
