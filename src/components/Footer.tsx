import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (target: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0D0D0D] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="font-display text-2xl sm:text-3xl tracking-[0.24em] font-bold text-white uppercase block">
                MIREZA
              </span>
              <span className="text-[10px] tracking-[0.38em] uppercase text-[#E8B4B8] font-semibold block -mt-0.5">
                CARIBBEAN
              </span>
            </div>
            <p className="text-white/60 text-xs sm:text-sm font-normal max-w-sm mb-6 leading-relaxed">
              Maison de mode féminine contemporaine. Silhouettes corsetées, swimwear sculptural, 
              homewear et soieries d'exception alliant l'instinct félin et l'élégance caribéenne.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold tracking-wider text-white/80">
              <span className="text-[#E8B4B8]">PAIEMENTS ACCEPTÉS :</span>
              <span className="text-white/70">WAVE · ORANGE MONEY · VISA · MASTERCARD</span>
            </div>
          </div>

          {/* Col 3: Navigation Boutique */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#E8B4B8] mb-4">
              BOUTIQUE
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a
                  href="#nouveautes"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('nouveautes');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Nouveautés
                </a>
              </li>
              <li>
                <a
                  href="#collection-01"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('collection-01');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Collection Panthère Rose
                </a>
              </li>
              <li>
                <a
                  href="#collection-02"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('collection-02');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Caribbean Nocturne
                </a>
              </li>
              <li>
                <a
                  href="#boutique"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('boutique');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Tous les Produits
                </a>
              </li>
              <li>
                <a
                  href="#accessoires"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('accessoires');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Accessoires
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Service Client & Livraison */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#E8B4B8] mb-4">
              ASSISTANCE & SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a
                  href="#livraison"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('livraison');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Délais & Modalités de Livraison
                </a>
              </li>
              <li>
                <a
                  href="#retours"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('retours');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Retours & Échanges sous 14j
                </a>
              </li>
              <li>
                <a
                  href="#guide-tailles"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('guide-tailles');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Guide des Tailles & Prise de Mesures
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('contact');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Conciergerie Client & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Maison & Réseaux */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#E8B4B8] mb-4">
              LA MAISON
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a
                  href="#a-propos"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('a-propos');
                  }}
                  className="hover:text-white transition-colors"
                >
                  L’Histoire de MIREZA CARIBBEAN
                </a>
              </li>
              <li>
                <a
                  href="#discovery"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('discovery');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Discovery Experience 2.5D
                </a>
              </li>
              <li>
                <a
                  href="#engagements"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('engagements');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Nos Engagements Qualité
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Instagram @mireza.caribbean</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <span>© {new Date().getFullYear()} MIREZA CARIBBEAN. TOUS DROITS RÉSERVÉS.</span>
            <a href="#mentions-legales" className="hover:text-white/70 transition-colors">
              Conditions Générales de Vente
            </a>
            <a href="#confidentialite" className="hover:text-white/70 transition-colors">
              Politique de Confidentialité
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#E8B4B8] transition-colors cursor-pointer uppercase tracking-wider text-[10px]"
          >
            <span>HAUT DE PAGE</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
