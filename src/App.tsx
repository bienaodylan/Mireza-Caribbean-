import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { WebsiteEditor } from './components/WebsiteEditor';
import { MirezaHome } from './components/MirezaHome';
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
import { ShopPage, ProductPage, AccountPage } from './pages/StorePages';

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

  const path = window.location.pathname;
  if (path === '/admin/website-editor') return <WebsiteEditor />;
  if (path === '/shop' || path === '/boutique') return <ShopPage />;
  if (path.startsWith('/product/')) return <ProductPage id={path.split('/')[2] || ''} />;
  if (path === '/account' || path === '/mon-compte') return <AccountPage />;

  return <MirezaHome />;
}
