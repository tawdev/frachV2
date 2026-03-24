'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-gray-300 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-serif font-bold text-white">
                <span className="italic text-secondary">Frach</span>dark
              </span>
            </Link>
            <p className="text-sm mb-6 leading-relaxed">
              Votre destination pour des meubles modernes, élégants et sur-mesure au Maroc. Transformez votre espace avec notre collection premium.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-white transition-colors duration-300" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-white transition-colors duration-300" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Liens Rapides</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="hover:text-secondary transition-colors">Tous les produits</Link></li>
              <li><Link href="/categories" className="hover:text-secondary transition-colors">Catégories</Link></li>
              <li><Link href="/about" className="hover:text-secondary transition-colors">Qui sommes-nous</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Informations</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">Livraison & Retours</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Conditions Générales</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Politique de Confidentialité</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                <span>LOT LGUIDER N48 AV ALLAL EL FASSI, Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <span>+212 600 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <span>contact@meublesmaison.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Frachdark. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
