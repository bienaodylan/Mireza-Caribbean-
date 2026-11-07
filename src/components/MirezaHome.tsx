import { useEffect, useRef, useState } from 'react';
import { IMAGES } from '../data/products';

const looks = [
  { name: 'CARIBBEAN SWIM', sub: '01 / SWIM', img: IMAGES.categorySwimwear },
  { name: 'PANTHÈRE ROSE', sub: '02 / SIGNATURE', img: IMAGES.campaignPanthereRose },
  { name: 'CARIBBEAN NOIR', sub: '03 / EDITION', img: IMAGES.campaignCaribbeanNoir },
  { name: 'LINGERIE', sub: '04 / INTIMATES', img: IMAGES.categoryLingerie },
];

export function MirezaHome() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(0);
  const wheelLock = useRef(false);
  const move = (step: number) => setIndex((current) => (current + step + looks.length) % looks.length);

  useEffect(() => {
    const stage = document.getElementById('discovery-stage');
    if (!stage) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 25 || wheelLock.current) return;
      wheelLock.current = true;
      move(event.deltaY > 0 ? 1 : -1);
      window.setTimeout(() => { wheelLock.current = false; }, 650);
    };
    stage.addEventListener('wheel', onWheel, { passive: true });
    return () => stage.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return <main className="bg-white text-[#171315]">
    <header className="sticky top-0 z-50 bg-white border-b border-black/10">
      <div className="h-7 bg-black text-white flex items-center justify-center text-[9px] tracking-[.22em] uppercase">MIREZA CARIBBEAN · NEW SEASON</div>
      <div className="h-16 px-5 md:px-10 flex items-center justify-between">
        <nav className="hidden md:flex gap-7 text-[10px] tracking-[.15em] uppercase"><a href="#discovery">Discovery</a><a href="#collections">Collections</a><a href="#campaign">Campaign</a></nav>
        <a href="#" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-[.18em]">MIREZA</a>
        <div className="ml-auto flex gap-5 text-[10px] tracking-[.12em] uppercase"><a href="#collections">Shop</a><a href="#newsletter">Join</a></div>
      </div>
    </header>

    <section id="discovery" aria-label="Discovery interactive" className="bg-white">
      <div id="discovery-stage" className="relative h-[78vh] min-h-[520px] max-h-[900px] overflow-hidden touch-pan-y"
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#fff_0%,#f7f5f5_70%,#e9e5e6_100%)]"/>
        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#ded9dc] to-transparent"/>
        {[-2,-1,1,2].map((offset) => {
          const item = looks[(index + offset + looks.length) % looks.length];
          return <button key={offset} onClick={() => setIndex((index + offset + looks.length) % looks.length)} aria-label={item.name}
            className="absolute bottom-0 transition-all duration-700 ease-out"
            style={{ left: `calc(50% + ${Math.sign(offset) * (Math.abs(offset) === 1 ? 25 : 43)}%)`, transform: `translateX(-50%) scale(${Math.abs(offset) === 1 ? .62 : .4})`, transformOrigin:'bottom center', width:'36%',height:'88%',opacity:Math.abs(offset)===1?.48:.2,zIndex:Math.abs(offset)===1?3:1 }}>
            <img src={item.img} className="h-full w-full object-cover object-top" alt="" />
          </button>;
        })}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[97%] w-[65%] md:w-[36%] z-10 pointer-events-none">
          <img key={index} src={looks[index].img} className="w-full h-full object-cover object-top animate-[mireza-enter_.65s_ease-out]" alt={looks[index].name}/>
        </div>
        <div className="absolute top-6 left-5 right-5 md:left-10 md:right-10 z-20 flex justify-between text-[9px] tracking-[.2em] uppercase"><span>MIREZA / DISCOVERY</span><span>{looks[index].sub}</span></div>
        <div className="absolute left-5 md:left-10 bottom-8 z-20"><p className="text-[#bd4d83] text-[9px] tracking-[.2em] uppercase">The collection</p><h1 className="font-serif text-3xl md:text-5xl uppercase">{looks[index].name}</h1><a href="#collections" className="inline-block mt-3 text-[10px] uppercase tracking-widest border-b border-black pb-1">Discover ↗</a></div>
        <button onClick={() => move(-1)} className="absolute left-4 md:left-10 top-1/2 z-30 bg-white/80 border border-black/10 w-11 h-11 md:w-14 md:h-14 text-lg" aria-label="Previous look">←</button>
        <button onClick={() => move(1)} className="absolute right-4 md:right-10 top-1/2 z-30 bg-white/80 border border-black/10 w-11 h-11 md:w-14 md:h-14 text-lg" aria-label="Next look">→</button>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3 items-center text-[9px] tracking-widest"><span>0{index+1}</span><div className="w-20 h-px bg-black/20"><div className="h-px bg-[#bd4d83]" style={{width:`${(index+1)*25}%`}}/></div><span>04</span></div>
      </div>
    </section>

    <section id="collections" className="px-5 md:px-10 py-16 md:py-24">
      <div className="flex items-end justify-between mb-8"><h2 className="font-serif text-3xl md:text-5xl">The collections</h2><a href="#campaign" className="text-[10px] uppercase tracking-widest border-b border-black pb-1">View all ↗</a></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {looks.map((look) => <a href="#campaign" key={look.name} className="group block"><div className="aspect-[3/4] overflow-hidden bg-[#f3f0f1]"><img src={look.img} alt={look.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"/></div><p className="mt-3 text-[10px] tracking-[.12em] uppercase">{look.name}</p></a>)}
      </div>
    </section>
    <section id="campaign" className="relative min-h-[65vh] md:min-h-[80vh] overflow-hidden bg-black text-white"><img src={IMAGES.campaignCaribbeanNoir} alt="Mireza Caribbean campaign" className="absolute inset-0 w-full h-full object-cover opacity-85"/><div className="relative z-10 p-7 md:p-14 flex flex-col justify-end min-h-[65vh] md:min-h-[80vh]"><p className="text-[10px] tracking-[.25em] uppercase">Mireza campaign</p><h2 className="font-serif text-4xl md:text-7xl mt-3">Caribbean Noir</h2><a href="#collections" className="mt-5 text-[10px] tracking-widest uppercase border-b border-white w-fit pb-2">Shop the collection ↗</a></div></section>
    <section id="newsletter" className="px-5 md:px-10 py-16 md:py-24 text-center"><p className="text-[#bd4d83] text-[9px] tracking-[.25em] uppercase">Stay close</p><h2 className="font-serif text-3xl md:text-5xl mt-3">Join the Mireza world</h2><p className="text-sm mt-4 text-black/60">New drops, campaigns and notes from the Caribbean.</p><form className="mx-auto mt-7 max-w-md flex border-b border-black" onSubmit={(event)=>{event.preventDefault();alert('Thank you for joining Mireza.')}}><input type="email" required placeholder="Your email address" className="flex-1 py-3 text-sm outline-none bg-transparent"/><button className="text-[10px] tracking-widest uppercase px-3">Join ↗</button></form></section>
    <footer className="bg-black text-white px-5 md:px-10 py-10 flex flex-col md:flex-row gap-6 justify-between"><span className="font-serif text-2xl tracking-[.2em]">MIREZA</span><div className="flex gap-6 text-[9px] tracking-widest uppercase"><a href="#collections">Shop</a><a href="#newsletter">Contact</a><a href="#discovery">Back to top ↑</a></div><span className="text-[9px] text-white/50">© MIREZA CARIBBEAN</span></footer>
  </main>;
}
