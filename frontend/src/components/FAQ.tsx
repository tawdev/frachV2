'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "Combien coûte la livraison ?",
      answer: "La livraison dépend de votre ville. Elle est offerte à partir de 5000 DHS sur certaines régions. Pour le reste du Maroc, un tarif forfaitaire sera affiché lors de la validation de votre commande."
    },
    {
      question: "Faites-vous des meubles sur mesure ?",
      answer: "Absolument ! Nous proposons un service de personnalisation complet. Vous pouvez choisir les dimensions, le tissu, et la couleur pour que chaque meuble s'adapte parfaitement à votre intérieur."
    },
    {
      question: "Comment puis-je payer ma commande ?",
      answer: "Nous offrons la possibilité de payer à la livraison (En espèces). D'autres options telles que le virement bancaire peuvent être discutées lors de la confirmation par téléphone."
    },
    {
      question: "Combien de temps faut-il pour recevoir ma commande ?",
      answer: "Pour les articles en stock, la livraison prend généralement entre 3 et 5 jours ouvrés. Pour les commandes sur mesure, comptez entre 10 et 15 jours de fabrication avant l'expédition."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Support</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-primary">Questions fréquentes</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl border ${openIndex === idx ? 'border-primary/20 shadow-md' : 'border-gray-100'} overflow-hidden transition-all duration-300`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center p-6 sm:p-8 text-left focus:outline-none focus:ring-2 focus:ring-primary/10"
              >
                <h4 className={`text-lg sm:text-xl font-bold font-serif pr-8 transition-colors ${openIndex === idx ? 'text-secondary' : 'text-primary'}`}>
                  {faq.question}
                </h4>
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${openIndex === idx ? 'bg-secondary/10 text-secondary' : 'bg-gray-50 text-gray-400'}`}>
                  <ChevronDown size={20} className={`transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              <div 
                className={`px-6 sm:px-8 overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-48 pb-6 sm:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
