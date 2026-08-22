import { Link } from "@tanstack/react-router";

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-3">
      <span
        className={`relative grid place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-12 ${
          small ? "size-6" : "size-9"
        }`}
        style={{ boxShadow: "0 0 30px -6px var(--neon)" }}
      >
        <svg viewBox="0 0 24 24" className={small ? "size-3.5" : "size-5"} fill="currentColor">
          <path d="M17.3 13.9A7 7 0 0 1 9.1 5.7a1 1 0 0 0-1.3-1.2 8.5 8.5 0 1 0 10.7 10.7 1 1 0 0 0-1.2-1.3Z" />
        </svg>
      </span>
      <span
        className={`font-display tracking-tight ${small ? "text-base" : "text-xl"}`}
        style={{ fontWeight: 700 }}
      >
        NIGHTOWL<span className="text-primary">.</span>
      </span>
    </Link>
  );
}
