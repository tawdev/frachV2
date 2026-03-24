'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { loginAdmin } from './actions';

const initialState = {
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`btn-primary w-full py-3 flex justify-center text-sm font-medium hover:shadow-lg transition-all ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {pending ? 'Connexion en cours...' : 'Se connecter'}
    </button>
  );
}

export default function AdminLogin() {
  const [state, formAction] = useFormState(loginAdmin, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary transform skew-x-12 translate-x-32 hidden md:block" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px] hidden md:block" />

      <div className="max-w-md w-full space-y-8 glass-card p-10 relative z-10 border border-white/40 shadow-2xl">
        <div>
          <h2 className="mt-2 text-center text-4xl font-serif text-primary">
            <span className="italic text-secondary">Frach</span>admin
          </h2>
          <div className="mt-4 flex flex-col items-center">
            <div className="h-1 w-12 bg-secondary rounded-full mb-4"></div>
            <p className="text-center text-sm text-text-muted font-light tracking-wide">
              ACCÈS ADMINISTRATEUR
            </p>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" action={formAction}>
          {state?.error && (
            <div className="bg-red-50/80 backdrop-blur-sm text-red-500 p-4 rounded-xl text-sm border border-red-100 animate-slide-up">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-white/50 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                placeholder="Identifiant"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-white/50 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-text-muted cursor-pointer hover:text-primary transition-colors">
              Se souvenir de moi
            </label>
          </div>

          <div className="pt-2">
            <SubmitButton />
          </div>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <Link href="/" className="text-sm text-text-muted hover:text-primary transition-all flex items-center justify-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> 
            Retour au site public
          </Link>
        </div>
      </div>
    </div>
  );
}
