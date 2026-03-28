'use client';

import { useState, useEffect } from 'react';
import {
  ShoppingBag, TrendingUp, Package, FolderTree,
  MessageSquare, ArrowUpRight, Clock, CheckCircle2,
  XCircle, Loader2, Star, BarChart2, ArrowRight,
  Sparkles, Bell, Trophy
} from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read_status: boolean;
}

interface BestProduct {
  month: string;
  label: string;
  product: string;
  image: string;
  qty: number;
  revenue: number;
}

const formatUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `http://localhost:3001${url.startsWith('/') ? '' : '/'}${url}`;
};

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; icon: React.ReactNode }> = {
    'En attente': { cls: 'bg-amber-100 text-amber-700 border border-amber-200', icon: <Clock size={11} /> },
    'En cours': { cls: 'bg-blue-100 text-blue-700 border border-blue-200', icon: <Loader2 size={11} className="animate-spin" /> },
    'Livrée': { cls: 'bg-emerald-100 text-emerald-700 border border-emerald-200', icon: <CheckCircle2 size={11} /> },
    'Annulée': { cls: 'bg-red-100 text-red-700 border border-red-200', icon: <XCircle size={11} /> },
  };
  const s = map[status] ?? { cls: 'bg-gray-100 text-gray-600', icon: null };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.cls}`}>
      {s.icon}{status}
    </span>
  );
}

const miniBarData = [40, 70, 55, 90, 65, 80, 100];

function MiniBar() {
  return (
    <div className="flex items-end gap-0.5 h-8">
      {miniBarData.map((h, i) => (
        <div
          key={i}
          className="w-2 rounded-sm bg-white/30 hover:bg-white/60 transition-colors"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [bestProducts, setBestProducts] = useState<any[]>([]);
  const currentMonthStr = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const [counts, setCounts] = useState({ products: 0, categories: 0, orders: 0, pending: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/products').then(r => r.json()).catch(() => []),
      fetch('http://localhost:3001/orders').then(r => r.json()).catch(() => []),
      fetch('http://localhost:3001/categories').then(r => r.json()).catch(() => []),
      fetch('http://localhost:3001/contact').then(r => r.ok ? r.json() : []).catch(() => []),
    ]).then(([products, ordersData, cats, msgs]) => {
      const o = Array.isArray(ordersData) ? ordersData : [];
      const p = Array.isArray(products) ? products : [];
      const c = Array.isArray(cats) ? cats : [];
      const m = Array.isArray(msgs) ? msgs : [];
      setCounts({
        products: p.length,
        categories: c.length,
        orders: o.length,
        pending: o.filter((x: Order) => x.status === 'En attente').length,
        revenue: o.reduce((s: number, x: Order) => x.status === 'Livrée' ? s + Number(x.total_amount) : s, 0),
      });
      setOrders(o.slice(0, 5));
      setMessages(m.slice(0, 4));
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    fetch(`http://localhost:3001/orders/best-products?month=${currentMonth}&year=${currentYear}`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setBestProducts(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setBestProducts([]));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={36} />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Revenus',
      value: counts.revenue > 0 ? `${counts.revenue.toLocaleString('fr-FR')} DHS` : '—',
      sub: '+8.2% ce mois',
      icon: <TrendingUp size={20} />,
      href: '/admin/orders',
      isRevenue: true
    },
    {
      label: 'Commandes',
      value: counts.orders,
      sub: counts.pending ? `${counts.pending} en attente` : 'Tous traités',
      icon: <ShoppingBag size={20} />,
      href: '/admin/orders',
    },
    {
      label: 'Produits',
      value: counts.products,
      sub: 'En catalogue',
      icon: <Package size={20} />,
      href: '/admin/products',
    },
    {
      label: 'Catégories',
      value: counts.categories,
      sub: 'Collections actives',
      icon: <FolderTree size={20} />,
      href: '/admin/categories',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-[1px] bg-secondary"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">Frachdark Prestige</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-primary tracking-tight">Tableau de <span className="italic text-secondary">Bord</span></h1>
          <p className="text-text-muted mt-2 text-xs font-medium uppercase tracking-widest opacity-60">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-3 bg-white border border-gray-100 rounded-2xl text-text-muted hover:text-primary transition-all shadow-sm hover:shadow-md group">
            <Bell size={20} className="group-hover:rotate-12 transition-transform" />
            {counts.pending > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-secondary border-2 border-white rounded-full"></span>
            )}
          </button>
          <div className="w-10 h-10 rounded-2xl bg-primary text-secondary flex items-center justify-center font-bold text-sm border border-primary-light">
            AD
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            {/* Subtle Gradient Polish */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gray-50 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {card.icon}
                </div>
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight size={10} className="inline ml-1" />
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">{card.label}</div>
                <div className={`text-3xl font-bold ${card.isRevenue ? 'text-primary' : 'text-primary'} tracking-tighter`}>{card.value}</div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-medium text-text-muted/60">{card.sub}</span>
                <div className="flex items-end gap-[2px] h-4">
                  {[4, 7, 5, 9, 6].map((h, i) => (
                    <div key={i} className="w-1 bg-secondary/20 rounded-full group-hover:bg-secondary/40 transition-colors" style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-10 py-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
                <BarChart2 size={20} />
              </div>
              <h2 className="text-xl font-serif font-bold text-primary italic">Commandes Récentes</h2>
            </div>
            <Link href="/admin/orders" className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] hover:text-primary transition-colors flex items-center gap-2">
              Voir le registre <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto px-4 pb-8">
            <table className="w-full text-left">
              <thead>
                <tr className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-gray-50">
                  <th className="px-6 py-4">Référence</th>
                  <th className="px-6 py-4">Client Prestige</th>
                  <th className="px-6 py-4 text-center">Statut</th>
                  <th className="px-6 py-4 text-right">Investissement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-text-muted italic">Aucune transaction enregistrée.</td></tr>
                ) : orders.map((o) => (
                  <tr key={o.id} className="group hover:bg-gray-50/50 transition-all">
                    <td className="px-6 py-5 font-mono text-[10px] text-stone-400">
                      ORD-{String(o.id).padStart(4, '0')}
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-primary">{o.customer_name}</p>
                      <p className="text-[10px] text-text-muted opacity-60 italic">{o.customer_email}</p>
                    </td>
                    <td className="px-6 py-5 text-center"><StatusBadge status={o.status} /></td>
                    <td className="px-6 py-5 text-right font-bold text-primary">
                      {Number(o.total_amount).toLocaleString('fr-FR')} <span className="text-[10px] font-normal text-text-muted/60">DHS</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Messaging & Categs */}
        <div className="lg:col-span-4 space-y-8">
          {/* Messages */}
          <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <h2 className="font-serif font-bold text-primary italic flex items-center gap-3">
                <MessageSquare size={18} className="text-secondary" />
                Conciergerie
              </h2>
              {messages.some(m => !m.read_status) && <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />}
            </div>
            <div className="divide-y divide-gray-50 h-[320px] overflow-y-auto scrollbar-hide">
              {messages.length === 0 ? (
                <div className="p-10 text-center text-text-muted text-sm italic">Boîte de réception vide.</div>
              ) : messages.map((msg) => (
                <div key={msg.id} className={`p-6 hover:bg-gray-50 transition-all cursor-pointer ${!msg.read_status ? 'bg-secondary/5' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-primary line-clamp-1 flex-1">{msg.name}</span>
                    <span className="text-[8px] font-bold text-stone-400 uppercase tracking-tighter whitespace-nowrap ml-2">{new Date(msg.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <p className="text-[10px] text-text-muted mb-2 opacity-70 italic">{msg.email}</p>
                  <p className="text-xs text-primary/80 line-clamp-2 leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats - Simple & Elegant */}
          <div className="bg-primary p-8 rounded-[3rem] shadow-xl text-white relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-secondary/10 rounded-full blur-[60px]" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-secondary font-bold uppercase tracking-[0.3em] text-[10px]">
                <TrendingUp size={14} /> Performance
              </div>
              <div className="space-y-4">
                {[
                  { n: 'Salon', p: 82 },
                  { n: 'Chambre', p: 67 },
                  { n: 'Bureau', p: 45 }
                ].map(c => (
                  <div key={c.n} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-70">
                      <span>{c.n}</span>
                      <span>{c.p}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full transition-all duration-1000" style={{ width: `${c.p}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hall of Excellence Section */}
      <section className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-2xl flex items-center justify-center">
              <Trophy size={24} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-primary italic">Hall of Excellence</h2>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Top Produits - {currentMonthStr}</p>
            </div>
          </div>
          <Link href="/admin/excellence" className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] hover:bg-secondary hover:text-primary transition-colors flex items-center gap-2 px-5 py-3 bg-secondary/10 rounded-2xl">
             Accéder au classement complet <ArrowRight size={12} />
          </Link>
        </div>

        <div className="space-y-4">
          {bestProducts.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded-[2rem] p-12 text-center text-text-muted italic">Aucune vente livrée pour ce mois.</div>
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
                    <span className="font-bold text-lg text-primary">{bp.total_quantity_sold} <span className="text-xs font-normal text-text-muted opacity-60">unités</span></span>
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

      {/* Modern Quick Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
        {[
          { label: 'Catalogue', icon: <Package />, href: '/admin/products' },
          { label: 'Collections', icon: <FolderTree />, href: '/admin/categories' },
          { label: 'Ventes', icon: <ShoppingBag />, href: '/admin/orders' },
          { label: 'Paramètres', icon: <BarChart2 />, href: '/admin/types' }
        ].map((btn, i) => (
          <Link key={i} href={btn.href} className="group p-6 bg-white border border-gray-100 rounded-2xl flex flex-col items-center gap-4 hover:border-secondary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
              {btn.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted group-hover:text-primary transition-colors">{btn.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
