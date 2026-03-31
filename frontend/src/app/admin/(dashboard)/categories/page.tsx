'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderTree, X, Loader2 } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch((process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')/categories');
      if (!response.ok) throw new Error('Erreur rÃ©seau');
      const data = await response.json();
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category: Category | null = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || '',
        image: category.image || ''
      });
      setPreviewUrl(category.image ? (category.image.startsWith('http') ? category.image : `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}/${category.image}`) : '');
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '', image: '' });
      setPreviewUrl('');
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingCategory 
        ? `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}/categories/${editingCategory.id}`
        : (process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')/categories';
      
      const method = editingCategory ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Erreur lors de lâ€™enregistrement');
      
      await fetchCategories();
      setShowModal(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}/categories/${categoryToDelete.id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      await fetchCategories();
      setCategoryToDelete(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center text-text-muted">Chargement des catÃ©gories...</div>;

  return (
    <div className="animate-fade-in relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-primary">Gestion des CatÃ©gories</h1>
          <p className="text-text-muted mt-1">Organisez vos produits par collections.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2 w-fit px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/20"
        >
          <Plus size={18} /> Ajouter une CatÃ©gorie
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-text-muted">
                <th className="px-6 py-4 font-medium">CatÃ©gorie</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center overflow-hidden shrink-0 text-secondary font-bold">
                        {cat.image ? (
                           <img 
                           src={cat.image.startsWith('http') ? cat.image : `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}${cat.image.startsWith('/') ? '' : '/'}${cat.image}`} 
                           alt={cat.name} 
                           className="w-full h-full object-cover" 
                         />
                        ) : (
                          <FolderTree size={20} />
                        )}
                      </div>
                      <div className="font-bold text-primary text-sm">{cat.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted truncate max-w-xs">{cat.description || 'N/A'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <button onClick={() => handleOpenModal(cat)} className="p-2 text-gray-400 hover:text-primary rounded-lg transition-all" title="Modifier">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => setCategoryToDelete(cat)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-all" title="Supprimer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-primary text-white">
              <h2 className="text-xl font-serif font-bold">
                {editingCategory ? 'Modifier la CatÃ©gorie' : 'Ajouter une CatÃ©gorie'}
              </h2>
              <button onClick={() => setShowModal(false)} className="hover:bg-white/20 p-2 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase mb-1">Nom</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase mb-1">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary outline-none transition-all h-24 resize-none" 
                />
              </div>
               <div>
                <label className="block text-xs font-bold text-text-muted uppercase mb-1">Image de la CatÃ©gorie</label>
                <div className="space-y-2">
                  <label className="flex items-center justify-center w-full h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-all overflow-hidden relative">
                    {uploadingImage ? (
                      <span className="text-sm text-text-muted">TÃ©lÃ©chargement...</span>
                    ) : previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm text-text-muted">Cliquer pour sÃ©lectionner une image</span>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPreviewUrl(URL.createObjectURL(file));
                          setUploadingImage(true);
                          const data = new FormData();
                          data.append('file', file);
                          try {
                            const res = await fetch((process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')/upload/categories', { method: 'POST', body: data });
                            if (!res.ok) throw new Error('Upload failed');
                            const uploaded = await res.json();
                            setFormData(prev => ({...prev, image: uploaded.path}));
                          } catch (err) {
                            console.error(err);
                            alert("Erreur lors du tÃ©lÃ©chargement");
                          } finally {
                            setUploadingImage(false);
                          }
                        }
                      }}
                    />
                  </label>
                  {formData.image && <p className="text-xs text-text-muted truncate">{formData.image}</p>}
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-gray-200 text-text font-medium rounded-xl hover:bg-gray-50 transition-all">Annuler</button>
                <button disabled={submitting} className="flex-1 py-3 bg-secondary text-white font-medium rounded-xl hover:bg-secondary-dark transition-all flex items-center justify-center gap-2">
                  {submitting && <Loader2 size={18} className="animate-spin" />}
                  {submitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {categoryToDelete && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
           <div className="bg-white max-w-sm w-full rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-center text-primary mb-2">Supprimer la catÃ©gorie ?</h3>
            <p className="text-text-muted text-center mb-8">
              ÃŠtes-vous sÃ»r ?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setCategoryToDelete(null)}
                className="flex-1 py-3 border border-gray-200 text-text font-medium rounded-xl hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-all"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

