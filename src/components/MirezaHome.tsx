import { useEffect, useRef, useState } from 'react';
import { IMAGES, INSTAGRAM_POSTS } from '../data/products';
import { InstagramGallery } from './InstagramGallery';
import { NewsletterSection } from './NewsletterSection';

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
    let timer: number | undefined;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 25 || wheelLock.current) return;
      wheelLock.current = true;
      move(event.deltaY > 0 ? 1 : -1);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => { wheelLock.current = false; }, 650);
    };
    stage.addEventListener('wheel', onWheel, { passive: true });
    return () => { stage.removeEventListener('wheel', onWheel); window.clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return <main className="bg-white text-black">
    {/* SECTION 01 — Announcement + navigation */}
    <div className="bg-black text-white text-[9px] sm:text-[10px] tracking-[.18em] uppercase text-center py-2">MIREZA CARIBBEAN · NEW SEASON</div>
    <header className="sticky top-0 z-50 bg-white border-b border-black/10">
      <div className="h-[66px] px-5 md:px-10 flex items-center justify-between">
        <nav className="hidden md:flex gap-6 text-[10px] tracking-[.13em] uppercase">
          <a href="#discovery">Discovery</a><a href="#collection-01">Collection 01</a><a href="#collection-02">Collection 02</a>
        </nav>
        <a href="#" aria-label="Mireza Caribbean home" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-[.18em]">MIREZA<span className="text-[#d56b9b]">.</span></a>
        <div className="ml-auto flex gap-5 text-[10px] tracking-[.12em] uppercase"><a href="#collection-01">Shop</a><a href="#newsletter">Join</a></div>
      </div>
    </header>

    {/* SECTION 02 — Interactive Discovery */}
    <section id="discovery" aria-label="Discovery interactive" className="bg-white">
      <div id="discovery-stage" className="relative h-[78vh] min-h-[520px] max-h-[900px] overflow-hidden touch-pan-y"
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); }}>
        <div className="absolute inset-0 bg-white"/>
        <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[#f5f5f5]"/>
        {[-2,-1,1,2].map((offset) => {
          const item = looks[(index + offset + looks.length) % looks.length];
          return <button key={offset} onClick={() => setIndex((index + offset + looks.length) % looks.length)} aria-label={item.name}
            className="absolute bottom-0 transition-all duration-700 ease-out"
            style={{ left: `calc(50% + ${Math.sign(offset) * (Math.abs(offset) === 1 ? 27 : 45)}%)`, transform: `translateX(-50%) scale(${Math.abs(offset) === 1 ? .65 : .43})`, transformOrigin:'bottom center', width:'36%',height:'88%',opacity:Math.abs(offset)===1?.48:.2,zIndex:Math.abs(offset)===1?3:1 }}>
            <img src={item.img} className="h-full w-full object-cover object-top" alt="" />
          </button>;
        })}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[97%] w-[70%] md:w-[38%] z-10 pointer-events-none">
          <img key={index} src={looks[index].img} className="w-full h-full object-cover object-top animate-[mireza-enter_.65s_ease-out]" alt={looks[index].name}/>
        </div>
        <div className="absolute top-6 left-5 right-5 md:left-10 md:right-10 z-20 flex justify-between text-[9px] tracking-[.2em] uppercase"><span>MIREZA / DISCOVERY</span><span>{looks[index].sub}</span></div>
        <div className="absolute left-5 md:left-10 bottom-8 z-20"><h1 className="font-serif text-2xl md:text-4xl uppercase">{looks[index].name}</h1><a href="#collection-01" className="inline-block mt-3 text-[10px] uppercase tracking-widest border-b border-black pb-1">Discover ↗</a></div>
        <button onClick={() => move(-1)} className="absolute left-4 md:left-10 top-1/2 z-30 bg-white border border-black/20 w-11 h-11 md:w-14 md:h-14" aria-label="Previous look">←</button>
        <button onClick={() => move(1)} className="absolute right-4 md:right-10 top-1/2 z-30 bg-white border border-black/20 w-11 h-11 md:w-14 md:h-14" aria-label="Next look">→</button>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3 items-center text-[9px] tracking-widest"><span>0{index+1}</span><div className="w-20 h-px bg-black/20"><div className="h-px bg-[#d56b9b]" style={{width:`${(index+1)*25}%`}}/></div><span>04</span></div>
      </div>
    </section>

    {/* SECTION 03 — Instagram image marquee */}
    <InstagramGallery />

    {/* SECTION 04 — Main collection world / full campaign image */}
    <section id="collections-world" className="relative min-h-[68vh] md:min-h-[88vh] overflow-hidden bg-white">
      <img src={IMAGES.heroPanther} alt="Mireza Caribbean — campaign" className="absolute inset-0 w-full h-full object-cover object-center"/>
      <div className="absolute inset-0 bg-black/10"/>
      <div className="absolute bottom-8 left-6 md:bottom-14 md:left-14 text-white">
        <p className="text-[9px] md:text-[10px] tracking-[.22em] uppercase mb-2">MIREZA CARIBBEAN</p>
        <h2 className="font-serif text-4xl md:text-7xl">The Collection</h2>
        <a href="#collection-01" className="inline-block mt-4 border border-white px-5 py-3 text-[10px] tracking-[.15em] uppercase">Explore ↗</a>
      </div>
    </section>

    {/* SECTION 05 — Collection 01 campaign block */}
    <section id="collection-01" className="relative min-h-[68vh] md:min-h-[82vh] overflow-hidden bg-white">
      <img src={IMAGES.campaignPanthereRose} alt="Collection Panthère Rose" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"/>
      <div className="absolute bottom-8 left-6 md:bottom-14 md:left-14 text-white">
        <p className="text-[9px] tracking-[.2em] uppercase mb-2">Collection 01</p><h2 className="font-serif text-4xl md:text-6xl">Panthère Rose</h2>
        <p className="mt-2 text-xs md:text-sm max-w-md">L'allure signature, entre douceur et caractère.</p>
        <a href="#shop" className="inline-block mt-5 bg-white text-black px-6 py-3 text-[10px] tracking-[.15em] uppercase">Découvrir la collection ↗</a>
      </div>
    </section>

    {/* SECTION 06 — Collection 02 campaign block */}
    <section id="collection-02" className="relative min-h-[68vh] md:min-h-[82vh] overflow-hidden bg-white">
      <img src={IMAGES.campaignCaribbeanNoir} alt="Collection Caribbean Noir" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
      <div className="absolute bottom-8 left-6 md:bottom-14 md:left-14 text-white">
        <p className="text-[9px] tracking-[.2em] uppercase mb-2">Collection 02</p><h2 className="font-serif text-4xl md:text-6xl">Caribbean Noir</h2>
        <p className="mt-2 text-xs md:text-sm max-w-md">Une expression nocturne, sculpturale et libre.</p>
        <a href="#shop" className="inline-block mt-5 bg-white text-black px-6 py-3 text-[10px] tracking-[.15em] uppercase">Découvrir la collection ↗</a>
      </div>
    </section>

    {/* SECTION 07 — Promotions, image-led */}
    <section id="promotions" className="grid grid-cols-1 md:grid-cols-2">
      <a href="#shop" className="relative min-h-[420px] md:min-h-[520px] overflow-hidden block">
        <img src={IMAGES.categoryLingerie} alt="Offres Mireza" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/20"/>
        <div className="absolute bottom-7 left-6 md:bottom-10 md:left-10 text-white"><p className="text-[9px] tracking-[.2em] uppercase">Limited offer</p><h2 className="font-serif text-3xl md:text-4xl mt-2">Les offres du moment</h2><span className="inline-block mt-4 border-b border-white pb-1 text-[10px] tracking-widest uppercase">Voir les offres ↗</span></div>
      </a>
      <a href="#shop" className="relative min-h-[420px] md:min-h-[520px] overflow-hidden block">
        <img src={IMAGES.categorySwimwear} alt="Nouvelle saison Mireza" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/15"/>
        <div className="absolute bottom-7 left-6 md:bottom-10 md:left-10 text-white"><p className="text-[9px] tracking-[.2em] uppercase">Season edit</p><h2 className="font-serif text-3xl md:text-4xl mt-2">Nouveautés</h2><span className="inline-block mt-4 border-b border-white pb-1 text-[10px] tracking-widest uppercase">Explorer ↗</span></div>
      </a>
    </section>

    {/* SECTION 08 — Newsletter */}
    <div id="newsletter"><NewsletterSection /></div>

    {/* SECTION 09 — Footer */}
    <footer className="bg-black text-white px-5 md:px-10 py-10">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"><span className="font-serif text-2xl tracking-[.2em]">MIREZA CARIBBEAN</span><div className="flex flex-wrap gap-6 text-[9px] tracking-widest uppercase"><a href="#collection-01">Collection 01</a><a href="#collection-02">Collection 02</a><a href="#newsletter">Contact</a><a href="#discovery">Back to top ↑</a></div><span className="text-[9px] text-white/50">© MIREZA CARIBBEAN</span></div>
    </footer>
  </main>;
}
