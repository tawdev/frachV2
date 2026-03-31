import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

export default function CategorySlider({ initialCategories }: { initialCategories: Category[] }) {
  if (!initialCategories || initialCategories.length === 0) return null;

  const displayCategories = [...initialCategories, ...initialCategories];
  const backendUrl = (process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')';

  return (
    <div className="relative overflow-hidden group">
      {/* Infinite Scroll Container */}
      <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] whitespace-nowrap py-10">
        {displayCategories.map((cat, idx) => (
          <Link 
            key={`${cat.id}-${idx}`}
            href={`/products?category=${cat.name}`}
            className="inline-block w-[220px] h-[300px] sm:w-[280px] sm:h-[380px] mx-2 sm:mx-4 shrink-0 group/card relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 transition-opacity duration-500 group-hover/card:opacity-80" />
            
            {/* Image */}
            <Image 
              src={cat.image.startsWith('http') ? cat.image : `${backendUrl}/${cat.image}`}
              alt={cat.name}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover transition-transform duration-700 group-hover/card:scale-110"
            />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 p-5 sm:p-8 z-20 w-full">
              <span className="text-secondary-light text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-1 sm:mb-2 block opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                DÃ©couvrir
              </span>
              <h4 className="text-xl sm:text-3xl font-serif text-white mb-1 sm:mb-2">{cat.name}</h4>
              <p className="text-gray-300 text-xs sm:text-sm opacity-0 group-hover/card:opacity-100 transition-all duration-500 transform translate-y-4 group-hover/card:translate-y-0 line-clamp-2 italic">
                {cat.description || "Collection exclusive de meubles"}
              </p>
            </div>
            
            {/* Glass decoration */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity translate-x-4 group-hover/card:translate-x-0 transition-transform z-20">
              <span className="text-white text-sm sm:text-base">â†’</span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Gradient Fades for smoothness */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-30 pointer-events-none" />
    </div>
  );
}

