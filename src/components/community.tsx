import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, MapPin, MessageCircle, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GhostMascot } from "@/components/mascot";
import { countComments, formatDate, reactionList, totalReactions, type Comment, type CommunityPost, type Reaction } from "@/lib/community";
import { countryList, topicList } from "@/lib/stories";
import { cn } from "@/lib/utils";

export function Avatar({ name }: { name: string }) {
  const hue = [...name].reduce((n, ch) => n + ch.charCodeAt(0), 0) % 3;
  return <span className={cn("avatar-doodle", hue === 1 && "avatar-doodle-yellow", hue === 2 && "avatar-doodle-coral")} aria-hidden="true">{name.trim().charAt(0).toUpperCase()}</span>;
}

export function ReactionBar({ post, onReact }: { post: CommunityPost; onReact: (k: Reaction) => void }) {
  return <div className="flex flex-wrap gap-2">{reactionList.map((r) => <button key={r.key} type="button" onClick={() => onReact(r.key)} className="reaction-chip" aria-label={`${r.label} (${post.reactions[r.key]})`}>{r.emoji} {post.reactions[r.key]}</button>)}</div>;
}

export function CommunityPostCard({ post, index, onReact }: { post: CommunityPost; index: number; onReact: (k: Reaction) => void }) {
  return (
    <article className={cn("community-card", index % 2 ? "paper-tilt-right" : "paper-tilt-left")}>
      <span className="tape tape-left" />
      <header className="flex items-center gap-3"><Avatar name={post.author} /><div><p className="font-bold">{post.author}</p><p className="text-xs text-muted-foreground">{formatDate(post.date)}</p></div></header>
      <h3 className="mt-4 font-display text-3xl leading-tight"><Link to="/cong-dong/$id" params={{ id: post.id }}>{post.title}</Link></h3>
      <p className="mt-2 line-clamp-3 leading-7">{post.body[0]}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold"><span className="story-tag">#{post.topic.replaceAll(" ", "")}</span>{post.location && <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="size-3" />{post.location}</span>}</div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-dashed border-border pt-4 text-sm font-bold">
        <span className="inline-flex items-center gap-1"><MessageCircle className="size-4" />{countComments(post.comments)} bình luận</span>
        <span className="inline-flex items-center gap-1"><Heart className="size-4" />{totalReactions(post)} cảm xúc</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild variant="sticker" size="sm"><Link to="/cong-dong/$id" params={{ id: post.id }}>Đọc tiếp</Link></Button>
        <Button asChild variant="paper" size="sm"><Link to="/cong-dong/$id" params={{ id: post.id }} hash="binh-luan">Bình luận</Link></Button>
        <Button variant="paper" size="sm" type="button" onClick={() => onReact("tim")}>❤️ Thả tim</Button>
      </div>
    </article>
  );
}

function CommentForm({ onSubmit, compact, onDone }: { onSubmit: (author: string, text: string) => void; compact?: boolean; onDone?: () => void }) {
  const [author, setAuthor] = useState(""); const [text, setText] = useState("");
  const submit = (e: FormEvent) => { e.preventDefault(); if (!text.trim()) return; onSubmit(author.trim().slice(0, 40), text.trim().slice(0, 1000)); setText(""); onDone?.(); };
  return (
    <form onSubmit={submit} className={cn("comment-form", compact && "comment-form-compact")}>
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Tên của bạn (không bắt buộc)" aria-label="Tên của bạn" maxLength={40} />
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={compact ? "Trả lời nhẹ nhàng thôi nha…" : "Để lại lời nhắn của bạn…"} aria-label="Nội dung bình luận" rows={compact ? 2 : 3} maxLength={1000} required />
      <Button type="submit" variant="sticker" size="sm">{compact ? "Trả lời" : "Gửi bình luận"}</Button>
    </form>
  );
}

function CommentItem({ c, depth, onReply, onLike }: { c: Comment; depth: number; onReply: (parentId: string, a: string, t: string) => void; onLike: (id: string) => void }) {
  const [replying, setReplying] = useState(false);
  return (
    <li className="comment-item">
      <div className="flex items-start gap-3"><Avatar name={c.author} />
        <div className="min-w-0 flex-1">
          <p className="text-sm"><strong>{c.author}</strong> <span className="text-muted-foreground">· {formatDate(c.date)}</span></p>
          <p className="mt-1 break-words leading-7">{c.text}</p>
          <div className="mt-1 flex gap-4 text-xs font-bold">
            <button type="button" onClick={() => onLike(c.id)} className="inline-flex items-center gap-1 hover:text-primary"><Heart className="size-3" /> {c.likes}</button>
            <button type="button" onClick={() => setReplying(!replying)} className="inline-flex items-center gap-1 hover:text-primary"><Reply className="size-3" /> Trả lời</button>
          </div>
          {replying && <CommentForm compact onSubmit={(a, t) => onReply(c.id, a, t)} onDone={() => setReplying(false)} />}
        </div>
      </div>
      {c.replies.length > 0 && <ul className={depth < 2 ? "comment-replies" : "mt-3 space-y-3"}>{c.replies.map((r) => <CommentItem key={r.id} c={r} depth={depth + 1} onReply={onReply} onLike={onLike} />)}</ul>}
    </li>
  );
}

