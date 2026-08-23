import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Plus, Search, Truck } from "lucide-react";
import { AnimatedHeading } from "@/components/animated-heading";

const steps = [
  {
    icon: Search,
    title: "Pick a craving",
    desc:
      "Browse by what you want — burgers, dessert, spicy, breakfast, any hour. We filter by mood, not just cuisine.",
  },
  {
    icon: Clock,
    title: "See who's open",
    desc:
      "We filter out every closed kitchen. Only the ones actually cooking right now show up in your feed.",
  },
  {
    icon: Plus,
    title: "Add to bag",
    desc:
      "Tap what you want. Your bag stays for one kitchen at a time — fresh orders, no mixing bowls.",
  },
  {
    icon: Truck,
    title: "Track your order",
    desc:
      "Live ETA that updates as your food cooks, gets picked up, and arrives at your door.",
  },
];

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: [{ title: "How it works — NightOwl" }] }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <div className="py-16 night-grad">
      <div className="mx-auto max-w-4xl px-5">
        <div className="text-center mb-16">
          <AnimatedHeading className="text-4xl font-display font-bold sm:text-5xl">
            How NightOwl works
          </AnimatedHeading>
          <p className="mt-4 text-muted-foreground">
            Four simple steps to great food, any hour.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="card-night animate-rise rounded-2xl p-8 flex items-start gap-6"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-7" />
                </div>
                <div>
                  <span className="eyebrow">Step {i + 1}</span>
                  <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:scale-[1.03] transition-transform"
          >
            Start ordering <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
