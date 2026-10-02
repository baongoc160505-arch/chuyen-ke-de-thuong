import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { TaxonArchive } from "@/components/legend-nav";
import { storiesByTopic, topicList } from "@/lib/stories";

export const Route = createFileRoute("/truyen-thuyet/chu-de/$topic")({
  loader: ({ params }) => { const t = topicList.find((x) => x.slug === params.topic); if (!t) throw notFound(); return t; },
  head: ({ loaderData }) => {
    const t = loaderData ? `Lời đồn ${loaderData.name.toLowerCase()} — Truyền Thuyết Đô Thị` : "Không tìm thấy chủ đề";
    const d = loaderData ? `Những lời đồn thuộc chủ đề ${loaderData.name}, nhẹ nhàng và không hù dọa.` : "Chủ đề này chưa có trong sổ.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: TopicArchive,
});

function TopicArchive() {
  const t = Route.useLoaderData();
  const heading = t.slug === "chuyen-chua-giai-thich" ? "Những chuyện chưa giải thích" : t.slug === "sinh-vat-ky-la" || t.slug === "do-vat" ? `Lời đồn về ${t.name.toLowerCase()}` : `Những lời đồn ở ${t.name.toLowerCase()}`;
  return <TaxonArchive kind="topic" label={t.name} heading={heading} items={storiesByTopic(t.slug)}
    siblings={topicList.map((x) => <Link key={x.slug} to="/truyen-thuyet/chu-de/$topic" params={{ topic: x.slug }} className={x.slug === t.slug ? "filter-chip filter-chip-active" : "filter-chip"}>{x.name}</Link>)} />;
}
