'use client';

import { useState, useEffect } from 'react';
import { Trophy, Package, Calendar } from 'lucide-react';

const formatUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}${url.startsWith('/') ? '' : '/'}${url}`;
};

export default function ExcellencePage() {
  const [bestMonth, setBestMonth] = useState(new Date().getMonth() + 1);
  const [bestYear, setBestYear] = useState(new Date().getFullYear());
  const [bestProducts, setBestProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}/orders/best-products?month=${bestMonth}&year=${bestYear}`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setBestProducts(Array.isArray(data) ? data : []))
      .catch(() => setBestProducts([]))
      .finally(() => setLoading(false));
  }, [bestMonth, bestYear]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-[1px] bg-secondary"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">Frachdark Prestige</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-primary tracking-tight">Hall of <span className="italic text-secondary">Excellence</span></h1>
          <p className="text-text-muted mt-2 text-xs font-medium uppercase tracking-widest opacity-60">
            Top 10 des meubles les plus vendus par mois
          </p>
        </div>
      </div>

      <section className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-2xl flex items-center justify-center">
              <Trophy size={24} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-primary italic">Classement</h2>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Meilleures ventes</p>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 bg-gray-50/50 p-2 sm:p-3 rounded-2xl xl:rounded-full border border-gray-100 shadow-sm w-full sm:w-auto">
            <div className="flex items-center gap-2 pl-2 hidden xl:flex">
                <Calendar size={16} className="text-stone-400" />
            </div>
            {/* Year Selector */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl xl:rounded-full shadow-sm border border-gray-100 w-full xl:w-auto justify-between xl:justify-start shrink-0">
              {[0, 1, 2].map(offset => {
                const y = new Date().getFullYear() - offset;
                return (
                  <button
                    key={y}
                    onClick={() => setBestYear(y)}
                    className={`px-4 py-1.5 rounded-lg xl:rounded-full text-xs font-bold transition-all ${bestYear === y ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:bg-gray-50 hover:text-primary'}`}
                  >
                    {y}
                  </button>
                );
              }).reverse()}
            </div>
            
            {/* Month Selector (Wrap) */}
            <div className="flex flex-wrap items-center gap-2 w-full pt-2 xl:pt-0">
              {['Jan', 'FÃ©v', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'AoÃ»', 'Sep', 'Oct', 'Nov', 'DÃ©c'].map((m, i) => (
                <button
                  key={m}
                  onClick={() => setBestMonth(i + 1)}
                  className={`px-3 xl:px-4 py-1.5 rounded-xl xl:rounded-full text-xs font-bold transition-all text-center flex-1 sm:flex-none min-w-[40px] ${bestMonth === i + 1 ? 'bg-secondary text-primary shadow-sm' : 'bg-white border border-gray-100 text-text-muted hover:border-secondary hover:text-primary'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div></div>
          ) : bestProducts.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded-[2rem] p-12 text-center text-text-muted italic">Aucune vente livrÃ©e pour ce mois.</div>
          ) : bestProducts.map((bp: any, index: number) => {
            let badgeIcon: any = <span className="font-bold text-gray-500">#{index + 1}</span>;
            let badgeColor = 'bg-gray-50 border-gray-100';
            
            if (index === 0) {
              badgeIcon = <Trophy size={20} className="text-yellow-600" />;
              badgeColor = 'bg-yellow-50 border-yellow-200 shadow-sm';
            } else if (index === 1) {
              badgeIcon = <Trophy size={20} className="text-gray-400" />;
              badgeColor = 'bg-gray-50 border-gray-200 shadow-sm';
            } else if (index === 2) {
              badgeIcon = <Trophy size={20} className="text-amber-700" />;
              badgeColor = 'bg-amber-50 border-amber-200 shadow-sm';
            }

            return (
              <div key={bp.product_name} className={`flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 rounded-2xl border ${badgeColor} transition-all hover:-translate-y-1 hover:shadow-md`}>
                <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm shrink-0">
                    {badgeIcon}
                  </div>
                  {bp.image ? (
                    <img src={formatUrl(bp.image)} alt={bp.product_name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0"><Package size={20} /></div>
                  )}
                  <div className="flex-1">
                    <span className="font-bold text-primary line-clamp-1">{bp.product_name}</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Rank #{bp.rank}</span>
                  </div>
                </div>
                <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-left sm:text-right border-l border-gray-200 pl-6">
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-widest block mb-1">Volume</span>
                    <span className="font-bold text-lg text-primary">{bp.total_quantity_sold} <span className="text-xs font-normal text-text-muted opacity-60">unitÃ©s</span></span>
                  </div>
                  <div className="text-right border-l border-gray-200 pl-6 w-32">
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-widest block mb-1">Revenu</span>
                    <span className="font-bold text-lg text-secondary">{(bp.revenue || 0).toLocaleString('fr-FR')} <span className="text-xs font-normal opacity-60">DHS</span></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

