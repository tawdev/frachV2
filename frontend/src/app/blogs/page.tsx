'use client';
import { API_BASE_URL } from '@/lib/api-config';
﻿
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Newspaper, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  image: string;
  created_at: string;
  author?: { username: string };
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  useEffect(() => {
    fetch(`${API_BASE_URL}/blogs`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch blogs:', err);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(blog => 
    selectedCategory === 'Tous' || blog.category === selectedCategory
  );

  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-50/30">
      <div className="container px-4 mx-auto">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4 animate-fade-in">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-widest leading-none">
            Inspiration & DÃ©coration
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-primary leading-tight">
            Notre <span className="italic">Journal</span> de Design
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            DÃ©couvrez nos conseils, tendances et coulisses pour transformer votre intÃ©rieur avec Ã©lÃ©gance et caractÃ¨re.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in delay-100">
           <div className="relative w-full md:w-96 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
             <input 
               type="text" 
               placeholder="Rechercher un article..."
               className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-secondary/10 focus:border-secondary/30 outline-none transition-all text-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           
           <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {['Tous', 'Design', 'Conseils', 'Style', 'Tendances'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 whitespace-nowrap text-sm font-medium rounded-xl border shadow-sm transition-all ${
                    selectedCategory === cat 
                      ? 'bg-secondary text-white border-secondary' 
                      : 'bg-white border-gray-100 hover:border-secondary/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-[2rem] h-[500px] animate-pulse shadow-sm border border-gray-100" />
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {filteredBlogs.map((blog, idx) => (
              <article 
                key={blog.id} 
                className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 border border-gray-100 transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <Link href={`/blogs/${blog.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={blog.image ? (blog.image.startsWith('/') ? `${API_BASE_URL}${blog.image}` : blog.image) : '/images/placeholder-blog.jpg'} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-xl text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                      {blog.category || 'Non classÃ©'}
                    </span>
                  </div>
                </Link>
                
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-4 text-xs text-text-muted font-medium uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-secondary" />
                      {format(new Date(blog.created_at), 'dd MMM yyyy', { locale: fr })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={14} className="text-secondary" />
                      {blog.author?.username || 'Admin'}
                    </span>
                  </div>
                  
                  <Link href={`/blogs/${blog.slug}`}>
                    <h2 className="text-2xl font-serif text-primary leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="text-text-muted text-sm line-clamp-3 leading-relaxed">
                    {blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                  
                  <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-auto">
                    <Link 
                      href={`/blogs/${blog.slug}`} 
                      className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all group-hover:text-secondary"
                    >
                      Lire la suite <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 animate-fade-in">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <Newspaper size={40} />
            </div>
            <h3 className="text-2xl font-serif text-primary">Aucun article trouvÃ©</h3>
            <p className="text-text-muted italic">Essayez d'autres mots-clÃ©s ou revenez plus tard.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold"
            >
              Voir tout
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

