import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: 'Salon',
      description: 'L\'art de recevoir avec élégance. Découvrez nos canapés, fauteuils et tables basses.',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1000&q=80',
      itemCount: 45
    },
    {
      id: 2,
      name: 'Chambre',
      description: 'Créez votre sanctuaire de repos. Lits, commodes et armoires au design soigné.',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80',
      itemCount: 32
    },
    {
      id: 3,
      name: 'Salle à manger',
      description: 'Des moments inoubliables partagés autour de tables et chaises raffinées.',
      image: 'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=1000&q=80',
      itemCount: 28
    },
    {
      id: 4,
      name: 'Bureau',
      description: 'Un espace de travail inspirant alliant productivité et esthétique premium.',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&q=80',
      itemCount: 15
    },
    {
      id: 5,
      name: 'Décoration',
      description: 'La touche finale pour parfaire votre intérieur avec nos objets de caractère.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80',
      itemCount: 86
    },
    {
      id: 6,
      name: 'Rangement',
      description: 'Optimisez votre espace avec nos solutions de rangement intelligentes et élégantes.',
      image: 'https://images.unsplash.com/photo-1595514535315-2207b5d1db92?w=1000&q=80',
      itemCount: 22
    }
  ];

  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container max-w-7xl">
        <div className="text-center mb-16 animate-fade-in text-primary">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">Nos Espaces <span className="italic text-secondary">de Vie</span></h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Chaque catégorie a été pensée pour répondre à vos exigences de style et de confort. Explorez nos univers pour trouver l'inspiration.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center group`}
            >
              {/* Image Section */}
              <Link href={`/products?category=${encodeURIComponent(category.name)}`} className="w-full md:w-3/5 relative h-80 md:h-[500px] rounded-3xl overflow-hidden shadow-lg animate-slide-up hover:shadow-2xl transition-all duration-500" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              </Link>

              {/* Text Section */}
              <div className="w-full md:w-2/5 animate-fade-in" style={{ animationDelay: `${(index * 0.1) + 0.2}s` }}>
                <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
                  {category.name}
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-[1px] bg-secondary hidden md:block"></span>
                  <span className="text-sm font-medium text-text-muted uppercase tracking-widest">{category.itemCount} articles</span>
                </div>
                <p className="text-text-muted leading-relaxed mb-8 text-lg">
                  {category.description}
                </p>
                <Link 
                  href={`/products?category=${encodeURIComponent(category.name)}`} 
                  className="inline-flex items-center gap-2 font-medium text-primary hover:text-secondary transition-colors link-hover"
                >
                  Découvrir la collection
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
