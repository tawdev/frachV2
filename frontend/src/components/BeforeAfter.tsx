import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function BeforeAfter() {
  const examples = [
    {
      title: "Salon Modernisé",
      before: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&q=80",
      after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
      desc: "D'un espace sombre à un salon lumineux et contemporain."
    },
    {
      title: "Chambre Repensée",
      before: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80",
      after: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
      desc: "Optimisation de l'espace avec des rangements sur mesure."
    }
  ];

  return (
    <section className="py-24 mt-12 md:mt-24 bg-gray-50 border-t border-gray-100">
      <div className="container">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Transformations</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-primary mb-6">Avant / Après</h3>
          <p className="text-text-muted text-lg">
            Découvrez comment nos meubles métamorphosent complètement un intérieur. 
            Le résultat parle de lui-même.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {examples.map((ex, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-bold font-serif text-primary mb-6 text-center">{ex.title}</h4>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Before */}
                <div className="relative w-full aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden group">
                  <Image src={ex.before} alt="Avant" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Avant
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="shrink-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary rotate-90 sm:rotate-0 my-2 sm:my-0">
                  <ArrowRight size={24} />
                </div>

                {/* After */}
                <div className="relative w-full aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-2 border-primary/5 group">
                  <Image src={ex.after} alt="Après Frachdark" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Après
                  </div>
                </div>
              </div>
              <p className="text-center text-text-muted mt-6 text-sm italic">
                "{ex.desc}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
