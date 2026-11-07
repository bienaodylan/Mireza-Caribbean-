import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 50000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

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
              <ShoppingBag size={18} className="text-[#9A3B5A]" />
              <h3 className="font-display text-lg font-bold tracking-[0.1em] uppercase">
                VOTRE PANIER ({items.reduce((acc, i) => acc + i.quantity, 0)})
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

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#EFECE8] px-5 py-3 border-b border-black/5 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-black/75">
                Plus que{' '}
                <span className="font-bold text-[#9A3B5A] tabular-nums">
                  {remainingForFreeShipping.toLocaleString('fr-FR')} FCFA
                </span>{' '}
                pour la livraison offerte !
              </p>
            ) : (
              <p className="text-[#9A3B5A] font-bold tracking-wider">
                FÉLICITATIONS ! LIVRAISON OFFERTE ACTIVÉE
              </p>
            )}
            <div className="w-full bg-black/10 h-1 mt-2 overflow-hidden">
              <div
                className="bg-[#9A3B5A] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-black/50">
                <ShoppingBag size={42} strokeWidth={1.2} className="mb-3 text-black/30" />
                <p className="font-display text-base uppercase tracking-wider text-black/70 mb-1">
                  Votre panier est vide
                </p>
                <p className="text-xs mb-6 max-w-xs">
                  Découvrez les créations de la Maison Mireza et composez votre allure.
                </p>
                <button
                  onClick={onClose}
                  className="bg-black text-white hover:bg-[#9A3B5A] px-6 py-3 text-xs font-bold tracking-[0.18em] uppercase transition-colors"
                >
                  DÉCOUVRIR LES NOUVEAUTÉS
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-white border border-black/10"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-center bg-black/5 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-xs font-bold uppercase tracking-wider text-black line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="text-black/40 hover:text-red-600 transition-colors cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="text-[11px] text-black/60 mt-0.5 space-x-2">
                        <span>Taille : <b className="text-black">{item.selectedSize}</b></span>
                        <span>·</span>
                        <span>{item.selectedColor.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/5 mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-black/15 bg-[#FAF7F5]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                          className="px-2 py-0.5 hover:bg-black/5 transition-colors cursor-pointer text-xs"
                          aria-label="Diminuer"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2.5 text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                          className="px-2 py-0.5 hover:bg-black/5 transition-colors cursor-pointer text-xs"
                          aria-label="Augmenter"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-xs tracking-wider tabular-nums text-[#9A3B5A]">
                        {(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-black/10 space-y-3">
              <div className="flex items-center justify-between text-xs tracking-wider">
                <span className="text-black/60 uppercase">Sous-total</span>
                <span className="font-bold text-base tabular-nums text-black">
                  {subtotal.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
              <p className="text-[11px] text-black/50">
                Taxes et frais d'expédition calculés lors du paiement.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full bg-[#111111] hover:bg-[#9A3B5A] text-white py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>COMMANDER VIA CHECKOUT</span>
                <ArrowRight size={14} />
              </button>
              <div className="flex items-center justify-center gap-3 text-[10px] text-black/50 uppercase tracking-widest pt-1">
                <span>WAVE</span>
                <span>·</span>
                <span>ORANGE MONEY</span>
                <span>·</span>
                <span>VISA / MASTERCARD</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
