import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/products';

interface InstagramGalleryProps {
  onSelectLook?: (postId: string) => void;
}

export const InstagramGallery: React.FC<InstagramGalleryProps> = () => {
  // Duplicate list to achieve continuous infinite marquee loop
  const marqueeItems = [...INSTAGRAM_POSTS, ...INSTAGRAM_POSTS, ...INSTAGRAM_POSTS];

  return (
    <section id="instagram-strip" className="relative w-full bg-[#121212] text-white py-10 overflow-hidden border-b border-black/10">
      {/* Header kicker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-[#E8B4B8] uppercase">
            <Instagram size={14} />
            <span>@MIREZA.CARIBBEAN · DÉFILÉ INSTAGRAM</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.08em] uppercase text-white mt-1">
            L'UNIVERS EN MOUVEMENT
          </h2>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#E8B4B8] hover:text-white transition-colors"
        >
          <span>REJOINDRE LA COMMUNAUTÉ</span>
          <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Marquee continuous scroll container */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex items-center gap-4 sm:gap-6 py-2">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative w-64 sm:w-72 md:w-80 h-80 sm:h-96 shrink-0 bg-[#1e1e1e] group overflow-hidden border border-white/10 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle hover gradient and text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                <span className="text-[11px] font-bold tracking-[0.18em] text-[#E8B4B8] uppercase">
                  {item.tag}
                </span>
                <p className="text-xs text-white/90 mt-1 line-clamp-2 leading-relaxed font-normal">
                  {item.caption}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[10px] tracking-[0.16em] text-white/70 uppercase">
                  <span>VOIR LE LOOK</span>
                  <ArrowUpRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
