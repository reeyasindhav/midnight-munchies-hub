import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import { useStore } from "@/lib/store";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, hydrated } = useStore();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24">
        <div className="h-64 animate-pulse rounded-2xl bg-surface" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 py-28 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-secondary">
          <Lock className="size-5 text-primary" />
        </span>
        <h1 className="mt-6 text-3xl">Members only, after hours</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Sign in to see your dashboard, live orders and saved kitchens.
        </p>
        <Link
          to="/auth"
          className="mt-7 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Sign in to NightOwl
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
