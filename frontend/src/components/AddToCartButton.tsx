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
  const primaryStyles = "bg-primary text-white hover:bg-secondary";
  const outlineStyles = "border-2 border-primary text-primary hover:bg-primary hover:text-white";
  
  const finalClassName = `${baseStyles} ${variant === 'primary' ? primaryStyles : outlineStyles} ${className} ${added ? 'bg-green-600 border-green-600 text-white' : ''}`;

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
