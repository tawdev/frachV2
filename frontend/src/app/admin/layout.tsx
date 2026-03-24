import { LayoutDashboard, ShoppingBag, Users, FolderTree, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white hidden md:flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-primary-light">
          <span className="text-2xl font-serif font-bold">
            <span className="italic text-secondary">Frach</span>admin
          </span>
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-light/50 rounded-xl text-gray-300 hover:text-white transition-colors">
            <LayoutDashboard size={20} /> Tableau de Bord
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-light/50 rounded-xl text-gray-300 hover:text-white transition-colors">
            <ShoppingBag size={20} /> Commandes
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-light/50 rounded-xl text-gray-300 hover:text-white transition-colors">
            <ShoppingBag size={20} /> Produits
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-light/50 rounded-xl text-gray-300 hover:text-white transition-colors">
            <FolderTree size={20} /> Catégories
          </Link>
          <Link href="/admin/types" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-light/50 rounded-xl text-gray-300 hover:text-white transition-colors">
            <Settings size={20} /> Types Management
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-light/50 rounded-xl text-gray-300 hover:text-white transition-colors">
            <Users size={20} /> Clients
          </Link>
        </nav>
        
        <div className="p-4 border-t border-primary-light">
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-primary-light/50 rounded-xl text-gray-300 hover:text-white transition-colors mb-2">
            <Settings size={20} /> Paramètres
          </Link>
          <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-red-500/20 rounded-xl text-red-300 hover:text-red-400 transition-colors">
            <LogOut size={20} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <h1 className="text-xl font-medium text-primary md:hidden">FrachAdmin</h1>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
              A
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-primary">Admin</p>
              <p className="text-xs text-text-muted">admin@meublesmaison.com</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50 mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
