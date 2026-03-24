import Link from 'next/link';
import { ChevronLeft, Check, Truck, ShieldCheck } from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  // Placeholder data
  const product = {
    id: params.id,
    name: 'Canapé Modena 3 Places',
    category: 'Salon',
    description: 'Le canapé Modena incarne l\'élégance minimaliste. Ses lignes épurées et son confort exceptionnel en font la pièce maîtresse idéale pour votre salon. Fabriqué avec une structure en bois massif et recouvert d\'un tissu premium résistant aux taches.',
    price: '12 500 DHS',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&q=80'
    ],
    features: ['Bois massif certifié FSC', 'Mousse haute résilience 35kg/m3', 'Tissu déperlant', 'Garantie 5 ans'],
    isCustomizable: true
  };

  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/products" className="hover:text-primary transition-colors flex items-center gap-1">
            <ChevronLeft size={16} />
            Retour aux produits
          </Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images Gallery */}
          <div className="space-y-4 animate-fade-in">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 ${i === 0 ? 'border-primary' : 'border-transparent'}`}>
                  <img src={img} alt={`${product.name} view ${i}`} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-6">
              <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-3">{product.category}</p>
              <h1 className="text-4xl lg:text-5xl font-serif text-primary mb-4 leading-tight">{product.name}</h1>
              <p className="text-2xl font-medium text-text">{product.price}</p>
            </div>

            <p className="text-text-muted leading-relaxed mb-8">{product.description}</p>

            {/* Customization Options (Sur Mesure) */}
            {product.isCustomizable && (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
                <h3 className="font-serif text-lg text-primary mb-4 flex items-center justify-between">
                  Options Sur-Mesure
                  <span className="text-xs font-sans bg-secondary/10 text-secondary py-1 px-3 rounded-full">Disponible</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Choix du tissu</label>
                    <div className="flex gap-3">
                      <button className="w-10 h-10 rounded-full bg-gray-200 border-2 border-primary ring-2 ring-primary/20" title="Beige Naturel"></button>
                      <button className="w-10 h-10 rounded-full bg-slate-800 border-2 border-transparent hover:border-gray-300 transition-colors" title="Charbon"></button>
                      <button className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-transparent hover:border-gray-300 transition-colors" title="Vert Émeraude"></button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Dimensions (personnalisables sur demande)</label>
                    <input type="text" placeholder="Ex: L: 220cm x P: 90cm x H: 85cm" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="btn-primary flex-1 py-4 text-lg">Ajouter au panier</button>
              {product.isCustomizable && (
                <button className="btn-secondary flex-1 py-4 text-lg bg-white text-secondary border-2 border-secondary hover:bg-secondary hover:text-white transition-all">Demander un devis</button>
              )}
            </div>

            {/* Features List */}
            <div className="border-t border-gray-200 pt-8">
              <h4 className="font-serif text-lg text-primary mb-4">Caractéristiques</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-text-muted">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                <Truck className="text-primary" />
                <span className="text-sm font-medium text-primary cursor-pointer hover:underline">Livraison partout au Maroc</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                <ShieldCheck className="text-primary" />
                <span className="text-sm font-medium text-primary cursor-pointer hover:underline">Paiement sécurisé</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
