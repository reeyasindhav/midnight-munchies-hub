import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, ShoppingBag, Star, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { RequireAuth } from "@/components/require-auth";
import { useStore } from "@/lib/store";
import { AnimatedHeading } from "@/components/animated-heading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statuses = ["all", "cooking", "on-the-way", "delivered"] as const;

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders — NightOwl" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const { orders, hydrated } = useStore();
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24">
        <div className="h-64 animate-pulse rounded-2xl bg-surface" />
      </div>
    );
  }

  const filtered = useMemo(
    () =>
      filter === "all" ? orders : orders.filter((o) => o.status === filter),
    [orders, filter],
  );

  const statusIcon = (status: string) => {
    switch (status) {
      case "cooking":
        return <Clock className="size-3" />;
      case "on-the-way":
        return <Truck className="size-3" />;
      case "delivered":
        return <Star className="size-3" />;
      default:
        return <ShoppingBag className="size-3" />;
    }
  };

  const statusClass = (status: string) => {
    switch (status) {
      case "cooking":
        return "bg-primary/10 text-primary";
      case "on-the-way":
        return "bg-ember/10 text-ember";
      case "delivered":
        return "bg-violet/10 text-violet";
      default:
        return "bg-secondary text-muted-foreground";
    }
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-5">
        <div className="mb-8">
          <AnimatedHeading className="text-3xl font-display font-bold">Your orders</AnimatedHeading>
          <p className="mt-2 text-muted-foreground">
            Track late-night deliveries, past and present.
          </p>
        </div>

        <Tabs value={filter} onValueChange={setFilter} className="w-full mb-8">
          <TabsList className="bg-surface-2">
            {statuses.map((s) => (
              <TabsTrigger
                key={s}
                value={s}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground capitalize"
              >
                {s === "all" ? "All" : s.replace("-", " ")}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {filtered.length === 0 ? (
          <div className="card-night rounded-2xl py-16 text-center">
            <ShoppingBag className="mx-auto size-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">
              {filter === "all"
                ? "No orders yet. Time to change that."
                : `No ${filter.replace("-", " ")} orders.`}
            </p>
            {filter === "all" && (
              <Link
                to="/discover"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Find a kitchen
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((o) => (
              <Link
                key={o.id}
                to="/orders/$id"
                params={{ id: o.id }}
                className="card-night hover-lift block rounded-2xl p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{o.restaurantName}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {o.items.length} item{o.items.length !== 1 ? "s" : ""} ·
                      ETA {o.etaMinutes} min
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(o.status)}`}
                  >
                    {statusIcon(o.status)}
                    {o.status.replace("-", " ")}
                  </span>
                </div>
                <p className="mt-3 font-bold text-primary">
                  ${o.total.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
