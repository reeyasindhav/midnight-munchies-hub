import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Clock, MapPin, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cravings, neighborhoods, restaurants } from "@/lib/data";
import { formatHourLabel, isOpenAt, nightHour } from "@/lib/night";
import { RestaurantCard } from "@/components/restaurant-card";
import { AnimatedHeading } from "@/components/animated-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type DiscoverSearch = {
  craving?: string;
  neighborhood?: string;
  time?: number;
};

export const Route = createFileRoute("/discover")({
  validateSearch: (search: Record<string, string | undefined>): DiscoverSearch => {
    const c = search['craving'];
    const n = search['neighborhood'];
    const t = search['time'];
    const result: DiscoverSearch = {};
    if (c) result.craving = c;
    if (n) result.neighborhood = n;
    if (t && !isNaN(Number(t))) result.time = Number(t);
    return result;
  },
  head: () => ({
    meta: [{ title: "Discover kitchens — NightOwl" }],
  }),
  component: Discover,
});

function Discover() {
  const { craving, neighborhood, time } = Route.useSearch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [sliderVal, setSliderVal] = useState<number | null>(null);

  const currentHour = time ?? nightHour();
  const hour = sliderVal ?? currentHour;
  const hourLabel = useMemo(() => formatHourLabel(hour), [hour]);

  const activeCraving = craving ? cravings.find((c) => c.id === craving) : undefined;
  const activeNeighborhood = neighborhood && neighborhood !== "all" ? neighborhood : undefined;

  const filtered = useMemo(
    () =>
      restaurants.filter((r) => {
        if (query && !r.name.toLowerCase().includes(query.toLowerCase())) return false;
        if (craving && !r.cravings.includes(craving)) return false;
        if (activeNeighborhood && r.neighborhood !== activeNeighborhood) return false;
        if (!isOpenAt(r, hour)) return false;
        return true;
      }),
    [query, craving, activeNeighborhood, hour],
  );

  const updateTime = (vals: number[]) => {
    const v = vals[0];
    if (v !== undefined) {
      setSliderVal(v);
      navigate({
        to: "/discover",
        search: (prev) => ({ ...prev, time: v }),
        replace: true,
      });
    }
  };

  const toggleCraving = (id: string) => {
    navigate({
      to: "/discover",
      search: (prev) => {
        if (prev.craving === id) {
          const { craving: _removed, ...rest } = prev;
          return rest;
        }
        return { ...prev, craving: id };
      },
      replace: true,
    });
  };

  const setNeighborhood = (val: string) => {
    if (val === "all") {
      navigate({
        to: "/discover",
        search: (prev) => {
          const { neighborhood: _removed, ...rest } = prev;
          void _removed;
          return rest;
        },
        replace: true,
      });
    } else {
      navigate({
        to: "/discover",
        search: (prev) => ({ ...prev, neighborhood: val }),
        replace: true,
      });
    }
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <div className="mb-10">
          <p className="eyebrow">Find what's open now</p>
          <AnimatedHeading className="mt-2 text-4xl font-display font-bold sm:text-5xl">
            Kitchens open <span className="text-primary">right now</span>
          </AnimatedHeading>
          <p className="mt-4 text-sm text-muted-foreground">
            Showing kitchens open at <span className="text-primary">{hourLabel}</span>
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search kitchens…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-border bg-surface pl-10 focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Filters */}
        <div className="card-night mb-8 rounded-2xl p-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Time slider */}
            <div>
              <p className="eyebrow mb-3">Open at</p>
              <p className="mb-3 text-2xl font-semibold text-primary">{hourLabel}</p>
              <Slider
                value={[hour]}
                onValueChange={updateTime}
                min={20}
                max={29}
                step={0.5}
                className="w-full"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>8 PM</span>
                <span>5 AM</span>
              </div>
            </div>

            {/* Neighborhood */}
            <div>
              <p className="eyebrow mb-3">Neighborhood</p>
              <Select
                value={activeNeighborhood ?? "all"}
                onValueChange={setNeighborhood}
              >
                <SelectTrigger className="border-border bg-secondary">
                  <SelectValue placeholder="All areas" />
                </SelectTrigger>
                <SelectContent className="bg-card text-card-foreground">
                  {neighborhoods.map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Craving pills */}
            <div>
              <p className="eyebrow mb-3">Craving</p>
              <div className="flex flex-wrap gap-2">
                {craving && (
                  <button
                    onClick={() => toggleCraving(craving)}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-xs"
                  >
                    <X className="size-3" /> Clear
                  </button>
                )}
                {!craving &&
                  cravings.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => toggleCraving(c.id)}
                      className="rounded-full bg-secondary px-3 py-1.5 text-xs hover:bg-primary/20"
                    >
                      {c.emoji} {c.name}
                    </button>
                  ))}
                {craving && activeCraving && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1.5 text-xs text-primary">
                    {activeCraving.emoji} {activeCraving.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} kitchen{filtered.length !== 1 ? "s" : ""} serving now
          </p>
          {craving && (
            <Link
              to="/discover"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
            >
              Clear filter <X className="size-3" />
            </Link>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Clock className="mx-auto size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-xl font-semibold">Nothing open at this hour</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your time filter or craving. The city sleeps, but someone is always cooking.
            </p>
            <Link
              to="/discover"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Reset filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <RestaurantCard key={r.id} r={r} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
