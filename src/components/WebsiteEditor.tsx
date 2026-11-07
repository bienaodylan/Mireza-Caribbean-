import { useMemo, useState } from 'react';
import { Eye, EyeOff, GripVertical, Monitor, Smartphone, Tablet, Plus, Save, Send, Trash2 } from 'lucide-react';

type Section = { id: string; type: string; title: string; visible: boolean; image: string; cta: string };
const initial: Section[] = [
  { id: 'campaign', type: 'campaign', title: 'Campagne principale', visible: true, image: '', cta: 'Découvrir' },
  { id: 'launch', type: 'launch', title: 'Collection à venir', visible: true, image: '', cta: 'Bientôt disponible' },
  { id: 'categories', type: 'categories', title: 'Catégories', visible: true, image: '', cta: 'Explorer' },
  { id: 'featured', type: 'featured', title: 'Collection mise en avant', visible: true, image: '', cta: 'Découvrir la collection' },
  { id: 'promo', type: 'promotion', title: 'Sélection en promotion', visible: true, image: '', cta: 'Voir les offres' },
  { id: 'newsletter', type: 'newsletter', title: 'Newsletter', visible: true, image: '', cta: 'S’inscrire' },
];

export function WebsiteEditor() {
  const [sections, setSections] = useState<Section[]>(() => {
    try { return JSON.parse(localStorage.getItem('mireza-editor-draft') || 'null') || initial; } catch { return initial; }
  });
  const [selected, setSelected] = useState('campaign');
  const [device, setDevice] = useState<'desktop'|'tablet'|'mobile'>('desktop');
  const [status, setStatus] = useState('Brouillon');
  const active = sections.find(s => s.id === selected) || sections[0];
  const width = device === 'desktop' ? '100%' : device === 'tablet' ? '760px' : '390px';
  const visible = useMemo(() => sections.filter(s => s.visible), [sections]);
  const update = (patch: Partial<Section>) => setSections(prev => prev.map(s => s.id === selected ? {...s, ...patch} : s));
  const save = () => { localStorage.setItem('mireza-editor-draft', JSON.stringify(sections)); setStatus('Brouillon enregistré'); };
  const publish = () => { localStorage.setItem('mireza-editor-published', JSON.stringify(sections)); setStatus('Publié localement'); };

  return <div className="min-h-screen bg-[#f5f3f1] text-[#181614]">
    <header className="flex flex-wrap items-center justify-between gap-3 border-b bg-white px-5 py-4">
      <div><p className="text-xs uppercase tracking-[.2em] text-neutral-500">MIREZA · Administration</p><h1 className="text-xl font-semibold">Website editor</h1></div>
      <div className="flex items-center gap-3"><a href="/admin" className="text-xs underline">← Studio</a><a href="/" className="text-xs underline">Voir le site ↗</a><span className="text-xs text-neutral-500">{status}</span><button onClick={save} className="flex items-center gap-2 border px-4 py-2 text-sm"><Save size={15}/> Enregistrer</button><button onClick={publish} className="flex items-center gap-2 bg-black px-4 py-2 text-sm text-white"><Send size={15}/> Publier</button></div>
    </header>
    <div className="grid min-h-[calc(100vh-76px)] grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px]">
      <aside className="border-r bg-white p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">Page · Accueil</p>
        <div className="mb-5 border px-3 py-2 text-sm">Page d’accueil</div>
        <div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Sections</p><button title="Ajouter une section" onClick={() => {const id='section-'+Date.now();setSections(p=>[...p,{id,type:'campaign',title:'Nouvelle section',visible:true,image:'',cta:'Découvrir'}]);setSelected(id)}}><Plus size={17}/></button></div>
        <div className="space-y-1">{sections.map(s=><div key={s.id} className={'flex items-center gap-2 border px-2 py-2 '+(selected===s.id?'border-black bg-neutral-100':'border-transparent')}><GripVertical size={14} className="text-neutral-400"/><button className="flex-1 text-left text-sm" onClick={()=>setSelected(s.id)}>{s.title}</button><button title={s.visible?'Masquer':'Afficher'} onClick={()=>setSections(p=>p.map(x=>x.id===s.id?{...x,visible:!x.visible}:x))}>{s.visible?<Eye size={14}/>:<EyeOff size={14}/>}</button></div>)}</div>
      </aside>
      <main className="overflow-auto p-4 md:p-8">
        <div className="mb-4 flex justify-center gap-2">{(['desktop','tablet','mobile'] as const).map(d=><button key={d} onClick={()=>setDevice(d)} className={'border p-2 '+(device===d?'bg-black text-white':'bg-white')} title={d}>{d==='desktop'?<Monitor size={17}/>:d==='tablet'?<Tablet size={17}/>:<Smartphone size={17}/>}</button>)}</div>
        <div className="mx-auto overflow-hidden border bg-white shadow-sm transition-all" style={{width:width,maxWidth:'100%'}}>
          <div className="bg-[#f4e5e8] py-2 text-center text-[10px] tracking-widest">LIVRAISON OFFERTE À PARTIR DE 100€</div>
          <div className="flex items-center justify-between border-b px-5 py-4 text-xs tracking-[.25em]"><span>MENU</span><strong className="text-xl tracking-[.3em]">MIREZA</strong><span>♡　 BAG</span></div>
          {visible.map(s=><button key={s.id} onClick={()=>setSelected(s.id)} className={'relative block w-full border-b text-left '+(selected===s.id?'ring-2 ring-inset ring-pink-500':'')}>
            {s.image?<img src={s.image} alt="" className="h-64 w-full object-cover"/>:<div className={'flex h-48 items-center justify-center '+(s.type==='campaign'?'bg-[#ead6d9]':'bg-[#f2efed]')}><span className="text-xs uppercase tracking-[.2em] text-neutral-500">{s.type} · aperçu de section</span></div>}
            <div className="px-5 py-5"><h2 className="text-lg tracking-wide">{s.title}</h2><span className="mt-2 inline-block text-xs underline underline-offset-4">{s.cta}</span></div>
          </button>)}
          <div className="bg-black px-5 py-8 text-center text-xs tracking-widest text-white">MIREZA · NEWSLETTER · CONTACT</div>
        </div>
      </main>
      <aside className="border-l bg-white p-5">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-neutral-500">Paramètres de section</p>
        {active && <div className="space-y-4"><label className="block text-sm">Titre<input value={active.title} onChange={e=>update({title:e.target.value})} className="mt-1 w-full border p-2"/></label><label className="block text-sm">Image (URL)<input value={active.image} onChange={e=>update({image:e.target.value})} placeholder="https://…" className="mt-1 w-full border p-2"/></label><label className="block text-sm">Texte du bouton<input value={active.cta} onChange={e=>update({cta:e.target.value})} className="mt-1 w-full border p-2"/></label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={active.visible} onChange={e=>update({visible:e.target.checked})}/> Section visible</label><button onClick={()=>{setSections(p=>p.filter(s=>s.id!==selected));setSelected(sections.find(s=>s.id!==selected)?.id||'')}} className="mt-4 flex items-center gap-2 text-sm text-red-600"><Trash2 size={15}/> Supprimer la section</button></div>}
        <p className="mt-8 border-t pt-4 text-xs leading-5 text-neutral-500">Aperçu et sauvegarde locale de cette première interface. La publication n’est pas encore reliée à une base distante.</p>
      </aside>
    </div>
  </div>;
}
