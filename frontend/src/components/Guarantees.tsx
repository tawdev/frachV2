import { ShieldCheck, Banknote, RefreshCcw, Headset } from 'lucide-react';

export default function Guarantees() {
  const assurances = [
    {
      icon: <Banknote size={32} className="text-white" />,
      title: "Paiement à la livraison",
      desc: "Achetez en toute tranquillité, vous ne payez qu'une fois la marchandise réceptionnée et vérifiée."
    },
    {
      icon: <ShieldCheck size={32} className="text-white" />,
      title: "Garantie Qualité",
      desc: "Tous nos meubles bénéficient d'une garantie constructeur contre les défauts de fabrication."
    },
    {
      icon: <RefreshCcw size={32} className="text-white" />,
      title: "Satisfait ou Échangé",
      desc: "Un problème de conformité ? Nous vous remplaçons le produit dans les plus brefs délais."
    },
    {
      icon: <Headset size={32} className="text-white" />,
      title: "SAV Réactif",
      desc: "Une équipe dédiée pour répondre à vos questions et assurer le suivi de votre commande."
    }
  ];

  return (
    <section className="py-20 bg-primary relative overflow-hidden text-center text-white">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container relative z-10">
        <div className="mb-16">
          <h2 className="text-sm font-bold tracking-widest text-secondary-light uppercase mb-2">Achetez en toute confiance</h2>
          <h3 className="text-3xl md:text-5xl font-serif mb-4">Nos Garanties</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Nous mettons tout en œuvre pour que votre expérience d'achat soit 100% sécurisée et rassurante.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {assurances.map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-300">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-secondary/20">
                {item.icon}
              </div>
              <h4 className="text-lg font-bold mb-3 font-serif">{item.title}</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
