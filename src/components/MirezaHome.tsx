import React from 'react';

const photo = (id:string,w=1800)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const categories = [
 {name:'PAJAMAS',img:'photo-151 actriz'}, 
];
export function MirezaHome(){
 const cards=[
  ['PAJAMAS','photo-151 ئە'],
  ['MATCHING SETS','photo-衣'],
  ['MEN','photo-1618354691373-d851c5c3a990'],
  ['CLOTHING','photo-1529139574466-a303027c1d8b']
 ];
 return <div className="min-h-screen bg-white text-[#252525]">
  <div className="h-7 flex items-center justify-center text-[10px] tracking-wide border-b">International Shipping Available <span className="absolute right-5">🇬🇭　USD⌄</span></div>
  <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b">
   <div className="h-12 px-5 flex items-center justify-between gap-5">
    <a href="#" className="font-black italic text-2xl tracking-[-.12em] text-[#b7c8cf]">MIREZA</a>
    <nav className="hidden lg:flex items-center gap-5 text-[11px]"><a>New</a><a>Holiday Shop</a><a className="italic font-bold">MIREZA</a><a>Best Sellers</a><a>Clothing</a><a>Bras</a><a>Underwear</a><a>Shapewear</a><a>Men</a><a>Accessories</a><a>Kids</a><a>Sale</a></nav>
    <div className="flex items-center gap-4 text-xs"><span className="rounded-full bg-gray-100 px-4 py-2">⌕ Search</span><span>♡</span><span>♙</span><span>♧</span></div>
   </div>
  </header>
  <main>
   <section className="relative h-[62vh] min-h-[430px] max-h-[780px] bg-[#b9b9b9] overflow-hidden">
    <img className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2200&q=90" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5"/>
    <div className="absolute bottom-9 left-5 md:left-8 text-white max-w-xl"><p className="text-[11px] uppercase tracking-[.2em] mb-3">MIREZA — THE NEW DROP</p><h1 className="font-black text-3xl md:text-5xl tracking-tight uppercase">Coming soon: The Mireza Waffle Racer</h1><p className="mt-2 text-sm">A classic enters the Mireza lineup. Discover the next icon.</p><a className="inline-block underline text-xs mt-5" href="#categories">Join the Waitlist</a></div>
    <div className="absolute bottom-5 right-6 text-white">Ⅱ</div>
   </section>
   <section id="categories" className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 md:p-4">
    {[
      ['PAJAMAS','photo-1515886657613-9f3515b0c78f'],
      ['MATCHING SETS','photo-1524504388940-b1c1722653e1'],
      ['MEN','photo-1618354691373-d851c5c3a990'],
      ['CLOTHING','photo-1529139574466-a303027c1d8b']
    ].map(([name,img])=><a className="group" key={name}><div className="aspect-[3/4] overflow-hidden bg-gray-100"><img className="w-full h-full object-cover group-hover:scale-[1.02] transition" src={photo(img,900)}/></div><h3 className="text-[11px] font-bold mt-3">{name}</h3></a>)}
   </section>
   <section className="relative mx-3 md:mx-4 h-[62vh] min-h-[420px] overflow-hidden bg-[#b9a49a]">
    <img className="absolute inset-0 w-full h-full object-cover" src={photo('photo-1512436991641-6745cdb1723f',2000)}/><div className="absolute inset-0 bg-black/20"/>
    <div className="absolute bottom-8 left-5 md:left-8 text-white"><h2 className="font-black text-3xl md:text-5xl uppercase">The Mireza Holiday Shop</h2><p className="text-sm mt-2">Everything you need for the holiday season is here.</p><a className="underline text-xs inline-block mt-5">Shop Now</a></div>
   </section>
   <section className="grid md:grid-cols-2 gap-3 p-3 md:p-4">
    {[
      ['T-SHIRTS','Tops so good, you’ll want one in every color.','photo-1521572163474-6864f9cf17ab'],
      ['BRAS','Everyday essentials, elevated.','photo-1594633312681-425c7b97ccd1']
    ].map(([title,desc,img])=><article className="relative aspect-[.78] md:aspect-[.9] overflow-hidden bg-gray-100" key={title}><img className="w-full h-full object-cover" src={photo(img,1400)}/><div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"/><div className="absolute bottom-7 left-5 text-white"><h3 className="font-bold text-xl uppercase">{title}</h3><p className="text-xs mt-1">{desc}</p><a className="underline text-xs mt-4 inline-block">Shop Now</a></div></article>)}
   </section>
   <section className="bg-[#c7aa98] text-white text-center py-20 md:py-24 px-5"><h2 className="font-black uppercase text-3xl md:text-4xl max-w-xl mx-auto">New markdowns: up to 50% off</h2><p className="text-sm mt-3">Save big on new styles just added to sale!</p><a className="underline text-xs mt-5 inline-block">Shop Now</a></section>
   <section className="py-20 md:py-24 px-5 text-center border-b"><h2 className="uppercase font-black text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">Mireza is a solutions oriented brand<br/> creating the next generation of underwear,<br/> clothing and shapewear.</h2></section>
  </main>
  <footer className="grid grid-cols-3 gap-6 px-8 py-12 text-xs"><div><b>HELP</b><p className="mt-4 leading-7">Contact us<br/>Shipping<br/>Returns</p></div><div><b>STAY IN THE KNOW</b><p className="mt-4">Subscribe for updates</p></div><div><b>MORE</b><p className="mt-4 leading-7">About Mireza<br/>Careers<br/>Instagram</p></div></footer>
 </div>
}
