'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Settings, Tag, X, Loader2 } from 'lucide-react';

interface Type {
  id: number;
  name: string;
}

interface TypesCategory {
  id: number;
  name: string;
  category_id: number;
  categories?: { name: string };
}

interface Category {
  id: number;
  name: string;
}

export default function AdminTypes() {
  const [types, setTypes] = useState<Type[]>([]);
  const [typesCategories, setTypesCategories] = useState<TypesCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals for Type
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [editingType, setEditingType] = useState<Type | null>(null);
  const [typeForm, setTypeForm] = useState({ name: '' });
  
  // Modals for TypesCategory
  const [showTCModal, setShowTCModal] = useState(false);
  const [editingTC, setEditingTC] = useState<TypesCategory | null>(null);
  const [tcForm, setTCForm] = useState({ name: '', category_id: '' });

  const fetchData = async () => {
    try {
      const [tRes, tcRes, catRes] = await Promise.all([
        fetch('http://localhost:3001/categories/types-base'),
        fetch('http://localhost:3001/categories/types'),
        fetch('http://localhost:3001/categories')
      ]);
      
      const tData = await tRes.json();
      const tcData = await tcRes.json();
      const catData = await catRes.json();
      
      setTypes(Array.isArray(tData) ? tData : []);
      setTypesCategories(Array.isArray(tcData) ? tcData : []);
      setCategories(Array.isArray(catData) ? catData : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTypeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingType ? `http://localhost:3001/categories/types-base/${editingType.id}` : 'http://localhost:3001/categories/types-base';
    const method = editingType ? 'PATCH' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(typeForm)
    });
    setShowTypeModal(false);
    fetchData();
  };

  const handleTCSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingTC ? `http://localhost:3001/categories/types/${editingTC.id}` : 'http://localhost:3001/categories/types';
    const method = editingTC ? 'PATCH' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...tcForm, category_id: parseInt(tcForm.category_id) })
    });
    setShowTCModal(false);
    fetchData();
  };

  const handleDelete = async (url: string) => {
    if (confirm('Supprimer cet élément ?')) {
      await fetch(url, { method: 'DELETE' });
      fetchData();
    }
  };

  if (loading) return <div className="p-8 text-center text-text-muted">Chargement des types...</div>;

  return (
    <div className="animate-fade-in space-y-12">
      {/* Types Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg text-secondary"><Settings size={20} /></div>
            <h2 className="text-2xl font-serif text-primary">Types de Vente (Stock/Mesure)</h2>
          </div>
          <button onClick={() => { setEditingType(null); setTypeForm({ name: '' }); setShowTypeModal(true); }} className="px-4 py-2 bg-primary text-white rounded-xl text-sm flex items-center gap-2">
            <Plus size={16} /> Nouveau Type
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase text-text-muted">
              <tr>
                <th className="px-6 py-4">Nom du Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(types) && types.map(t => (
                <tr key={t.id}>
                  <td className="px-6 py-4 font-medium text-sm text-primary">{t.name}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setEditingType(t); setTypeForm({ name: t.name }); setShowTypeModal(true); }} className="p-2 text-gray-400 hover:text-primary"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(`http://localhost:3001/categories/types-base/${t.id}`)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Types Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 text-secondary rounded-lg text-secondary"><Tag size={20} /></div>
            <h2 className="text-2xl font-serif text-primary">Types de Catégories (Sub-categories)</h2>
          </div>
          <button onClick={() => { setEditingTC(null); setTCForm({ name: '', category_id: '' }); setShowTCModal(true); }} className="px-4 py-2 bg-secondary text-white rounded-xl text-sm flex items-center gap-2">
            <Plus size={16} /> Nouveau Sous-Type
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase text-text-muted">
              <tr>
                <th className="px-6 py-4">Nom du Sous-Type</th>
                <th className="px-6 py-4">Catégorie Parent</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(typesCategories) && typesCategories.map(tc => (
                <tr key={tc.id}>
                  <td className="px-6 py-4 font-medium text-sm text-primary">{tc.name}</td>
                  <td className="px-6 py-4 text-sm text-text-muted">{tc.categories?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setEditingTC(tc); setTCForm({ name: tc.name, category_id: tc.category_id.toString() }); setShowTCModal(true); }} className="p-2 text-gray-400 hover:text-secondary"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(`http://localhost:3001/categories/types/${tc.id}`)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modals ... */}
      {showTypeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleTypeSubmit} className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-serif font-bold mb-6 text-primary">{editingType ? 'Modifier Type' : 'Nouveau Type'}</h3>
            <div className="mb-6">
              <label className="block text-xs font-bold text-text-muted uppercase mb-1">Nom du Type</label>
              <input required value={typeForm.name} onChange={e => setTypeForm({ name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowTypeModal(false)} className="flex-1 py-3 text-text font-medium border rounded-xl">Annuler</button>
              <button className="flex-1 py-3 bg-primary text-white font-medium rounded-xl">Enregistrer</button>
            </div>
          </form>
        </div>
      )}

      {showTCModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleTCSubmit} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-serif font-bold mb-6 text-primary">{editingTC ? 'Modifier Type Catégorie' : 'Nouveau Sous-Type'}</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase mb-1">Nom du Sous-Type</label>
                <input required value={tcForm.name} onChange={e => setTCForm({ ...tcForm, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase mb-1">Catégorie Parent</label>
                <select required value={tcForm.category_id} onChange={e => setTCForm({ ...tcForm, category_id: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none">
                  <option value="">Sélectionner une catégorie...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowTCModal(false)} className="flex-1 py-3 text-text font-medium border rounded-xl">Annuler</button>
              <button className="flex-1 py-3 bg-secondary text-white font-medium rounded-xl">Enregistrer</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
