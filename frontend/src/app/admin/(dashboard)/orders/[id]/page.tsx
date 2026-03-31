'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, ArrowLeft, User, Phone, Mail, MapPin, 
  Calendar, CheckCircle, Package, Trash2, Printer, 
  Clock, CreditCard, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: string;
  product?: {
    image: string;
  };
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

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/orders/${params.id}`);
      if (!response.ok) throw new Error('Commande non trouvée');
      const data = await response.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/orders/${order.id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setOrder({ ...order, status: newStatus });
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  if (loading) return <div className="p-20 text-center font-medium">Chargement des détails...</div>;
  if (error || !order) return (
    <div className="p-20 text-center">
      <h2 className="text-xl text-red-500 mb-4">{error || 'Commande introuvable'}</h2>
      <Link href="/admin/orders" className="btn-primary">Retour aux commandes</Link>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'En cours': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Livrée': return 'bg-green-100 text-green-700 border-green-200';
      case 'Annulée': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/admin/orders" className="text-text-muted hover:text-primary flex items-center gap-2 mb-4 text-sm font-medium transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour à la liste
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-serif text-primary">Commande #ORD-{order.id.toString().padStart(3, '0')}</h1>
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border shadow-sm ${getStatusColor(order.status)}`}>
                {order.status}
            </span>
          </div>
          <p className="text-text-muted mt-2 flex items-center gap-2 text-sm">
            <Calendar size={14} /> Passée le {new Date(order.created_at).toLocaleDateString('fr-FR')} à {new Date(order.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="btn-secondary py-2.5 px-4 text-sm bg-white border-2 border-primary/20 text-primary hover:bg-primary/5 rounded-xl flex items-center gap-2" onClick={() => window.print()}>
               <Printer size={16} /> Imprimer
            </button>
            <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-gray-100 p-1.5">
                <button 
                  onClick={() => handleStatusUpdate('En cours')}
                  className={`p-2.5 rounded-lg transition-all ${order.status === 'En cours' ? 'bg-blue-600 text-white shadow-md' : 'text-blue-600 hover:bg-blue-50'}`}
                  title="En cours"
                >
                    <Package size={20} />
                </button>
                <button 
                  onClick={() => handleStatusUpdate('Livrée')}
                  className={`p-2.5 rounded-lg transition-all ${order.status === 'Livrée' ? 'bg-green-600 text-white shadow-md' : 'text-green-600 hover:bg-green-50'}`}
                  title="Livrée"
                >
                    <CheckCircle size={20} />
                </button>
                <button 
                  onClick={() => handleStatusUpdate('Annulée')}
                  className={`p-2.5 rounded-lg transition-all ${order.status === 'Annulée' ? 'bg-red-600 text-white shadow-md' : 'text-red-600 hover:bg-red-50'}`}
                  title="Annulée"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Order Items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-serif text-lg text-primary flex items-center gap-2">
                    <ShoppingBag size={20} className="text-secondary" /> Articles commandés
                </h3>
                <span className="text-xs font-bold text-text-muted bg-white px-3 py-1 rounded-full border border-gray-100">
                    {order.order_items.length} produit(s)
                </span>
            </div>
            
            <div className="divide-y divide-gray-50">
                {order.order_items.map((item, idx) => (
                    <div key={idx} className="px-6 py-5 flex items-center gap-6 group hover:bg-gray-50/30 transition-colors">
                        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-primary font-bold shadow-inner border border-gray-100 transition-transform group-hover:scale-105 overflow-hidden">
                            {item.product?.image ? (
                              <img 
                                src={item.product.image.startsWith('http') ? item.product.image : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${item.product.image.startsWith('/') ? '' : '/'}${item.product.image}`} 
                                alt={item.product_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ShoppingBag size={24} className="opacity-20" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-primary group-hover:text-secondary transition-colors italic">{item.product_name}</h4>
                            <div className="flex items-center gap-4 mt-1">
                                <span className="text-sm text-text-muted">Prix : {Number(item.price).toLocaleString()} DHS</span>
                                <span className="text-sm font-bold text-secondary">x {item.quantity}</span>
                            </div>
                        </div>
                        <div className="text-right">
                           <span className="font-bold text-primary">{(Number(item.price) * item.quantity).toLocaleString()} DHS</span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-gray-50 px-6 py-8">
                <div className="max-w-xs ml-auto space-y-4">
                    <div className="flex justify-between text-sm text-text-muted uppercase tracking-wider">
                        <span>Sous-total</span>
                        <span>{Number(order.total_amount) - 500} DHS</span>
                    </div>
                    <div className="flex justify-between text-sm text-text-muted uppercase tracking-wider">
                        <span>Frais de livraison</span>
                        <span>500 DHS</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-primary">
                        <span className="font-serif text-xl">Total</span>
                        <span className="text-2xl font-bold">{Number(order.total_amount).toLocaleString()} DHS</span>
                    </div>
                </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
             <h3 className="font-serif text-lg text-primary mb-6 flex items-center gap-2">
                <Clock size={20} className="text-secondary" /> Historique & Suivi
             </h3>
             <div className="space-y-6 relative ml-3 border-l-2 border-gray-100 pb-2">
                 <div className="relative pl-8">
                     <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-green-500 border-4 border-white shadow-sm ring-4 ring-green-50"></div>
                     <p className="font-bold text-sm text-primary">Commande passée</p>
                     <p className="text-xs text-text-muted mt-1">{new Date(order.created_at).toLocaleString('fr-FR')}</p>
                 </div>
                 {order.status !== 'En attente' && (
                     <div className="relative pl-8">
                        <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm ring-4 ring-primary/10"></div>
                        <p className="font-bold text-sm text-primary">Statut mis à jour : {order.status}</p>
                        <p className="text-xs text-text-muted mt-1 italic">Dernière modification</p>
                     </div>
                 )}
             </div>
          </div>
        </div>

        {/* Sidebar: Customer Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="px-6 py-4 bg-primary text-white flex items-center gap-2">
                 <User size={18} /> <h3 className="font-medium">Client</h3>
             </div>
             <div className="p-6 space-y-6">
                 <div>
                     <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">Identité</p>
                     <p className="font-serif text-xl text-primary">{order.customer_name}</p>
                 </div>
                 
                 <div className="space-y-3 pt-4 border-t border-gray-50">
                     <div className="flex items-center gap-3 text-sm text-text">
                         <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-secondary">
                             <Mail size={14} />
                         </div>
                         {order.customer_email}
                     </div>
                     <div className="flex items-center gap-3 text-sm text-text">
                         <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-secondary">
                             <Phone size={14} />
                         </div>
                         <span className="font-medium tracking-wide">{order.customer_phone || 'Non renseigné'}</span>
                     </div>
                 </div>

                 <div className="pt-6 border-t border-gray-50">
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Adresse de livraison</p>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-3 italic">
                        <MapPin size={18} className="text-secondary shrink-0" />
                        <p className="text-sm leading-relaxed text-primary font-medium">
                            {order.customer_address}
                        </p>
                    </div>
                 </div>
             </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <h3 className="font-serif text-lg text-primary mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-secondary" /> Méthode de paiement
             </h3>
             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 group hover:border-secondary/30 transition-all">
                <span className="text-sm font-bold text-primary italic">Paiement à la livraison</span>
                <ChevronRight size={16} className="text-text-muted group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
