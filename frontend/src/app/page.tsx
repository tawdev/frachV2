import Image from 'next/image';
import Link from 'next/link';
import CategorySlider from '@/components/CategorySlider';
import BestSellers from '@/components/BestSellers';
import Promotions from '@/components/Promotions';
import Gallery from '@/components/Gallery';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';
import BeforeAfter from '@/components/BeforeAfter';
import Guarantees from '@/components/Guarantees';
import OrderProcess from '@/components/OrderProcess';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';
import Location from '@/components/Location';

async function getCategories() {
  try {
    const res = await fetch((process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')/categories', { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function getProducts() {
  try {
    const res = await fetch((process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')/products', { next: { revalidate: 3600 } });
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
      {/* 1. Hero Section */}
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
              RedÃ©finissez votre espace avec notre sÃ©lection exclusive de piÃ¨ces artisanales, oÃ¹ le luxe rencontre le confort absolu.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link href="/products" className="btn-secondary px-8 py-4 text-lg rounded-full group transition-all hover:scale-105 active:scale-95">
                DÃ©couvrir la collection
                <span className="ml-2 transition-transform group-hover:translate-x-1 inline-block">â†’</span>
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

      {/* 2. CatÃ©gories */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Nos Espaces</h2>
              <h3 className="text-3xl md:text-4xl font-serif text-primary">Explorez nos catÃ©gories</h3>
            </div>
            <Link href="/categories" className="hidden md:inline-flex link-hover text-primary font-medium pb-1">
              Voir tout
            </Link>
          </div>
          <CategorySlider initialCategories={categories} />
        </div>
      </section>

      {/* 3. Best Sellers */}
      <BestSellers products={products} />

      {/* 4. Promotions / Offres */}
      <Promotions />

      {/* 5. Galerie / Inspirations */}
      <Gallery />
      <BeforeAfter />

      {/* 6. Services & Pourquoi Choisir */}
      <ServicesSection />
      <WhyChooseUs />

      {/* Nouvelles sections de Confiance & Processus */}
      <Guarantees />
      <OrderProcess />

      {/* 7. Avis Clients */}
      <Testimonials />

      {/* 8. FAQ */}
      <FAQ />

      {/* 9. Partenaires / Marques */}
      <Partners />

      {/* 10. Newsletter */}
      <Newsletter />

      {/* 11. Localisation (Before Footer) */}
      <Location />
    </div>
  );
}

