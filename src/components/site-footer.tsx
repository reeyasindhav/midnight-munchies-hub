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

      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-[260px] text-sm text-muted-foreground">
              Only kitchens that are actually cooking right now. Built for shift workers, students and night owls.
            </p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/discover" className="hover:text-foreground transition-colors">Discover</Link></li>
              <li><Link to="/cravings" className="hover:text-foreground transition-colors">Cravings</Link></li>
              <li><Link to="/how-it-works" className="hover:text-foreground transition-colors">How it works</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Account</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/for-restaurants" className="hover:text-foreground transition-colors">For restaurants</Link></li>
              <li><Link to="/auth" className="hover:text-foreground transition-colors">Sign in</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Made for the midnight hungry</span>
          <span>© 2026 NightOwl. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
