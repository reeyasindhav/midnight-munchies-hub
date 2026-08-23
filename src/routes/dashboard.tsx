import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Clock, Heart, LogOut, MapPin, ShoppingBag, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/require-auth";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RestaurantCard } from "@/components/restaurant-card";
import { restaurants } from "@/lib/data";
import { AnimatedHeading } from "@/components/animated-heading";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — NightOwl" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, orders, hydrated, signOut } = useStore();
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);

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

  const recentOrders = orders.slice(0, 3);
  const savedKitchens = restaurants.filter((r) => r.owlsPick);
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="eyebrow">Your dashboard</p>
            <AnimatedHeading className="mt-2 text-3xl font-display font-bold sm:text-4xl">
              Hey, {user?.name?.split(" ")[0] ?? "night owl"}
            </AnimatedHeading>
            <p className="mt-2 text-muted-foreground">
              Here&apos;s what&apos;s been keeping you fed after dark.
            </p>
          </div>
          <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
            <AlertDialogTrigger asChild>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
              >
                <LogOut className="size-4" /> Sign out
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="card-night">
              <AlertDialogHeader>
                <AlertDialogTitle>Sign out of NightOwl?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to sign in again to access your orders, cart, and dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => { signOut(); setLogoutOpen(false); navigate({ to: "/" }); }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Sign out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          <div className="card-night animate-rise rounded-2xl p-6" style={{ animationDelay: "0ms" }}>
            <ShoppingBag className="size-5 text-primary" />
            <p className="mt-4 font-display text-3xl">{orders.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">Orders placed</p>
          </div>
          <div className="card-night animate-rise rounded-2xl p-6" style={{ animationDelay: "60ms" }}>
            <Zap className="size-5 text-primary" />
            <p className="mt-4 font-display text-3xl">{savedKitchens.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">Saved kitchens</p>
          </div>
          <div className="card-night animate-rise rounded-2xl p-6" style={{ animationDelay: "120ms" }}>
            <Clock className="size-5 text-primary" />
            <p className="mt-4 font-display text-3xl">{totalSpent.toFixed(0)}</p>
            <p className="mt-1 text-sm text-muted-foreground">Total spent ($)</p>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold">Saved kitchens</h2>
              <p className="mt-1 text-sm text-muted-foreground">Owl&apos;s picks — tried, tested, late.</p>
            </div>
            <Link to="/discover" className="text-sm text-muted-foreground hover:text-primary">
              Browse all <ArrowRight className="inline size-3" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {savedKitchens.map((r, i) => (
              <RestaurantCard key={r.id} r={r} index={i} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold">Recent orders</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your latest late-night orders.
              </p>
            </div>
            <Link to="/orders" className="text-sm text-muted-foreground hover:text-primary">
              View all <ArrowRight className="inline size-3" />
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="card-night rounded-2xl py-16 text-center">
              <ShoppingBag className="mx-auto size-10 text-muted-foreground/50" />
              <p className="mt-3 text-sm text-muted-foreground">
                No orders yet. Time to change that.
              </p>
              <Link
                to="/discover"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Find a kitchen
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentOrders.map((o) => (
                <Link
                  key={o.id}
                  to="/orders/$id"
                  params={{ id: o.id }}
                  className="card-night hover-lift rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {o.restaurantName}
                      </p>
                      <p className="mt-1 font-semibold">
                        {o.items.length} item{o.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                        o.status === "delivered"
                          ? "bg-violet/10 text-violet"
                          : o.status === "on-the-way"
                            ? "bg-ember/10 text-ember"
                            : "bg-primary/10 text-primary"
                      }`}
                    >
                      {o.status === "cooking" && <Clock className="size-3" />}
                      {o.status === "on-the-way" && <MapPin className="size-3" />}
                      {o.status === "delivered" && <Star className="size-3" />}
                      {o.status.replace("-", " ")}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-bold text-primary">
                    ${o.total.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
