import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { StoryCard } from "@/components/story-card";
import { GhostMascot } from "@/components/mascot";
import { countries, stories, topics } from "@/lib/stories";

export const Route = createFileRoute("/truyen-thuyet/")({
  head: () => ({ meta: [
    { title: "Kho lời đồn — Truyền Thuyết Đô Thị" }, { name: "description", content: "Tìm kiếm và khám phá kho truyền thuyết đô thị theo quốc gia và chủ đề." },
    { property: "og:title", content: "Kho lời đồn" }, { property: "og:description", content: "Chuyện kỳ lạ ở đâu cũng có. Chọn một nơi rồi nghe thử nhé." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ArchivePage,
});

function ArchivePage() {
  const [query, setQuery] = useState(""); const [country, setCountry] = useState("Tất cả"); const [topic, setTopic] = useState("Tất cả"); const [sort, setSort] = useState("Mới nhất");
  const filtered = useMemo(() => stories.filter((s) => (!query || `${s.title} ${s.excerpt}`.toLowerCase().includes(query.toLowerCase())) && (country === "Tất cả" || s.country === country) && (topic === "Tất cả" || s.category === topic)).sort((a,b) => sort === "Đọc nhiều nhất" ? b.views-a.views : 0), [query,country,topic,sort]);
  return <div className="section-pad"><div className="site-container"><header className="archive-header"><span className="tape-label">Tủ hồ sơ bí mật</span><h1 className="mt-5 font-display text-6xl sm:text-7xl">Kho lời đồn</h1><p className="mt-3 text-lg">Chuyện kỳ lạ ở đâu cũng có. Chọn một nơi rồi nghe thử nhé.</p></header>
    <div className="filter-paper"><div className="search-field"><Search /><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Tìm một lời đồn…" /></div><div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr_auto]"><FilterGroup label="Quốc gia" values={countries.slice(0,7)} active={country} setActive={setCountry}/><FilterGroup label="Chủ đề" values={topics} active={topic} setActive={setTopic}/><label className="filter-sort"><span><SlidersHorizontal /> Sắp xếp</span><select value={sort} onChange={(e)=>setSort(e.target.value)}><option>Mới nhất</option><option>Đọc nhiều nhất</option></select></label></div></div>
    <p className="mb-7 mt-10 font-bold">Tìm thấy {filtered.length} lời đồn trong sổ</p>
    {filtered.length ? <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{filtered.map((story,index)=><StoryCard key={story.slug} story={story} index={index}/>)}</div> : <div className="empty-paper"><GhostMascot mood="search" className="mx-auto h-32 w-32"/><h2 className="font-display text-3xl">Ủa… lời đồn này tụi mình chưa nghe.</h2><button onClick={()=>{setQuery("");setCountry("Tất cả");setTopic("Tất cả")}} className="mt-3 font-bold text-primary underline">Khám phá chuyện khác</button></div>}
  </div></div>;
}

function FilterGroup({label,values,active,setActive}:{label:string;values:string[];active:string;setActive:(value:string)=>void}) { return <fieldset><legend className="mb-2 text-xs font-extrabold uppercase">{label}</legend><div className="flex flex-wrap gap-2">{values.map((value)=><button key={value} onClick={()=>setActive(value)} className={active===value?"filter-chip filter-chip-active":"filter-chip"}>{value}</button>)}</div></fieldset> }
