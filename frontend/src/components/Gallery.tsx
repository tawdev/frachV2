import Image from 'next/image';

export default function Gallery() {
  const images = [
    { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", alt: "Salon Moderne", title: "Salon Premium", aspect: "aspect-[4/3] md:col-span-2 md:row-span-2" },
    { src: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80", alt: "Cuisine Équipée", title: "Cuisines minimalistes", aspect: "aspect-[3/4]" },
    { src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80", alt: "Chambre à Coucher", title: "Chambres douillettes", aspect: "aspect-[3/4]" },
    { src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80", alt: "Détail Canapé", title: "Confort absolu", aspect: "aspect-square md:aspect-auto h-full" },
    { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", alt: "Salle à manger", title: "Design intemporel", aspect: "aspect-[4/3] md:col-span-2" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Galerie</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-primary mb-6">Inspirez-vous</h3>
          <p className="text-text-muted text-lg">
            Découvrez comment nos créations prennent vie dans différents espaces. Laissez-vous inspirer par nos réalisations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-1 md:grid-rows-3 gap-4 md:gap-6 h-auto md:h-[800px]">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${img.aspect}`}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div>
                  <h4 className="text-white text-2xl font-serif translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {img.title}
                  </h4>
                  <div className="w-12 h-1 bg-secondary mt-3 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
