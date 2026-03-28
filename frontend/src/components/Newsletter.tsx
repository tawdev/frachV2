'use client';
import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container max-w-5xl relative z-10">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[3rem] p-8 md:p-16 text-center">
          <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-secondary/30">
            <Mail size={32} className="text-secondary-light" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Restez informé</h2>
          <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Recevez nos offres exclusives, inspirations déco et les dernières nouveautés directement dans votre boîte mail.
          </p>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto relative group">
            {subscribed ? (
              <div className="bg-white/10 border border-green-500/50 text-green-400 p-4 rounded-full flex items-center justify-center gap-3 animate-fade-in">
                <CheckCircle size={24} />
                <span className="font-medium text-lg">Merci pour votre inscription !</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email..." 
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-4 sm:py-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white/15 transition-all text-lg"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-secondary hover:bg-[#8B0018] text-white font-bold rounded-full px-10 py-4 sm:py-5 uppercase tracking-widest text-sm transition-colors shadow-xl hover:shadow-secondary/20"
                >
                  S'abonner
                </button>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4 text-center">
              Nous respectons votre vie privée. Pas de spam, promis.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
