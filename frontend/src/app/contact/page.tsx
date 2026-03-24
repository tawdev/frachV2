import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Contactez-nous</h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg hover:-translate-y-1 transition-transform">
            Une question sur un produit ? Un projet sur-mesure ? Notre équipe est à votre disposition pour vous accompagner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500">
              <h2 className="text-2xl font-serif text-primary mb-8">Nos Coordonnées</h2>
              
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary mb-1">Notre Showroom</h3>
                    <p className="text-text-muted leading-relaxed">LOT LGUIDER N48 AV ALLAL EL FASSI<br/>Maroc</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary mb-1">Téléphone</h3>
                    <p className="text-text-muted">+212 600 000 000</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary mb-1">Email</h3>
                    <p className="text-text-muted">contact@meublesmaison.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary mb-1">Horaires d'ouverture</h3>
                    <p className="text-text-muted">Lundi - Samedi : 09h00 - 19h00<br/>Dimanche : Fermé</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 rounded-3xl overflow-hidden bg-gray-200 relative group">
               <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="Map Placeholder" className="w-full h-full object-cover filter grayscale blur-sm group-hover:blur-0 group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                 <span className="bg-white/90 px-6 py-3 rounded-full font-medium text-primary shadow-lg backdrop-blur-sm">Ouvrir dans Google Maps</span>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-primary text-white rounded-3xl shadow-xl p-10 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-light rounded-full opacity-50 blur-3xl"></div>
              
              <h2 className="text-2xl font-serif mb-2 relative z-10">Envoyez-nous un message</h2>
              <p className="text-gray-300 mb-8 text-sm relative z-10">Nous vous répondrons dans les plus brefs délais.</p>
              
              <form className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Nom Complet</label>
                    <input type="text" className="w-full bg-primary-light border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all placeholder-gray-400" placeholder="Votre nom" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                    <input type="email" className="w-full bg-primary-light border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all placeholder-gray-400" placeholder="Votre adresse email" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Sujet de votre demande</label>
                  <select className="w-full bg-primary-light border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all appearance-none cursor-pointer">
                    <option value="information">Demande d'information sur un produit</option>
                    <option value="sur-mesure">Projet sur-mesure / Devis</option>
                    <option value="suivi">Suivi de commande</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Message</label>
                  <textarea rows={5} className="w-full bg-primary-light border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none placeholder-gray-400" placeholder="Comment pouvons-nous vous aider ?" required></textarea>
                </div>
                
                <button type="button" className="btn-secondary w-full py-4 text-lg justify-center gap-2 mt-4 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  Envoyer le message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
