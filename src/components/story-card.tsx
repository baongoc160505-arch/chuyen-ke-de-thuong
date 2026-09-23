import { Link } from "@tanstack/react-router";
import { Clock3, Eye, MapPin } from "lucide-react";
import type { Story } from "@/lib/stories";
import { formatViews } from "@/lib/stories";
import { cn } from "@/lib/utils";

export function StoryCard({ story, index = 0, cork = false }: { story: Story; index?: number; cork?: boolean }) {
  const positions = ["paper-tilt-left", "paper-tilt-right", "paper-tilt-soft"];
  return (
    <article className={cn("story-card group", positions[index % positions.length], cork && "story-card-cork")}>
      {cork && <span className={cn("push-pin", index % 2 ? "push-pin-yellow" : "push-pin-pink")} />}
      <Link to="/truyen-thuyet/$slug" params={{ slug: story.slug }} className="block">
        <div className="story-image-wrap">
          <img src={story.image} alt="" width={1536} height={1024} loading="lazy" className="story-image" />
          <span className="story-country"><MapPin />{story.country}</span>
        </div>
        <div className="p-5 sm:p-6">
          <span className="story-tag">#{story.category.replaceAll(" ", "")}</span>
          <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">{story.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{story.excerpt}</p>
          <div className="mt-5 flex items-center gap-4 border-t border-dashed border-border pt-4 text-xs font-bold text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock3 /> {story.readTime} phút</span>
            <span className="inline-flex items-center gap-1"><Eye /> {formatViews(story.views)}</span>
          </div>
          <span className="story-link">Nghe kể nè →</span>
        </div>
      </Link>
    </article>
  );
}
