import React, { useState } from 'react';

const image = (id: string, width = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=88`;

const looks = [
 {name:'Tropical Heat',category:'SWIMWEAR',caption:'Sun-drenched silhouettes. Made for your island.',image:'photo-1529139574466-a303027c1d8b',items:['Bikini sculptant','Paréo imprimé']},
 {name:'Panther Muse',category:'LINGERIE',caption:'Soft power, in every detail.',image:'photo-1539109136881-3be0616acf4b',items:['Ensemble lingerie','Body signature']},
 {name:'Island Afterglow',category:'RESORTWEAR',caption:'From golden hour to after hours.',image:'photo-1524504388940-b1c1722653e1',items:['Robe légère','Top noué']},
 {name:'Pink Paradise',category:'READY TO WEAR',caption:'A little bold. A lot of Mireza.',image:'photo-1525506538501-d6f7f6b5f3b5',items:['Set coordonné','Accessoires']}
];

function Discovery(){
 const [active,setActive]=useState(0);
 const next=()=>setActive(v=>(v+1)%looks.length);
 const prev=()=>setActive(v=>(v-1+looks.length)%looks.length);
 return <section id="discovery" className="relative overflow-hidden bg-[#f2dce5] text-[#24151d]">
  <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage:'linear-gradient(90deg, transparent 49.8%, #bd8ca5 50%, transparent 50.2%),linear-gradient(#bd8ca5 1px,transparent 1px)',backgroundSize:'100% 100%,100% 90px'}}/>
  <div className="relative px-5 md:px-10 pt-10 flex justify-between items-end"><div><p className="text-[10px] tracking-[.25em] uppercase mb-2">MIREZA / DISCOVERY EXPERIENCE</p><h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Meet your next look</h2></div><p className="hidden md:block text-xs max-w-xs text-right">Explore the looks. Select a silhouette to discover every piece.</p></div>
  <div className="relative h-[540px] md:h-[690px] flex items-end justify-center overflow-hidden">
   <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#d4a9bf]/70 to-transparent"/>
   {[-2,-1,1,2].map((offset)=>{
    const idx=(active+offset+looks.length*2)%looks.length;const depth=Math.abs(offset);
    return <button key={offset} onClick={()=>setActive(idx)} aria-label={`Découvrir ${looks[idx].name}`} className="absolute bottom-0 transition-all duration-700 ease-out focus:outline-none" style={{left:offset<0?`${50- depth*19}%`:`${50+depth*19}%`,transform:`translateX(-50%) scale(${depth===1?.72:.52})`,transformOrigin:'bottom center',zIndex:depth===1?4:2,opacity:depth===1?.78:.42,width:'42%',height:'83%'}}>
      <img src={image(looks[idx].image,900)} className="w-full h-full object-cover object-top" alt={looks[idx].name}/>
     </button>
   })}
   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[62%] md:w-[34%] h-[92%] transition-all duration-700">
    <img src={image(looks[active].image,1200)} alt={looks[active].name} className="w-full h-full object-cover object-top"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
    <div className="absolute bottom-6 left-5 right-5 text-white"><p className="text-[10px] tracking-[.2em]">{looks[active].category}</p><h3 className="text-2xl md:text-4xl font-black uppercase mt-1">{looks[active].name}</h3><p className="text-xs mt-2">{looks[active].caption}</p><button className="mt-4 border-b border-white pb-1 text-xs" onClick={()=>document.getElementById('shop-the-look')?.scrollIntoView({behavior:'smooth'})}>SHOP THIS LOOK ↗</button></div>
   </div>
  </div>
  <div className="relative px-5 md:px-10 pb-8 flex justify-between items-center"><div className="text-xs tracking-widest">0{active+1} <span className="opacity-40">/ 0{looks.length}</span></div><div className="flex gap-2"><button onClick={prev} className="border border-[#6b4058] w-11 h-11 hover:bg-[#6b4058] hover:text-white" aria-label="Look précédent">←</button><button onClick={next} className="border border-[#6b4058] w-11 h-11 hover:bg-[#6b4058] hover:text-white" aria-label="Look suivant">→</button></div></div>
  <div id="shop-the-look" className="relative border-t border-[#bd8ca5] px-5 md:px-10 py-5 flex flex-wrap gap-3 items-center"><span className="text-[10px] tracking-widest mr-2">PIÈCES DU LOOK</span>{looks[active].items.map(item=><a key={item} href="#collections" className="text-xs border-b border-[#6b4058] pb-1">{item} ↗</a>)}</div>
 </section>
}

export function MirezaHome(){
 return <div className="min-h-screen bg-white text-[#231820]">
  <div className="h-8 bg-[#f6e7ee] flex items-center justify-center text-[10px] tracking-[.12em] uppercase relative">Free shipping on selected orders <span className="absolute right-4">🇬🇭　GHS⌄</span></div>
  <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#eee5ea]">
   <div className="h-[68px] px-4 md:px-8 flex items-center justify-between gap-5">
    <a href="#top" className="font-black italic text-3xl tracking-[-.12em] text-[#b34f83]">MIREZA<span className="text-[9px] tracking-[.2em] block not-italic text-[#5c3348]">CARIBBEAN</span></a>
    <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-wide"><a href="#new">New</a><a href="#collections">Collections</a><a href="#discovery">Discovery</a><a href="#swim">Swimwear</a><a href="#lingerie">Lingerie</a><a href="#sale">Sale</a></nav>
    <div className="flex items-center gap-4 text-sm"><button aria-label="Search">⌕</button><button aria-label="Wishlist">♡</button><button aria-label="Account">♙</button><button aria-label="Cart">▱</button><button className="lg:hidden text-xl" aria-label="Menu">☰</button></div>
   </div>
  </header>
  <main id="top">
   <section id="new" className="relative min-h-[570px] md:min-h-[690px] h-[78vh] max-h-[900px] overflow-hidden bg-[#8b5c6d]">
    <img className="absolute inset-0 w-full h-full object-cover object-center" src={image('photo-1539109136881-3be0616acf4b',2200)} alt="Campagne Mireza Caribbean"/>
    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent"/>
    <div className="absolute bottom-10 md:bottom-16 left-5 md:left-12 text-white max-w-2xl"><p className="text-[10px] tracking-[.28em] uppercase mb-4">MIREZA CARIBBEAN / NEW CAMPAIGN</p><h1 className="font-black text-4xl md:text-7xl uppercase leading-[.95]">Made for<br/>island energy.</h1><p className="mt-4 text-sm md:text-base max-w-md">Des silhouettes audacieuses. Une énergie solaire. L’esprit des Caraïbes, signé Mireza.</p><a className="inline-block border-b border-white pb-2 text-xs uppercase tracking-widest mt-7" href="#collections">Découvrir la collection ↗</a></div>
    <div className="absolute bottom-5 right-6 text-white text-xs tracking-widest">01 — 04</div>
   </section>
   <section aria-label="Mireza campaign gallery" className="overflow-hidden py-3 bg-[#f8edf2] border-b border-[#ead8e2]"><div className="flex w-max animate-[mireza-marquee_36s_linear_infinite] gap-5 items-center">{Array.from({length:2}).map((_,loop)=><div key={loop} className="flex gap-5 items-center">{['ISLAND GIRL ENERGY','SUN-KISSED SKIN','BOLD BY NATURE','CARIBBEAN MADE'].map(t=><span key={t} className="text-[10px] md:text-xs tracking-[.25em] uppercase whitespace-nowrap">{t}<span className="text-[#b34f83] mx-5">✳</span></span>)}</div>)}</div></section>
   <section id="collections" className="py-12 md:py-16 px-4 md:px-8"><div className="flex justify-between items-end mb-6"><div><p className="text-[10px] tracking-[.25em] uppercase text-[#b34f83]">The Mireza universe</p><h2 className="text-2xl md:text-4xl font-black uppercase mt-2">Find your island mood</h2></div><a href="#discovery" className="hidden md:block text-xs border-b pb-1">Explore all ↗</a></div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">{[['SWIM','photo-1529139574466-a303027c1d8b'],['LINGERIE','photo-1594633312681-425c7b97ccd1'],['RESORTWEAR','photo-1524504388940-b1c1722653e1'],['READY TO WEAR','photo-1525506538501-d6f7f6b5f3b5']].map(([n,img])=><a href="#discovery" key={n} className="group"><div className="aspect-[3/4] overflow-hidden bg-[#f3e5ec]"><img src={image(img,850)} alt={n} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"/></div><h3 className="text-[10px] md:text-xs tracking-widest font-bold mt-3">{n} ↗</h3></a>)}</div>
   </section>
   <Discovery/>
   <section id="swim" className="relative mx-4 md:mx-8 my-5 h-[60vh] min-h-[430px] overflow-hidden bg-[#c28aa7]"><img className="absolute inset-0 w-full h-full object-cover" src={image('photo-1529139574466-a303027c1d8b',2000)} alt="Mireza swim collection"/><div className="absolute inset-0 bg-black/25"/><div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 text-white"><p className="text-[10px] tracking-[.25em]">COLLECTION 01</p><h2 className="font-black text-4xl md:text-6xl uppercase mt-2">Salt in the air</h2><p className="mt-3 text-sm">Swimwear, made to make waves.</p><a href="#discovery" className="inline-block mt-5 border-b pb-2 text-xs tracking-widest">SHOP SWIM ↗</a></div></section>
   <section id="lingerie" className="grid md:grid-cols-2 gap-2 md:gap-4 px-4 md:px-8 my-8"><article className="relative min-h-[500px] md:h-[70vh] overflow-hidden"><img src={image('photo-1594633312681-425c7b97ccd1',1300)} alt="Mireza lingerie" className="absolute inset-0 w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/><div className="absolute bottom-7 left-6 text-white"><p className="text-[10px] tracking-widest">COLLECTION 02</p><h2 className="text-3xl md:text-5xl font-black uppercase mt-2">Soft power</h2><p className="text-sm mt-2">Lingerie that feels like you.</p><a href="#discovery" className="inline-block mt-5 border-b pb-1 text-xs">SHOP LINGERIE ↗</a></div></article><article className="relative min-h-[500px] md:h-[70vh] overflow-hidden bg-[#f0d9e5]"><img src={image('photo-1525506538501-d6f7f6b5f3b5',1300)} alt="Mireza resort style" className="absolute inset-0 w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"/><div className="absolute bottom-7 left-6 text-white"><p className="text-[10px] tracking-widest">CARIBBEAN LIVING</p><h2 className="text-3xl md:text-5xl font-black uppercase mt-2">Beyond the beach</h2><p className="text-sm mt-2">From sunrise to late nights.</p><a href="#collections" className="inline-block mt-5 border-b pb-1 text-xs">DISCOVER ↗</a></div></article></section>
   <section id="sale" className="bg-[#c986aa] text-white text-center py-20 md:py-28 px-5"><p className="text-[10px] tracking-[.3em] uppercase">A little extra love</p><h2 className="font-black uppercase text-3xl md:text-5xl max-w-2xl mx-auto mt-3">Pink season.<br/>Special prices.</h2><p className="text-sm mt-4">Discover selected pieces and limited offers.</p><a href="#collections" className="underline text-xs mt-6 inline-block">SHOP THE EDIT ↗</a></section>
   <section className="py-16 md:py-24 px-5 text-center border-b border-[#eee5ea]"><p className="text-[10px] tracking-[.3em] uppercase text-[#b34f83]">Our point of view</p><h2 className="uppercase font-black text-xl md:text-3xl leading-relaxed max-w-4xl mx-auto mt-4">Born from island energy.<br/>Made for every version of you.</h2></section>
   <section className="bg-[#f8edf2] px-5 md:px-8 py-12 md:py-16 flex flex-col md:flex-row justify-between gap-8"><div><p className="text-[10px] tracking-widest uppercase">Stay in the know</p><h2 className="text-2xl md:text-3xl font-black uppercase mt-2">Letters from Mireza</h2><p className="text-sm mt-2">New drops, island stories and first access.</p></div><form className="flex w-full md:max-w-xl border-b border-[#6b4058]" onSubmit={e=>{e.preventDefault();alert('Merci ! Votre inscription sera bientôt activée.')}}><input type="email" required placeholder="Your email address" className="bg-transparent flex-1 min-w-0 py-3 text-sm outline-none"/><button className="text-xs uppercase tracking-widest px-3">Subscribe ↗</button></form></section>
  </main>
  <footer className="px-5 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs border-t"><div><a href="#top" className="font-black italic text-2xl tracking-[-.1em] text-[#b34f83]">MIREZA</a><p className="text-[10px] tracking-widest mt-1">CARIBBEAN</p></div><div><b className="tracking-widest">SHOP</b><p className="mt-4 leading-7"><a href="#new">New arrivals</a><br/><a href="#collections">Collections</a><br/><a href="#swim">Swimwear</a><br/><a href="#lingerie">Lingerie</a></p></div><div><b className="tracking-widest">CLIENT CARE</b><p className="mt-4 leading-7">Contact<br/>Shipping & returns<br/>FAQ</p></div><div><b className="tracking-widest">FOLLOW MIREZA</b><p className="mt-4 leading-7">Instagram<br/>TikTok<br/>© MIREZA CARIBBEAN</p></div></footer>
  <style>{`@keyframes mireza-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}html{scroll-behavior:smooth}`}</style>
 </div>
}
