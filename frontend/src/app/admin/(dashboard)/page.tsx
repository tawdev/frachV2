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
  qty: number;
  revenue: number;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; icon: React.ReactNode }> = {
    'En attente': { cls: 'bg-amber-100 text-amber-700 border border-amber-200', icon: <Clock size={11} /> },
    'En cours':   { cls: 'bg-blue-100 text-blue-700 border border-blue-200',   icon: <Loader2 size={11} className="animate-spin" /> },
    'Livrée':     { cls: 'bg-emerald-100 text-emerald-700 border border-emerald-200', icon: <CheckCircle2 size={11} /> },
    'Annulée':    { cls: 'bg-red-100 text-red-700 border border-red-200',       icon: <XCircle size={11} /> },
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
  const [bestProducts, setBestProducts] = useState<BestProduct[]>([]);
  const [counts, setCounts] = useState({ products: 0, categories: 0, orders: 0, pending: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/products').then(r => r.json()).catch(() => []),
      fetch('http://localhost:3001/orders').then(r => r.json()).catch(() => []),
      fetch('http://localhost:3001/categories').then(r => r.json()).catch(() => []),
      fetch('http://localhost:3001/contact').then(r => r.ok ? r.json() : []).catch(() => []),
      fetch('http://localhost:3001/orders/best-products').then(r => r.json()).catch(() => []),
    ]).then(([products, ordersData, cats, msgs, bp]) => {
      const o = Array.isArray(ordersData) ? ordersData : [];
      const p = Array.isArray(products) ? products : [];
      const c = Array.isArray(cats) ? cats : [];
      const m = Array.isArray(msgs) ? msgs : [];
      setCounts({
        products: p.length,
        categories: c.length,
        orders: o.length,
        pending: o.filter((x: Order) => x.status === 'En attente').length,
        revenue: o.reduce((s: number, x: Order) => s + Number(x.total_amount), 0),
      });
      setOrders(o.slice(0, 5));
      setMessages(m.slice(0, 4));
      setBestProducts(Array.isArray(bp) ? bp : []);
    }).finally(() => setLoading(false));
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
      gradient: 'from-indigo-600 to-violet-600',
    },
    {
      label: 'Commandes',
      value: counts.orders,
      sub: counts.pending ? `${counts.pending} en attente` : 'Tous traités',
      icon: <ShoppingBag size={20} />,
      href: '/admin/orders',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Produits',
      value: counts.products,
      sub: 'En catalogue',
      icon: <Package size={20} />,
      href: '/admin/products',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      label: 'Catégories',
      value: counts.categories,
      sub: 'Collections actives',
      icon: <FolderTree size={20} />,
      href: '/admin/categories',
      gradient: 'from-orange-500 to-pink-500',
    },
  ];

  return (
    <div className="space-y-7 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-secondary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Admin Panel</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Tableau de Bord</h1>
          <p className="text-text-muted mt-1 text-sm">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 bg-white border border-gray-200 rounded-xl text-text-muted hover:text-primary transition-colors shadow-sm">
            <Bell size={18} />
            {counts.pending > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {counts.pending}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`bg-gradient-to-br ${card.gradient} text-white rounded-2xl p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 group relative overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white" />
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                  {card.icon}
                </div>
                <ArrowUpRight size={16} className="text-white/60 group-hover:text-white/100 transition-colors" />
              </div>
              <div className="text-2xl font-bold mb-0.5">{card.value}</div>
              <div className="text-xs font-medium text-white/80">{card.label}</div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                <span className="text-xs text-white/70">{card.sub}</span>
                <MiniBar />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <BarChart2 size={16} />
              </div>
              <h2 className="font-bold text-primary">Commandes Récentes</h2>
            </div>
            <Link href="/admin/orders" className="flex items-center gap-1 text-xs font-semibold text-secondary hover:text-primary transition-colors">
              Voir tout <ArrowRight size={13} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-100 text-xs text-text-muted uppercase tracking-wide">
                  <th className="px-6 py-3 font-semibold">N°</th>
                  <th className="px-6 py-3 font-semibold">Client</th>
                  <th className="px-6 py-3 font-semibold">Statut</th>
                  <th className="px-6 py-3 font-semibold text-right">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-text-muted text-sm">
                      Aucune commande pour l'instant.
                    </td>
                  </tr>
                ) : orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5 font-mono text-xs text-text-muted">
                      #{String(o.id).padStart(4, '0')}
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-sm font-semibold text-primary">{o.customer_name}</p>
                      <p className="text-xs text-text-muted truncate max-w-[180px]">{o.customer_email}</p>
                    </td>
                    <td className="px-6 py-3.5"><StatusBadge status={o.status} /></td>
                    <td className="px-6 py-3.5 text-right text-sm font-bold text-primary">
                      {Number(o.total_amount).toLocaleString('fr-FR')} <span className="text-xs font-normal text-text-muted">DHS</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side panel: messages + quick actions */}
        <div className="flex flex-col gap-5">
          {/* Messages */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-secondary" />
                <h2 className="font-bold text-primary text-sm">Messages</h2>
              </div>
              {messages.filter(m => !m.read_status).length > 0 && (
                <span className="text-xs bg-secondary text-white px-2 py-0.5 rounded-full font-semibold">
                  {messages.filter(m => !m.read_status).length} nouveau{messages.filter(m => !m.read_status).length > 1 ? 'x' : ''}
                </span>
              )}
            </div>
            <div className="divide-y divide-gray-50">
              {messages.length === 0 ? (
                <div className="px-5 py-8 text-center text-text-muted text-sm">Aucun message.</div>
              ) : messages.map((msg) => (
                <div key={msg.id} className={`px-5 py-3 hover:bg-gray-50 transition-colors ${!msg.read_status ? 'border-l-[3px] border-secondary' : ''}`}>
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-sm font-semibold text-primary">{msg.name}</span>
                    <span className="text-[10px] text-text-muted">{new Date(msg.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <p className="text-xs text-text-muted truncate">{msg.email}</p>
                  <p className="text-xs text-text mt-1 line-clamp-2">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories Static */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star size={15} className="text-secondary" />
              <h2 className="font-bold text-primary text-sm">Top Catégories</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Salon', pct: 82, color: 'bg-indigo-500' },
                { name: 'Chambre', pct: 67, color: 'bg-emerald-500' },
                { name: 'Bureau', pct: 45, color: 'bg-blue-500' },
                { name: 'Cuisine', pct: 30, color: 'bg-orange-400' },
              ].map(c => (
                <div key={c.name}>
                  <div className="flex justify-between text-xs font-medium text-primary mb-1">
                    <span>{c.name}</span><span>{c.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Best Product Per Month */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={16} className="text-amber-500" />
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest">Meilleur Produit par Mois</h2>
        </div>
        {bestProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-text-muted text-sm">
            Aucune donnée disponible. Les produits apparaîtront ici dès qu'il y a des commandes.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bestProducts.map((bp, i) => {
              const isCurrentMonth = i === 0;
              return (
                <div
                  key={bp.month}
                  className={`relative rounded-2xl overflow-hidden shadow-sm border ${isCurrentMonth ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50' : 'bg-white border-gray-100'}`}
                >
                  {isCurrentMonth && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <Trophy size={9} /> Ce mois
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3 capitalize">{bp.label}</p>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white text-lg font-bold ${isCurrentMonth ? 'bg-amber-500' : 'bg-gray-200 text-gray-500'}`}>
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-primary text-sm leading-tight line-clamp-2 mb-2">{bp.product}</p>
                        <div className="flex items-center gap-3 text-xs text-text-muted">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full font-medium">{bp.qty} vendus</span>
                          <span className="font-semibold text-emerald-600">{bp.revenue.toLocaleString('fr-FR')} DHS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4">Actions Rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Nouveau Produit', href: '/admin/products', icon: <Package size={18} />, cls: 'from-blue-500 to-blue-700' },
            { label: 'Nouvelle Catégorie', href: '/admin/categories', icon: <FolderTree size={18} />, cls: 'from-orange-500 to-red-500' },
            { label: 'Voir Commandes', href: '/admin/orders', icon: <ShoppingBag size={18} />, cls: 'from-emerald-500 to-teal-600' },
            { label: 'Types & Sous-Types', href: '/admin/types', icon: <BarChart2 size={18} />, cls: 'from-violet-500 to-purple-700' },
          ].map(a => (
            <Link
              key={a.label}
              href={a.href}
              className={`bg-gradient-to-br ${a.cls} text-white rounded-xl px-5 py-4 flex items-center gap-3 hover:opacity-90 hover:scale-[1.02] transition-all shadow-sm`}
            >
              <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">{a.icon}</div>
              <span className="text-sm font-semibold leading-tight">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
