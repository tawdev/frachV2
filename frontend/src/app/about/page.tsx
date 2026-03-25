import { Sparkles, Award, ShieldCheck, Heart, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container max-w-6xl">
        {/* Hero Section */}
        <section className="relative h-[65vh] rounded-[3rem] overflow-hidden mb-24 shadow-2xl animate-fade-in group border border-gray-100/20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/60 to-transparent z-10" />
          <img 
            src="/images/about/hero.png" 
            alt="L'Atelier Frachdark" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out" 
          />
          <div className="relative z-20 h-full flex flex-col justify-center px-10 md:px-24 max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 self-start animate-slide-up">
              <Sparkles size={16} className="text-secondary" />
              <span className="text-xs font-bold text-white uppercase tracking-[0.3em]">Héritage & Prestige</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tighter leading-[0.9]">
              L'Art du <br />
              <span className="italic text-secondary">Vivre</span> Exceptionnel
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl opacity-90">
              Depuis plus d'une décennie, Frachdark façonne l'âme des intérieurs marocains avec une élégance intemporelle et un savoir-faire qui défie le temps.
            </p>
          </div>
        </section>

        {/* Vision & Craftsmanship */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
          <div className="animate-slide-up space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">L'Excellence du Geste, <br /><span className="text-secondary italic">La Noblesse du Bois</span></h2>
              <div className="w-20 h-1 bg-secondary rounded-full" />
            </div>
            <p className="text-text-muted text-lg leading-relaxed">
              Née d'une passion dévouée pour le travail des matières nobles, Frachdark s'est imposée comme une référence incontournable du mobilier de luxe au Maroc. Notre voyage a commencé dans un petit atelier d'artisans passionnés, animés par la volonté de marier l'héritage artisanal marocain aux lignes les plus contemporaines.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              Aujourd'hui, chaque création qui sort de nos ateliers est une pièce de collection. Nous sélectionnons rigoureusement des essences de bois massifs d'exception, des métaux polis à la main et des textiles issus des plus grandes maisons de couture pour garantir un fini impeccable.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="flex flex-col gap-2">
                    <Award className="text-secondary mb-2" size={32} />
                    <h4 className="font-serif text-xl text-primary italic">Qualité d'Artiste</h4>
                    <p className="text-sm text-text-muted">Chaque courbe est pensée pour l'harmonie.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <ShieldCheck className="text-secondary mb-2" size={32} />
                    <h4 className="font-serif text-xl text-primary italic">Durabilité Absolue</h4>
                    <p className="text-sm text-text-muted">Des meubles conçus pour plusieurs vies.</p>
                </div>
            </div>
          </div>
          
          <div className="relative py-12">
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="space-y-6">
                <div className="relative h-80 rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white/20">
                  <img src="/images/about/detail.png" alt="Savoir-faire artisanal" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="bg-primary p-12 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                     <Star size={80} />
                  </div>
                  <h3 className="text-5xl font-serif mb-2 text-secondary italic">12+</h3>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Années de Signature</p>
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="bg-gray-100 p-12 rounded-[2.5rem] border border-gray-200/50 group hover:bg-white transition-colors duration-500">
                  <h3 className="text-5xl font-serif mb-2 text-primary">100%</h3>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-[0.2em]">Atelier Local</p>
                </div>
                <div className="relative h-80 rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white/20">
                  <img src="/images/about/minimal.png" alt="Intérieur Prestige" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0" />
          </div>
        </div>

        {/* Our Approach (Premium Grid) */}
        <section className="mb-32 relative">
          <div className="text-center mb-20 space-y-4">
             <h3 className="text-secondary font-bold uppercase tracking-[0.4em] text-xs">Notre ADN</h3>
             <h2 className="text-5xl font-serif text-primary italic">La Signature Frachdark</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                step: "01", 
                title: "Inspiration", 
                text: "Nous puisons dans la modernité cosmopolite sans jamais oublier nos racines. Un équilibre subtil entre hier et demain.",
                icon: <Sparkles className="mb-6 text-secondary" size={32} />
              },
              { 
                step: "02", 
                title: "Création Libre", 
                text: "Au-delà du catalogue, nous offrons une liberté totale : le sur-mesure est au cœur d'un projet de vie unique.",
                icon: <Heart className="mb-6 text-secondary" size={32} />
              },
              { 
                step: "03", 
                title: "Service Signature", 
                text: "Une expérience cousue main. De la première esquisse à l'installation finale chez vous, l'excellence est notre seule norme.",
                icon: <ShieldCheck className="mb-6 text-secondary" size={32} />
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                <div className="absolute top-8 right-12 text-6xl font-serif text-gray-100 italic group-hover:text-secondary/10 transition-colors">{item.step}</div>
                {item.icon}
                <h3 className="text-2xl font-serif text-primary mb-5 italic">{item.title}</h3>
                <p className="text-text-muted leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="bg-primary rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]" />
            <div className="relative z-10 max-w-4xl mx-auto space-y-10">
                <Star className="text-secondary mx-auto" size={40} />
                <h2 className="text-4xl md:text-5xl font-serif text-white italic leading-tight">
                    "Nous ne fabriquons pas simplement des meubles. <br /> Nous créons les décors des moments qui comptent."
                </h2>
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-secondary font-bold uppercase tracking-widest text-sm">Frachdark</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Est. 2012</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
