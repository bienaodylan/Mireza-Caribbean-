import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, ShieldCheck } from 'lucide-react';
import { Product } from '../types/store';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Noir', hex: '#111' });
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container: 0px border radius, sharp angles */}
      <div className="relative w-full max-w-3xl bg-[#FAF7F5] border border-black/20 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white z-20 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        {/* Product Image Column */}
        <div className="md:w-1/2 aspect-[3/4] md:aspect-auto bg-[#EFECE8] relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Product Details Column */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-black">
          <div>
            {/* Category / Collection unboxed metadata */}
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#9A3B5A] font-semibold mb-1">
              <span>{product.collection.replace('-', ' ')}</span>
              <span aria-hidden="true">·</span>
              <span className="text-black/60">{product.category}</span>
            </div>

            {/* Product Title */}
            <h3 className="font-display text-2xl font-bold tracking-[0.06em] uppercase text-black mb-2">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-bold tracking-wider tabular-nums text-black">
                {product.price.toLocaleString('fr-FR')} FCFA
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-black/40 tabular-nums">
                  {product.originalPrice.toLocaleString('fr-FR')} FCFA
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-black/75 font-normal leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="mb-5">
              <label className="block text-[11px] font-bold tracking-[0.16em] uppercase text-black/70 mb-2">
                COULEUR : <span className="text-black font-semibold">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-7 h-7 border transition-all cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'border-black scale-110 ring-2 ring-[#9A3B5A]'
                        : 'border-black/20 hover:border-black/60'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-black/70">
                  CHOISIR LA TAILLE
                </span>
                <span className="text-[10px] text-black/50 underline cursor-pointer">
                  GUIDE DES TAILLES
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-semibold tracking-wider transition-colors cursor-pointer border ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black/80 border-black/20 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-black/10">
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 px-4 text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                  justAdded
                    ? 'bg-[#1E5128] text-white'
                    : 'bg-[#111111] hover:bg-[#9A3B5A] text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check size={15} />
                    <span>AJOUTÉ AU PANIER</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} />
                    <span>AJOUTER AU PANIER</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`px-4 py-3.5 border transition-colors cursor-pointer flex items-center justify-center ${
                  isWishlisted
                    ? 'bg-[#9A3B5A] text-white border-[#9A3B5A]'
                    : 'bg-white text-black border-black/20 hover:border-black'
                }`}
                aria-label="Favoris"
              >
                <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-black/60 pt-1">
              <ShieldCheck size={14} className="text-[#9A3B5A]" />
              <span>Pièce authentique certifiée MIREZA CARIBBEAN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
