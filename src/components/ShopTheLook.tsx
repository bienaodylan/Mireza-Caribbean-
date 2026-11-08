import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IMAGES, PRODUCTS } from '../data/products';

const looks = [
 {title:'PANTHÈRE ROSE',image:IMAGES.campaignPanthereRose,ids:['mz-003','mz-008','mz-006']},
 {title:'CARIBBEAN NOIR',image:IMAGES.campaignCaribbeanNoir,ids:['mz-004','mz-007','mz-001']},
 {title:'SIGNATURE SCULPT',image:IMAGES.heroPanther,ids:['mz-005','mz-001','mz-002']},
 {title:'THE NEW SHAPE',image:IMAGES.categorySwimwear,ids:['mz-002','mz-006','mz-008']}
];

export function ShopTheLook(){
 const [active,setActive]=useState(0),[paused,setPaused]=useState(false),[open,setOpen]=useState(false),[cart,setCart]=useState<string[]>([]);
 useEffect(()=>{if(paused||open)return;const timer=window.setInterval(()=>setActive(v=>(v+1)%looks.length),5500);return()=>window.clearInterval(timer)},[paused,open]);
 const look=looks[active];
 const add=(id:string)=>{const p=PRODUCTS.find(x=>x.id===id);if(p){const demo=JSON.parse(localStorage.getItem('mireza-demo-cart')||'[]');demo.push({productId:p.id,size:p.sizes[0],color:p.colors[0]?.name||'',qty:1});localStorage.setItem('mireza-demo-cart',JSON.stringify(demo));}setCart(v=>v.concat(id));};
 return <section id="shop-the-look" className="w-full overflow-hidden bg-[#e9c6d7] text-white [perspective:1400px]" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)}>
  <div className="relative h-[620px] sm:h-[740px] lg:h-[min(88vh,900px)]">
   {looks.map((x,i)=><img key={x.title} src={x.image} alt={x.title} loading={i===0?'eager':'lazy'} className={'absolute inset-0 w-full h-full object-cover transition-all duration-1000 [transform-style:preserve-3d] '+(i===active?'opacity-100 [transform:translateZ(0)_scale(1)]':'opacity-0 [transform:translateZ(-90px)_scale(.94)]')}/>)}
   <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/15 pointer-events-none"/>\n   <div className="absolute inset-5 md:inset-10 border border-white/15 pointer-events-none [transform:translateZ(35px)]"/>
   <div className="absolute top-8 left-5 md:left-12"><p className="text-[9px] tracking-[.28em] uppercase">MIREZA · Interactive editorial</p><h2 className="font-serif text-3xl md:text-5xl uppercase mt-2">Shop the Look</h2></div>
   <button onClick={()=>setOpen(true)} aria-label="Open look details" className="absolute left-[48%] top-[48%] w-11 h-11 rounded-full border border-white/80 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition"><span className="w-2 h-2 bg-white rounded-full"/></button>
   <button onClick={()=>setOpen(true)} className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-white text-black px-5 py-3 text-[9px] uppercase tracking-[.18em]">Découvrir ce look +</button>
   <button onClick={()=>setActive(v=>(v+looks.length-1)%looks.length)} aria-label="Previous look" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 border border-white/60 w-10 h-10 flex items-center justify-center"><ArrowLeft size={16}/></button>
   <button onClick={()=>setActive(v=>(v+1)%looks.length)} aria-label="Next look" className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 border border-white/60 w-10 h-10 flex items-center justify-center"><ArrowRight size={16}/></button>
   <div className="absolute bottom-7 left-5 md:left-12 flex items-center gap-3 text-[10px] tracking-widest"><span>0{active+1} / 0{looks.length}</span><div className="w-20 md:w-32 h-px bg-white/40"><div className="h-px bg-white" style={{width:((active+1)/looks.length*100)+'%'}}/></div></div>
   <div className="absolute bottom-5 right-4 md:right-8 flex gap-1.5">{looks.map((x,i)=><button key={x.title} onClick={()=>setActive(i)} aria-label={'Look '+(i+1)} className={'w-10 h-14 md:w-14 md:h-16 border-2 overflow-hidden '+(i===active?'border-white':'border-white/35')}><img src={x.image} alt="" className="h-full w-full object-cover"/></button>)}</div>
  </div>
  {open&&<div className="fixed inset-0 z-[80] flex justify-end bg-black/50" role="dialog" aria-modal="true" aria-label="Shop this look" onClick={()=>setOpen(false)}>
   <div className="w-full sm:max-w-md bg-white text-[#171315] p-5 md:p-7 overflow-y-auto shadow-2xl" onClick={e=>e.stopPropagation()}>
    <div className="flex justify-between items-center border-b pb-4"><div><p className="text-[9px] tracking-[.2em] uppercase text-[#d34b91]">Shop the look</p><h3 className="font-serif text-2xl mt-1">{look.title}</h3></div><button onClick={()=>setOpen(false)} aria-label="Close" className="text-2xl">×</button></div>
    <div className="mt-5 space-y-4">{look.ids.map(id=>{const p=PRODUCTS.find(x=>x.id===id);if(!p)return null;return <article key={p.id} className="flex gap-4 border-b pb-4"><img src={p.image} alt={p.name} className="w-24 h-32 object-cover bg-[#f5f1f3]"/><div className="flex-1 flex flex-col justify-center"><h4 className="text-[10px] uppercase leading-relaxed">{p.name}</h4><p className="text-xs mt-2">{p.price.toLocaleString('fr-FR')} FCFA</p><p className="text-[9px] text-black/50 mt-1">{p.colors?.map(x=>x.name).join(' · ')}</p><div className="flex gap-3 mt-3"><a href={'/product/'+p.id} className="text-[9px] uppercase underline underline-offset-4">View product</a><button onClick={()=>add(p.id)} className="text-[9px] uppercase underline underline-offset-4">{cart.includes(p.id)?'Added':'Quick add'}</button></div></div></article>})}</div>
    <button onClick={()=>setOpen(false)} className="w-full mt-6 bg-black text-white py-3 text-[10px] uppercase tracking-widest">Continue browsing</button>
   </div>
  </div>}
 </section>;
}
