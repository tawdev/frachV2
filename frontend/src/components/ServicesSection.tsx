import { Truck, Wrench, PenTool, MessageSquareHeart } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: <Truck size={40} className="text-secondary" />,
      title: "Livraison partout au Maroc",
      description: "De Tanger à Lagouira, nous assurons la livraison sécurisée de vos meubles directement chez vous."
    },
    {
      icon: <Wrench size={40} className="text-secondary" />,
      title: "Montage à domicile",
      description: "Notre équipe d'experts s'occupe de l'installation et du montage complet de votre mobilier."
    },
    {
      icon: <PenTool size={40} className="text-secondary" />,
      title: "Meubles sur mesure",
      description: "Vous avez une idée unique ? Nous personnalisons dimensions, couleurs et finitions selon vos envies."
    },
    {
      icon: <MessageSquareHeart size={40} className="text-secondary" />,
      title: "Support client 7j/7",
      description: "Une question ou un besoin particulier ? Notre équipe est à votre écoute tous les jours pour vous conseiller."
    }
  ];

  return (
    <section className="py-24 mt-12 md:mt-24 bg-background">
      <div className="container">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Engagements</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-primary mb-6">Nos services</h3>
          <p className="text-text-muted text-lg">
            Nous faisons tout pour vous offrir une expérience d'achat fluide, agréable et totalement personnalisée.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-[2rem] p-10 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="w-20 h-20 mx-auto bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-primary mb-4 font-serif">{service.title}</h4>
              <p className="text-text-muted leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
