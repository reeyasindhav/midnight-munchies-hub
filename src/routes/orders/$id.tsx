import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Star, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { RequireAuth } from "@/components/require-auth";
import { useStore } from "@/lib/store";
import { AnimatedHeading } from "@/components/animated-heading";
import { Button } from "@/components/ui/button";

const STATUSES = ["cooking", "on-the-way", "delivered"] as const;
const STATUS_PROGRESS: Record<string, number> = {
  cooking: 33,
  "on-the-way": 66,
  delivered: 100,
};

export const Route = createFileRoute("/orders/$id")({
  head: () => ({ meta: [{ title: "Order tracking — NightOwl" }] }),
  component: OrderTrackingPage,
});

function OrderTrackingPage() {
  const { id } = Route.useParams();
  const { orders, updateOrderStatus, hydrated } = useStore();
  const navigate = useNavigate();

  const order = useMemo(
    () =>
      orders.find((o) => o.id === id) ??
      (() => {
        const seedOrders = [
          {
            id: "NO-4821",
            restaurantName: "Luna Taquería",
            placedAt: Date.now() - 1000 * 60 * 60 * 26,
            total: 27.4,
            items: [],
            etaMinutes: 19,
            status: "delivered",
          },
          {
            id: "NO-4790",
            restaurantName: "The Burger Basement",
            placedAt: Date.now() - 1000 * 60 * 60 * 74,
            total: 34.9,
            items: [],
            etaMinutes: 23,
            status: "delivered",
          },
          {
            id: "NO-4712",
            restaurantName: "Owl Roasters",
            placedAt: Date.now() - 1000 * 60 * 60 * 120,
            total: 11.25,
            items: [],
            etaMinutes: 12,
            status: "delivered",
          },
        ];
        return seedOrders.find((o) => o.id === id) ?? null;
      })(),
    [id, orders],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!order || order.status === "delivered") return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (order.status === "cooking") {
      timers.push(
        setTimeout(() => updateOrderStatus(order.id, "on-the-way" as const), 4000),
      );
      timers.push(
        setTimeout(() => updateOrderStatus(order.id, "delivered" as const), 8000),
      );
    } else if (order.status === "on-the-way") {
      timers.push(
        setTimeout(() => updateOrderStatus(order.id, "delivered" as const), 4000),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [order?.id, order?.status, updateOrderStatus]);

  if (!hydrated || !order) {
    return (
      <div className="mx-auto max-w-3xl py-24 text-center">
        <h1 className="text-2xl font-display font-bold">
          {!hydrated ? "Loading…" : "Order not found"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {!hydrated ? "" : "This order doesn't exist or has expired."}
        </p>
        {!hydrated ? null : (
          <Link
            to="/orders"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            All orders
          </Link>
        )}
      </div>
    );
  }

  const progress = STATUS_PROGRESS[order.status] ?? 0;

  const etaLabel = useMemo(() => {
    if (order.status === "delivered") return "Delivered";
    const remaining = Math.max(order.etaMinutes - Math.floor((Date.now() - order.placedAt) / 60000), 1);
    return `${remaining} min remaining`;
  }, [order.status, order.etaMinutes, order.placedAt]);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-5">
        <Link
          to="/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> All orders
        </Link>

        <div className="card-night rounded-3xl p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow">Order {order.id}</p>
              <AnimatedHeading className="mt-2 text-2xl font-display font-bold">
                {order.restaurantName}
              </AnimatedHeading>
            </div>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                order.status === "delivered"
                  ? "bg-violet/10 text-violet"
                  : order.status === "on-the-way"
                    ? "bg-ember/10 text-ember"
                    : "bg-primary/10 text-primary"
              }`}
            >
              {order.status.replace("-", " ")}
            </span>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Cooking</span>
              <span>On the way</span>
              <span>Delivered</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <Clock className="mx-auto size-5 text-primary" />
              <p className="mt-1 text-sm font-semibold">{etaLabel}</p>
              <p className="text-xs text-muted-foreground">ETA</p>
            </div>
            <div>
              <Star className="mx-auto size-5 text-primary" />
              <p className="mt-1 text-sm font-semibold">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-muted-foreground">Items</p>
            </div>
            <div>
              <MapPin className="mx-auto size-5 text-primary" />
              <p className="mt-1 text-sm font-semibold">
                ${order.total.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div>
              <Truck className="mx-auto size-5 text-primary" />
              <p className="mt-1 text-sm font-semibold">
                {order.etaMinutes} min
              </p>
              <p className="text-xs text-muted-foreground">Est. delivery</p>
            </div>
          </div>

          {order.status !== "delivered" && (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="live-dot" />
              Live tracking — status updates automatically
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
