"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'glass py-3' : 'py-6'}`}>
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-semibold tracking-widest text-accent-gold uppercase">
          FrachDark
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link href="/products?category=Salon" className="text-sm font-medium uppercase tracking-wider hover:text-accent-gold">Salon</Link>
          <Link href="/products?category=Chambre" className="text-sm font-medium uppercase tracking-wider hover:text-accent-gold">Chambre</Link>
          <Link href="/products?category=Cuisine" className="text-sm font-medium uppercase tracking-wider hover:text-accent-gold">Cuisine</Link>
          <Link href="/products?category=Décoration" className="text-sm font-medium uppercase tracking-wider hover:text-accent-gold">Décoration</Link>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 hover:text-accent-gold transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <Link href="/cart" className="p-2 hover:text-accent-gold transition-colors relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <span className="absolute -top-1 -right-1 bg-accent-gold text-bg-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Link>
          <button className="md:hidden p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        nav {
          backdrop-filter: ${isScrolled ? 'blur(12px)' : 'none'};
          background: ${isScrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent'};
          border-bottom: 1px solid ${isScrolled ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
