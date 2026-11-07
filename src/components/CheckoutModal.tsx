import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types/store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: 'Abidjan',
    shippingMethod: 'express',
    paymentMethod: 'wave',
    mobileNumber: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + shippingCost;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    } else if (step === 3) {
      setStep(4);
      onOrderSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={() => step !== 4 && onClose()}
      />

      <div className="relative w-full max-w-2xl bg-[#FAF7F5] border border-black/20 shadow-2xl z-10 overflow-hidden text-black flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-black/10 flex items-center justify-between bg-white">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#9A3B5A] font-bold block">
              MIREZA CARIBBEAN · PAIEMENT SÉCURISÉ
            </span>
            <h3 className="font-display text-xl font-bold tracking-[0.08em] uppercase">
              {step === 4 ? 'COMMANDE CONFIRMÉE' : `ÉTAPE ${step} SUR 3`}
            </h3>
          </div>
          {step !== 4 && (
            <button
              onClick={onClose}
              className="p-1 hover:text-[#9A3B5A] transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-black/80 border-b border-black/10 pb-2">
                1. VOS COORDONNÉES ET ADRESSE DE LIVRAISON
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-black/70 mb-1">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="ex. Aïcha"
                    className="w-full bg-white border border-black/20 px-3.5 py-2.5 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-black/70 mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="ex. Diop"
                    className="w-full bg-white border border-black/20 px-3.5 py-2.5 text-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-wider uppercase text-black/70 mb-1">
                  Numéro de Téléphone (pour la livraison & Mobile Money) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value, mobileNumber: e.target.value })}
                  placeholder="+225 07 00 00 00 00"
                  className="w-full bg-white border border-black/20 px-3.5 py-2.5 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-black/70 mb-1">
                    Adresse ou Quartier *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Cocody Danga, Rue des Jardins"
                    className="w-full bg-white border border-black/20 px-3.5 py-2.5 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-black/70 mb-1">
                    Ville *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Abidjan"
                    className="w-full bg-white border border-black/20 px-3.5 py-2.5 text-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#111111] hover:bg-[#9A3B5A] text-white px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>CONTINUER VERS LA LIVRAISON</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-black/80 border-b border-black/10 pb-2">
                2. SÉLECTION DU MODE DE LIVRAISON
              </h4>

              <div className="space-y-3">
                <label
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    formData.shippingMethod === 'express'
                      ? 'border-black bg-white ring-1 ring-black'
                      : 'border-black/15 bg-white/60 hover:border-black/40'
                  }`}
                  onClick={() => setFormData({ ...formData, shippingMethod: 'express' })}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={formData.shippingMethod === 'express'}
                    onChange={() => {}}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider">
                        Livraison Express Sécurisée (24h à 48h)
                      </span>
                      <span className="font-bold text-xs text-[#9A3B5A]">
                        {shippingCost === 0 ? 'GRATUITE' : '3 000 FCFA'}
                      </span>
                    </div>
                    <p className="text-[11px] text-black/60 mt-1">
                      Remise en mains propres dans notre emballage noir et ruban rose satin signature.
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold tracking-wider uppercase text-black/60 hover:text-black flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft size={13} />
                  <span>Retour</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-[#111111] hover:bg-[#9A3B5A] text-white px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>CONTINUER VERS LE PAIEMENT</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-black/80 border-b border-black/10 pb-2">
                3. CHOIX DU MOYEN DE PAIEMENT
              </h4>

              <div className="space-y-3">
                {/* Wave */}
                <label
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'wave'
                      ? 'border-[#1DC4D4] bg-white ring-1 ring-[#1DC4D4]'
                      : 'border-black/15 bg-white/60 hover:border-black/40'
                  }`}
                  onClick={() => setFormData({ ...formData, paymentMethod: 'wave' })}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'wave'}
                    onChange={() => {}}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider text-[#1DC4D4]">
                        WAVE MOBILE MONEY
                      </span>
                      <span className="text-[10px] bg-[#1DC4D4]/10 text-[#0F6F78] px-2 py-0.5 font-bold">
                        SANS FRAIS
                      </span>
                    </div>
                    <p className="text-[11px] text-black/60 mt-0.5">
                      Paiement instantané par QR Code ou notification push sur l'application Wave.
                    </p>
                  </div>
                </label>

                {/* Orange Money */}
                <label
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'orange'
                      ? 'border-[#FF7900] bg-white ring-1 ring-[#FF7900]'
                      : 'border-black/15 bg-white/60 hover:border-black/40'
                  }`}
                  onClick={() => setFormData({ ...formData, paymentMethod: 'orange' })}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'orange'}
                    onChange={() => {}}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider text-[#FF7900]">
                        ORANGE MONEY
                      </span>
                      <span className="text-[10px] bg-[#FF7900]/10 text-[#B35500] px-2 py-0.5 font-bold">
                        SÉCURISÉ
                      </span>
                    </div>
                    <p className="text-[11px] text-black/60 mt-0.5">
                      Validation via votre code secret Orange Money.
                    </p>
                  </div>
                </label>

                {/* Carte Bancaire */}
                <label
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'card'
                      ? 'border-black bg-white ring-1 ring-black'
                      : 'border-black/15 bg-white/60 hover:border-black/40'
                  }`}
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => {}}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="font-bold text-xs uppercase tracking-wider block">
                      CARTE BANCAIRE (VISA / MASTERCARD)
                    </span>
                    <p className="text-[11px] text-black/60 mt-0.5">
                      Paiement international sécurisé 3D Secure 256-bit.
                    </p>
                  </div>
                </label>
              </div>

              {/* Order total recap strip */}
              <div className="p-4 bg-[#EFECE8] border border-black/10 flex items-center justify-between text-xs">
                <span>TOTAL À RÉGLER :</span>
                <span className="text-base font-bold tabular-nums text-[#9A3B5A]">
                  {total.toLocaleString('fr-FR')} FCFA
                </span>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-semibold tracking-wider uppercase text-black/60 hover:text-black flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft size={13} />
                  <span>Retour</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#9A3B5A] hover:bg-[#802D47] text-white px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>CONFIRMER ET PAYER {total.toLocaleString('fr-FR')} FCFA</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#1E5128] text-white flex items-center justify-center mx-auto">
                <Check size={32} />
              </div>
              <h4 className="font-display text-2xl font-bold uppercase tracking-wider text-black">
                MERCI POUR VOTRE COMMANDE
              </h4>
              <p className="text-xs sm:text-sm text-black/70 max-w-md mx-auto leading-relaxed">
                Votre commande <b className="text-black">#MZ-2026-8491</b> a été enregistrée avec succès.
                Une confirmation vous a été envoyée par SMS et notification.
              </p>

              <div className="bg-white p-5 border border-black/10 max-w-md mx-auto text-left text-xs space-y-2 mt-4">
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/60">Destinataire :</span>
                  <span className="font-bold">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/60">Téléphone :</span>
                  <span className="font-bold">{formData.phone}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/60">Mode de paiement :</span>
                  <span className="font-bold uppercase">{formData.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm">
                  <span className="font-bold">Total réglé :</span>
                  <span className="font-bold text-[#9A3B5A]">{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onClose}
                  className="bg-black text-white hover:bg-[#9A3B5A] px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-colors cursor-pointer"
                >
                  RETOURNER À LA BOUTIQUE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
