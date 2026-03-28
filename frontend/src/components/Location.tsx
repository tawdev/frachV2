import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export default function Location() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Visitez-nous</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-primary">Où nous trouver ?</h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-gray-50 rounded-[3rem] p-4 sm:p-8 border border-gray-200 shadow-sm">
          {/* Contact Details */}
          <div className="lg:w-1/3 p-6 sm:p-8 space-y-10">
            <div>
              <h4 className="text-2xl font-serif text-primary mb-8 border-b border-gray-200 pb-4">Nos coordonnées</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center shrink-0 shadow-sm border border-gray-100">
                    <MapPin className="text-secondary" size={24} />
                  </div>
                  <div>
                    <strong className="block text-primary font-bold mb-1">Adresse</strong>
                    <span className="text-text-muted">LOT LGUIDER N48<br/> AV ALLAL EL FASSI, Maroc</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center shrink-0 shadow-sm border border-gray-100">
                    <Phone className="text-secondary" size={24} />
                  </div>
                  <div>
                    <strong className="block text-primary font-bold mb-1">Téléphone</strong>
                    <span className="text-text-muted">+212 600 000 000</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center shrink-0 shadow-sm border border-gray-100">
                    <Mail className="text-secondary" size={24} />
                  </div>
                  <div>
                    <strong className="block text-primary font-bold mb-1">Email</strong>
                    <span className="text-text-muted">contact@meublesmaison.com</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-serif text-primary mb-8 border-b border-gray-200 pb-4">Horaires d'ouverture</h4>
              <ul className="space-y-3 text-text-muted">
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><Clock size={16}/> Lundi - Vendredi</span>
                  <span className="font-medium text-primary">09h00 - 19h00</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><Clock size={16}/> Samedi</span>
                  <span className="font-medium text-primary">10h00 - 18h00</span>
                </li>
                <li className="flex justify-between items-center text-secondary">
                  <span className="flex items-center gap-2"><Clock size={16}/> Dimanche</span>
                  <span className="font-medium">Fermé</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="lg:w-2/3 h-[400px] lg:h-auto rounded-[2rem] overflow-hidden bg-gray-200 relative group">
            {/* Embedded Google Maps snippet */}
            <iframe 
              src="https://maps.google.com/maps?q=LOT%20LGUIDER%20N48%20AV%20ALLAL%20EL%20FASSI,%20Maroc&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
