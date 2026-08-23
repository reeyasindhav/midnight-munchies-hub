import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Globe, Clock, TrendingUp, Phone, Plus, Trash2, Eye, Settings, UtensilsCrossed, LogOut } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatedHeading } from "@/components/animated-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { RestaurantCard } from "@/components/restaurant-card";
import type { Dish } from "@/lib/data";
import { currency } from "@/lib/data";

export const Route = createFileRoute("/for-restaurants")({
  head: () => ({ meta: [{ title: "For restaurants — NightOwl" }] }),
  component: ForRestaurants,
});

const NEIGHBORHOODS = ["Downtown", "East Side", "Riverside", "Midtown", "North Loop"] as const;
const PRICE_TIERS = ["$", "$$", "$$$"] as const;

const emptyProfile = {
  id: "",
  name: "",
  cuisine: "",
  description: "",
  hero: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=70",
  deliveryFee: 2.49,
  price: "$$" as "$" | "$$" | "$$$",
  openUntilHour: 27,
  closesAt: "3:00 AM",
  neighborhood: "Downtown",
  menu: [] as Dish[],
};

function ForRestaurants() {
  const { user, hydrated, restaurantProfile, registerRestaurant, updateRestaurant, addMenuItem, removeMenuItem, signIn, signOut } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [form, setForm] = useState(restaurantProfile ?? emptyProfile);
  const [newDish, setNewDish] = useState({ name: "", desc: "", price: 12, image: "", tag: "" });
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (restaurantProfile) {
      setForm(restaurantProfile);
    }
  }, [restaurantProfile]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24">
        <div className="h-64 animate-pulse rounded-2xl bg-surface" />
      </div>
    );
  }

  const isRestaurant = user?.role === "restaurant";
  const hasProfile = !!restaurantProfile;

  if (!isRestaurant) {
    return <MarketingPage />;
  }

  if (!hasProfile) {
    return <OnboardingPage form={form} setForm={setForm} onSave={registerRestaurant} />;
  }

  const update = (updates: Partial<typeof form>) => setForm((prev) => ({ ...prev, ...updates }));

  const handleAddDish = () => {
    if (!newDish.name.trim()) return;
    addMenuItem({
      id: `dish-${Date.now()}`,
      name: newDish.name,
      desc: newDish.desc,
      price: newDish.price,
      image: newDish.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=70",
      ...(newDish.tag ? { tag: newDish.tag } : {}),
    });
    setNewDish({ name: "", desc: "", price: 12, image: "", tag: "" });
  };

  return (
    <div className="py-12 night-grad min-h-screen">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="eyebrow">Restaurant dashboard</p>
            <AnimatedHeading className="text-3xl font-display font-bold">
              {form.name || "My Restaurant"}
            </AnimatedHeading>
          </div>
          <div className="flex items-center gap-2">
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
                    You will need to sign in again to access your restaurant dashboard.
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
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Eye className="size-4" /> View as customer
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 bg-surface-2">
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="size-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="menu" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <UtensilsCrossed className="size-4" /> Menu
            </TabsTrigger>
            <TabsTrigger value="hours" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Clock className="size-4" /> Hours & Delivery
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Eye className="size-4" /> Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="card-night rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">Restaurant Profile</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Restaurant Name</label>
                  <Input
                    value={form.name}
                    onChange={(e) => update({ name: e.target.value })}
                    placeholder="The Burger Basement"
                    className="bg-surface border-border"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Cuisine</label>
                  <Input
                    value={form.cuisine}
                    onChange={(e) => update({ cuisine: e.target.value })}
                    placeholder="Smash burgers · Fries"
                    className="bg-surface border-border"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Description</label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => update({ description: e.target.value })}
                    placeholder="A basement griddle that never cools down..."
                    className="bg-surface border-border min-h-[100px]"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Neighborhood</label>
                  <Select value={form.neighborhood} onValueChange={(v) => update({ neighborhood: v })}>
                    <SelectTrigger className="bg-surface border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card text-card-foreground">
                      {NEIGHBORHOODS.map((n) => (
                        <SelectItem key={n} value={n}>{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Price Tier</label>
                  <Select value={form.price} onValueChange={(v) => update({ price: v as "$" | "$$" | "$$$" })}>
                    <SelectTrigger className="bg-surface border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card text-card-foreground">
                      {PRICE_TIERS.map((p) => (
                        <SelectItem key={p} value={p}>{p} — {p === "$" ? "Budget" : p === "$$" ? "Mid-range" : "Premium"}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Hero Image URL</label>
                  <Input
                    value={form.hero}
                    onChange={(e) => update({ hero: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="bg-surface border-border"
                  />
                  {form.hero && (
                    <img src={form.hero} alt="Hero preview" className="mt-3 h-40 w-full rounded-xl object-cover" />
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => updateRestaurant(form)} className="rounded-full bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90">
                  Save profile
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="menu">
            <div className="card-night rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">Menu Items</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {form.menu.map((dish) => (
                  <div key={dish.id} className="rounded-xl border border-border/60 bg-surface/40 p-4">
                    <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
                      <img src={dish.image} alt={dish.name} className="size-full object-cover brightness-[0.55]" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{dish.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{dish.desc}</p>
                      </div>
                      <span className="text-sm font-bold text-primary">{currency(dish.price)}</span>
                    </div>
                    {dish.tag && <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{dish.tag}</span>}
                    <button
                      onClick={() => removeMenuItem(dish.id)}
                      className="mt-3 inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-destructive hover:border-destructive/50"
                    >
                      <Trash2 className="size-3" /> Remove
                    </button>
                  </div>
                ))}
                {form.menu.length === 0 && (
                  <div className="sm:col-span-2 lg:col-span-3 py-12 text-center text-muted-foreground">
                    <UtensilsCrossed className="mx-auto size-10 mb-3 opacity-50" />
                    <p>No menu items yet. Add your first dish below.</p>
                  </div>
                )}
              </div>

              <div className="border-t border-border/60 pt-6">
                <h4 className="font-semibold mb-4">Add New Dish</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Dish Name</label>
                    <Input
                      value={newDish.name}
                      onChange={(e) => setNewDish((p) => ({ ...p, name: e.target.value }))}
                      placeholder="House Signature"
                      className="bg-surface border-border"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Price ($)</label>
                    <Input
                      type="number"
                      value={newDish.price}
                      onChange={(e) => setNewDish((p) => ({ ...p, price: Number(e.target.value) }))}
                      placeholder="14.50"
                      className="bg-surface border-border"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-muted-foreground mb-1 block">Description</label>
                    <Textarea
                      value={newDish.desc}
                      onChange={(e) => setNewDish((p) => ({ ...p, desc: e.target.value }))}
                      placeholder="The one people set alarms for."
                      className="bg-surface border-border"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-muted-foreground mb-1 block">Image URL</label>
                    <Input
                      value={newDish.image}
                      onChange={(e) => setNewDish((p) => ({ ...p, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="bg-surface border-border"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Tag (optional)</label>
                    <Input
                      value={newDish.tag}
                      onChange={(e) => setNewDish((p) => ({ ...p, tag: e.target.value }))}
                      placeholder="Owl's pick"
                      className="bg-surface border-border"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddDish} className="w-full rounded-full bg-primary py-3 text-primary-foreground hover:bg-primary/90">
                      <Plus className="size-4 mr-2" /> Add Dish
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hours">
            <div className="card-night rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">Hours & Delivery</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Delivery Fee ($)</label>
                  <Input
                    type="number"
                    step="0.25"
                    value={form.deliveryFee}
                    onChange={(e) => update({ deliveryFee: Number(e.target.value) })}
                    className="bg-surface border-border"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Price Tier</label>
                  <Select value={form.price} onValueChange={(v) => update({ price: v as "$" | "$$" | "$$$" })}>
                    <SelectTrigger className="bg-surface border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card text-card-foreground">
                      {PRICE_TIERS.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Closes At</label>
                  <Input
                    value={form.closesAt}
                    onChange={(e) => update({ closesAt: e.target.value })}
                    placeholder="3:00 AM"
                    className="bg-surface border-border"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Open Until Hour (24h scale, e.g. 27 = 3 AM)</label>
                  <Input
                    type="number"
                    step="0.5"
                    value={form.openUntilHour}
                    onChange={(e) => update({ openUntilHour: Number(e.target.value) })}
                    className="bg-surface border-border"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => updateRestaurant(form)} className="rounded-full bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90">
                  Save settings
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="card-night rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">Live Preview</h3>
              <p className="text-sm text-muted-foreground mb-6">This is how your restaurant looks to customers on NightOwl.</p>
              <div className="mx-auto max-w-lg">
                <RestaurantCard
                  r={{
                    id: form.id || "preview",
                    name: form.name || "My Restaurant",
                    cuisine: form.cuisine || "Cuisine",
                    rating: 4.8,
                    reviews: 100,
                    eta: [15, 25],
                    price: form.price,
                    closesAt: form.closesAt,
                    openUntilHour: form.openUntilHour,
                    cravings: [],
                    hero: form.hero,
                    neighborhood: form.neighborhood,
                    owlsPick: true,
                    deliveryFee: form.deliveryFee,
                    blurb: form.description || "A great late-night kitchen.",
                    menu: form.menu,
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MarketingPage() {
  return (
    <div className="py-16 night-grad">
      <div className="mx-auto max-w-7xl px-5">
        <div className="card-night mb-16 rounded-3xl p-12 text-center">
          <h1 className="text-4xl font-display font-bold sm:text-5xl">
            Feed the night shift
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            NightOwl connects your after-midnight kitchen with hungry customers who specifically want to order from you.
          </p>
          <Link
            to="/auth"
            search={{ redirect: "/for-restaurants" }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:scale-[1.03] transition-transform"
          >
            Join as a restaurant
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Globe, title: "Reach the night economy", desc: "Students, hospital staff, delivery drivers — the night economy is huge." },
            { icon: Clock, title: "Hours that matter", desc: "Only kitchens open after midnight. We match you with customers when you're already cooking." },
            { icon: TrendingUp, title: "Grow your brand", desc: "Featured placement, owl's pick badges, and data insights into late-night demand." },
            { icon: Phone, title: "Simple onboarding", desc: "Three questions. A photo of your menu. Done. No tech team needed." },
          ].map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="card-night animate-rise rounded-2xl p-6 text-center" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 card-night rounded-3xl p-10">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="text-2xl font-display font-bold">Ready to start?</h2>
              <p className="mt-2 text-muted-foreground">
                Create your restaurant profile, upload your menu, and set your real late-night hours.
              </p>
            </div>
            <Link
              to="/auth"
              search={{ redirect: "/for-restaurants" }}
              className="rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardingPage({
  form,
  setForm,
  onSave,
}: {
  form: typeof emptyProfile;
  setForm: (f: typeof emptyProfile) => void;
  onSave: (p: typeof emptyProfile) => void;
}) {
  return (
    <div className="py-12 night-grad min-h-screen">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold">Set up your restaurant</h1>
          <p className="mt-2 text-muted-foreground">Tell us about your kitchen so customers can find you.</p>
        </div>
        <div className="card-night rounded-3xl p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Restaurant Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="The Burger Basement" className="bg-surface border-border" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Cuisine</label>
              <Input value={form.cuisine} onChange={(e) => setForm({ ...form, cuisine: e.target.value })} placeholder="Smash burgers · Fries" className="bg-surface border-border" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Description</label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="A basement griddle that never cools down..." className="bg-surface border-border min-h-[100px]" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Neighborhood</label>
              <Select value={form.neighborhood} onValueChange={(v) => setForm({ ...form, neighborhood: v })}>
                <SelectTrigger className="bg-surface border-border"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-card text-card-foreground">
                  {NEIGHBORHOODS.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Price Tier</label>
              <Select value={form.price} onValueChange={(v) => setForm({ ...form, price: v as "$" | "$$" | "$$$" })}>
                <SelectTrigger className="bg-surface border-border"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-card text-card-foreground">
                  {PRICE_TIERS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Hero Image URL</label>
              <Input value={form.hero} onChange={(e) => setForm({ ...form, hero: e.target.value })} placeholder="https://images.unsplash.com/photo-..." className="bg-surface border-border" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Delivery Fee ($)</label>
              <Input type="number" step="0.25" value={form.deliveryFee} onChange={(e) => setForm({ ...form, deliveryFee: Number(e.target.value) })} className="bg-surface border-border" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Closes At</label>
              <Input value={form.closesAt} onChange={(e) => setForm({ ...form, closesAt: e.target.value })} placeholder="3:00 AM" className="bg-surface border-border" />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={() => onSave({ ...form, id: `rest-${Date.now()}` })} className="rounded-full bg-primary px-8 py-3 text-primary-foreground hover:bg-primary/90">
              Create restaurant profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
