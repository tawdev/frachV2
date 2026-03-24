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
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl hidden md:block" />

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl relative z-10 border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-4xl font-serif text-primary">
            <span className="italic text-secondary">Frach</span>admin
          </h2>
          <p className="mt-4 text-center text-sm text-text-muted">
            Connectez-vous pour accéder à votre tableau de bord
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action={formAction}>
          {state?.error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm border border-red-100 animate-fade-in">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text mb-2">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Ex: admin"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-muted">
                Se souvenir de moi
              </label>
            </div>
          </div>

          <div>
            <SubmitButton />
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-text-muted hover:text-primary transition-colors flex items-center justify-center gap-2">
            ← Retour au site public
          </Link>
        </div>
      </div>
    </div>
  );
}
