import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const quickKeywords = ['Bustier', 'Satin Rose', 'Swimwear', 'Kimono Léopard', 'Panthère', 'Nocturne'];

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#FAF7F5] border border-black/20 shadow-2xl z-10 overflow-hidden text-black">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-black/10 flex items-center gap-3">
          <Search size={22} className="text-[#9A3B5A] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une pièce, un tissu, une coupe..."
            autoFocus
            className="w-full bg-transparent text-base sm:text-lg text-black placeholder-black/40 focus:outline-none tracking-wide"
          />
          <button
            onClick={onClose}
            className="p-1 hover:text-[#9A3B5A] transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-4 bg-[#EFECE8] border-b border-black/5 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-black/50 font-bold uppercase tracking-wider text-[10px]">
            Suggestions :
          </span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setQuery(kw)}
              className="bg-white hover:bg-black hover:text-white px-2.5 py-1 text-black text-[11px] font-medium border border-black/10 transition-colors cursor-pointer"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Results Box */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-black/40 text-xs tracking-wider">
              Tapez votre recherche pour afficher instantanément les modèles correspondants.
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-black/50 text-xs">
              Aucun résultat pour "{query}". Essayez un autre mot-clé comme "Corset" ou "Bikini".
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9A3B5A] block mb-2">
                {filteredProducts.length} MODÈLE(S) TROUVÉ(S)
              </span>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(p);
                  }}
                  className="flex items-center gap-4 p-2 bg-white border border-black/10 hover:border-black cursor-pointer transition-colors group"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-18 object-cover bg-black/5 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider group-hover:text-[#9A3B5A] transition-colors">
                      {p.name}
                    </h4>
                    <span className="text-[11px] text-black/50 block mt-0.5">
                      {p.category.toUpperCase()} · {p.sizes.join(', ')}
                    </span>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="font-bold text-xs tracking-wider tabular-nums text-[#9A3B5A]">
                      {p.price.toLocaleString('fr-FR')} FCFA
                    </span>
                    <ArrowRight size={14} className="text-black/40 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
