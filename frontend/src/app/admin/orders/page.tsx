'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Eye, Download, MoreVertical, Calendar, User, MapPin, Phone } from 'lucide-react';
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

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('http://localhost:3001/orders');
        if (!response.ok) throw new Error('Erreur lors de la récupération des commandes');
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente': return 'bg-orange-100 text-orange-700';
      case 'En cours': return 'bg-blue-100 text-blue-700';
      case 'Livrée': return 'bg-green-100 text-green-700';
      case 'Annulée': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) return <div className="p-8 text-center text-text-muted">Chargement des commandes...</div>;
  if (error) return <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">{error}</div>;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-primary">Gestion des Commandes</h1>
        <p className="text-text-muted mt-1">Suivez et gérez les commandes de vos clients.</p>
      </div>

      {/* Stats Summary (Mini) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-text-muted mb-1">Total Commandes</p>
          <h3 className="text-2xl font-bold text-primary">{orders.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-text-muted mb-1">En Attente</p>
          <h3 className="text-2xl font-bold text-orange-500">
            {orders.filter(o => o.status === 'En attente').length}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-text-muted mb-1">Livrées</p>
          <h3 className="text-2xl font-bold text-green-500">
            {orders.filter(o => o.status === 'Livrée').length}
          </h3>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm text-text-muted">
                <th className="px-6 py-4 font-medium">Commande</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Montant</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-primary">#ORD-{order.id.toString().padStart(3, '0')}</div>
                    <div className="text-[10px] text-text-muted flex items-center gap-1 mt-1">
                      <ShoppingBag size={10} /> {order.order_items.length} articles
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-text">{order.customer_name}</div>
                    <div className="text-xs text-text-muted">{order.customer_email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-text">{new Date(order.created_at).toLocaleDateString('fr-FR')}</div>
                    <div className="text-xs text-text-muted">{new Date(order.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-primary">
                    {Number(order.total_amount).toLocaleString()} DHS
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Détails">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-all" title="Télécharger Facture">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-10" />
                    Aucune commande trouvée.
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
