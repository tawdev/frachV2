import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-secondary opacity-90 z-0" />
        
        {/* Overlay subtle texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            <span className="font-serif italic text-secondary-light">Frach</span>dark
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Découvrez notre collection exclusive de meubles modernes et élégants pour transformer votre intérieur.
          </p>
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/products" className="btn-secondary text-lg">
              Découvrir nos collections
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Preview Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Nos Espaces</h2>
              <h3 className="text-3xl md:text-4xl font-serif text-primary">Explorez nos catégories</h3>
            </div>
            <Link href="/categories" className="hidden md:inline-flex link-hover text-primary font-medium pb-1">
              Voir tout
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <Link href="/products?category=Salon" className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80" alt="Salon" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <h4 className="text-2xl font-serif text-white mb-2">Salon</h4>
                <p className="inline-block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-gray-200 text-sm">Canapés, fauteuils & tables basses</p>
              </div>
            </Link>
            
            {/* Category 2 */}
            <Link href="/products?category=Chambre" className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 md:-translate-y-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80" alt="Chambre" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <h4 className="text-2xl font-serif text-white mb-2">Chambre</h4>
                <p className="inline-block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-gray-200 text-sm">Lits, armoires & commodes</p>
              </div>
            </Link>

            {/* Category 3 */}
            <Link href="/products?category=Salle+à+manger" className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=800&q=80" alt="Salle à Manger" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <h4 className="text-2xl font-serif text-white mb-2">Salle à Manger</h4>
                <p className="inline-block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-gray-200 text-sm">Tables & chaises de repas</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Feature Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-light transform skew-x-12 translate-x-32" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">Le design qui redéfinit <span className="text-secondary italic">votre quotidien</span></h2>
              <p className="text-gray-300 mb-8 text-lg">
                Chez Frachdark, nous croyons que chaque meuble raconte une histoire. Nos collections sont soigneusement sélectionnées pour offrir l'équilibre parfait entre esthétique audacieuse et confort absolu.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">✓</span>
                  <span>Qualité artisanale premium</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">✓</span>
                  <span>Matériaux durables</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">✓</span>
                  <span>Service client dédié</span>
                </li>
              </ul>
              <Link href="/about" className="btn-secondary">
                En savoir plus sur nous
              </Link>
            </div>
            <div className="relative h-[500px] w-full glass-card p-2 rounded-3xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" alt="Design Feature" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
