import { ShoppingBag, TrendingUp, Users, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-primary">Vue d'ensemble</h1>
        <p className="text-text-muted mt-1">Bienvenue sur votre tableau de bord administrateur.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium mb-1">Revenus (Mensuel)</p>
            <h3 className="text-2xl font-bold text-primary">124,500 DHS</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium mb-1">Commandes</p>
            <h3 className="text-2xl font-bold text-primary">48</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium mb-1">Nouveaux Clients</p>
            <h3 className="text-2xl font-bold text-primary">12</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium mb-1">En Attente</p>
            <h3 className="text-2xl font-bold text-primary">5</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-primary mb-6">Commandes Récentes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-text-muted">
                  <th className="pb-3 font-medium">Commande</th>
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Statut</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-medium text-primary">#ORD-048</td>
                  <td className="py-4 text-text">Ahmed Benali</td>
                  <td className="py-4 text-text-muted">Aujourd'hui, 10:24</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">En attente</span>
                  </td>
                  <td className="py-4 text-right font-medium text-primary">24,500 DHS</td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-medium text-primary">#ORD-047</td>
                  <td className="py-4 text-text">Sarah Rami</td>
                  <td className="py-4 text-text-muted">Hier, 15:45</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">En cours</span>
                  </td>
                  <td className="py-4 text-right font-medium text-primary">8,200 DHS</td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-medium text-primary">#ORD-046</td>
                  <td className="py-4 text-text">Karim Tazi</td>
                  <td className="py-4 text-text-muted">15 Mars 2026</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Livrée</span>
                  </td>
                  <td className="py-4 text-right font-medium text-primary">12,500 DHS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-primary mb-6">Messages Contact</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-secondary">
              <p className="font-medium text-primary text-sm mb-1">Demande Sur Mesure</p>
              <p className="text-xs text-text-muted mb-2">Par: Othmane L. - Il y a 2h</p>
              <p className="text-sm text-text line-clamp-2">Bonjour, je souhaiterais un devis pour un canapé d'angle en velours vert émeraude de 3m...</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-gray-300">
              <p className="font-medium text-primary text-sm mb-1">Question Livraison</p>
              <p className="text-xs text-text-muted mb-2">Par: Fatima Z. - Hier</p>
              <p className="text-sm text-text line-clamp-2">Livrez-vous jusqu'à Dakhla ? Quel serait le délai...</p>
            </div>
            <button className="w-full py-2 text-sm text-secondary font-medium hover:text-primary transition-colors mt-2">
              Voir tous les messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
