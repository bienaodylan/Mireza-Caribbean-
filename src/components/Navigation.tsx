import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, ArrowRight } from 'lucide-react';

interface NavigationProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onNavigate: (target: string) => void;
  activeSection?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Nouveautés', href: '#nouveautes' },
    { label: 'Panthère Rose', href: '#collection-01' },
    { label: 'Caribbean Nocturne', href: '#collection-02' },
    { label: 'Toutes les Pièces', href: '#boutique' },
    { label: 'Accessoires', href: '#accessoires' },
  ];

  return (
    <>
      {/* Top micro-announcement bar (SKIMS/Chanel style minimal ticker) */}
      <div className="bg-[#111111] text-[#E8B4B8] text-[11px] tracking-[0.2em] uppercase py-2 px-4 text-center font-medium border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline text-white/50 text-[10px]">Expédition Caribéenne & Internationale</span>
          <span className="mx-auto">Livraison offerte dès 50 000 FCFA · Paiements Wave & Orange Money</span>
          <span className="hidden sm:inline text-white/50 text-[10px]">Atelier de Création</span>
        </div>
      </div>

      {/* Main Navigation Bar with subtle Glassmorphism */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F5]/90 backdrop-blur-md border-b border-black/10 py-3 shadow-xs'
            : 'bg-[#FAF7F5] border-b border-black/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-black hover:text-[#9A3B5A] transition-colors focus:outline-none"
            aria-label="Ouvrir le menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Left Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-[12px] font-semibold tracking-[0.16em] uppercase text-black/80">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.href.replace('#', ''));
                }}
                className="hover:text-[#9A3B5A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#9A3B5A] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Brand Wordmark (Center) */}
          <div className="text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group"
            >
              <span className="font-display text-2xl sm:text-3xl tracking-[0.24em] font-bold text-black uppercase transition-colors group-hover:text-[#9A3B5A]">
                MIREZA
              </span>
              <span className="block text-[9px] tracking-[0.38em] uppercase text-black/60 font-semibold -mt-1">
                CARIBBEAN
              </span>
            </a>
          </div>

          {/* Right Navigation Links (Desktop) & Action Icons */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-7 text-[12px] font-semibold tracking-[0.16em] uppercase text-black/80">
              {navLinks.slice(3).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.href.replace('#', ''));
                  }}
                  className="hover:text-[#9A3B5A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#9A3B5A] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Quick Action Icons */}
            <div className="flex items-center gap-4 text-black">
              {/* Search button */}
              <button
                onClick={onOpenSearch}
                className="p-1 hover:text-[#9A3B5A] transition-colors"
                aria-label="Rechercher"
                title="Rechercher un modèle"
              >
                <Search size={19} strokeWidth={1.75} />
              </button>

              {/* Wishlist button */}
              <button
                onClick={onOpenWishlist}
                className="p-1 hover:text-[#9A3B5A] transition-colors relative"
                aria-label="Favoris"
                title="Pièces favorites"
              >
                <Heart size={19} strokeWidth={1.75} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#9A3B5A] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart button */}
              <button
                onClick={onOpenCart}
                className="p-1 hover:text-[#9A3B5A] transition-colors relative flex items-center gap-1.5"
                aria-label="Panier d'achats"
                title="Panier"
              >
                <ShoppingBag size={19} strokeWidth={1.75} />
                <span className="text-[11px] font-bold tracking-wider">
                  ({cartCount})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-[#FAF7F5] border-b border-black/15 shadow-xl p-6 transition-all">
            <nav className="flex flex-col gap-4 text-sm font-semibold tracking-[0.16em] uppercase">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    onNavigate(link.href.replace('#', ''));
                  }}
                  className="flex items-center justify-between py-2 border-b border-black/5 hover:text-[#9A3B5A]"
                >
                  <span>{link.label}</span>
                  <ArrowRight size={14} className="text-black/40" />
                </a>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-xs text-black/60">
              <span>DEVISE : FCFA (XOF)</span>
              <span>CARIBBEAN DESIGN</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
