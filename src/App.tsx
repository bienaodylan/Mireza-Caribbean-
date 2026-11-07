import { WebsiteEditor } from './components/WebsiteEditor';
import { MirezaHome } from './components/MirezaHome';
import { ShopPage, ProductPage, AccountPage, CollectionsPage, CollectionDetailPage, CategoryPage, DiscoveryPage, JournalPage, JournalArticlePage, CartPage, CheckoutPage, InstitutionalPage, StoreShell, AdminDashboard, NotFound, WishlistPage } from './pages/StorePages';

export default function App() {
  const path = window.location.pathname.replace(/\\/+$/, '') || '/';
  const segment = (n:number) => decodeURIComponent(path.split('/')[n] || '');
  // Administration stays on its own shell and is never rendered inside the public storefront.
  if (path === '/admin') return <AdminDashboard />;
  if (path === '/admin/website-editor') return <WebsiteEditor />;
  if (['/shop','/boutique','/store'].includes(path)) return <StoreShell><ShopPage /></StoreShell>;
  if (path.startsWith('/product/')) return <StoreShell><ProductPage id={segment(2)} /></StoreShell>;
  if (path.startsWith('/pages/')) return <StoreShell><InstitutionalPage slug={segment(2)} /></StoreShell>;
  if (path === '/collections') return <StoreShell><CollectionsPage /></StoreShell>;
  if (path.startsWith('/collections/')) return <StoreShell><CollectionDetailPage slug={segment(2)} /></StoreShell>;
  if (path.startsWith('/category/')) return <StoreShell><CategoryPage slug={segment(2)} /></StoreShell>;
  if (path === '/discovery' || path === '/experience') return <StoreShell><DiscoveryPage /></StoreShell>;
  if (path === '/journal' || path === '/stories') return <StoreShell><JournalPage /></StoreShell>;
  if (path.startsWith('/journal/') || path.startsWith('/stories/')) return <StoreShell><JournalArticlePage slug={segment(2)} /></StoreShell>;
  if (['/cart','/panier','/bag'].includes(path)) return <StoreShell><CartPage /></StoreShell>;
  if (path === '/checkout' || path === '/commande') return <StoreShell><CheckoutPage /></StoreShell>;
  if (['/account','/mon-compte','/login','/register','/connexion','/inscription','/profile','/profil','/forgot-password','/reset-password'].includes(path)) return <StoreShell><AccountPage /></StoreShell>;
  if (['/wishlist','/favorites','/favoris'].includes(path)) return <StoreShell><WishlistPage /></StoreShell>;
  if (path === '/') return <MirezaHome />;
  return <StoreShell><NotFound /></StoreShell>;
}
