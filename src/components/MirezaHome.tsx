import { useState } from 'react';
import { Search, UserRound, ShoppingBag, ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { IMAGES, PRODUCTS } from '../data/products';
import { NewsletterSection } from './NewsletterSection';
import { ShopTheLook } from './ShopTheLook';

const slides = [
  { image: IMAGES.heroPanther, title: 'DISCOVER MIREZA', subtitle: 'UNE NOUVELLE VISION DE LA FÉMINITÉ', link: '#collection-01' },
  { image: IMAGES.campaignPanthereRose, title: 'PANTHÈRE ROSE', subtitle: 'L’AUDACE EN ROSE', link: '#collection-01' },
  { image: IMAGES.campaignCaribbeanNoir, title: 'CARIBBEAN NOIR', subtitle: 'DARK. BOLD. UNAPOLOGETIC.', link: '#collection-02' },
  { image: IMAGES.categorySwimwear, title: 'THE NEW SHAPE', subtitle: 'DES SILHOUETTES QUI AFFIRMENT', link: '#shop' },
];

export function MirezaHome() {
  const [slide, setSlide] = useState(0);
  const [cartCount, setCartCount] = useState(() => { try { return JSON.parse(localStorage.getItem('mireza-demo-cart') || '[]').reduce((sum: number, item: { qty?: number }) => sum + (item.qty || 1), 0); } catch { return 0; } });
  const [added, setAdded] = useState<string[]>([]);
  const current = slides[slide];
  const changeSlide = (step: number) => setSlide((value) => (value + step + slides.length) % slides.length);
  const addProduct = (id: string) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) {
      const cart = JSON.parse(localStorage.getItem('mireza-demo-cart') || '[]');
      cart.push({ productId: product.id, size: product.sizes[0], color: product.colors[0]?.name || '', qty: 1 });
      localStorage.setItem('mireza-demo-cart', JSON.stringify(cart));
    }
    setCartCount((count) => count + 1);
    setAdded((items) => [...items, id]);
  };

  return <main className="bg-white text-[#171315]">
    {/* HEADER */}
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F5] border-0 text-[#171315] shadow-sm">
      <div className="h-[72px] px-4 md:px-8 grid grid-cols-3 items-center">
        <a href="#top" className="justify-self-start font-serif text-xl md:text-2xl font-bold tracking-[.16em]">MIREZA</a>
        <nav className="hidden md:flex justify-center gap-7 text-[10px] tracking-[.15em] uppercase">
          <a className="border-b border-white pb-1" href="#top">Accueil</a><a className="hover:border-b border-black pb-1" href="/collections">Collections</a><a className="hover:border-b border-white pb-1" href="/shop">Boutique</a><a className="hover:border-b border-white pb-1" href="/discovery">Discovery</a><a className="hover:border-b border-white pb-1" href="#shop-the-look">Shop the Look</a>
        </nav>
        <div className="justify-self-end flex items-center gap-3 md:gap-5">
          <a href="/shop" aria-label="Search" className="hover:text-[#d34b91] transition-colors"><Search size={18}/></a>
          <a href="/account" aria-label="Account" className="hover:text-[#d34b91] transition-colors"><UserRound size={18}/></a>
          <a href="/cart" aria-label="Shopping bag" className="relative hover:text-[#d34b91] transition-colors"><ShoppingBag size={18}/><span className="absolute -top-2 -right-2 bg-[#d34b91] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span></a>
        </div>
      </div>
      <nav className="md:hidden flex justify-center gap-5 pb-3 text-[9px] tracking-[.13em] uppercase text-black"><a href="#top">Accueil</a><a href="/collections">Collections</a><a href="/shop">Boutique</a><a href="/discovery">Discovery</a></nav>
    </header>

    {/* HERO / FOUR-SLIDE CAMPAIGN */}
    <section id="top" className="relative h-[100vh] min-h-[600px] md:h-[100vh] max-h-[1000px] overflow-hidden bg-[#e7c5d3] text-white">
      {slides.map((item, i) => <img key={item.title} src={item.image} alt={item.title} className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${i===slide?'opacity-100':'opacity-0'}`} />)}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent"/>
      <div className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 max-w-2xl">
        <p className="text-[10px] md:text-xs tracking-[.25em] mb-4">{current.subtitle}</p>
        <h1 className="font-serif font-bold uppercase tracking-[.06em] text-4xl sm:text-6xl md:text-8xl leading-[.95]">{current.title}</h1>
        <a href={current.link} className="inline-flex items-center gap-4 mt-7 bg-[#171315] text-white rounded-full px-7 py-4 text-[10px] tracking-[.15em] uppercase hover:bg-[#d34b91] transition-colors">Explorer la collection <ArrowRight size={15}/></a>
      </div>
      <button onClick={()=>changeSlide(-1)} aria-label="Previous slide" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 border border-white/60 w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"><ArrowLeft size={16}/></button>
      <button onClick={()=>changeSlide(1)} aria-label="Next slide" className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 border border-white/60 w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"><ArrowRight size={16}/></button>
      <div className="absolute bottom-7 left-6 md:left-14 flex items-center gap-4 text-[10px] tracking-widest"><span>0{slide+1} / 0{slides.length}</span><div className="w-24 md:w-36 h-px bg-white/40"><div className="h-px bg-white transition-all duration-500" style={{width:`${(slide+1)/slides.length*100}%`}}/></div></div>
      <div className="absolute bottom-6 right-5 md:right-10 flex gap-2">{slides.map((item,i)=><button key={item.title} onClick={()=>setSlide(i)} aria-label={`Show slide ${i+1}`} className={`w-12 h-14 md:w-16 md:h-20 border-2 ${i===slide?'border-white':'border-white/30'} overflow-hidden transition`}><img src={item.image} alt="" className="w-full h-full object-cover"/></button>)}</div>
    </section>

    {/* DUAL SUB-COLLECTIONS — edge-to-edge */}
    <section id="collections" className="grid grid-cols-1 md:grid-cols-2 gap-0">
      <a id="collection-01" href="/collections/panthere-rose" className="group relative h-[68vh] min-h-[480px] overflow-hidden block bg-[#dba0bc]">
        <img src={IMAGES.campaignPanthereRose} alt="Pink Leopard collection" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"/>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"/>
        <div className="absolute bottom-8 left-7 md:bottom-12 md:left-12 text-white"><p className="text-[10px] tracking-[.2em] uppercase">Sub-collection 01</p><h2 className="font-serif text-4xl md:text-6xl mt-2">Pink Leopard</h2><span className="inline-flex items-center gap-2 mt-5 text-[10px] tracking-[.15em] uppercase border-b border-white pb-2">Shop the edit <ArrowRight size={13}/></span></div>
      </a>
      <a id="collection-02" href="/collections/caribbean-noir" className="group relative h-[68vh] min-h-[480px] overflow-hidden block bg-[#343238]">
        <img src={IMAGES.campaignCaribbeanNoir} alt="Dark streetwear collection" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"/>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"/>
        <div className="absolute bottom-8 left-7 md:bottom-12 md:left-12 text-white"><p className="text-[10px] tracking-[.2em] uppercase">Sub-collection 02</p><h2 className="font-serif text-4xl md:text-6xl mt-2">Dark Street</h2><span className="inline-flex items-center gap-2 mt-5 text-[10px] tracking-[.15em] uppercase border-b border-white pb-2">Shop the edit <ArrowRight size={13}/></span></div>
      </a>
    </section>

    {/* PRODUCT EDIT */}
    <section id="shop" className="px-0 py-6 md:py-8">
      <div className="flex justify-end items-end mb-3 md:mb-4 px-3 md:px-5"><a href="/shop" className="text-[10px] tracking-[.13em] uppercase border-b border-black pb-1">View all ↗</a></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px] md:gap-1">
        {PRODUCTS.slice(0,8).map((product)=> <article key={product.id} className="group">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f1f3]">
            <a href={`/product/${product.id}`} aria-label={`Voir ${product.name}`}><img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"/></a>
            <button onClick={()=>addProduct(product.id)} aria-label={`Quick add ${product.name}`} className="absolute bottom-3 right-3 w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-[#d34b91] hover:text-white transition"><Plus size={17}/></button>
            {added.includes(product.id)&&<span className="absolute top-3 left-3 bg-white px-2 py-1 text-[8px] uppercase tracking-widest">Added</span>}
          </div>
          <div className="pt-3 px-3 pb-5 flex justify-between gap-2"><div><h3 className="text-[10px] md:text-xs uppercase tracking-[.04em]">{product.name}</h3><p className="text-[10px] text-black/55 mt-1">{product.price.toLocaleString('fr-FR')} FCFA</p></div><button onClick={()=>addProduct(product.id)} className="text-[9px] uppercase tracking-widest underline underline-offset-4 self-start">Quick add</button></div>
        </article>)}
      </div>
    </section>


    {/* QUICK CATEGORY PILLS — no section heading */}
    <nav aria-label="Catégories" className="flex flex-wrap justify-center gap-2 md:gap-3 px-4 py-8 md:py-10 bg-white">
      {[{name:'Lingerie',slug:'lingerie'},{name:'Swimwear',slug:'swimwear'},{name:'Loungewear',slug:'homewear'},{name:'Accessoires',slug:'accessoires'},{name:'Toutes les pièces',slug:'shop'}].map(cat=><a key={cat.slug} href={cat.slug==='shop'?'/shop':'/category/'+cat.slug} className="rounded-full border border-black/20 px-5 py-3 text-[9px] md:text-[10px] uppercase tracking-[.16em] hover:bg-[#171315] hover:text-white transition-colors">{cat.name}</a>)}
    </nav>
    <ShopTheLook/>
    <div id="newsletter"><NewsletterSection/></div>
    <footer className="bg-[#171315] text-white px-5 md:px-8 py-10"><div className="flex flex-col md:flex-row justify-between gap-6"><span className="font-serif text-xl tracking-[.16em]">MIREZA</span><nav className="flex flex-wrap gap-6 text-[9px] tracking-[.14em] uppercase"><a href="#collections">Collections</a><a href="#shop">Boutique</a><a href="/journal">Journal</a><a href="/pages/contact">Contact</a><a href="/pages/a-propos">La Maison</a><a href="/pages/livraison">Livraison</a><a href="/pages/confidentialite">Confidentialité</a></nav><span className="text-[9px] text-white/50">© MIREZA CARIBBEAN</span></div></footer>
  </main>;
}
