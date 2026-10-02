import { createFileRoute, Link } from "@tanstack/react-router";
import { PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GhostMascot } from "@/components/mascot";
import { CommunityPostCard } from "@/components/community";
import { useCommunity } from "@/lib/community";

export const Route = createFileRoute("/cong-dong/")({
  head: () => ({ meta: [
    { title: "Cộng đồng — Truyền Thuyết Đô Thị" }, { name: "description", content: "Nơi mọi người kể lời đồn, chuyện lạ của riêng mình và cùng bàn tán nhẹ nhàng." },
    { property: "og:title", content: "Có chuyện gì muốn kể không?" }, { property: "og:description", content: "Biết đâu lời đồn tiếp theo lại bắt đầu từ bạn." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CommunityPage,
});

function CommunityPage() {
  const { posts, react } = useCommunity();
  return <div className="section-pad"><div className="site-container">
    <header className="community-hero">
      <div className="community-hero-ghost"><GhostMascot mood="happy" className="h-36 w-36" /><PencilLine className="community-pencil" /></div>
      <div>
        <span className="tape-label">Góc kể chuyện</span>
        <h1 className="mt-5 font-display text-5xl sm:text-7xl">Có chuyện gì muốn kể không?</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8">Nếu bạn từng nghe một lời đồn kỳ lạ, gặp một chuyện hơi khó giải thích, hay đơn giản là có một câu chuyện khiến bạn tò mò mãi — kể cho tụi mình nghe với.</p>
        <Button asChild variant="sticker" size="lg" className="mt-6"><Link to="/cong-dong/dang-truyen">+ Kể một câu chuyện</Link></Button>
        <p className="mt-3 font-display text-xl text-muted-foreground">Biết đâu lời đồn tiếp theo lại bắt đầu từ bạn.</p>
      </div>
    </header>
    <section className="mt-16" aria-labelledby="feed-title">
      <h2 id="feed-title" className="font-display text-5xl">Chuyện mọi người đang kể</h2>
      {posts.length ? (
        <div className="mt-9 grid gap-8 md:grid-cols-2">{posts.map((p, i) => <CommunityPostCard key={p.id} post={p} index={i} onReact={(k) => react(p.id, k)} />)}</div>
      ) : (
        <div className="empty-paper mt-9"><GhostMascot mood="search" className="mx-auto h-28 w-28" /><p className="font-display text-3xl">Chưa ai kể gì ở đây hết…<br />Hay bạn mở hàng đi?</p><Button asChild variant="sticker" className="mt-4"><Link to="/cong-dong/dang-truyen">Kể câu chuyện đầu tiên</Link></Button></div>
      )}
    </section>
  </div></div>;
}
