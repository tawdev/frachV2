'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';


interface ProductImageGalleryProps {
  images: string[] | { url: string }[];
  alt: string;
}

export default function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const imagesList = Array.isArray(images) 
    ? images.map(img => typeof img === 'string' ? img : img.url)
    : [];
  
  const backendUrl = (process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')';
  
  const formatUrl = (url: string) => {
    if (!url) return '/images/placeholder.jpg';
    if (url.startsWith('http')) return url;
    // Remove leading slash if exists to avoid double slash
    const cleanPath = url.startsWith('/') ? url.substring(1) : url;
    return `${backendUrl}/${cleanPath}`;
  };

  const fullImageUrl = formatUrl(imagesList[currentIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 shadow-inner group border border-gray-100 cursor-zoom-in"
      >
        <Image 
          key={fullImageUrl} // Reset transition on image change
          src={fullImageUrl} 
          alt={alt} 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ ...zoomStyle, objectFit: 'cover' }}
          className="transition-transform duration-300 ease-out will-change-transform" 
        />
        
        {/* Subtle Hint Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
      </div>

      {/* Thumbnails Section */}
      {imagesList.length > 1 && (
        <div className="grid grid-cols-4 gap-4 px-1">
          {imagesList.map((img, idx) => {
            const thumbUrl = formatUrl(img);
            return (
              <div 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                  currentIndex === idx ? 'ring-2 ring-secondary shadow-md' : 'border border-gray-100 opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={thumbUrl} alt={`${alt} ${idx + 1}`} fill sizes="100px" className="object-cover" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

