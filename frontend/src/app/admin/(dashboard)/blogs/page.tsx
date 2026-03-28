'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  User,
  Tag,
  CheckCircle,
  Clock,
  Archive
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Blog {
  id: number;
  title: string;
  slug: string;
  category: string;
  status: string;
  created_at: string;
  author?: {
    username: string;
  };
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, [page, statusFilter]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:3001/blogs?page=${page}&limit=10`;
      if (statusFilter !== 'all') url += `&status=${statusFilter}`;
      if (searchQuery) url += `&q=${encodeURIComponent(searchQuery)}`;
      
      const res = await fetch(url);
      const data = await res.json();
      setBlogs(data.data);
      setTotalPages(data.meta.totalPages);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchBlogs();
  };

  const deleteBlog = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;
    
    try {
      const res = await fetch(`http://localhost:3001/blogs/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBlogs(blogs.filter(b => b.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.length} articles ?`)) return;

    try {
      const res = await fetch('http://localhost:3001/blogs/bulk/delete', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });
      if (res.ok) {
        setBlogs(blogs.filter(b => !selectedIds.includes(b.id)));
        setSelectedIds([]);
      }
    } catch (error) {
      console.error('Failed bulk delete:', error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === blogs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(blogs.map(b => b.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1"><CheckCircle size={12} /> Publié</span>;
      case 'draft':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1"><Clock size={12} /> Brouillon</span>;
      case 'archived':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1"><Archive size={12} /> Archivé</span>;
      default:
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-primary">Gestion des Blogs</h1>
          <p className="text-text-muted mt-1">Gérez vos articles, actualités et guides.</p>
        </div>
        <Link 
          href="/admin/blogs/new" 
          className="bg-secondary text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 w-fit"
        >
          <Plus size={20} /> Nouvel Article
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-4 flex-1 w-full">
          {selectedIds.length > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="bg-red-50 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-red-100 transition-all text-sm whitespace-nowrap"
            >
              <Trash2 size={18} /> Supprimer ({selectedIds.length})
            </button>
          )}
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher par titre ou contenu..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-secondary/20 transition-all outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="text-text-muted" size={18} />
          <select 
            className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20 outline-none transition-all pr-10 appearance-none cursor-pointer flex-1 md:w-40"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="published">Publiés</option>
            <option value="draft">Brouillons</option>
            <option value="archived">Archivés</option>
          </select>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-secondary focus:ring-secondary"
                    checked={blogs.length > 0 && selectedIds.length === blogs.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted">Article</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted">Catégorie</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted">Auteur</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted">Statut</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="h-12 bg-gray-50 rounded-xl w-full"></div>
                    </td>
                  </tr>
                ))
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-text-muted">
                    Aucun article trouvé.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className={`hover:bg-gray-50 transition-colors group ${selectedIds.includes(blog.id) ? 'bg-secondary/5' : ''}`}>
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-secondary focus:ring-secondary"
                        checked={selectedIds.includes(blog.id)}
                        onChange={() => toggleSelect(blog.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary truncate max-w-xs">{blog.title}</div>
                      <div className="text-xs text-text-muted truncate max-w-xs">/{blog.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-sm text-primary">
                        <Tag size={14} className="text-secondary" />
                        {blog.category || 'Non classé'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-sm text-primary">
                        <User size={14} className="text-text-muted" />
                        {blog.author?.username || 'Admin'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(blog.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-sm text-text-muted">
                        <Calendar size={14} />
                        {format(new Date(blog.created_at), 'dd MMM yyyy', { locale: fr })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/blogs/${blog.slug}`} 
                          target="_blank"
                          className="p-2 text-text-muted hover:text-secondary hover:bg-white rounded-lg transition-all shadow-sm"
                          title="Voir"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link 
                          href={`/admin/blogs/${blog.id}/edit`} 
                          className="p-2 text-text-muted hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm"
                          title="Modifier"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => deleteBlog(blog.id)}
                          className="p-2 text-text-muted hover:text-red-600 hover:bg-white rounded-lg transition-all shadow-sm"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-text-muted">
              Page <span className="font-bold text-primary">{page}</span> sur <span className="font-bold text-primary">{totalPages}</span>
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
