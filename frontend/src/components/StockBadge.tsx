'use client';

import { useState, useEffect } from 'react';

export default function StockBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/products/stream/low-stock');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (typeof data.count === 'number') {
          setCount(data.count);
        }
      } catch (err) {
        console.error('Error parsing SSE', err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (count === 0) return null;

  return (
    <span 
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-[pulse_3s_ease-in-out_infinite] flex items-center justify-center min-w-[24px]"
      title="Produits en stock critique"
    >
      +{count}
    </span>
  );
}
