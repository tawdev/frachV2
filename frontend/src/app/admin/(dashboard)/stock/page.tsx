'use client';

import { useState, useEffect } from 'react';
import { Package, AlertCircle, CheckCircle2, AlertTriangle, Loader2, Plus } from 'lucide-react';
import Link from 'next/link';

const formatUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}${url.startsWith('/') ? '' : '/'}${url}`;
};

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
}

export default function StockManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')/products');
      const data = await res.json();
      const sortedData = data.sort((a: Product, b: Product) => {
        if (a.stock !== b.stock) return a.stock - b.stock;
        return a.id - b.id;
      });
      setProducts(sortedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async (product: Product) => {
    const amount = parseInt(editValue);
    if (!editValue || isNaN(amount)) {
      setEditingId(null);
      return;
    }

    const newStock = product.stock + amount;
    if (newStock < 0) {
      alert("Le stock final ne peut pas Ãªtre nÃ©gatif !");
      return;
    }

    setUpdatingId(product.id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}/products/${product.id}/stock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: newStock }),
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === product.id ? { ...p, stock: newStock } : p));
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const criticalStockCount = products.filter(p => p.stock < 10).length;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-[1px] bg-secondary"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">Frachdark Inventaire</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-primary tracking-tight">Gestion des <span className="italic text-secondary">Stocks</span></h1>
        </div>

        {criticalStockCount > 0 && (
          <button 
            onClick={() => {
              const el = document.querySelector('[id^="critical-stock-"]');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="flex items-center gap-3 bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all rounded-full py-2.5 px-5 shadow-sm group animate-[pulse_3s_ease-in-out_infinite]"
          >
            <AlertCircle size={16} className="text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-red-700 uppercase tracking-widest">
              Alerte QuantitÃ© Critique : <span className="text-red-600 font-black text-sm ml-1">+{criticalStockCount}</span>
            </span>
          </button>
        )}
      </div>



      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-10 py-8 border-b border-gray-50">
          <h2 className="text-xl font-serif font-bold text-primary italic">Catalogue & Inventaire</h2>
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] bg-gray-50 px-4 py-2 rounded-xl">
             {products.length} Produits
          </div>
        </div>
        
        {loading ? (
          <div className="py-32 flex justify-center"><div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div></div>
        ) : products.length === 0 ? (
          <div className="py-32 text-center text-text-muted italic">Aucun produit dans l'inventaire.</div>
        ) : (
          <div className="overflow-x-auto p-4 sm:p-8 pt-0">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <th className="px-6 py-4 font-bold border-b-2 border-transparent">Produit</th>
                  <th className="px-6 py-4 font-bold border-b-2 border-transparent text-center w-64">Niveau de Stock</th>
                  <th className="px-6 py-4 font-bold border-b-2 border-transparent text-center w-64">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const isCritical = p.stock < 10;
                  const isWarning = p.stock >= 10 && p.stock <= 20;
                  const isGood = p.stock > 20;
                  const isEditing = editingId === p.id;
                  const isUpdating = updatingId === p.id;

                  return (
                    <tr 
                      key={p.id} 
                      id={isCritical ? `critical-stock-${p.id}` : undefined}
                      className={`group transition-all rounded-3xl ${isCritical ? 'bg-red-50/30' : 'hover:bg-gray-50/50'}`}
                    >
                      <td className={`p-4 first:rounded-l-3xl last:rounded-r-3xl border-t border-b border-l border-r-0 ${isCritical ? 'border-red-200 border-r-0' : 'border-gray-100 border-r-0'} shadow-sm`}>
                        <div className="flex items-center gap-4">
                          {p.image ? (
                            <img src={formatUrl(p.image)} alt={p.name} className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-sm" />
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0"><Package size={20} /></div>
                          )}
                          <div>
                            <span className="font-bold text-primary block leading-tight">{p.name}</span>
                            <span className="text-[10px] text-text-muted opacity-60 font-mono">REF-{p.id.toString().padStart(4, '0')}</span>
                          </div>
                        </div>
                      </td>
                      
                      <td className={`p-4 border-t border-b border-l-0 border-r-0 ${isCritical ? 'border-red-200' : 'border-gray-100'} text-center shadow-sm`}>
                        {isEditing ? (
                          <div className="mx-auto flex flex-col justify-center items-center gap-1">
                            <input 
                              type="text" 
                              placeholder="+20 ou -5"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-24 bg-white border-2 border-secondary rounded-xl px-2 py-2 text-center text-sm font-bold text-primary outline-none focus:ring-4 focus:ring-secondary/20 transition-all placeholder:text-gray-300 placeholder:font-normal"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleUpdateStock(p);
                                if (e.key === 'Escape') setEditingId(null);
                              }}
                            />
                            <span className="text-[9px] text-text-muted font-bold tracking-wider">MODIF. RELATIVE</span>
                          </div>
                        ) : (
                          <div className={`mx-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${
                            isGood ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 
                            isWarning ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                            'bg-red-50 border-red-200 text-red-700'
                          }`}>
                            {isGood && <CheckCircle2 size={14} />}
                            {isWarning && <AlertTriangle size={14} />}
                            {isCritical && <AlertCircle size={14} />}
                            <span className="font-bold">{p.stock}</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-80 font-semibold">UnitÃ©s</span>
                          </div>
                        )}
                      </td>

                      <td className={`p-4 first:rounded-l-3xl last:rounded-r-3xl border-t border-b border-r border-l-0 ${isCritical ? 'border-red-200 border-l-0' : 'border-gray-100 border-l-0'} text-center shadow-sm`}>
                        <div className="flex justify-center items-center gap-2">
                          <input 
                            type="text" 
                            placeholder="+20 / -5"
                            value={isEditing ? editValue : ''}
                            onChange={(e) => {
                              if (!isEditing) setEditingId(p.id);
                              setEditValue(e.target.value);
                            }}
                            className="w-24 bg-white border border-gray-200 rounded-xl px-2 py-2 text-center text-xs font-bold text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all placeholder:text-gray-300 placeholder:font-normal"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleUpdateStock(p);
                              if (e.key === 'Escape') setEditingId(null);
                            }}
                          />
                          <button 
                            onClick={() => handleUpdateStock(p)}
                            disabled={!isEditing || !editValue || isUpdating}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all shadow-sm ${
                              isEditing && editValue && !isUpdating ? 'bg-secondary text-primary hover:shadow-md hover:-translate-y-0.5' : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100'
                            }`}
                          >
                            {isUpdating ? <Loader2 size={16} className="animate-spin text-primary" /> : <Plus size={18} strokeWidth={3} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

