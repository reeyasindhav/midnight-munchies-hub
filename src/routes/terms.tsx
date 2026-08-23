import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedHeading } from "@/components/animated-heading";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms of service — NightOwl" }],
  }),
  component: Terms,
});

function Terms() {
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
            Terms of Service
          </AnimatedHeading>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: August 2026
          </p>

          <div className="mt-10 space-y-6">
            {[
              {
                title: "Acceptance of terms",
                body: "By using NightOwl, you agree to these terms. If you do not agree, please do not use the platform.",
              },
              {
                title: "Use of the service",
                body: "NightOwl is provided for personal, non-commercial use. You may not use the service for any unlawful or prohibited purpose.",
              },
              {
                title: "Orders & payments",
                body: "All orders are subject to availability. Prices and delivery fees are determined by the restaurant. Payment is processed at checkout. Refunds are handled directly by the restaurant.",
              },
              {
                title: "Limitation of liability",
                body: "NightOwl is not liable for any indirect, incidental, or consequential damages arising from your use of the service.",
              },
              {
                title: "Changes",
                body: "We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.",
              },
              {
                title: "Contact",
                body: "For questions about these terms, contact terms@nightowldelivery.com.",
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
