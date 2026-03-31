'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 0 ? 500 : 0;
  const total = subtotal + deliveryFee;

  const backendUrl = (process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')';

  return (
    <div className="bg-background min-h-screen py-10 pt-28">
      <div className="container">
        <h1 className="text-4xl font-serif text-primary mb-10 text-center animate-slide-up">Votre Panier</h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Cart Items */}
            <div className="lg:w-2/3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-sm font-medium text-text-muted">
                  <div className="col-span-6">Produit</div>
                  <div className="col-span-2 text-center">Prix</div>
                  <div className="col-span-2 text-center">QuantitÃ©</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 w-full flex items-center gap-4">
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <Image 
                            src={item.image.startsWith('http') ? item.image : `${backendUrl}/${item.image}`} 
                            alt={item.name} 
                            fill
                            sizes="96px"
                            className="object-cover" 
                          />
                        </div>
                        <div>
                          {item.category && (
                            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{item.category}</p>
                          )}
                          <Link href={`/products/${item.id}`} className="font-serif text-lg text-primary hover:text-secondary transition-colors line-clamp-2">
                            {item.name}
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 mt-2 transition-colors"
                          >
                            <Trash2 size={14} /> <span className="hidden sm:inline">Retirer</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-2 w-full sm:w-auto flex justify-between sm:block text-center text-text font-medium text-sm">
                        <span className="sm:hidden text-text-muted">Prix:</span>
                        {item.price.toLocaleString()} DHS
                      </div>
                      
                      <div className="col-span-2 w-full sm:w-auto flex justify-center">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-text-muted hover:text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 flex items-center justify-center font-medium text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-text-muted hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-2 w-full sm:w-auto flex justify-between sm:block text-right text-primary font-bold">
                        <span className="sm:hidden text-text-muted font-normal text-sm">Total:</span>
                        {(item.price * item.quantity).toLocaleString()} DHS
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center px-2">
                <Link href="/products" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                  â† Continuer vos achats
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 sticky top-28">
                <h2 className="text-2xl font-serif text-primary mb-6">RÃ©sumÃ© de la commande</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-text-muted">
                    <span>Sous-total ({cartItems.length} article{cartItems.length > 1 ? 's' : ''})</span>
                    <span className="font-medium text-text">{subtotal.toLocaleString()} DHS</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Frais de livraison estimÃ©s</span>
                    <span className="font-medium text-text">{deliveryFee.toLocaleString()} DHS</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-serif tracking-wide text-primary">Total</span>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-primary">{total.toLocaleString()}</span>
                      <span className="text-sm font-medium text-text-muted block mt-1">DHS</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted mt-2 text-right">Taxes incluses</p>
                </div>
                
                <Link href="/checkout" className="btn-primary w-full py-4 text-center justify-center gap-2 group">
                  Passer Ã  la caisse
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <div className="mt-6 flex items-center justify-center gap-4 border-t border-gray-100 pt-6 px-4">
                   <p className="text-xs text-center text-text-muted italic">Paiement 100% sÃ©curisÃ© et livraison garantie partout au Maroc.</p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-serif text-primary mb-4">Votre panier est vide</h2>
            <p className="text-text-muted mb-8">DÃ©couvrez nos collections pour ajouter des articles Ã  votre panier.</p>
            <Link href="/products" className="btn-primary">
              DÃ©couvrir nos collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

