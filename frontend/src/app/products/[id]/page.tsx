import Link from 'next/link';
import { ChevronLeft, Check, Truck, ShieldCheck } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import ProductImageGallery from '@/components/ProductImageGallery';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  let product = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products/${params.id}`, { cache: 'no-store' });
    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-serif mb-4">Produit non trouvé</h1>
        <Link href="/products" className="btn-primary">Retour aux produits</Link>
      </div>
    );
  }

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}';
  const mainImage = product.image 
    ? (product.image.startsWith('http') ? product.image : `${backendUrl}/${product.image}`)
    : '/images/placeholder.jpg';

  const productPrice = typeof product.price === 'string' && product.price.includes('DHS') 
    ? product.price 
    : `${Number(product.price).toLocaleString()} DHS`;

  const features = product.features || ['Bois massif certifié FSC', 'Mousse haute résilience', 'Tissu déperlant', 'Garantie 5 ans'];

  return (
    <div className="bg-background min-h-screen py-10 pt-28">
      <div className="container">
        {/* Back Button */}
        <div className="mb-10 animate-fade-in">
          <Link 
            href="/products" 
            className="group inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-primary font-bold shadow-sm hover:shadow-md hover:border-secondary transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-text-muted group-hover:bg-secondary group-hover:text-white transition-colors">
              <ChevronLeft size={18} />
            </div>
            <span>Retour aux collections</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images Gallery */}
          <ProductImageGallery 
            images={product.images && product.images.length > 0 ? product.images : [mainImage]} 
            alt={product.name} 
          />

          {/* Product Info */}
          <div className="flex flex-col animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-6">
              <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-3">{product.category?.name || 'Collection'}</p>
              <h1 className="text-4xl lg:text-5xl font-serif text-primary mb-4 leading-tight">{product.name}</h1>
              <p className="text-3xl font-bold text-primary">{productPrice}</p>
            </div>

            <p className="text-text-muted leading-relaxed mb-8 text-lg">
              {product.description || "Un design exceptionnel alliant confort supérieur et esthétique moderne. Cette pièce est conçue avec les meilleurs matériaux pour durer toute une vie."}
            </p>

            {/* Customization Options (Sur Mesure) placeholder */}
            {product.type === 'sur-mesure' && (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
                <h3 className="font-serif text-lg text-primary mb-4 flex items-center justify-between">
                  Options Sur-Mesure
                  <span className="text-xs font-sans bg-secondary/10 text-secondary py-1 px-3 rounded-full">Disponible</span>
                </h3>
                <p className="text-sm text-text-muted mb-4">Ce produit est personnalisable. Contactez-nous pour choisir vos dimensions et tissus.</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <AddToCartButton 
                product={product} 
                className="flex-1 py-4 text-lg" 
                variant="primary"
              />
              <button className="flex-1 py-4 text-lg bg-white text-secondary border-2 border-secondary rounded-full font-medium hover:bg-secondary hover:text-white transition-all">
                Demander un devis
              </button>
            </div>

            {/* Features List */}
            <div className="border-t border-gray-100 pt-8">
              <h4 className="font-serif text-lg text-primary mb-4">Caractéristiques premium</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-text-muted">
                {features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 border border-gray-100">
                <Truck className="text-secondary" />
                <span className="text-sm font-medium text-primary">Livraison partout au Maroc</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3 border border-gray-100">
                <ShieldCheck className="text-secondary" />
                <span className="text-sm font-medium text-primary">Paiement 100% sécurisé</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
