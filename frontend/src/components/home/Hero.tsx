import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Immersive Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-transparent to-bg-primary z-10" />
      <div className="absolute inset-0 bg-black/40 z-[5]" />
      
      <div className="absolute inset-0 transition-transform duration-[20000ms] ease-linear hover:scale-110">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
      </div>

      <div className="container relative z-20">
        <div className="max-w-3xl">
          <span className="inline-block text-accent-gold uppercase tracking-[0.3em] text-sm font-semibold mb-6 animate-fade-in">
            L'excellence du mobilier
          </span>
          <h1 className="text-6xl md:text-8xl font-heading leading-tight mb-8">
            Sublimer votre <br /> 
            <span className="italic text-accent-gold">Intérieur.</span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-xl mb-12 font-light">
            Découvrez une collection unique de mobiliers haut de gamme et créations sur mesure pour transformer chaque espace en un lieu d'exception.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <button className="bg-accent-gold hover:bg-accent-gold-dark text-bg-primary px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:translate-y-[-4px]">
              Découvrez la collection
            </button>
            <button className="border border-white/20 hover:border-white px-10 py-5 rounded-full text-white font-semibold uppercase tracking-widest text-xs transition-all hover:bg-white/5">
              Sur mesure
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Accent */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent-gold to-transparent" />
      </div>

      <style jsx>{`
        h1 {
          animation: slideUp 1s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
