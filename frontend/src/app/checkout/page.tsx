'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ChevronRight, ShieldCheck, CheckCircle, Package, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 0 ? 500 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    try {
      const orderData = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: `${formData.address}, ${formData.city} ${formData.zip}`,
        total_amount: total,
        items: cartItems.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        setOrderId(result.id);
        setIsSuccess(true);
        clearCart();
      } else {
        alert('Une erreur est survenue lors de la validation de la commande.');
      }
    } catch (error) {
      console.error('Error submitting order', error);
      alert('Impossible d\'envoyer la commande. Vérifiez votre connexion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-background min-h-screen py-20 flex items-center justify-center pt-28">
        <div className="container max-w-lg text-center animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h1 className="text-3xl font-serif text-primary mb-4">Commande Confirmée !</h1>
            <p className="text-text-muted mb-8 text-lg">
              Merci pour votre confiance. Votre commande <span className="font-bold text-primary">#{orderId}</span> a été enregistrée avec succès. Notre équipe vous contactera bientôt.
            </p>
            <div className="flex flex-col gap-4">
              <Link href="/products" className="btn-primary py-4 justify-center gap-2">
                <Package size={20} />
                Continuer mes achats
              </Link>
              <Link href="/" className="text-text-muted hover:text-primary transition-colors flex items-center justify-center gap-2 font-medium">
                <ArrowLeft size={18} />
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-background min-h-screen py-20 flex items-center justify-center pt-28">
        <div className="text-center">
            <h1 className="text-3xl font-serif text-primary mb-4">Votre panier est vide</h1>
            <p className="mb-8">Ajoutez des produits au panier pour passer une commande.</p>
            <Link href="/products" className="btn-primary">Découvrir nos collections</Link>
        </div>
      </div>
    );
  }

  const backendUrl = 'http://localhost:3001';

  return (
    <div className="bg-background min-h-screen py-10 pt-28">
      <div className="container max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-10 text-center animate-slide-up">Validation de Commande</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Checkout Form */}
          <div className="lg:w-3/5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-serif text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span>
                Informations Personnelles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-text mb-2">Nom Complet</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" 
                    placeholder="Entrez votre nom complet" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Adresse Email</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" 
                    placeholder="exemple@email.com" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Numéro de Téléphone</label>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" 
                    placeholder="+212 6..." 
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-serif text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</span>
                Détails de Livraison
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Adresse complète</label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3} 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none" 
                    placeholder="Appartement, rue, quartier..." 
                    required
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Ville</label>
                    <select 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all bg-white" 
                      required
                    >
                      <option value="">Sélectionnez une ville</option>
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Tanger">Tanger</option>
                      <option value="Fès">Fès</option>
                      <option value="Meknès">Meknès</option>
                      <option value="Agadir">Agadir</option>
                      <option value="Oujda">Oujda</option>
                      <option value="Kenitra">Kenitra</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Code Postal (Optionnel)</label>
                    <input 
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" 
                      placeholder="Ex: 20000" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-serif text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">3</span>
                Paiement
              </h2>
              <div className="p-4 border border-secondary bg-secondary/5 rounded-xl flex items-center gap-4 cursor-pointer">
                 <input type="radio" id="cash_on_delivery" name="payment_method" defaultChecked className="w-5 h-5 text-secondary focus:ring-secondary" />
                 <label htmlFor="cash_on_delivery" className="font-medium text-primary cursor-pointer flex-1">
                    <span className="block font-bold">Paiement à la livraison</span>
                    <span className="block text-xs text-text-muted">Payez en espèces lors de la réception de votre commande.</span>
                 </label>
              </div>
            </div>

          </div>

          {/* Checkout Summary Sidebar */}
          <div className="lg:w-2/5 animate-fade-in pb-10" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 sticky top-28 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
               {/* Decorative background element */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
               
              <h3 className="text-xl font-serif text-primary mb-6 relative z-10">Résumé de la commande</h3>
              
              {/* Items List */}
              <div className="space-y-4 mb-6 relative z-10 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-sm transition-transform hover:scale-110">
                        <img 
                          src={item.image.startsWith('http') ? item.image : `${backendUrl}/${item.image}`} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-primary line-clamp-1">{item.name}</p>
                        <p className="text-xs text-text-muted">Qté: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-sm text-text">{(item.price * item.quantity).toLocaleString()} <span className="text-[10px]">DHS</span></span>
                    </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-6 space-y-3 mb-6 relative z-10">
                <div className="flex justify-between text-sm text-text-muted">
                  <span>Sous-total</span>
                  <span>{subtotal.toLocaleString()} DHS</span>
                </div>
                <div className="flex justify-between text-sm text-text-muted">
                  <span>Livraison</span>
                  <span>{deliveryFee.toLocaleString()} DHS</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-8 relative z-10">
                <div className="flex justify-between items-center bg-primary text-white p-4 rounded-xl shadow-lg transform transition-transform hover:scale-[1.02]">
                  <span className="text-sm font-medium uppercase tracking-wider">Total à payer</span>
                  <span className="text-2xl font-bold">{total.toLocaleString()} <span className="text-sm font-normal">DHS</span></span>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-lg justify-center gap-2 relative overflow-hidden group shadow-xl hover:shadow-secondary/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="relative z-10 flex items-center gap-2">
                    <Loader2 size={24} className="animate-spin" />
                    Traitement...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center gap-2">
                    Confirmer la Commande <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
                <div className="absolute inset-0 bg-secondary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 z-0 opacity-20"></div>
              </button>
              
              <div className="mt-8 flex justify-center text-text-muted font-medium text-xs items-center gap-2 border-t border-gray-50 pt-6">
                <ShieldCheck size={16} className="text-secondary" />
                <span className="italic">Transaction 100% sécurisée • Frachdark Furniture</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
