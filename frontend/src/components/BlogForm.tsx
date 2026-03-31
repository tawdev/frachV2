'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  X, 
  Image as ImageIcon, 
  Loader2, 
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    category: initialData?.category || '',
    status: initialData?.status || 'draft',
    tags: initialData?.tags || '',
    image: initialData?.image || '',
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEdit && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, isEdit]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageLoading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')/blogs/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = isEdit 
      ? `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}/blogs/${initialData.id}` 
      : (process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}')/blogs';
    
    const method = isEdit ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/blogs');
          router.refresh();
        }, 1500);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Une erreur est survenue lors de l'enregistrement.");
      }
    } catch (err) {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/blogs" 
          className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Retour Ã  la liste
        </Link>
        <div className="flex items-center gap-3">
           <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
             formData.status === 'published' ? 'bg-green-100 text-green-700' : 
             formData.status === 'archived' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
           }`}>
             {formData.status === 'published' ? 'En ligne' : formData.status === 'archived' ? 'ArchivÃ©' : 'Brouillon'}
           </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Titre de l'article</label>
              <input 
                type="text"
                required
                className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all outline-none text-lg font-serif"
                placeholder="Ex: Les tendances du design en 2026..."
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-2">Slug (URL)</label>
              <input 
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-secondary/20 transition-all outline-none text-sm text-text-muted"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              />
            </div>

            <div className="min-h-[400px]">
              <label className="block text-sm font-bold text-primary mb-2">Contenu</label>
              <div className="prose-editor">
                <ReactQuill 
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  modules={modules}
                  className="bg-white rounded-2xl overflow-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Status & Category */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div>
              <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-widest text-[10px]">Statut</label>
              <select 
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20 outline-none appearance-none cursor-pointer"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publier l'article</option>
                <option value="archived">Archiver</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-widest text-[10px]">CatÃ©gorie</label>
              <select 
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20 outline-none appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">SÃ©lectionner une catÃ©gorie</option>
                <option value="Design">Design</option>
                <option value="Conseils">Conseils</option>
                <option value="Style">Style</option>
                <option value="Tendances">Tendances</option>
                <option value="Tutoriels">Tutoriels</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-widest text-[10px]">Mots-clÃ©s (Tags)</label>
              <input 
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
                placeholder="Tag1, Tag2..."
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              />
            </div>
          </div>

          {/* Thumbnail Image */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <label className="block text-sm font-bold text-primary mb-4 uppercase tracking-widest text-[10px]">Image de couverture</label>
            
            <div className="relative group">
              {formData.image ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-inner">
                  <img 
                    src={formData.image.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}'}${formData.image}` : formData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-gray-200 hover:border-secondary hover:bg-secondary/[0.02] transition-all cursor-pointer group">
                  {imageLoading ? (
                    <Loader2 size={32} className="text-secondary animate-spin" />
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-text-muted mb-2 group-hover:text-secondary group-hover:bg-white transition-all">
                        <ImageIcon size={24} />
                      </div>
                      <span className="text-xs font-bold text-text-muted group-hover:text-secondary">Ajouter une image</span>
                    </>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={imageLoading} />
                </label>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="sticky top-24 pt-4">
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-2xl text-sm flex items-start gap-3 animate-shake">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-2xl text-sm flex items-start gap-3 animate-fade-in">
                <CheckCircle size={18} className="shrink-0 mt-0.5" />
                <p>L'article a Ã©tÃ© enregistrÃ© avec succÃ¨s !</p>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-primary/95 transition-all shadow-xl shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Save size={20} /> 
                  {isEdit ? 'Mettre Ã  jour' : 'Enregistrer'}
                </>
              )}
            </button>
            
            {!isEdit && (
              <button 
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                className="w-full mt-3 py-3 text-sm font-bold text-text-muted hover:text-primary transition-colors"
                disabled={loading}
              >
                Passer en brouillon
              </button>
            )}
          </div>
        </div>
      </form>

      <style jsx global>{`
        .prose-editor .ql-container {
          min-height: 400px;
          border-bottom-left-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
          font-family: inherit;
          font-size: 1rem;
        }
        .prose-editor .ql-toolbar {
          border-top-left-radius: 1.5rem;
          border-top-right-radius: 1.5rem;
          border-color: #f3f4f6 !important;
          background: #f9fafb;
          padding: 1rem !important;
        }
        .prose-editor .ql-stroke {
          stroke: #1a202c !important;
        }
        .prose-editor .ql-picker {
          color: #1a202c !important;
        }
      `}</style>
    </div>
  );
}

