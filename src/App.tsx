import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { InstagramGallery } from './components/InstagramGallery';
import { CollectionsPresentation } from './components/CollectionsPresentation';
import { CollectionBlock } from './components/CollectionBlock';
import { PromotionsSection } from './components/PromotionsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { PRODUCTS, IMAGES } from './data/products';
import { Product, CartItem } from './types/store';

export default function App() {
  // Cart state initialized with 1 luxury item so the bag is demonstrative and interactive immediately
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedSize: 'S',
      selectedColor: { name: 'Rose Poudré', hex: '#E8B4B8' },
      quantity: 1,
    },
  ]);

  // Wishlist state initialized with 1 favorite
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1]]);

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedSize: string,
    selectedColor: { name: string; hex: string }
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor.name === selectedColor.name
      );
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, selectedSize, selectedColor, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedSize === size))
    );
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Section navigation
  const handleNavigate = (target: string) => {
    if (target === 'boutique' || target === 'nouveautes') {
      const el = document.getElementById('collection-01');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'collection-01' || target === 'collection-02') {
      const el = document.getElementById(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Collection 01 & 02 product sets
  const collection01Products = PRODUCTS.filter(
    (p) => p.collection === 'panthere-rose' || p.category === 'homewear' || p.id === 'mz-001'
  );
  const collection02Products = PRODUCTS.filter(
    (p) => p.collection === 'caribbean-noir' || p.category === 'swimwear' || p.id === 'mz-004'
  );

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#121212] flex flex-col font-sans selection:bg-[#E8B4B8] selection:text-black">
      {/* SECTION 01 — NAVIGATION */}
      <Navigation
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* SECTION 02 — HERO / DISCOVERY SCROLL */}
        <HeroSection
          onExploreCollection={(id) => handleNavigate(id)}
          onExploreNew={() => handleNavigate('collection-01')}
        />

        {/* SECTION 03 — GALERIE INSTAGRAM (DÉFILEMENT CONTINU) */}
        <InstagramGallery />

        {/* SECTION 04 — GRANDE PRÉSENTATION DES COLLECTIONS & GRILLE 4-COLONNES STYLE SKIMS */}
        <CollectionsPresentation
          onSelectCategory={() => handleNavigate('collection-01')}
        />

        {/* SECTION 05 — COLLECTION PRINCIPALE 01 (PANTHÈRE ROSE) */}
        <CollectionBlock
          id="collection-01"
          number="COLLECTION 01"
          subtitle="SATIN POUDRÉ & LÉOPARD"
          title="PANTHÈRE ROSE"
          description="L'audace graphique du léopard réinventée dans une palette de roses poudrés, sables chauds et soies fluides. Des pièces sensuelles pensées pour régner en toute liberté."
          bannerImage={IMAGES.campaignPanthereRose}
          theme="rose"
          featuredProducts={collection01Products}
          onExploreCollection={handleNavigate}
          onQuickView={(p) => setQuickViewProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={isWishlisted}
        />

        {/* SECTION 06 — COLLECTION PRINCIPALE 02 (CARIBBEAN NOCTURNE) */}
        <CollectionBlock
          id="collection-02"
          number="COLLECTION 02"
          subtitle="VELOURS OBSIDIENNE & ROSE PROFOND"
          title="CARIBBEAN NOCTURNE"
          description="L'élégance architecturale des nuits caribéennes. Découpes nettes, velours d'ébène et accents rose profond dans un jeu de clair-obscur ultra-luxueux."
          bannerImage={IMAGES.campaignCaribbeanNoir}
          theme="noir"
          featuredProducts={collection02Products}
          onExploreCollection={handleNavigate}
          onQuickView={(p) => setQuickViewProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={isWishlisted}
        />

        {/* SECTION 07 — PROMOTIONS & ÉCRIN PRIVILÈGE */}
        <PromotionsSection
          onExplorePromotions={() => setIsCartOpen(true)}
        />

        {/* SECTION 08 — NEWSLETTER CERCLE PRIVÉ */}
        <NewsletterSection />
      </main>

      {/* SECTION 09 — FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* INTERACTIVE DRAWERS & MODALS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemove={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? isWishlisted(quickViewProduct.id) : false}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />
    </div>
  );
}
