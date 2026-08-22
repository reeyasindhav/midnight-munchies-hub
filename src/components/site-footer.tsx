import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="overflow-hidden border-b border-border/60 py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-10">
              <span>Open late</span> <span className="text-primary">·</span> <span>Eat well</span>
              <span className="text-primary">·</span> <span>No closed kitchens</span>
              <span className="text-primary">·</span> <span>Curated after midnight</span>
              <span className="text-primary">·</span> <span>Made for the night shift</span>
              <span className="text-primary">·</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Only kitchens that are actually cooking right now. Built for shift workers, students and
            night owls.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/discover" className="hover:text-foreground">Discover</Link></li>
            <li><Link to="/cravings" className="hover:text-foreground">Cravings</Link></li>
            <li><Link to="/how-it-works" className="hover:text-foreground">How it works</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/for-restaurants" className="hover:text-foreground">For restaurants</Link></li>
            <li><Link to="/auth" className="hover:text-foreground">Sign in</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-border/60 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <span>Made for the midnight hungry</span>
        <span>© 2026 NightOwl</span>
      </div>
    </footer>
  );
}
