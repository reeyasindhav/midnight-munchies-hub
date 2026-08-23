import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin, Moon, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { cravings, restaurants } from "@/lib/data";
import { formatClock, isOpenAt, nightHour } from "@/lib/night";
import { RestaurantCard } from "@/components/restaurant-card";
import { AnimatedHeading } from "@/components/animated-heading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NightOwl — Good food after dark" },
      {
        name: "description",
        content:
          "NightOwl curates only the kitchens still cooking after midnight, with crave-based categories and precise late-night delivery estimates.",
      },
      { property: "og:title", content: "NightOwl — Good food after dark" },
      {
        property: "og:description",
        content: "Late-night food delivery from kitchens that are actually open right now.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [clock, setClock] = useState("--:--");
  useEffect(() => {
    const t = setInterval(() => setClock(formatClock(new Date())), 1000);
    setClock(formatClock(new Date()));
    return () => clearInterval(t);
  }, []);

  const hour = nightHour();
  const openNow = restaurants.filter((r) => isOpenAt(r, hour));
  const featured = (openNow.length ? openNow : restaurants).slice(0, 3);

  return (
    <div className="night-grad">
      {/* HERO */}
      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 pt-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="card-night animate-rise relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-primary/10" />
          <div className="pointer-events-none absolute -right-10 top-10 size-64 rounded-full border border-primary/10" />
          <p className="eyebrow flex items-center gap-2">
            <span className="live-dot" /> Open late. Eat well.
          </p>
          <AnimatedHeading className="mt-6 text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">
            GOOD FOOD
            <br />
            <span className="text-primary">AFTER DARK.</span>
          </AnimatedHeading>
          <p className="mt-8 max-w-md text-muted-foreground">
            The best kitchens still cooking when the rest of the city is asleep. Curated for right
            now.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              to="/discover"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
            >
              Find my craving
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="size-4 text-primary" /> Only open kitchens
            </span>
          </div>
        </div>

        <div className="card-night animate-rise relative flex flex-col justify-between overflow-hidden rounded-3xl p-8" style={{ animationDelay: "120ms" }}>
          <span className="w-fit rounded-full bg-secondary px-3 py-1.5 text-xs tracking-wide">
            LIVE AT {clock}
          </span>
          <div className="relative my-10 grid place-items-center">
            <img
              src={featured[0]?.hero}
              alt={featured[0]?.name ?? "Late night dish"}
              className="size-48 rounded-full object-cover brightness-90 float-anim"
              style={{ boxShadow: "0 0 90px -20px var(--neon)" }}
            />
            <p className="eyebrow mt-8">Crispy · Saucy · Late</p>
          </div>
          <div>
            <p className="eyebrow">Tonight&apos;s energy</p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <h2 className="text-3xl shimmer-text">Craving something real?</h2>
              <Link
                to="/cravings"
                className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:rotate-12"
              >
                <Moon className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CRAVINGS */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <p className="eyebrow">Pick a mood</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl">What are you up for?</h2>
          <Link to="/cravings" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            See all cravings <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cravings.slice(0, 4).map((c, i) => (
            <Link
              key={c.id}
              to="/discover"
              search={{ craving: c.id }}
              className="hover-lift card-night animate-rise flex items-center gap-4 rounded-2xl p-4"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-2xl">
                {c.emoji}
              </span>
              <span>
                <span className="block font-semibold">{c.name}</span>
                <span className="block text-sm text-muted-foreground">{c.tagline}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* OPEN NEAR YOU */}
      <section className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow flex items-center gap-2">
            <span className="live-dot" /> Open near you
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl">Still serving. Right now.</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Freshly checked at {clock} · Times include prep &amp; travel
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" /> Downtown, Austin
            </span>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((r, i) => (
              <RestaurantCard key={r.id} r={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-border/60 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-3">
          {[
            { k: "412", l: "kitchens open past 2 AM", i: Clock },
            { k: "21 min", l: "median late-night delivery", i: Zap },
            { k: "0", l: "closed venues in your feed", i: Moon },
          ].map((s, i) => (
            <div key={s.l} className="card-night animate-rise rounded-2xl p-7" style={{ animationDelay: `${i * 80}ms` }}>
              <s.i className="size-5 text-primary" />
              <p className="mt-6 font-display text-4xl">{s.k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
