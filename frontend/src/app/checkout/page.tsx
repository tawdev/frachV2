"use client";
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/hooks/useCart';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  if (cart.length === 0) {
    if (typeof window !== 'undefined') router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        customerAddress: form.address,
        totalAmount: total,
        items: cart.map(i => ({
          productId: i.productId,
          productName: i.name,
          quantity: i.quantity,
          price: i.price
        }))
      };

      await api.orders.create(orderData);
      clearCart();
      alert("Commande passée avec succès !");
      router.push('/');
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la commande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24">
      <Navbar />
      
      <div className="container max-w-5xl">
        <h1 className="text-5xl font-heading mb-12 tracking-tight text-center">Finaliser <span className="italic">Commande.</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="glass p-8 rounded-3xl flex flex-col gap-6">
              <h2 className="text-xl font-heading mb-4">Informations de livraison</h2>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-2">Nom Complet</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-accent-gold outline-none transition-all"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-2">Email</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-accent-gold outline-none transition-all"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-2">Téléphone</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-accent-gold outline-none transition-all"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-2">Adresse de livraison</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-accent-gold outline-none transition-all resize-none"
                  value={form.address}
                  onChange={e => setForm({...form, address: e.target.value})}
                />
              </div>
            </div>
          </form>

          <div className="flex flex-col gap-8">
            <div className="glass p-8 rounded-3xl">
              <h2 className="text-xl font-heading mb-6">Votre Commande</h2>
              <div className="flex flex-col gap-4 max-h-64 overflow-y-auto mb-6 pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary font-light">{item.quantity}x {item.name}</span>
                    <span className="font-bold">{(item.price * item.quantity).toLocaleString()} DH</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-6 flex justify-between items-center text-xl font-heading">
                <span>Total</span>
                <span className="text-accent-gold">{total.toLocaleString()} DH</span>
              </div>
            </div>

            <button 
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-accent-gold hover:bg-accent-gold-dark text-bg-primary py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm transition-all shadow-[0_10px_30px_rgba(197,160,89,0.3)] flex items-center justify-center disabled:opacity-50"
            >
              {loading ? "Traitement..." : "Confirmer la commande"}
            </button>
            <p className="text-[10px] text-center text-text-muted uppercase tracking-widest leading-loose">
              En cliquant sur confirmer, vous acceptez nos conditions générales de vente et notre politique de confidentialité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