export function CommentThread({ comments, onAdd, onLike }: { comments: Comment[]; onAdd: (author: string, text: string, parentId?: string) => void; onLike: (id: string) => void }) {
  return (
    <section id="binh-luan" className="mt-16 scroll-mt-28" aria-labelledby="comment-title">
      <h2 id="comment-title" className="font-display text-4xl">Mọi người đang bàn gì?</h2>
      <div className="mt-6"><CommentForm onSubmit={(a, t) => onAdd(a, t)} /></div>
      {comments.length ? (
        <ul className="mt-8 space-y-6">{comments.map((c) => <CommentItem key={c.id} c={c} depth={0} onReply={(pid, a, t) => onAdd(a, t, pid)} onLike={onLike} />)}</ul>
      ) : (
        <div className="empty-paper mt-8"><GhostMascot className="mx-auto h-24 w-24" /><p className="font-display text-2xl">Yên ắng quá ha.<br />Để lại lời nhắn đầu tiên đi.</p></div>
      )}
    </section>
  );
}

export function StorySubmissionForm({ onSubmit }: { onSubmit: (data: { author: string; title: string; body: string[]; location?: string; topic: string; image?: string }) => string }) {
  const [done, setDone] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>();
  const [error, setError] = useState("");
  const handleFile = (file?: File) => {
    if (!file) return setImage(undefined);
    if (!file.type.startsWith("image/") || file.size > 1_500_000) return setError("Ảnh cần là hình và nhỏ hơn 1,5MB nha.");
    setError(""); const reader = new FileReader(); reader.onload = () => setImage(String(reader.result)); reader.readAsDataURL(file);
  };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const author = String(f.get("author") ?? "").trim(); const title = String(f.get("title") ?? "").trim(); const story = String(f.get("story") ?? "").trim();
    if (!author || !title || story.length < 20) return setError("Bạn điền tên, tiêu đề và kể ít nhất vài câu nhé.");
    const id = onSubmit({ author: author.slice(0, 40), title: title.slice(0, 120), body: story.slice(0, 5000).split(/\n+/).filter(Boolean), location: String(f.get("location") ?? "").trim().slice(0, 60) || undefined, topic: String(f.get("topic")), image });
    setDone(id);
  };
  if (done) return (
    <div className="empty-paper text-center"><GhostMascot mood="happy" className="mx-auto h-32 w-32" /><h2 className="font-display text-4xl">Nhận được rồi!</h2><p className="mt-2 text-lg">Tụi mình đang cất lời đồn của bạn vào sổ.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><Button asChild variant="sticker"><Link to="/cong-dong/$id" params={{ id: done }}>Xem câu chuyện của bạn</Link></Button><Button asChild variant="paper"><Link to="/cong-dong">Về Cộng đồng</Link></Button></div></div>
  );
  return (
    <form onSubmit={submit} className="submit-paper" noValidate>
      <label>Tên hiển thị<input name="author" maxLength={40} required placeholder="Ví dụ: Ma Nhỏ Hay Run" /></label>
      <label>Tiêu đề câu chuyện<input name="title" maxLength={120} required placeholder="Một cái tên thật tò mò…" /></label>
      <label>Câu chuyện của bạn<textarea name="story" rows={8} maxLength={5000} required placeholder="Kể từ từ thôi, không ai hù bạn đâu…" /></label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>Quốc gia / địa điểm <small>(không bắt buộc)</small><input name="location" list="country-options" maxLength={60} placeholder="Ví dụ: Đà Lạt, Việt Nam" /><datalist id="country-options">{countryList.map((c) => <option key={c.slug} value={c.name} />)}</datalist></label>
        <label>Chủ đề<select name="topic" defaultValue={topicList[0].name}>{topicList.map((t) => <option key={t.slug}>{t.name}</option>)}</select></label>
      </div>
      <label>Ảnh minh họa <small>(không bắt buộc)</small><input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} /></label>
      {image && <img src={image} alt="Ảnh bạn vừa chọn" className="max-h-48 w-auto rounded border-2 border-foreground" />}
      <label className="flex-row! items-start gap-3 font-normal"><input type="checkbox" required className="mt-1 size-4" name="agree" /> <span>Tôi hiểu rằng nội dung có thể được kiểm duyệt trước khi hiển thị.</span></label>
      {error && <p className="font-bold text-destructive" role="alert">{error}</p>}
      <Button type="submit" variant="sticker" size="lg">Gửi lời đồn 👻</Button>
    </form>
  );
}
