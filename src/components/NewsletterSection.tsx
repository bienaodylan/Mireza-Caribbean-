import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
  };

  return (
    <section className="w-full bg-[#161414] text-white py-16 sm:py-20 border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Subtitle */}
        <span className="text-xs font-semibold tracking-[0.25em] text-[#E8B4B8] uppercase block mb-2">
          SECTION 08 · LE CERCLE PRIVÉ
        </span>

        {/* Short Title */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] uppercase text-white mb-3">
          ACCÉDEZ AUX AVANT-PREMIÈRES
        </h2>

        {/* Concise Phrase */}
        <p className="text-white/75 text-xs sm:text-sm max-w-lg mx-auto mb-8 font-normal leading-relaxed">
          Inscrivez-vous pour recevoir les lancements exclusifs, les invitations aux ventes privées et l’actualité des collections MIREZA.
        </p>

        {/* Form with zero rounded corners */}
        {isSubmitted ? (
          <div className="bg-[#241F20] border border-[#E8B4B8]/40 p-4 max-w-md mx-auto flex items-center justify-center gap-3 text-xs tracking-wider text-[#E8B4B8] font-semibold">
            <Check size={16} />
            <span>BIENVENUE DANS LE CERCLE PRIVÉ MIREZA</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch max-w-md mx-auto border border-white/20 focus-within:border-[#E8B4B8] transition-colors"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              required
              className="bg-transparent text-white placeholder-white/40 px-4 py-3.5 text-xs tracking-wider flex-1 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black hover:bg-[#E8B4B8] px-6 py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>S'INSCRIRE</span>
              <ArrowRight size={13} />
            </button>
          </form>
        )}

        <span className="block text-[10px] tracking-wider text-white/40 uppercase mt-4">
          Désinscription possible à tout moment · Données strictement confidentielles
        </span>
      </div>
    </section>
  );
};
