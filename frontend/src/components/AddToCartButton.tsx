'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBag, Check } from 'lucide-react';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: any;
  className?: string;
  showIcon?: boolean;
  text?: string;
  variant?: 'primary' | 'outline';
}

export default function AddToCartButton({ 
  product, 
  className = '', 
  showIcon = true,
  text = 'Ajouter au panier',
  variant = 'primary'
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const baseStyles = "flex items-center justify-center gap-2 transition-all duration-300 font-medium rounded-full";
  const primaryStyles = variant === 'primary' ? "bg-primary text-white hover:bg-secondary" : "border-2 border-primary text-primary hover:bg-primary hover:text-white";
  
  // Use custom className if it contains background color, otherwise use variant styles
  const hasCustomBg = className.includes('bg-');
  const finalStyles = hasCustomBg ? className : `${primaryStyles} ${className}`;
  const finalClassName = `${baseStyles} ${finalStyles} ${added ? 'bg-green-600 border-green-600 text-white' : ''} disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <button 
      onClick={handleAdd}
      className={finalClassName}
      disabled={added}
    >
      {added ? (
        <>
          <Check size={18} />
          {variant === 'primary' ? 'Ajouté !' : ''}
        </>
      ) : (
        <>
          {showIcon && <ShoppingBag size={18} />}
          {text}
        </>
      )}
    </button>
  );
}
