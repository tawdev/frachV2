'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Copy, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { API_BASE_URL } from '@/lib/api-config';

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  image: string;
  created_at: string;
  views: number;
  author?: { username: string };
  tags?: string;
}

export default function BlogDetailPage() {

  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/blogs/slug/${slug}`)

      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch blog:', err);
        setLoading(false);
      });
  }, [slug]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen py-32 text-center space-y-6">
        <h1 className="text-4xl font-serif text-primary">Article non trouvé</h1>
        <p className="text-text-muted italic">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <Link href="/blogs" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-2xl font-bold">
           <ArrowLeft size={18} /> Retour au blog
        </Link>
      </div>
    );
  }

  // Calculate read time
  const wordCount = blog.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="min-h-screen pt-32 pb-32 animate-fade-in bg-white">
      <div className="container px-4 mx-auto max-w-4xl">
         {/* Back button & Category */}
         <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link 
              href="/blogs" 
              className="flex items-center gap-2 text-text-muted hover:text-secondary transition-colors text-sm font-medium uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> Tous les articles
            </Link>
            <span className="px-5 py-2 bg-secondary/5 text-secondary border border-secondary/10 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {blog.category || 'Inspiration'}
            </span>
         </div>

         {/* Title & Meta */}
         <header className="space-y-8 mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary leading-[1.1] selection:bg-secondary/20 tracking-tighter">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-gray-100">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-secondary">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-text-muted uppercase tracking-widest font-bold">Rédigé par</span>
                    <span className="text-sm font-medium text-primary">{blog.author?.username || 'Frachdark Team'}</span>
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-secondary">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-text-muted uppercase tracking-widest font-bold">Publié le</span>
                    <span className="text-sm font-medium text-primary">{format(new Date(blog.created_at), 'dd MMMM yyyy', { locale: fr })}</span>
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-secondary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-text-muted uppercase tracking-widest font-bold">Lecture</span>
                    <span className="text-sm font-medium text-primary">{readTime} min</span>
                  </div>
               </div>
            </div>
         </header>

         {/* Featured Image */}
         {blog.image && (
           <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-20 shadow-2xl shadow-primary/5 border border-gray-100 group">
              <img 
                src={blog.image.startsWith('/') ? `${API_BASE_URL}${blog.image}` : blog.image} 
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
           </div>
         )}

         {/* Content Area */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
            {/* Sidebar Sticky */}
            <aside className="lg:col-span-1 hidden lg:flex flex-col gap-8 sticky top-32 h-fit">
               <div className="flex flex-col gap-6">
                  <button onClick={copyLink} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:border-primary group" title="Copier le lien">
                    {copied ? <span className="text-[10px] font-bold">CoPié</span> : <Copy size={18} />}
                  </button>
                  {[
                    { icon: <Facebook size={18} />, label: 'Facebook' },
                    { icon: <Twitter size={18} />, label: 'Twitter' },
                    { icon: <Linkedin size={18} />, label: 'LinkedIn' }
                  ].map((p, i) => (
                    <button key={i} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:border-secondary">
                      {p.icon}
                    </button>
                  ))}
               </div>
            </aside>

            {/* Main Text Content */}
            <div className="lg:col-span-11 prose prose-xl max-w-none prose-primary selection:bg-secondary/20">
               <div 
                 dangerouslySetInnerHTML={{ __html: blog.content }} 
                 className="blog-content-rendered dropcap font-serif leading-relaxed text-primary/90"
               />
               
               {/* Tags */}
               {blog.tags && (
                 <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                    {blog.tags.split(',').map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-50 text-text-muted rounded-lg text-xs font-semibold hover:bg-secondary/10 hover:text-secondary transition-colors cursor-pointer">
                        <Tag size={12} /> {tag.trim()}
                      </span>
                    ))}
                 </div>
               )}
            </div>
         </div>
         
         {/* Author Bio Footer */}
         <footer className="mt-24 p-10 bg-gray-50/50 rounded-[3rem] border border-gray-100 flex flex-col md:flex-row items-center gap-8 animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center text-primary border-4 border-white">
               <User size={48} />
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
               <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Éditeur Principal</span>
               <h4 className="text-2xl font-serif text-primary">{blog.author?.username || 'Équipe Frachdark'}</h4>
               <p className="text-text-muted text-sm max-w-xl leading-relaxed">
                  Passionnés par le design d'intérieur et l'art de vivre, nous partageons avec vous nos meilleures astuces pour créer un foyer qui vous ressemble.
               </p>
            </div>
         </footer>
      </div>

      <style jsx global>{`
        .blog-content-rendered h2 {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: var(--primary);
          letter-spacing: -0.02em;
        }
        .blog-content-rendered h3 {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }
        .blog-content-rendered p {
          margin-bottom: 2rem;
          line-height: 1.8;
          font-size: 1.125rem;
        }
        .blog-content-rendered img {
          border-radius: 2rem;
          margin: 3rem 0;
          box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.1);
        }
        .blog-content-rendered blockquote {
          font-style: italic;
          font-family: var(--font-serif);
          font-size: 1.5rem;
          border-left: 4px solid var(--secondary);
          padding-left: 2rem;
          margin: 3rem 0;
          color: var(--primary);
        }
        /* Style for the first letter */
        .dropcap > p:first-of-type::first-letter {
          float: left;
          font-size: 4.5rem;
          line-height: 0.8;
          padding-top: 0.5rem;
          padding-right: 0.75rem;
          font-family: var(--font-serif);
          color: var(--secondary);
        }
      `}</style>
    </article>
  );
}
