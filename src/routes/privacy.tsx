import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedHeading } from "@/components/animated-heading";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy policy — NightOwl" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="py-12 night-grad">
      <div className="mx-auto max-w-3xl px-5">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          ← Back to NightOwl
        </Link>
        <div className="card-night rounded-3xl p-8 sm:p-12">
          <p className="eyebrow">Legal</p>
          <AnimatedHeading className="mt-3 text-3xl font-display font-bold">
            Privacy Policy
          </AnimatedHeading>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: August 2026
          </p>

          <div className="mt-10 space-y-6">
            {[
              {
                title: "What we collect",
                body: "We store your name, email, and order history in your browser's local storage. We do not send this data to any external server.",
              },
              {
                title: "How we use it",
                body: "Your data is used only to power your NightOwl experience: cart, orders, and profile. We never sell or share your data with third parties.",
              },
              {
                title: "Cookies & local storage",
                body: "NightOwl uses local storage to persist your session and cart. You can clear this data at any time through your browser settings.",
              },
              {
                title: "Contact",
                body: "For privacy questions, reach us at privacy@nightowldelivery.com.",
              },
            ].map((s, i) => (
              <section
                key={s.title}
                className="animate-rise rounded-2xl border border-border/60 bg-surface/40 p-6"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <h2 className="text-lg font-semibold text-foreground">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
