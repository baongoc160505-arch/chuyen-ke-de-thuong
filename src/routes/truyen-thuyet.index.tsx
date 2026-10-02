import { createFileRoute } from "@tanstack/react-router";
import { LegendEntrySelector, StoryArchive } from "@/components/legend-nav";
import { stories } from "@/lib/stories";

export const Route = createFileRoute("/truyen-thuyet/")({
  head: () => ({ meta: [
    { title: "Kho lời đồn — Truyền Thuyết Đô Thị" }, { name: "description", content: "Bắt đầu hành trình lời đồn theo quốc gia hoặc chủ đề, hoặc tìm trong toàn bộ kho truyện." },
    { property: "og:title", content: "Kho lời đồn" }, { property: "og:description", content: "Mỗi lời đồn lại mở ra một cánh cửa khác nhau." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ArchivePage,
});

function ArchivePage() {
  return <div className="section-pad"><div className="site-container">
    <header className="archive-header"><span className="tape-label">Tủ hồ sơ bí mật</span><h1 className="mt-5 font-display text-6xl sm:text-7xl">Kho lời đồn</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-8">Mỗi lời đồn lại mở ra một cánh cửa khác nhau. Có câu chuyện bắt nguồn từ một vùng đất, có câu chuyện gắn với một nơi chốn, và cũng có những lời đồn đã thay đổi theo thời gian. Bạn muốn bắt đầu hành trình của mình từ đâu?</p></header>
    <LegendEntrySelector />
    <section className="mt-20" aria-labelledby="all-title"><h2 id="all-title" className="mb-6 font-display text-4xl">Hay lục cả cuốn sổ</h2><StoryArchive items={stories} /></section>
  </div></div>;
}
