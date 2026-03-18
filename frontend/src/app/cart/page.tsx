"use client";
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24">
      <Navbar />
      
      <div className="container">
        <h1 className="text-5xl font-heading mb-12 tracking-tight">Votre <span className="italic">Panier.</span></h1>

        {cart.length === 0 ? (
          <div className="py-20 text-center glass rounded-3xl">
             <p className="text-text-secondary mb-8">Votre panier est actuellement vide.</p>
             <Link href="/products" className="bg-accent-gold text-bg-primary px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs">
                Découvrir nos produits
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {cart.map((item) => (
                <div key={item.id} className="glass p-6 rounded-2xl flex items-center gap-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-heading mb-1">{item.name}</h3>
                    {item.dimensions && (
                      <p className="text-[10px] text-text-muted uppercase tracking-widest mb-2">
                        {item.dimensions.length}x{item.dimensions.width} cm
                      </p>
                    )}
                    <p className="text-accent-gold font-bold">{item.price.toLocaleString()} DH</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-white/10 rounded-full px-3 py-1">
                       <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-accent-gold">-</button>
                       <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                       <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-accent-gold">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-text-muted hover:text-red-500 transition-colors">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="glass p-8 rounded-3xl sticky top-32">
                <h2 className="text-2xl font-heading mb-8">Récapitulatif</h2>
                <div className="flex justify-between items-center mb-4 text-text-secondary font-light">
                  <span>Sous-total</span>
                  <span>{total.toLocaleString()} DH</span>
                </div>
                <div className="flex justify-between items-center mb-8 text-text-secondary font-light">
                  <span>Livraison</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-accent-gold">Gratuite</span>
                </div>
                <div className="border-t border-white/5 pt-6 flex justify-between items-center mb-10">
                  <span className="text-lg font-heading">Total</span>
                  <span className="text-2xl font-bold text-accent-gold">{total.toLocaleString()} DH</span>
                </div>
                <Link href="/checkout" className="w-full bg-accent-gold hover:bg-accent-gold-dark text-bg-primary py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center">
                  Passer à la commande
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
