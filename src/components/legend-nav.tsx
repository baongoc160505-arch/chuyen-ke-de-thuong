import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, MapPinned, Search, SlidersHorizontal, Tags } from "lucide-react";
import { StoryCard } from "@/components/story-card";
import { GhostMascot } from "@/components/mascot";
import { countryList, topicList, type Story } from "@/lib/stories";

export function LegendMegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="mega-menu" role="menu">
      <div>
        <Link to="/truyen-thuyet" onClick={onNavigate} className="mega-title">Theo quốc gia →</Link>
        <div className="mega-list">
          {countryList.map((c) => <Link key={c.slug} to="/truyen-thuyet/quoc-gia/$country" params={{ country: c.slug }} onClick={onNavigate}>{c.emoji} {c.name}</Link>)}
        </div>
      </div>
      <div>
        <Link to="/truyen-thuyet" onClick={onNavigate} className="mega-title">Khám phá theo chủ đề →</Link>
        <div className="mega-list">
          {topicList.map((t) => <Link key={t.slug} to="/truyen-thuyet/chu-de/$topic" params={{ topic: t.slug }} onClick={onNavigate}>{t.emoji} {t.name}</Link>)}
        </div>
      </div>
      <GhostMascot mood="happy" className="mega-ghost" />
    </div>
  );
}

export function LegendEntrySelector() {
  const [open, setOpen] = useState<"country" | "topic" | null>(null);
  return (
    <section className="mt-14" aria-labelledby="entry-title">
      <h2 id="entry-title" className="text-center font-display text-4xl sm:text-5xl">Bạn muốn bắt đầu hành trình của mình từ đâu?</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <button type="button" className={open === "country" ? "entry-card entry-card-open paper-tilt-left" : "entry-card paper-tilt-left"} onClick={() => setOpen(open === "country" ? null : "country")} aria-expanded={open === "country"} aria-controls="entry-panel">
          <span className="tape tape-left" /><MapPinned className="entry-icon" />
          <span className="font-display text-3xl">Khám phá theo quốc gia</span>
          <span className="text-sm">Lời đồn từ 11 vùng đất — mở phong bì ra xem nhé.</span>
        </button>
        <button type="button" className={open === "topic" ? "entry-card entry-card-alt entry-card-open paper-tilt-right" : "entry-card entry-card-alt paper-tilt-right"} onClick={() => setOpen(open === "topic" ? null : "topic")} aria-expanded={open === "topic"} aria-controls="entry-panel">
          <span className="tape tape-left" /><Tags className="entry-icon" />
          <span className="font-display text-3xl">Khám phá theo chủ đề</span>
          <span className="text-sm">Trường học, bệnh viện, Internet… chọn nơi chốn bạn tò mò.</span>
        </button>
      </div>
      {open && (
        <div id="entry-panel" className="entry-panel" key={open}>
          <p className="font-display text-2xl">{open === "country" ? "Chọn một vùng đất:" : "Chọn một chủ đề:"}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {open === "country"
              ? countryList.map((c) => <Link key={c.slug} to="/truyen-thuyet/quoc-gia/$country" params={{ country: c.slug }} className="country-sticker">{c.emoji} {c.name}</Link>)
              : topicList.map((t) => <Link key={t.slug} to="/truyen-thuyet/chu-de/$topic" params={{ topic: t.slug }} className="country-sticker">{t.emoji} {t.name}</Link>)}
          </div>
        </div>
      )}
    </section>
  );
}

export function StoryArchive({ items }: { items: Story[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Mới nhất");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = items.filter((s) => !q || `${s.title} ${s.excerpt} ${s.country} ${s.category}`.toLowerCase().includes(q));
    return sort === "Đọc nhiều nhất" ? [...list].sort((a, b) => b.views - a.views) : list;
  }, [items, query, sort]);
  return (
    <>
      <div className="filter-paper grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div className="search-field"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm một lời đồn…" aria-label="Tìm một lời đồn" /></div>
        <label className="filter-sort"><span><SlidersHorizontal /> Sắp xếp</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option>Mới nhất</option><option>Đọc nhiều nhất</option></select></label>
      </div>
      <p className="mb-7 mt-10 font-bold">Tìm thấy {filtered.length} lời đồn trong sổ</p>
      {filtered.length ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{filtered.map((story, i) => <StoryCard key={story.slug} story={story} index={i} />)}</div>
      ) : (
        <div className="empty-paper"><GhostMascot mood="search" className="mx-auto h-32 w-32" /><h2 className="font-display text-3xl">Ủa… lời đồn này tụi mình chưa nghe.</h2><Link to="/truyen-thuyet" onClick={() => setQuery("")} className="mt-3 inline-block font-bold text-primary underline">Khám phá chuyện khác</Link></div>
      )}
    </>
  );
}

export function TaxonArchive({ kind, label, heading, items, siblings }: { kind: "country" | "topic"; label: string; heading: string; items: Story[]; siblings: ReactNode }) {
  return (
    <div className="section-pad"><div className="site-container">
      <nav className="breadcrumb" aria-label="Đường dẫn"><Link to="/">Trang chủ</Link><ChevronRight /><Link to="/truyen-thuyet">Truyền thuyết</Link><ChevronRight /><Link to="/truyen-thuyet">{kind === "country" ? "Theo quốc gia" : "Theo chủ đề"}</Link><ChevronRight /><span>{label}</span></nav>
      <header className="archive-header"><span className="tape-label">{kind === "country" ? "Hồ sơ theo vùng đất" : "Hồ sơ theo chủ đề"}</span><h1 className="mt-5 font-display text-5xl sm:text-7xl">{heading}</h1></header>
      <div className="mb-8 flex flex-wrap gap-2">{siblings}</div>
      <StoryArchive items={items} />
    </div></div>
  );
}
