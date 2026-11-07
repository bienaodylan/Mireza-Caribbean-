import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CollectionsPresentationProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CollectionsPresentation: React.FC<CollectionsPresentationProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className="w-full bg-[#FAF7F5] py-14 sm:py-20 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Editorial Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-4 border-b border-black/10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.24em] text-[#9A3B5A] uppercase block mb-1">
              SECTION 04 · RÉPERTOIRE MIREZA
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.06em] uppercase text-black">
              LES ESSENTIELS DE LA MAISON
            </h2>
          </div>
          <p className="text-black/70 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
            Lingerie d’exception, maillots de bain architecturaux, bustiers et soieries. 
            Une coupe étudiée pour sublimer chaque courbe avec assurance.
          </p>
        </div>

        {/* 4-Column Photo Grid (Directly inspired by SKIMS reference attachment) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Block: Crisp 3:4 aspect ratio, 0 border radius, subtle scale */}
              <div className="relative w-full aspect-[3/4] bg-[#EFECE8] overflow-hidden border border-black/10">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 brightness-[0.98] group-hover:brightness-105"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle bottom gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Title & Shop Link below photo (SKIMS style pure typography) */}
              <div className="pt-3 pb-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base sm:text-lg font-bold tracking-[0.08em] uppercase text-black group-hover:text-[#9A3B5A] transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowRight
                    size={14}
                    className="text-black/40 group-hover:text-[#9A3B5A] group-hover:translate-x-1 transition-all"
                  />
                </div>
                <span className="text-[11px] tracking-[0.14em] uppercase text-black/50 font-medium mt-0.5">
                  {cat.tag} · EXPLORER
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
