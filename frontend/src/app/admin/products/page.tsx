'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Package, ExternalLink, X, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  category_id?: number;
  type_category_id?: number;
}

interface Category {
  id: number;
  name: string;
}

interface Type {
  id: number;
  name: string;
}

interface TypesCategory {
  id: number;
  name: string;
  category_id: number;
  types_id?: number;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [allTypeCategories, setAllTypeCategories] = useState<TypesCategory[]>([]);
  const [typeCategories, setTypeCategories] = useState<TypesCategory[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '0',
    category_id: '',
    type_category_id: '',
    types_id: '',
    image: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Delete confirm
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetadata = async () => {
    try {
      const [catRes, typeRes, subRes] = await Promise.all([
        fetch('http://localhost:3001/categories'),
        fetch('http://localhost:3001/categories/types-base'),
        fetch('http://localhost:3001/categories/types')
      ]);
      const catData = await catRes.json();
      const typeData = await typeRes.json();
      const subData = await subRes.json();
      
      setCategories(Array.isArray(catData) ? catData : []);
      setTypes(Array.isArray(typeData) ? typeData : []);
      setAllTypeCategories(Array.isArray(subData) ? subData : []);
    } catch (err) {}
  };

  useEffect(() => {
    fetchProducts();
    fetchMetadata();
  }, []);

  // Filter type categories when category or type changes
  useEffect(() => {
    if (formData.category_id && formData.types_id) {
      const filtered = allTypeCategories.filter(tc => 
        tc.category_id === parseInt(formData.category_id) && 
        (!tc.types_id || tc.types_id === parseInt(formData.types_id))
      );
      setTypeCategories(filtered);
    } else if (formData.category_id) {
      const filtered = allTypeCategories.filter(tc => 
        tc.category_id === parseInt(formData.category_id)
      );
      setTypeCategories(filtered);
    } else {
      setTypeCategories([]);
    }
  }, [formData.category_id, formData.types_id, allTypeCategories]);

  const handleOpenModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        category_id: product.category_id?.toString() || '',
        type_category_id: product.type_category_id?.toString() || '',
        types_id: product.types_id?.toString() || '',
        image: product.image || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '0',
        category_id: '',
        type_category_id: '',
        types_id: '',
        image: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingProduct 
        ? `http://localhost:3001/products/${editingProduct.id}`
        : 'http://localhost:3001/products';
      
      const method = editingProduct ? 'PATCH' : 'POST';
      
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category_id: formData.category_id ? parseInt(formData.category_id) : undefined,
        type_category_id: formData.type_category_id ? parseInt(formData.type_category_id) : undefined,
        types_id: formData.types_id ? parseInt(formData.types_id) : undefined
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Erreur lors de l’enregistrement');
      
      await fetchProducts();
      setShowModal(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      const response = await fetch(`http://localhost:3001/products/${productToDelete.id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      await fetchProducts();
      setProductToDelete(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center text-text-muted">Chargement des produits...</div>;

  return (
    <div className="animate-fade-in relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-primary">Gestion des Produits</h1>
          <p className="text-text-muted mt-1">Gérez votre inventaire et vos collections.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2 w-fit px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/20"
        >
          <Plus size={18} /> Ajouter un Produit
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-text-muted">
                <th className="px-6 py-4 font-medium">Produit</th>
                <th className="px-6 py-4 font-medium">Catégorie</th>
                <th className="px-6 py-4 font-medium">Prix</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                        {product.image ? (
                          <img 
                            src={product.image.startsWith('http') ? product.image : (product.image.startsWith('/') ? product.image : `/${product.image}`)} 
                            alt={product.name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <Package size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div className="font-medium text-primary text-sm">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">
                    {Number(product.price).toLocaleString()} DHS
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <button onClick={() => handleOpenModal(product)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => setProductToDelete(product)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
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
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-primary text-white">
              <h2 className="text-xl font-serif font-bold">
                {editingProduct ? 'Modifier le Produit' : 'Ajouter un Produit'}
              </h2>
              <button onClick={() => setShowModal(false)} className="hover:bg-white/20 p-2 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-text-muted uppercase mb-1">Nom du Produit *</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary outline-none transition-all" 
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-text-muted uppercase mb-1">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary outline-none transition-all resize-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase mb-1">Prix (DH) *</label>
                  <input 
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    type="number" 
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase mb-1">Stock</label>
                  <input 
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    type="number" 
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase mb-1">Catégorie *</label>
                   <select 
                    required
                    value={formData.category_id}
                    onChange={(e) => {
                      const cat = categories.find(c => c.id === parseInt(e.target.value));
                      setFormData({...formData, category_id: e.target.value, category: cat?.name || '', type_category_id: ''});
                    }}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary outline-none transition-all"
                   >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                   </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase mb-1">Type (stock/mesure)</label>
                   <select 
                    value={formData.types_id}
                    onChange={(e) => setFormData({...formData, types_id: e.target.value, type_category_id: ''})}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary outline-none transition-all"
                   >
                    <option value="">Tous les types</option>
                    {types.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                   </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-text-muted uppercase mb-1">
                    Sous-catégorie
                    {(!formData.category_id || !formData.types_id) && <span className="text-[10px] lowercase font-normal ml-2 opacity-60">(Sélectionnez un type pour filtrer)</span>}
                  </label>
                   <select 
                    value={formData.type_category_id}
                    onChange={(e) => setFormData({...formData, type_category_id: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary outline-none transition-all"
                   >
                    <option value="">Sélectionner une sous-catégorie</option>
                    {typeCategories.map(tc => (
                      <option key={tc.id} value={tc.id}>{tc.name}</option>
                    ))}
                   </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-text-muted uppercase mb-1">Image</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input 
                        type="text"
                        placeholder="URL de l'image"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="relative group">
                      <input 
                        type="file" 
                        accept="image/jpeg,image/png,image/gif"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                             // For now we just show the filename as placeholder or handle upload
                             // In a real app we'd upload to S3/Cloudinary and get a URL
                             setFormData({...formData, image: file.name});
                          }
                        }}
                      />
                      <button type="button" className="px-4 py-3 bg-gray-100 text-text-muted rounded-xl group-hover:bg-gray-200 transition-all text-sm font-medium">
                        Choisir un fichier
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-text-muted mt-2">Formats acceptés : JPG, PNG, GIF (max 5MB)</p>
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

      {/* Delete Confirmation */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-center text-primary mb-2">Supprimer le produit ?</h3>
            <p className="text-text-muted text-center mb-8">
              Confirmer la suppression ?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setProductToDelete(null)}
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
