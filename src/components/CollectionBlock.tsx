import React from 'react';
import { ArrowRight, Eye, Heart } from 'lucide-react';
import { Product } from '../types/store';

interface CollectionBlockProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  bannerImage: string;
  theme: 'rose' | 'noir';
  featuredProducts: Product[];
  onExploreCollection: (id: string) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export const CollectionBlock: React.FC<CollectionBlockProps> = ({
  id,
  number,
  title,
  subtitle,
  description,
  bannerImage,
  theme,
  featuredProducts,
  onExploreCollection,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
}) => {
  const isDark = theme === 'noir';

  return (
    <section
      id={id}
      className={`w-full py-16 sm:py-24 border-b border-black/10 ${
        isDark ? 'bg-[#0E0E0E] text-white' : 'bg-[#FAF7F5] text-black'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Campaign Banner (Wide cinematic presentation) */}
        <div className="relative w-full h-[460px] sm:h-[580px] bg-black overflow-hidden border border-black/15 group">
          <img
            src={bannerImage}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 brightness-[0.93]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient overlay to enhance legibility */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              isDark
                ? 'from-black/95 via-black/40 to-transparent'
                : 'from-black/85 via-black/30 to-transparent'
            }`}
          />

          {/* Banner typography & action */}
          <div className="absolute inset-0 p-6 sm:p-12 md:p-16 flex flex-col justify-end text-white max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.24em] text-[#E8B4B8] uppercase mb-2">
              {number} · {subtitle}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.06em] uppercase text-white mb-3">
              {title}
            </h2>
            <p className="text-white/85 text-xs sm:text-sm md:text-base font-normal max-w-xl mb-6 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onExploreCollection(id)}
                className="bg-white text-black hover:bg-[#E8B4B8] px-7 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>DÉCOUVRIR LA COLLECTION</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Mini-Grid of Products from this collection */}
        {featuredProducts.length > 0 && (
          <div className="mt-10 sm:mt-12">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-black/10">
              <span
                className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                  isDark ? 'text-white/60' : 'text-black/60'
                }`}
              >
                SÉLECTION EN VEDETTE
              </span>
              <button
                onClick={() => onExploreCollection(id)}
                className="text-xs font-bold tracking-[0.16em] uppercase text-[#9A3B5A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>VOIR TOUT LE LOOK</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {featuredProducts.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className={`group relative flex flex-col border ${
                    isDark ? 'border-white/10 bg-[#161616]' : 'border-black/10 bg-white'
                  }`}
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Quick view button on hover */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                      <button
                        onClick={() => onQuickView(product)}
                        className="bg-white text-black hover:bg-[#E8B4B8] w-full py-2 text-[10px] font-bold tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye size={13} />
                        <span>APERÇU RAPIDE</span>
                      </button>
                    </div>

                    {/* Wishlist toggle */}
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className={`absolute top-2 right-2 p-2 ${
                        isWishlisted(product.id)
                          ? 'text-[#9A3B5A] bg-white'
                          : 'text-white/80 hover:text-white bg-black/40 hover:bg-black/70'
                      } transition-colors cursor-pointer`}
                      aria-label="Ajouter aux favoris"
                    >
                      <Heart
                        size={15}
                        fill={isWishlisted(product.id) ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h4
                        className={`font-display text-xs sm:text-sm font-bold tracking-[0.06em] uppercase line-clamp-1 ${
                          isDark ? 'text-white' : 'text-black'
                        }`}
                      >
                        {product.name}
                      </h4>
                      <p
                        className={`text-[11px] mt-1 ${
                          isDark ? 'text-white/50' : 'text-black/50'
                        } line-clamp-1`}
                      >
                        {product.sizes.join(' · ')}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between">
                      <span className="font-semibold text-xs sm:text-sm tracking-wider tabular-nums text-[#9A3B5A]">
                        {product.price.toLocaleString('fr-FR')} FCFA
                      </span>
                      <button
                        onClick={() => onQuickView(product)}
                        className="text-[10px] font-bold tracking-[0.14em] uppercase text-black dark:text-white hover:text-[#9A3B5A] dark:hover:text-[#E8B4B8] transition-colors"
                      >
                        CHOISIR
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
