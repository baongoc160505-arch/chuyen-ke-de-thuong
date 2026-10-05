import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Flame, Ghost, Home, Menu, MessagesSquare, Search, Shuffle, X } from "lucide-react";
import { LegendMegaMenu } from "@/components/legend-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { countryList, topicList } from "@/lib/stories";
import { Button } from "@/components/ui/button";
import { GhostMascot } from "@/components/mascot";
import { stories } from "@/lib/stories";

const nav = [
  { to: "/", label: "Trang chủ", icon: Home },
  { to: "/truyen-thuyet", label: "Truyền thuyết", icon: Ghost },
  { to: "/kham-pha-ngau-nhien", label: "Khám phá ngẫu nhiên", icon: Shuffle },
  { to: "/dang-hot", label: "Đang hot", icon: Flame },
  { to: "/cong-dong", label: "Cộng đồng", icon: MessagesSquare },
  { to: "/ve-chung-toi", label: "Về chúng tôi", icon: BookOpen },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const results = query.trim() ? stories.filter((story) => `${story.title} ${story.country} ${story.category}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : [];

  return (
    <>
      <header className="site-header">
        <div className="site-container flex h-20 items-center justify-between gap-4">
          <Link to="/" className="brand-mark" aria-label="Truyền Thuyết Đô Thị — Trang chủ">
            <GhostMascot className="brand-ghost" />
            <span><strong>Truyền Thuyết</strong><em>Đô Thị</em></span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const link = <Link key={item.to} to={item.to} className={active ? "nav-link nav-link-active" : "nav-link"}><Icon />{item.label}</Link>;
              if (item.to !== "/truyen-thuyet") return link;
              return <div key={item.to} className="nav-dropdown" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)} onFocus={() => setMegaOpen(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaOpen(false); }}>{link}{megaOpen && <LegendMegaMenu onNavigate={() => setMegaOpen(false)} />}</div>;
            })}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="paperIcon" size="icon" onClick={() => setSearchOpen(true)} aria-label="Mở tìm kiếm"><Search /></Button>
            <Button variant="paperIcon" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu">{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="mobile-nav lg:hidden" aria-label="Điều hướng di động">{nav.map((item) => { const Icon = item.icon; return <div key={item.to}><Link to={item.to} onClick={() => setMenuOpen(false)}><Icon />{item.label}</Link>{item.to === "/truyen-thuyet" && <div className="mobile-sub">{countryList.slice(0, 6).map((c) => <Link key={c.slug} to="/truyen-thuyet/quoc-gia/$country" params={{ country: c.slug }} onClick={() => setMenuOpen(false)}>{c.emoji} {c.name}</Link>)}{topicList.slice(0, 4).map((t) => <Link key={t.slug} to="/truyen-thuyet/chu-de/$topic" params={{ topic: t.slug }} onClick={() => setMenuOpen(false)}>{t.emoji} {t.name}</Link>)}</div>}</div>; })}</nav>}
      </header>
      {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Tìm kiếm lời đồn">
        <div className="search-paper">
          <Button variant="paperIcon" size="icon" className="absolute right-4 top-4" onClick={() => setSearchOpen(false)} aria-label="Đóng tìm kiếm"><X /></Button>
          <GhostMascot mood="search" className="mx-auto h-24 w-24" />
          <h2 className="font-display text-3xl">Bạn đang tìm lời đồn nào?</h2>
          <div className="search-field mt-5"><Search /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm một lời đồn…" /></div>
          <div className="mt-5 space-y-2 text-left">
            {results.map((story) => <Link key={story.slug} to="/truyen-thuyet/$slug" params={{ slug: story.slug }} onClick={() => setSearchOpen(false)} className="search-result"><span>{story.title}</span><small>{story.country} · {story.category}</small></Link>)}
            {query && results.length === 0 && <div className="py-5 text-center"><p className="font-display text-xl">Ủa… lời đồn này tụi mình chưa nghe.</p><Link to="/truyen-thuyet" onClick={() => setSearchOpen(false)} className="mt-3 inline-block font-bold text-primary underline">Khám phá chuyện khác</Link></div>}
          </div>
        </div>
      </div>}
    </>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
    <div><div className="brand-mark brand-mark-footer"><GhostMascot className="brand-ghost" /><span><strong>Truyền Thuyết</strong><em>Đô Thị</em></span></div><p className="mt-5 max-w-sm font-display text-2xl">“Tôi sợ ma nên không muốn bạn phải sợ.”</p></div>
    <div><h2 className="footer-title">Mở sổ ra xem</h2><div className="footer-links">{nav.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div></div>
    <div><h2 className="footer-title">Chuyện bên lề</h2><div className="footer-links"><a href="mailto:xinchao@truyenthuyendothi.vn">Liên hệ</a><span>Nguồn tham khảo</span><span>Chính sách nội dung</span></div><p className="mt-6 text-sm">Instagram · TikTok · Facebook</p></div>
  </div><div className="border-t border-dashed border-border py-5 text-center text-xs">© 2026 Truyền Thuyết Đô Thị · Kể chuyện lạ, ngủ vẫn ngon.</div></footer>;
}