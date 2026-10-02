import { Link } from "@tanstack/react-router";
import { Clock3, Eye, MapPin } from "lucide-react";
import type { Story } from "@/lib/stories";
import { countrySlugOf, formatViews, topicSlugOf } from "@/lib/stories";
import { cn } from "@/lib/utils";

export function StoryCard({ story, index = 0, cork = false }: { story: Story; index?: number; cork?: boolean }) {
  const positions = ["paper-tilt-left", "paper-tilt-right", "paper-tilt-soft"];
  return (
    <article className={cn("story-card group relative", positions[index % positions.length], cork && "story-card-cork")}>
      {cork && <span className={cn("push-pin", index % 2 ? "push-pin-yellow" : "push-pin-pink")} />}
      <div className="story-image-wrap">
        <img src={story.image} alt="" width={1536} height={1024} loading="lazy" className="story-image" />
        <Link to="/truyen-thuyet/quoc-gia/$country" params={{ country: countrySlugOf(story.country) }} className="story-country relative z-10"><MapPin />{story.country}</Link>
      </div>
      <div className="p-5 sm:p-6">
        <Link to="/truyen-thuyet/chu-de/$topic" params={{ topic: topicSlugOf(story.category) }} className="story-tag relative z-10">#{story.category.replaceAll(" ", "")}</Link>
        <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">
          <Link to="/truyen-thuyet/$slug" params={{ slug: story.slug }} className="after:absolute after:inset-0">{story.title}</Link>
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{story.excerpt}</p>
        <div className="mt-5 flex items-center gap-4 border-t border-dashed border-border pt-4 text-xs font-bold text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock3 /> {story.readTime} phút đọc</span>
          <span className="inline-flex items-center gap-1"><Eye /> {formatViews(story.views)} lượt đọc</span>
        </div>
        <span className="story-link" aria-hidden="true">Đọc lời đồn →</span>
      </div>
    </article>
  );
}
