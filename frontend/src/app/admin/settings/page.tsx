import { Settings } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-primary">Paramètres</h1>
        <p className="text-text-muted mt-1">Configurez votre interface et les options système.</p>
      </div>

      <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Settings size={20} className="text-secondary" /> Général
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-text">Informations de la boutique</p>
                  <p className="text-xs text-text-muted">Nom, email, adresse et téléphone</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-text">Langues & Devises</p>
                  <p className="text-xs text-text-muted">Gérer les options d'affichage</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary mb-4">Sécurité</h2>
            <div className="p-4 border border-orange-100 bg-orange-50 rounded-xl">
              <p className="text-sm text-orange-800">
                Vous êtes connecté en tant qu'administrateur principal. <br />
                Pensez à changer votre mot de passe régulièrement.
              </p>
              <button className="mt-3 text-sm font-bold text-secondary hover:text-primary transition-colors">
                Modifier le mot de passe →
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
