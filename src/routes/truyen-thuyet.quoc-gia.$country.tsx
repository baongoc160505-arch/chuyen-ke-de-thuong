import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { TaxonArchive } from "@/components/legend-nav";
import { countryList, storiesByCountry } from "@/lib/stories";

export const Route = createFileRoute("/truyen-thuyet/quoc-gia/$country")({
  loader: ({ params }) => { const c = countryList.find((x) => x.slug === params.country); if (!c) throw notFound(); return c; },
  head: ({ loaderData }) => {
    const t = loaderData ? `Lời đồn từ ${loaderData.name} — Truyền Thuyết Đô Thị` : "Không tìm thấy vùng đất";
    const d = loaderData ? `Những truyền thuyết đô thị từ ${loaderData.name}, kể theo cách dễ thương hơn.` : "Vùng đất này chưa có trong sổ.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: CountryArchive,
});

function CountryArchive() {
  const c = Route.useLoaderData();
  return <TaxonArchive kind="country" label={c.name} heading={`Lời đồn từ ${c.name}`} items={storiesByCountry(c.slug)}
    siblings={countryList.map((x) => <Link key={x.slug} to="/truyen-thuyet/quoc-gia/$country" params={{ country: x.slug }} className={x.slug === c.slug ? "filter-chip filter-chip-active" : "filter-chip"}>{x.name}</Link>)} />;
}
