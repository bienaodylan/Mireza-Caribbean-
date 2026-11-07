import React from 'react';
import { Sparkles, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/products';

interface PromotionsSectionProps {
  onExplorePromotions: () => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({
  onExplorePromotions,
}) => {
  return (
    <section className="w-full bg-[#FAF7F5] py-14 sm:py-20 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-black/10 gap-3">
          <div>
            <span className="text-xs font-semibold tracking-[0.24em] text-[#9A3B5A] uppercase block mb-1">
              SECTION 07 · PRIVILÈGES & OFFRES DE SAISON
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.06em] uppercase text-black">
              L'EXPÉRIENCE MIREZA
            </h2>
          </div>
          <span className="text-xs text-black/60 tracking-wider">
            ÉDITIONS LIMITÉES & AVANTAGES EXCLUSIFS
          </span>
        </div>

        {/* 2-Column Split Showcase (SKIMS Reference Bottom Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Coffret Privilège */}
          <div className="relative h-[340px] sm:h-[400px] overflow-hidden bg-black border border-black/15 group">
            <img
              src={IMAGES.categoryLingerie}
              alt="Coffret Mireza"
              className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 brightness-[0.88]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#E8B4B8] uppercase mb-2">
                <Sparkles size={14} />
                <span>OFFRE DE BIENVENUE · CODE : MIREZA15</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.08em] uppercase text-white mb-2">
                LE COFFRET DE BIENVENUE
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-normal max-w-md mb-4 leading-relaxed">
                Bénéficiez de 15% de réduction sur votre première commande et recevez notre pochon satin signature offert.
              </p>
              <div>
                <button
                  onClick={onExplorePromotions}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white underline underline-offset-4 hover:text-[#E8B4B8] transition-colors cursor-pointer"
                >
                  <span>PROFITER DE L'OFFRE</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Livraison & Paiement Mobile Money */}
          <div className="relative h-[340px] sm:h-[400px] overflow-hidden bg-black border border-black/15 group">
            <img
              src={IMAGES.categorySwimwear}
              alt="Expédition et services"
              className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 brightness-[0.88]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#E8B4B8] uppercase mb-2">
                <Truck size={14} />
                <span>EXPÉDITION PRIVILÉGIÉE</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.08em] uppercase text-white mb-2">
                LIVRAISON OFFERTE DÈS 50 000 FCFA
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-normal max-w-md mb-4 leading-relaxed">
                Paiement ultra-sécurisé en un clic par Wave, Orange Money ou carte bancaire. Expédition soignée en 24h à 48h.
              </p>
              <div>
                <button
                  onClick={onExplorePromotions}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white underline underline-offset-4 hover:text-[#E8B4B8] transition-colors cursor-pointer"
                >
                  <span>EN SAVOIR PLUS SUR LA LIVRAISON</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Trust */}
        <div className="mt-8 pt-8 border-t border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck size={20} className="text-[#9A3B5A] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-black">
                FINITIONS HAUTE PRÉCISION
              </h4>
              <p className="text-[12px] text-black/60 mt-0.5 leading-relaxed">
                Matières nobles sélectionnées, satins fluides et coutures invisibles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck size={20} className="text-[#9A3B5A] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-black">
                PAIEMENT WAVE & ORANGE MONEY
              </h4>
              <p className="text-[12px] text-black/60 mt-0.5 leading-relaxed">
                Réglez instantanément avec vos solutions Mobile Money favorites.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles size={20} className="text-[#9A3B5A] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-black">
                ÉCHANGES FACILITÉS SOUS 14 JOURS
              </h4>
              <p className="text-[12px] text-black/60 mt-0.5 leading-relaxed">
                Essayez vos pièces en toute sérénité avec notre service client dédié.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
