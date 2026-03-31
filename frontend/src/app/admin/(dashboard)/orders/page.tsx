'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Eye, Download, MoreVertical, Calendar, User, MapPin, Phone, CheckCircle, Package, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_address: string;
  total_amount: string;
  status: string;
  created_at: string;
  order_items: OrderItem[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente': return 'bg-orange-100 text-orange-700';
      case 'En cours': return 'bg-blue-100 text-blue-700';
      case 'LivrÃ©e': return 'bg-green-100 text-green-700';
      case 'AnnulÃ©e': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch((process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')/orders');
        if (!response.ok) throw new Error('Erreur lors de la rÃ©cupÃ©ration des commandes');
        const data = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}/orders/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('ÃŠtes-vous sÃ»r de vouloir supprimer cette commande ?')) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}/orders/${id}/delete`, {
        method: 'POST',
      });
      if (response.ok) {
        setOrders(orders.filter(o => o.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete order', err);
    }
  };

  if (loading) return <div className="p-8 text-center text-text-muted font-medium">Chargement des commandes...</div>;
  if (error) return <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">{error}</div>;

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-primary">Gestion des Commandes</h1>
          <p className="text-text-muted mt-1">Suivez et gÃ©rez les commandes de vos clients.</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => window.location.reload()}>
          <Calendar size={18} /> RafraÃ®chir
        </button>
      </div>

      {/* Stats Summary (Mini) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:scale-105">
          <p className="text-sm text-text-muted mb-1">Total Commandes</p>
          <h3 className="text-2xl font-bold text-primary">{orders.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:scale-105 border-l-4 border-l-orange-400">
          <p className="text-sm text-text-muted mb-1 font-medium">En Attente</p>
          <h3 className="text-2xl font-bold text-orange-500">
            {orders.filter(o => o.status === 'En attente').length}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:scale-105 border-l-4 border-l-green-400">
          <p className="text-sm text-text-muted mb-1 font-medium">LivrÃ©es</p>
          <h3 className="text-2xl font-bold text-green-500">
            {orders.filter(o => o.status === 'LivrÃ©e').length}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:scale-105 border-l-4 border-l-primary">
            <p className="text-sm text-text-muted mb-1 font-medium">Revenu Total</p>
            <h3 className="text-2xl font-bold text-primary">
                {orders
                  .filter(o => o.status === 'LivrÃ©e')
                  .reduce((acc, o) => acc + Number(o.total_amount), 0)
                  .toLocaleString()} <span className="text-xs">DHS</span>
            </h3>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs text-text-muted uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">RÃ©f</th>
                <th className="px-6 py-4 font-bold">Client & Contact</th>
                <th className="px-6 py-4 font-bold">Date & Heure</th>
                <th className="px-6 py-4 font-bold text-right">Montant</th>
                <th className="px-6 py-4 font-bold">Statut</th>
                <th className="px-6 py-4 font-bold text-center">Actions rapides</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-primary">#ORD-{order.id.toString().padStart(3, '0')}</div>
                    <div className="text-[10px] text-text-muted flex items-center gap-1 mt-1 font-medium">
                      <ShoppingBag size={10} className="text-secondary" /> {order.order_items.length} articles
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-text mb-1 flex items-center gap-2">
                        <User size={14} className="text-text-muted" /> {order.customer_name}
                    </div>
                    <div className="text-xs text-text-muted flex items-center gap-2 italic">
                        <Phone size={12} /> {order.customer_phone || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-text font-medium">{new Date(order.created_at).toLocaleDateString('fr-FR')}</div>
                    <div className="text-xs text-text-muted">{new Date(order.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-primary/5 px-3 py-1 rounded-lg font-bold text-primary">
                        {Number(order.total_amount).toLocaleString()} DHS
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative group/status flex justify-center">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border border-black/5 ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {order.status !== 'LivrÃ©e' && (
                        <button 
                            onClick={() => handleStatusUpdate(order.id, 'LivrÃ©e')}
                            className="p-2 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all shadow-sm border border-green-100" 
                            title="Marquer comme livrÃ©e"
                        >
                            <CheckCircle size={18} />
                        </button>
                      )}
                      {order.status === 'En attente' && (
                        <button 
                            onClick={() => handleStatusUpdate(order.id, 'En cours')}
                            className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm border border-blue-100" 
                            title="Passer en cours"
                        >
                            <Package size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm border border-red-100" 
                        title="Supprimer la commande"
                      >
                        <Trash2 size={18} />
                      </button>
                      <Link 
                        href={`/admin/orders/${order.id}`}
                        className="p-2 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-xl transition-all shadow-sm border border-primary/10" 
                        title="DÃ©tails complets"
                      >
                        <Eye size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-10" />
                    Aucune commande trouvÃ©e.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


