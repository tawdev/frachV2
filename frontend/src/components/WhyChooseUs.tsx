import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    { title: "+1000 clients satisfaits", desc: "Rejoignez notre communauté de passionnés de design intérieur." },
    { title: "Qualité garantie", desc: "Des matériaux nobles et une fabrication rigoureuse pour une durabilité maximale." },
    { title: "Design moderne", desc: "Des lignes épurées et contemporaines pour sublimer vos espaces de vie." },
    { title: "Prix compétitifs", desc: "Un luxe abordable, pensé pour démocratiser l'accès au design d'exception." }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Notre différence</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-primary mb-8 leading-tight">Pourquoi choisir <span className="text-secondary italic">Frachdark</span> ?</h3>
            <p className="text-text-muted text-lg mb-10 leading-relaxed">
              Nous faisons bien plus que vendre des meubles. Nous concevons avec passion des pièces qui s'intègrent parfaitement à votre mode de vie, en ne faisant aucun compromis sur la qualité et l'esthétique.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {points.map((point, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <CheckCircle2 size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary mb-2 font-serif">{point.title}</h4>
                    <p className="text-sm text-text-muted leading-relaxed">{point.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Content */}
          <div className="order-1 lg:order-2 relative">
            <div className="absolute inset-0 bg-primary/5 rounded-[3rem] transform translate-x-6 translate-y-6"></div>
            <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80" 
                alt="Excellence Frachdark"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            
            {/* Stats Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-gray-100 animate-bounce-slow">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-black text-2xl">
                ★
              </div>
              <div>
                <p className="text-3xl font-black text-primary">4.9/5</p>
                <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Avis clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
