'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BlogForm from '@/components/BlogForm';
import { Loader2 } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api-config';

export default function EditBlogPage() {
  const params = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/blogs/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch blog:', err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={40} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-serif mb-4">Article non trouvé</h1>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif text-primary">Modifier l'Article</h1>
        <p className="text-text-muted mt-1">Mettez à jour le contenu de "{blog.title}"</p>
      </div>

      <BlogForm initialData={blog} isEdit={true} />
    </div>
  );
}
