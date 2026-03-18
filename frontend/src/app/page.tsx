import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Categories Section */}
      <section className="py-24 container">
        <div className="flex justify-between items-end mb-16">
          <div>
             <span className="text-accent-gold uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">Parcourez nos univers</span>
             <h2 className="text-4xl md:text-5xl font-heading">Nos <span className="italic">Collections.</span></h2>
          </div>
          <p className="text-text-secondary max-w-sm text-right hidden md:block font-light">
            Découvrez nos créations pensées pour sublimer chaque pièce de votre maison avec élégance et confort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[700px]">
          {/* Bento Grid layout for categories */}
          <div className="md:col-span-8 glass rounded-2xl overflow-hidden group relative cursor-pointer">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
             <div className="absolute bottom-10 left-10 z-20">
                <h3 className="text-4xl mb-2 italic">Salon</h3>
                <span className="text-xs uppercase tracking-[0.3em] text-accent-gold font-bold">Explorer l'univers</span>
             </div>
          </div>
          
          <div className="md:col-span-4 flex flex-col gap-6">
             <div className="h-1/2 glass rounded-2xl overflow-hidden group relative cursor-pointer">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute bottom-8 left-8 z-20">
                   <h3 className="text-2xl mb-1 italic">Chambre</h3>
                   <span className="text-[10px] uppercase tracking-widest text-accent-gold font-bold">Découvrir</span>
                </div>
             </div>
             <div className="h-1/2 glass rounded-2xl overflow-hidden group relative cursor-pointer">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556911220-e150213ff167?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute bottom-8 left-8 z-20">
                   <h3 className="text-2xl mb-1 italic">Cuisine</h3>
                   <span className="text-[10px] uppercase tracking-widest text-accent-gold font-bold">Découvrir</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* Footer Placeholder */}
      <footer className="py-24 border-t border-white/5 bg-bg-primary">
         <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
               <h2 className="text-3xl font-heading mb-6 text-accent-gold tracking-widest uppercase">FrachDark</h2>
               <p className="text-text-secondary max-w-sm mb-8 font-light">
                  L'excellence du mobilier et de la décoration au Maroc. Des créations uniques pour des intérieurs d'exception.
               </p>
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:border-accent-gold transition-all cursor-pointer">
                     <span className="text-xs font-bold">IG</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:border-accent-gold transition-all cursor-pointer">
                     <span className="text-xs font-bold">FB</span>
                  </div>
               </div>
            </div>
            <div>
               <h4 className="text-sm uppercase tracking-[0.2em] mb-8 font-bold text-white">Navigation</h4>
               <ul className="flex flex-col gap-4 text-text-secondary text-sm font-medium">
                  <li className="hover:text-accent-gold cursor-pointer">Accueil</li>
                  <li className="hover:text-accent-gold cursor-pointer">Catalogues</li>
                  <li className="hover:text-accent-gold cursor-pointer">Sur Mesure</li>
                  <li className="hover:text-accent-gold cursor-pointer">Contact</li>
               </ul>
            </div>
            <div>
               <h4 className="text-sm uppercase tracking-[0.2em] mb-8 font-bold text-white">Contact</h4>
               <ul className="flex flex-col gap-4 text-text-secondary text-sm font-light">
                  <li>Marrakech, Maroc</li>
                  <li>+212 600 000 000</li>
                  <li>contact@frachdark.com</li>
               </ul>
            </div>
         </div>
         <div className="container mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-text-muted">
            <span>&copy; 2026 FrachDark. Tous droits réservés.</span>
            <span>Design by Antigravity AI</span>
         </div>
      </footer>
    </div>
  );
}
