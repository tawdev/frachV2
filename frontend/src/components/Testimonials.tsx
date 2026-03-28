import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rania T.",
      role: "Cliente vérifiée",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      content: "Service impeccable et qualité exceptionnelle ! Mon nouveau salon correspond parfaitement à ce que je cherchais. Je recommande à 100%.",
      rating: 5
    },
    {
      name: "Yassine M.",
      role: "Achat sur mesure",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
      content: "Livraison rapide et produit totalement conforme aux photos. L'équipe de montage a été très professionnelle et attentionnée.",
      rating: 5
    },
    {
      name: "Sofia K.",
      role: "Architecte d'intérieur",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      content: "Très satisfaite de ma collaboration avec Frachdark. Le rapport qualité/prix est imbattable et le design est toujours au rendez-vous.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-primary text-white relative">
      <div className="container relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={24} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <h2 className="text-sm font-bold tracking-widest text-secondary-light uppercase mb-2">Témoignages</h2>
          <h3 className="text-3xl md:text-5xl font-serif mb-6">Ce que disent nos clients</h3>
          <p className="text-gray-300 text-lg">
            Leur satisfaction est notre plus belle réussite. Découvrez leurs retours sur nos produits et services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, idx) => (
            <div 
              key={idx} 
              className="bg-white/10 backdrop-blur-md rounded-[2rem] p-10 relative mt-8 hover:bg-white/15 transition-colors border border-white/10"
            >
              <div className="absolute -top-10 left-10 w-20 h-20 rounded-full overflow-hidden border-4 border-primary">
                <Image 
                  src={testi.image} 
                  alt={testi.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <Quote className="text-white/20 absolute top-10 right-10" size={48} />
              
              <div className="mt-10 mb-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-200 leading-relaxed text-lg italic">
                  "{testi.content}"
                </p>
              </div>
              
              <div className="border-t border-white/10 pt-6">
                <h4 className="font-bold text-white text-lg">{testi.name}</h4>
                <p className="text-sm text-gray-400">{testi.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
