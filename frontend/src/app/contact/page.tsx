import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Linkedin, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container max-w-6xl">
        {/* Cinematic Hero */}
        <section className="relative h-[45vh] md:h-[55vh] rounded-[3rem] overflow-hidden mb-20 shadow-2xl animate-fade-in group border border-gray-100/20">
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" 
            alt="Showroom Frachdark" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out" 
          />
          <div className="absolute inset-x-0 bottom-0 z-20 p-10 md:p-20 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-1000">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight italic">Parlons de <span className="text-secondary not-italic">votre projet</span></h1>
            <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto opacity-90">
              Notre équipe d'experts est prête à transformer vos visions en réalité. Une expérience sur mesure commence ici.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Contact Details (Left Column) */}
          <div className="lg:col-span-5 space-y-8 animate-slide-up">
            <div className="space-y-4 mb-10">
              <h2 className="text-3xl font-serif text-primary border-l-4 border-secondary pl-6 py-2 italic font-bold">Nos bureaux</h2>
              <p className="text-text-muted text-lg">Venez nous rendre visite dans notre showroom principal pour découvrir nos collections et nos échantillons de matières.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: <MapPin />, title: "Showroom", content: "LOT LGUIDER N48 AV ALLAL EL FASSI, Maroc", color: "bg-secondary/10" },
                { icon: <Phone />, title: "Contact Direct", content: "+212 661 234 567", color: "bg-primary-light/10" },
                { icon: <Mail />, title: "Email Prestige", content: "contact@frachdark.com", color: "bg-secondary/10" },
                { icon: <Clock />, title: "Horaires", content: "Lun - Sam : 09:00 - 19:00", color: "bg-primary-light/10" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-6 bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-secondary/20 transition-all duration-500 group">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-primary italic font-bold">{item.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Connect */}
            <div className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100">
               <h3 className="font-serif text-xl text-primary mb-6 text-center italic">Suivre notre univers</h3>
               <div className="flex justify-center gap-6">
                  {[
                    { icon: <Instagram />, href: "#" },
                    { icon: <Facebook />, href: "#" },
                    { icon: <Linkedin />, href: "#" }
                  ].map((social, i) => (
                    <a key={i} href={social.href} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-secondary hover:border-secondary hover:text-white transition-all">
                      {social.icon}
                    </a>
                  ))}
               </div>
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-7 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-primary text-white rounded-[3.5rem] shadow-2xl p-10 md:p-16 relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
              
              <div className="relative z-10 space-y-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-secondary mb-2">
                     <MessageSquare size={20} />
                     <span className="text-xs font-bold uppercase tracking-[0.3em]">Messagerie Directe</span>
                  </div>
                  <h2 className="text-4xl font-serif italic text-white leading-tight">Envoyez-nous <br />un message privé</h2>
                </div>

                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary opacity-80 pl-4">Nom</label>
                      <input 
                        type="text" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-4 focus:ring-secondary/20 focus:border-secondary/50 transition-all font-light"
                        placeholder="Votre nom complet" 
                      />
                    </div>
                    <div className="group space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary opacity-80 pl-4">Email</label>
                      <input 
                        type="email" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-4 focus:ring-secondary/20 focus:border-secondary/50 transition-all font-light"
                        placeholder="Votre adresse email" 
                      />
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary opacity-80 pl-4">Sujet du projet</label>
                    <div className="relative">
                      <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-secondary/20 focus:border-secondary/50 transition-all font-light">
                        <option value="luxury">Inspiration Mobilier de Luxe</option>
                        <option value="custom">Projet sur-mesure complet</option>
                        <option value="collab">Collaboration Designer</option>
                        <option value="other">Autre demande exclusive</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                        <Clock size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary opacity-80 pl-4">Détails de votre demande</label>
                    <textarea 
                      rows={4} 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-4 focus:ring-secondary/20 focus:border-secondary/50 transition-all resize-none font-light"
                      placeholder="Comment pouvons-nous vous servir ?"
                    />
                  </div>

                  <button className="w-full py-5 bg-secondary text-primary font-bold rounded-2xl shadow-xl shadow-secondary/20 hover:shadow-secondary/40 hover:-translate-y-1 transition-all duration-500 uppercase tracking-widest text-xs flex items-center justify-center gap-3 group">
                    Soumettre la demande
                    <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Philosophy Overlay */}
        <section className="text-center py-20 bg-gray-50 rounded-[4rem] border border-gray-100 overflow-hidden relative">
            <div className="text-6xl md:text-8xl font-serif text-primary opacity-[0.03] absolute -top-10 left-1/2 -translate-x-1/2 uppercase whitespace-nowrap tracking-[0.5em] pointer-events-none italic">
                Savoir Faire
            </div>
            <div className="relative z-10 px-6">
                <h3 className="text-2xl font-serif text-primary mb-4 italic font-bold">L'Excellence Frachdark</h3>
                <p className="text-text-muted max-w-xl mx-auto italic">"Chaque interaction avec notre maison est le début d'une œuvre d'art partagée."</p>
            </div>
        </section>
      </div>
    </div>
  );
}
