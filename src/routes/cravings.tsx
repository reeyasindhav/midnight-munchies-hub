import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Moon, Star, Zap } from "lucide-react";
import { cravings } from "@/lib/data";
import { RestaurantCard } from "@/components/restaurant-card";
import { restaurants } from "@/lib/data";
import { isOpenAt, nightHour } from "@/lib/night";
import { AnimatedHeading } from "@/components/animated-heading";

export const Route = createFileRoute("/cravings")({
  head: () => ({
    meta: [{ title: "Cravings — NightOwl" }],
  }),
  component: Cravings,
});

const cravingCounts: Record<string, number> = {};
restaurants.forEach((r) => {
  r.cravings.forEach((c) => {
    cravingCounts[c] = (cravingCounts[c] ?? 0) + 1;
  });
});

const topCraving = [...cravings].sort((a, b) => (cravingCounts[b.id] ?? 0) - (cravingCounts[a.id] ?? 0))[0];

function Cravings() {
  const hour = nightHour();
  const openCount = restaurants.filter((r) => isOpenAt(r, hour)).length;

  return (
    <div className="py-12 night-grad min-h-screen">
      <div className="mx-auto max-w-7xl px-5">
        {/* Hero */}
        <div className="relative mb-16 overflow-hidden rounded-3xl card-night p-10 sm:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full border border-primary/10" />
          <div className="pointer-events-none absolute -right-10 top-10 size-64 rounded-full border border-primary/10" />
          <div className="relative z-10">
            <p className="eyebrow flex items-center gap-2">
              <span className="live-dot" /> {openCount} kitchens open right now
            </p>
            <AnimatedHeading className="mt-5 text-5xl leading-[0.95] font-display font-bold sm:text-6xl lg:text-7xl">
              What are you
              <br />
              <span className="shimmer-text">craving?</span>
            </AnimatedHeading>
            <p className="mt-5 max-w-lg text-muted-foreground">
              Pick a mood and we&apos;ll surface only the kitchens open right now. No closed venues, no daylight filters — just late-night eats.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/discover"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.04]"
              >
                <Flame className="size-4" /> Find my craving
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">
                <Zap className="size-3.5 text-primary" /> Curated for {hour < 24 ? "tonight" : "after midnight"}
              </span>
            </div>
          </div>
        </div>

        {/* Featured */}
        {topCraving && (
          <div className="mb-12">
            <p className="eyebrow mb-4 flex items-center gap-2">
              <Star className="size-3.5 text-primary" /> Most popular right now
            </p>
            <Link
              to="/discover"
              search={{ craving: topCraving.id }}
              className="hover-lift card-night group relative flex items-center gap-8 overflow-hidden rounded-3xl p-0"
            >
              <img
                src={topCraving.image}
                alt={topCraving.name}
                className="absolute inset-0 size-full object-cover brightness-[0.35] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
              <div className="relative z-10 flex h-56 sm:h-64 w-full items-center px-8 sm:px-12">
                <span className="text-7xl sm:text-8xl float-anim">{topCraving.emoji}</span>
                <div className="ml-6 sm:ml-10">
                  <p className="text-xs uppercase tracking-widest text-primary">{cravingCounts[topCraving.id]} kitchens open</p>
                  <h2 className="mt-1 text-3xl sm:text-4xl font-display font-bold">{topCraving.name}</h2>
                  <p className="mt-1 text-muted-foreground">{topCraving.tagline}</p>
                </div>
                <ArrowRight className="absolute right-8 size-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          </div>
        )}

        {/* Cravings Grid — refined glass cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cravings.map((c, i) => {
            const count = cravingCounts[c.id] ?? 0;
            if (c.id === topCraving?.id) return null;
            return (
              <Link
                key={c.id}
                to="/discover"
                search={{ craving: c.id }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-surface/70"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {/* subtle background glow on hover */}
                <span className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex items-center gap-5">
                  <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-secondary text-4xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                    {c.emoji}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-foreground">
                      {c.name}
                    </h3>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {c.tagline}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur transition-colors group-hover:border-primary/30 group-hover:text-primary">
                      <Zap className="size-3" />
                      {count} kitchen{count !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Still undecided */}
        <div className="mt-16 border-t border-border/60 pt-16">
          <div className="card-night rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full border border-primary/10" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center size-14 rounded-full bg-secondary mb-5">
                <Moon className="size-6 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold">Still undecided?</h2>
              <p className="mt-3 max-w-md mx-auto text-muted-foreground">
                Let us pick for you. We&apos;ll find the best open kitchen based on what&apos;s fresh, fast, and perfect for right now.
              </p>
              <Link
                to="/discover"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.04]"
                style={{ boxShadow: "0 0 30px -6px var(--neon)" }}
              >
                Find my craving <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
