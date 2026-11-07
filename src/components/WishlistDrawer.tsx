import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types/store';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F5] border-l border-black/15 shadow-2xl flex flex-col text-black">
          {/* Header */}
          <div className="p-5 border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart size={18} className="text-[#9A3B5A]" fill="#9A3B5A" />
              <h3 className="font-display text-lg font-bold tracking-[0.1em] uppercase">
                VOS FAVORIS ({items.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:text-[#9A3B5A] transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-black/50">
                <Heart size={42} strokeWidth={1.2} className="mb-3 text-black/30" />
                <p className="font-display text-base uppercase tracking-wider text-black/70 mb-1">
                  Aucun coup de cœur enregistré
                </p>
                <p className="text-xs mb-6 max-w-xs">
                  Enregistrez vos pièces favorites en cliquant sur l'icône cœur lors de votre exploration.
                </p>
                <button
                  onClick={onClose}
                  className="bg-black text-white hover:bg-[#9A3B5A] px-6 py-3 text-xs font-bold tracking-[0.18em] uppercase transition-colors"
                >
                  EXPLORER LA COLLECTION
                </button>
              </div>
            ) : (
              items.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white border border-black/10"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover object-center bg-black/5 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-xs font-bold uppercase tracking-wider text-black line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemove(product.id)}
                          className="text-black/40 hover:text-red-600 transition-colors cursor-pointer"
                          title="Retirer des favoris"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <span className="text-[11px] text-black/50 uppercase tracking-wider">
                        {product.collection.replace('-', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/5 mt-2">
                      <span className="font-bold text-xs tracking-wider tabular-nums text-[#9A3B5A]">
                        {product.price.toLocaleString('fr-FR')} FCFA
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          onQuickView(product);
                        }}
                        className="bg-black hover:bg-[#9A3B5A] text-white px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] uppercase transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag size={12} />
                        <span>AJOUTER</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
