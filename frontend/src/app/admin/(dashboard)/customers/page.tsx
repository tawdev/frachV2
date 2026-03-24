import { Users } from 'lucide-react';

export default function AdminCustomers() {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
        <Users size={40} />
      </div>
      <h1 className="text-2xl font-serif text-primary mb-2">Gestion des Clients</h1>
      <p className="text-text-muted max-w-md mx-auto mb-8">
        Cette fonctionnalité est en cours de développement. Bientôt, vous pourrez gérer votre base de données clients ici.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Total Clients</p>
          <p className="text-xl font-bold text-primary">12</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Nouveaux ce mois</p>
          <p className="text-xl font-bold text-primary">3</p>
        </div>
      </div>
    </div>
  );
}
