import { Link } from "@tanstack/react-router";
import { Clock, Moon, Star } from "lucide-react";
import type { Restaurant } from "@/lib/data";

export function RestaurantCard({
  r,
  open = true,
  index = 0,
}: {
  r: Restaurant;
  open?: boolean;
  index?: number;
}) {
  return (
    <Link
      to="/restaurant/$id"
      params={{ id: r.id }}
      className={`hover-lift card-night group animate-rise block overflow-hidden rounded-2xl ${
        open ? "" : "opacity-45 saturate-0"
      }`}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={r.hero}
            alt={r.name}
            loading="lazy"
            className="size-full object-cover brightness-[0.62] transition-transform duration-700 group-hover:scale-105 group-hover:brightness-75 float-anim"
          />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        {r.owlsPick && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
            <Moon className="size-3" /> Owl&apos;s pick
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
          {open ? `Open until ${r.closesAt}` : "Closed now"}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{r.name}</h3>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm">
            <Star className="size-3.5 fill-primary text-primary" />
            {r.rating}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{r.cuisine}</p>
        <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" />
            {r.eta[0]}–{r.eta[1]} min
          </span>
          <span>
            {r.price} · {r.neighborhood}
          </span>
        </div>
      </div>
    </Link>
  );
}
