import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  _count?: { products: number };
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch('http://localhost:3001/categories', { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  const backendUrl = 'http://localhost:3001';

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
                <Image 
                  src={category.image ? (category.image.startsWith('http') ? category.image : `${backendUrl}/${category.image}`) : '/images/placeholder.jpg'} 
                  alt={category.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              </Link>

              {/* Text Section */}
              <div className="w-full md:w-2/5 animate-fade-in" style={{ animationDelay: `${(index * 0.1) + 0.2}s` }}>
                <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
                  {category.name}
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-[1px] bg-secondary hidden md:block"></span>
                  <span className="text-sm font-medium text-text-muted uppercase tracking-widest">{category._count?.products || 0} articles</span>
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
