import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container max-w-6xl">
        {/* Hero Section */}
        <section className="relative h-[60vh] rounded-3xl overflow-hidden mb-20 shadow-2xl animate-fade-in group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent z-10" />
          <img src="https://images.unsplash.com/photo-1618220179428-22790b46a015?w=1600&q=80" alt="Atelier Frachdark" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="relative z-20 h-full flex flex-col justify-center px-10 md:px-20 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 uppercase tracking-widest"><span className="italic text-secondary">Notre</span> Histoire</h1>
            <p className="text-xl text-gray-200 font-light leading-relaxed">
              Depuis plus d'une décennie, Frachdark façonne l'intérieur des foyers marocains avec passion, élégance et un savoir-faire inégalé.
            </p>
          </div>
        </section>

        {/* Vision & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-serif text-primary mb-6">L'artisanat rencontre le design contemporain</h2>
            <p className="text-text-muted leading-relaxed mb-6">
              Née de l'ambition de redéfinir le marché du meuble au Maroc, notre marque s'est d'abord distinguée par ses créations sur-mesure avant de lancer ses propres collections exclusives. Chaque pièce que nous concevons est le fruit d'une réflexion approfondie entre esthétique, fonctionnalité et durabilité.
            </p>
            <p className="text-text-muted leading-relaxed">
              Nous collaborons avec les meilleurs artisans locaux et sélectionnons rigoureusement nos matériaux : bois massifs issus de forêts gérées durablement, tissus haut de gamme et cuirs de première qualité.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-6">
              <div className="relative h-64 rounded-2xl overflow-hidden transform translate-y-8 shadow-lg">
                <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80" alt="Detail Artisanat" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="bg-primary-light text-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-4xl font-serif mb-2 text-secondary">10+</h3>
                <p className="text-sm uppercase tracking-wider">Années d'expérience</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-100 p-8 rounded-2xl shadow-sm text-center">
                <h3 className="text-4xl font-serif mb-2 text-primary">100%</h3>
                <p className="text-sm text-text-muted uppercase tracking-wider">Fabrication Premium</p>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden transform -translate-y-8 shadow-lg">
                <img src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&q=80" alt="Design Minimaliste" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Our Approach (Cinematic Bento styled) */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-primary mb-12 text-center">Notre Approche</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                <span className="text-2xl">01</span>
              </div>
              <h3 className="text-xl font-serif text-primary mb-4">Design Intemporel</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Des lignes épurées et des proportions parfaites conçues pour traverser les modes et sublimer votre espace pendant des années.
              </p>
            </div>
            <div className="bg-primary text-white p-10 rounded-3xl shadow-xl transform md:-translate-y-6 hover:-translate-y-8 transition-transform duration-300">
              <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl font-serif">02</span>
              </div>
              <h3 className="text-xl font-serif text-white mb-4">Sur Mesure</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Un service dédié pour adapter nos créations ou concevoir des pièces uniques qui répondent précisément à vos contraintes d'espace.
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl font-serif">03</span>
              </div>
              <h3 className="text-xl font-serif text-primary mb-4">Service Exclusif</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Un accompagnement personnalisé de la conception à la livraison, garantissant une expérience d'achat aussi premium que nos meubles.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
