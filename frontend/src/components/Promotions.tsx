import Link from 'next/link';
import { Tag, Sparkles, Percent } from 'lucide-react';

export default function Promotions() {
  const promos = [
    {
      title: "-20% sur les Cuisines Modernes",
      description: "Aménagez l'espace de vos rêves avec notre nouvelle collection de cuisines équipées à prix réduit.",
      icon: <Percent size={32} className="text-white" />,
      bgClass: "bg-gradient-to-br from-primary to-primary-light",
      link: "/products?category=Cuisines"
    },
    {
      title: "Livraison Gratuite à Marrakech",
      description: "Profitez de la livraison et l'installation offertes pour toute commande supérieure à 5000 DHS sur la région de Marrakech.",
      icon: <Sparkles size={32} className="text-white" />,
      bgClass: "bg-gradient-to-br from-secondary to-[#8B0018]",
      link: "/about"
    },
    {
      title: "Pack Chambre à Prix Réduit",
      description: "Lit double + 2 tables de chevet + armoire : le tout avec une remise exceptionnelle de 15%. Offre limitée.",
      icon: <Tag size={32} className="text-white" />,
      bgClass: "bg-gradient-to-br from-[#1F2937] to-[#374151]",
      link: "/products?category=Chambres"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Opportunités à Saisir</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-primary mb-6">Offres spéciales</h3>
          <p className="text-text-muted text-lg">
            Profitez de nos offres exclusives pour réaménager votre intérieur sans compromis sur la qualité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promos.map((promo, idx) => (
            <div 
              key={idx} 
              className={`${promo.bgClass} rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 shadow-xl hover:shadow-2xl`}
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 shadow-inner">
                  {promo.icon}
                </div>
                
                <h4 className="text-2xl font-bold mb-4 font-serif leading-tight">
                  {promo.title}
                </h4>
                
                <p className="text-white/80 mb-8 flex-1 leading-relaxed">
                  {promo.description}
                </p>
                
                <Link 
                  href={promo.link}
                  className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider hover:text-white/80 transition-colors w-fit"
                >
                  Découvrir
                  <span className="transition-transform group-hover:translate-x-2">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
