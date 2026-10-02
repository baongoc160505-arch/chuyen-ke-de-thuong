import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, MapPin } from "lucide-react";
import { Avatar, CommentThread, ReactionBar } from "@/components/community";
import { GhostMascot } from "@/components/mascot";
import { formatDate, seedPosts, useCommunity } from "@/lib/community";
import { stories, topicList } from "@/lib/stories";

export const Route = createFileRoute("/cong-dong/$id")({
  head: ({ params }) => {
    const seed = seedPosts.find((p) => p.id === params.id);
    const t = seed ? `${seed.title} — Cộng đồng Truyền Thuyết Đô Thị` : "Chuyện từ Cộng đồng — Truyền Thuyết Đô Thị";
    const d = seed?.body[0] ?? "Một câu chuyện lạ được kể bởi thành viên cộng đồng.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: PostPage,
});

function PostPage() {
  const { id } = Route.useParams();
  const { posts, react, addComment, likeComment } = useCommunity();
  const post = posts.find((p) => p.id === id);
  if (!post) return <div className="section-pad"><div className="site-container"><div className="empty-paper"><GhostMascot mood="search" className="mx-auto h-28 w-28" /><h1 className="font-display text-3xl">Ủa… câu chuyện này đi đâu mất rồi.</h1><Link to="/cong-dong" className="mt-3 inline-block font-bold text-primary underline">Về Cộng đồng</Link></div></div></div>;
  const related = stories.find((s) => s.slug === post.relatedSlug);
  const topic = topicList.find((t) => t.name === post.topic);
  return <article className="section-pad"><div className="site-container max-w-3xl">
    <nav className="breadcrumb" aria-label="Đường dẫn"><Link to="/">Trang chủ</Link><ChevronRight /><Link to="/cong-dong">Cộng đồng</Link><ChevronRight /><span>{post.title}</span></nav>
    <div className="community-card mt-4">
      <span className="tape tape-left" />
      <header className="flex items-center gap-3"><Avatar name={post.author} /><div><p className="font-bold">{post.author}</p><p className="text-xs text-muted-foreground">{formatDate(post.date)}</p></div></header>
      <h1 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">{post.title}</h1>
      {post.pending && <p className="mt-3 inline-block rounded bg-secondary px-3 py-1 text-sm font-bold">Đang chờ kiểm duyệt · chỉ bạn thấy trên máy này</p>}
      {post.image && <img src={post.image} alt={`Ảnh minh họa cho ${post.title}`} className="mt-6 max-h-96 w-full rounded border-2 border-foreground object-cover" />}
      <div className="mt-6 space-y-5 text-lg leading-8">{post.body.map((p, i) => <p key={i}>{p}</p>)}</div>
      <div className="mt-6 flex flex-wrap gap-2 text-sm font-bold">
        {topic ? <Link to="/truyen-thuyet/chu-de/$topic" params={{ topic: topic.slug }} className="story-tag">#{post.topic.replaceAll(" ", "")}</Link> : <span className="story-tag">#{post.topic}</span>}
        {post.location && <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="size-4" />{post.location}</span>}
      </div>
      <div className="mt-6 border-t border-dashed border-border pt-5"><ReactionBar post={post} onReact={(k) => react(post.id, k)} /></div>
    </div>
    {related && <aside className="article-note mt-10">Nghe giống lời đồn trong sổ nè:<br /><Link to="/truyen-thuyet/$slug" params={{ slug: related.slug }} className="font-bold underline">{related.title} →</Link></aside>}
    <CommentThread comments={post.comments} onAdd={(a, t, pid) => addComment(post.id, a, t, pid)} onLike={(cid) => likeComment(post.id, cid)} />
  </div></article>;
}
