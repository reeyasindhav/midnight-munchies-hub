import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { useStore } from "@/lib/store";
import { formatClock } from "@/lib/night";

const nav = [
  { to: "/discover", label: "Discover" },
  { to: "/cravings", label: "Cravings" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/for-restaurants", label: "For restaurants" },
];

export function SiteHeader() {
  const { user, cartCount } = useStore();
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("");
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const t = setInterval(() => setClock(formatClock(new Date())), 1000);
    setClock(formatClock(new Date()));
    return () => clearInterval(t);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground lg:inline-flex">
            <span className="live-dot" />
            {clock || "--:--"}
          </span>
          <Link
            to="/checkout"
            className="relative grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-primary/50"
            aria-label="Cart"
          >
            <ShoppingBag className="size-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <Link
              to="/dashboard"
              className="hidden rounded-full bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-accent sm:block"
            >
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link
              to="/auth"
              className="hidden rounded-full bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-accent sm:block"
            >
              Sign in
            </Link>
          )}
          <button
            className="grid size-10 place-items-center rounded-full border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="animate-rise border-t border-border/60 bg-background px-5 py-4 md:hidden">
          {[...nav, { to: user ? "/dashboard" : "/auth", label: user ? "Dashboard" : "Sign in" }].map((n) => (
            <Link key={n.to} to={n.to} className="block rounded-lg px-3 py-3 text-sm hover:bg-secondary">
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
