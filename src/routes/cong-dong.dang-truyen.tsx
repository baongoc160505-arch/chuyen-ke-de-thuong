import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { StorySubmissionForm } from "@/components/community";
import { GhostMascot } from "@/components/mascot";
import { useCommunity } from "@/lib/community";

export const Route = createFileRoute("/cong-dong/dang-truyen")({
  head: () => ({ meta: [
    { title: "Kể một câu chuyện — Truyền Thuyết Đô Thị" }, { name: "description", content: "Gửi lời đồn hoặc chuyện lạ của bạn vào cuốn sổ chung." },
    { property: "og:title", content: "Kể một câu chuyện" }, { property: "og:description", content: "Gửi lời đồn của bạn vào cuốn sổ Truyền Thuyết Đô Thị." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: SubmitPage,
});

function SubmitPage() {
  const { addPost } = useCommunity();
  return <div className="section-pad"><div className="site-container max-w-3xl">
    <nav className="breadcrumb" aria-label="Đường dẫn"><Link to="/">Trang chủ</Link><ChevronRight /><Link to="/cong-dong">Cộng đồng</Link><ChevronRight /><span>Kể một câu chuyện</span></nav>
    <header className="mb-8 flex items-center gap-5"><GhostMascot className="h-24 w-24 shrink-0" /><div><h1 className="font-display text-5xl">Kể một câu chuyện</h1><p className="mt-2">Ma nhỏ đang cầm bút, sẵn sàng ghi lại rồi nè.</p></div></header>
    <StorySubmissionForm onSubmit={(d) => addPost({ ...d, pending: true })} />
  </div></div>;
}
