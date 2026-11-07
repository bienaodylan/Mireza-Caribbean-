import React, { useState } from 'react';
import { ArrowDown, Pause, Play, ChevronRight } from 'lucide-react';
import { IMAGES } from '../data/products';

interface HeroSectionProps {
  onExploreCollection: (collectionId: string) => void;
  onExploreNew: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onExploreNew,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 'panther-main',
      image: IMAGES.heroPanther,
      subtitle: 'CAMPAGNE OFFICIELLE MIREZA CARIBBEAN',
      title: "L'INSTINCT PANTHÈRE",
      description: 'Quand le satin rose blush et le noir obsidienne rencontrent la puissance féline. Une allure souveraine aux découpes architecturales.',
      cta: 'DÉCOUVRIR LA NOUVELLE COLLECTION',
      target: 'collection-01',
    },
    {
      id: 'caribbean-noir',
      image: IMAGES.campaignCaribbeanNoir,
      subtitle: 'ÉDITION NOCTURNE HAUTE COUTURE',
      title: 'CARIBBEAN NOCTURNE',
      description: 'Bustiers structurés en velours et drapés sombres rehaussés de reflets rose profond.',
      cta: 'EXPLORER L’ÉCRIN NOIR',
      target: 'collection-02',
    },
  ];

  const current = slides[activeSlide];

  const scrollToContent = () => {
    const el = document.getElementById('instagram-strip');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] min-h-[580px] max-h-[960px] bg-black overflow-hidden flex items-end">
      {/* Background Campaign Imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover object-center transition-all duration-700 brightness-[0.92]"
          referrerPolicy="no-referrer"
        />
        {/* Subtle measured scrim to ensure perfect text contrast without dulling the photography */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
      </div>

      {/* Hero Content Overlay (SKIMS & Chanel Inspired) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 text-white">
        <div className="max-w-2xl">
          {/* Unboxed subtle metadata kicker */}
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E8B4B8] font-semibold mb-3">
            <span>{current.subtitle}</span>
            <span aria-hidden="true">·</span>
            <span className="text-white/70">NOUVEL ARRIVAGE</span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.06em] uppercase text-white mb-4 leading-[1.05]">
            {current.title}
          </h1>

          {/* Clean Description */}
          <p className="text-white/85 text-sm sm:text-base font-normal max-w-lg mb-8 leading-relaxed">
            {current.description}
          </p>

          {/* Primary CTA and Secondary Discovery Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => onExploreCollection(current.target)}
              className="bg-white text-black hover:bg-[#E8B4B8] px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{current.cta}</span>
              <ChevronRight size={14} />
            </button>

            <button
              onClick={onExploreNew}
              className="border border-white/60 hover:border-white text-white hover:text-[#E8B4B8] px-6 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors flex items-center justify-center cursor-pointer bg-black/25 backdrop-blur-xs"
            >
              DÉCOUVRIR TOUTES LES NOUVEAUTÉS
            </button>
          </div>
        </div>

        {/* Carousel indicators & Pause toggle (Ref: SKIMS bottom bar in attachment) */}
        <div className="mt-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-[2px] transition-all cursor-pointer ${
                  activeSlide === idx
                    ? 'w-10 bg-white'
                    : 'w-5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Aller au slide ${idx + 1}`}
              />
            ))}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 hover:text-white transition-colors ml-2"
              aria-label={isPlaying ? 'Mettre en pause' : 'Lecture'}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>
          </div>

          {/* Discovery scroll trigger */}
          <button
            onClick={scrollToContent}
            className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <span>SCROLL DISCOVERY</span>
            <ArrowDown size={13} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
