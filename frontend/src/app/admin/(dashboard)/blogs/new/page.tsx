import BlogForm from '@/components/BlogForm';

export default function NewBlogPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif text-primary">Créer un Article</h1>
        <p className="text-text-muted mt-1">Rédigez un nouveau contenu pour votre blog.</p>
      </div>

      <BlogForm />
    </div>
  );
}
