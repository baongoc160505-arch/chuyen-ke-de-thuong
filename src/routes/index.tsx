import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Dice5, Flame, MapPinned, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GhostMascot } from "@/components/mascot";
import { StoryCard } from "@/components/story-card";
import { countryList, stories } from "@/lib/stories";
import heroMascots from "@/assets/hero-mascots.jpg";
import worldMap from "@/assets/world-map.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Truyền Thuyết Đô Thị — Chuyện lạ kể cho người sợ ma" },
    { name: "description", content: "Khám phá những lời đồn và truyền thuyết đô thị Việt Nam, thế giới qua cách kể dễ thương, gần gũi." },
    { property: "og:title", content: "Truyền Thuyết Đô Thị" },
    { property: "og:description", content: "Chuyện lạ kể theo cách bớt đáng sợ hơn một chút." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

function SectionHeading({ kicker, children, note }: { kicker: string; children: React.ReactNode; note?: string }) {
  return <div className="mb-10 max-w-2xl"><span className="section-kicker">✦ {kicker}</span><h2 className="mt-2 font-display text-4xl leading-none sm:text-5xl">{children}</h2>{note && <p className="mt-3 leading-7 text-muted-foreground">{note}</p>}</div>;
}

function HomePage() {
  return <>
    <section className="home-hero">
      <div className="site-container grid items-center gap-10 py-12 md:grid-cols-[1fr_1.05fr] md:py-20">
        <div className="relative z-10">
          <span className="tape-label">Sổ tay lời đồn số 01</span>
          <h1 className="mt-6 max-w-2xl font-display text-6xl leading-[.88] sm:text-7xl lg:text-8xl">Bạn đã nghe <span className="scribble-highlight">lời đồn</span> này chưa?</h1>
          <p className="mt-7 max-w-xl text-base font-semibold leading-7 sm:text-lg">Những câu chuyện kỳ lạ, lời đồn bí ẩn và truyền thuyết đô thị từ khắp nơi trên thế giới — được kể lại theo cách bớt đáng sợ hơn một chút.</p>
          <blockquote className="mt-6 border-l-4 border-primary pl-4 font-display text-2xl text-primary">“Tôi sợ ma nên không muốn bạn phải sợ.”</blockquote>
          <div className="mt-8 flex flex-wrap gap-4"><Button asChild variant="sticker" size="lg"><Link to="/truyen-thuyet">Bắt đầu nghe đồn <ArrowRight /></Link></Button><Button asChild variant="paper" size="lg"><Link to="/kham-pha-ngau-nhien"><Dice5 /> Khám phá ngẫu nhiên</Link></Button></div>
        </div>
        <div className="hero-picture"><span className="tape tape-left" /><span className="tape tape-right" /><img src={heroMascots} alt="Chú ma nhút nhát và bạn xác ướp đang khám phá một cuốn truyện cũ" width={1536} height={1024} /><span className="hero-note">Đừng lo, có tụi mình đi cùng!</span></div>
      </div>
    </section>

    <section className="section-pad"><div className="site-container"><SectionHeading kicker="Vừa nhặt được">Lời đồn mới nhất</SectionHeading><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{stories.slice(0, 3).map((story, index) => <StoryCard key={story.slug} story={story} index={index} />)}</div><div className="mt-10 text-center"><Button asChild variant="paper"><Link to="/truyen-thuyet">Mở cả kho lời đồn <ArrowRight /></Link></Button></div></div></section>

    <section className="map-section section-pad"><div className="site-container grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><SectionHeading kicker="Bản đồ bí ẩn" note="Mỗi nơi đều có một câu chuyện được thì thầm qua nhiều thế hệ.">Lời đồn từ đâu?</SectionHeading><div className="flex flex-wrap gap-2">{countryList.map((c) => <Link key={c.slug} to="/truyen-thuyet/quoc-gia/$country" params={{ country: c.slug }} className="country-sticker">📍 {c.name}</Link>)}</div><Button asChild variant="sticker" className="mt-7"><Link to="/truyen-thuyet"><MapPinned /> Khám phá theo quốc gia</Link></Button></div><div className="map-picture"><img src={worldMap} alt="Bản đồ thế giới minh họa với các ghim lời đồn" width={1536} height={1024} loading="lazy" /></div></div></section>

    <section className="section-pad"><div className="site-container"><div className="random-band"><GhostMascot mood="happy" className="random-ghost" /><div><span className="section-kicker">Một chút may rủi</span><h2 className="mt-2 font-display text-5xl">Không biết đọc gì?</h2><p className="mt-3 max-w-xl">Để tụi mình thò tay vào chiếc hộp bí ẩn và chọn một lời đồn cho bạn.</p></div><Button asChild variant="sticker" size="lg"><Link to="/kham-pha-ngau-nhien"><Dice5 /> Khám phá ngẫu nhiên</Link></Button></div></div></section>

    <section className="hot-preview section-pad"><div className="site-container"><SectionHeading kicker="Nghe xôn xao lắm">Đang được đồn nhiều <Flame className="inline h-9 w-9 text-primary" /></SectionHeading><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{[...stories].sort((a,b) => b.views-a.views).slice(0,4).map((story,index) => <StoryCard key={story.slug} story={story} index={index} />)}</div><div className="mt-10 text-center"><Button asChild variant="paper"><Link to="/dang-hot">Xem chuyện gì đang hot <ArrowRight /></Link></Button></div></div></section>

    <section className="section-pad"><div className="site-container"><div className="about-band"><div><span className="section-kicker"><Sparkles /> Hội những người tò mò</span><h2 className="mt-3 font-display text-5xl sm:text-6xl">Bạn sợ ma hả?</h2><p className="mt-5 max-w-2xl text-lg leading-8"><strong>Không sao, tụi mình cũng vậy.</strong><br />Truyền Thuyết Đô Thị được tạo ra cho những người thích nghe chuyện kỳ bí nhưng không muốn bị những hình ảnh kinh dị ám ảnh cả đêm.</p><p className="mt-6 font-display text-3xl text-primary">“Tôi sợ ma nên không muốn bạn phải sợ.”</p></div><GhostMascot className="about-ghost" /></div></div></section>
  </>;
}
