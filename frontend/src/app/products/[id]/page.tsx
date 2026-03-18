"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';

import { useCart } from '@/hooks/useCart';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ length: 0, width: 0 });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await api.products.getOne(Number(id));
        setProduct(data);
        if (data.longueur) setDimensions(d => ({ ...d, length: Number(data.longueur) }));
        if (data.largeur) setDimensions(d => ({ ...d, width: Number(data.largeur) }));
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return (
    <div className="h-screen bg-bg-primary flex items-center justify-center">
       <div className="w-12 h-12 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!product) return <div>Product not found</div>;

  const isCustom = product.type?.name === 'sur mesure';

  const handleAddToCart = () => {
    addToCart({
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      image: product.image,
      dimensions: isCustom ? dimensions : undefined
    });
    alert("Produit ajouté au panier !");
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24">
      <Navbar />
      
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="glass rounded-3xl overflow-hidden h-[600px]">
             <img 
               src={product.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200'} 
               alt={product.name}
               className="w-full h-full object-cover"
             />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
             <span className="text-accent-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">{product.category_name}</span>
             <h1 className="text-5xl md:text-6xl font-heading mb-6">{product.name}</h1>
             <p className="text-3xl font-light text-accent-gold mb-8">{Number(product.price).toLocaleString()} DH</p>
             
             <div className="w-20 h-1 bg-accent-gold mb-10" />
             
             <p className="text-text-secondary font-light leading-relaxed mb-12 max-w-lg">
                {product.description || "Une pièce d'exception conçue avec les meilleurs matériaux pour apporter élégance et confort à votre intérieur."}
             </p>

             {/* Custom Dimensions if applicable */}
             {isCustom && (
               <div className="mb-12 p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Personnalisation (cm)</h4>
                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <label className="text-[10px] uppercase tracking-widest text-text-muted mb-2 block">Longueur Max: {product.max_longueur}</label>
                        <input 
                           type="number" 
                           placeholder="Longueur"
                           className="w-full bg-transparent border border-white/10 p-3 rounded-lg focus:border-accent-gold outline-none transition-colors"
                           value={dimensions.length}
                           onChange={(e) => setDimensions({...dimensions, length: Number(e.target.value)})}
                        />
                     </div>
                     <div>
                        <label className="text-[10px] uppercase tracking-widest text-text-muted mb-2 block">Largeur Max: {product.max_largeur}</label>
                        <input 
                           type="number" 
                           placeholder="Largeur"
                           className="w-full bg-transparent border border-white/10 p-3 rounded-lg focus:border-accent-gold outline-none transition-colors"
                           value={dimensions.width}
                           onChange={(e) => setDimensions({...dimensions, width: Number(e.target.value)})}
                        />
                     </div>
                  </div>
               </div>
             )}

             <div className="flex flex-col sm:flex-row gap-6 mt-auto">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-accent-gold hover:bg-accent-gold-dark text-bg-primary py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3"
                >
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                   Ajouter au panier
                </button>
                <button className="px-10 py-5 border border-white/20 hover:border-white rounded-full text-white font-bold uppercase tracking-[0.2em] text-xs transition-all">
                   Contact Direct
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
