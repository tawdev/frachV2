import { MousePointerClick, Ruler, Hammer, Truck } from 'lucide-react';

export default function OrderProcess() {
  const steps = [
    {
      icon: <MousePointerClick size={32} className="text-primary" />,
      title: "1. Choisissez",
      desc: "Explorez notre catalogue et trouvez la pièce parfaite, ou optez pour du sur-mesure."
    },
    {
      icon: <Ruler size={32} className="text-primary" />,
      title: "2. Personnalisez",
      desc: "Couleurs, dimensions, tissus : adaptez le meuble à votre intérieur lors de la commande."
    },
    {
      icon: <Hammer size={32} className="text-primary" />,
      title: "3. Fabrication",
      desc: "Nos artisans mettent tout leur savoir-faire pour concevoir votre meuble avec soin."
    },
    {
      icon: <Truck size={32} className="text-primary" />,
      title: "4. Réceptionnez",
      desc: "Nous livrons et installons votre nouveau meuble directement chez vous, prêt à l'emploi !"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Simplicité & Rapidité</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-primary mb-6">Comment acheter chez nous ?</h3>
          <p className="text-text-muted text-lg">
            Un processus de commande transparent et sans tracas, de la découverte à l'installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-gray-100 via-secondary/30 to-gray-100 border-dashed border-t-2 border-transparent"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-50 rounded-full border-4 border-white shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-secondary/20 transition-all duration-300 relative">
                {step.icon}
                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full font-bold flex items-center justify-center shadow-md">
                  {idx + 1}
                </div>
              </div>
              
              <h4 className="text-xl font-bold font-serif text-primary mb-3">
                {step.title}
              </h4>
              
              <p className="text-sm text-text-muted leading-relaxed px-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
