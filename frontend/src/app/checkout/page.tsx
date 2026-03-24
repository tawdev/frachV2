import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-10 text-center animate-slide-up">Validation de Commande</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Checkout Form */}
          <div className="lg:w-3/5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-xl font-serif text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span>
                Informations Personnelles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-text mb-2">Nom Complet</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" placeholder="Entrez votre nom complet" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Adresse Email</label>
                  <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" placeholder="exemple@email.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Numéro de Téléphone</label>
                  <input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" placeholder="+212 6..." required />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-xl font-serif text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</span>
                Détails de Livraison
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Adresse complète</label>
                  <textarea rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none" placeholder="Appartement, rue, quartier..." required></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Ville</label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all bg-white" required>
                      <option value="">Sélectionnez une ville</option>
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Tanger">Tanger</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Code Postal (Optionnel)</label>
                    <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" placeholder="Ex: 20000" />
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
                 <label htmlFor="cash_on_delivery" className="font-medium text-primary cursor-pointer">Paiement à la livraison (En espèces)</label>
              </div>
            </div>

          </div>

          {/* Quick Summary Sidebar */}
          <div className="lg:w-2/5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 sticky top-28 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-xl font-serif text-primary mb-6">Votre Commande</h3>
              
              {/* Mini Item List */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&q=80" alt="Item" className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-primary line-clamp-1">Canapé Modena 3 Places</p>
                    <p className="text-xs text-text-muted">Quantité: 1</p>
                  </div>
                  <span className="font-medium text-sm text-text">12,500 DHS</span>
                </div>
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=100&q=80" alt="Item" className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-primary line-clamp-1">Fauteuil Accent Velours</p>
                    <p className="text-xs text-text-muted">Quantité: 2</p>
                  </div>
                  <span className="font-medium text-sm text-text">8,400 DHS</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-text-muted">
                  <span>Sous-total</span>
                  <span>20,900 DHS</span>
                </div>
                <div className="flex justify-between text-sm text-text-muted">
                  <span>Livraison</span>
                  <span>500 DHS</span>
                </div>
              </div>
              
              <div className="border-t border-gray-300 pt-6 mb-8">
                <div className="flex justify-between items-center bg-primary text-white p-4 rounded-xl shadow-lg">
                  <span className="text-sm font-medium uppercase tracking-wider">Total</span>
                  <span className="text-2xl font-bold">21,400 <span className="text-sm font-normal">DHS</span></span>
                </div>
              </div>
              
              <button className="btn-primary w-full py-4 text-lg justify-center gap-2 relative overflow-hidden group">
                <span className="relative z-10 flex items-center gap-2">Confirmer la Commande <ChevronRight size={18} /></span>
                <div className="absolute inset-0 bg-secondary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 z-0"></div>
              </button>
              
              <div className="mt-6 flex justify-center text-text-muted font-medium text-sm items-center gap-2">
                <ShieldCheck size={18} className="text-secondary" />
                Vos données sont protégées
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
