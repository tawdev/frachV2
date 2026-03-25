import Image from 'next/image';
import Link from 'next/link';
import CategorySlider from '@/components/CategorySlider';
import FeaturedProducts from '@/components/FeaturedProducts';

async function getCategories() {
  try {
    const res = await fetch('http://localhost:3001/categories', { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function getProducts() {
  try {
    const res = await fetch('http://localhost:3001/products', { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-bg.png"
            alt="Premium Furniture Hero"
            fill
            priority
            className="object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/30 z-10" />
        </div>

        <div className="container relative z-20 px-4 md:px-8">
          <div className="max-w-3xl">


            <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 leading-[1.1] animate-slide-up">
              L'Art de <br />
              <span className="font-serif italic text-secondary-light">Vivre Propre</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Redéfinissez votre espace avec notre sélection exclusive de pièces artisanales, où le luxe rencontre le confort absolu.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link href="/products" className="btn-secondary px-8 py-4 text-lg rounded-full group transition-all hover:scale-105 active:scale-95">
                Découvrir la collection
                <span className="ml-2 transition-transform group-hover:translate-x-1 inline-block">→</span>
              </Link>
              <Link href="/categories" className="px-8 py-4 text-white font-semibold hover:text-secondary-light transition-colors relative group">
                Parcourir par styles
                <span className="absolute bottom-3 left-8 right-8 h-px bg-white/30 group-hover:bg-secondary-light transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
            <div className="w-1 h-3 bg-secondary rounded-full" />
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

          <CategorySlider initialCategories={categories} />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-background border-t border-gray-50">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Collection</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-primary">Les nouveautés</h3>
            <p className="text-text-muted mt-4 max-w-xl">
              Découvrez nos dernières créations, alliant artisanat traditionnel et design contemporain.
            </p>
          </div>

          <FeaturedProducts initialProducts={products} />
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
              <Image 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" 
                alt="Design Feature Frachdark" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-2xl" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
