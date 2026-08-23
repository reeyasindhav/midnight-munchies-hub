import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Plus, ShoppingBag, Star, Truck } from "lucide-react";
import { getRestaurant, currency } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/restaurant/$id")({
  head: () => ({ meta: [{ title: "Kitchen — NightOwl" }] }),
  component: RestaurantPage,
});

function RestaurantPage() {
  const { id } = Route.useParams();
  const restaurant = getRestaurant(id);
  const { addToCart, cartCount, cartRestaurantId } = useStore();
  const navigate = useNavigate();

  if (!restaurant) {
    return (
      <div className="mx-auto max-w-3xl py-24 text-center">
        <h1 className="text-3xl font-display font-bold">Kitchen not found</h1>
        <p className="mt-3 text-muted-foreground">
          This kitchen doesn't exist or has closed for the night.
        </p>
        <Link
          to="/discover"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Browse kitchens
        </Link>
      </div>
    );
  }

  const cartBelongsToThis = cartRestaurantId === restaurant.id;

  return (
    <div className="">
      <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-3xl">
        <img
          src={restaurant.hero}
          alt={restaurant.name}
          className="size-full object-cover float-anim"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-xs text-muted-foreground backdrop-blur hover:text-primary"
          >
            <ArrowLeft className="size-3" /> Back
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5">
        <div className="card-night mt-8 rounded-3xl p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold">
                {restaurant.name}
              </h1>
              <p className="mt-1 text-muted-foreground">
                {restaurant.cuisine}
              </p>
            </div>
            {restaurant.owlsPick && (
              <Badge className="bg-primary/10 text-primary border-primary/30">
                <Star className="size-3 mr-1 fill-primary" /> Owl&apos;s pick
              </Badge>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            <div>
              <Star className="mx-auto size-5 fill-primary text-primary" />
              <p className="mt-1 font-semibold">{restaurant.rating}</p>
              <p className="text-xs text-muted-foreground">
                {restaurant.reviews} reviews
              </p>
            </div>
            <div>
              <Clock className="mx-auto size-5 text-primary" />
              <p className="mt-1 font-semibold">
                {restaurant.eta[0]}–{restaurant.eta[1]} min
              </p>
              <p className="text-xs text-muted-foreground">Delivery</p>
            </div>
            <div>
              <Truck className="mx-auto size-5 text-primary" />
              <p className="mt-1 font-semibold">
                {currency(restaurant.deliveryFee)}
              </p>
              <p className="text-xs text-muted-foreground">Delivery fee</p>
            </div>
            <div>
              <Clock className="mx-auto size-5 text-primary" />
              <p className="mt-1 font-semibold">{restaurant.price}</p>
              <p className="text-xs text-muted-foreground">
                Closes {restaurant.closesAt}
              </p>
            </div>
            <div>
              <MapPin className="mx-auto size-5 text-primary" />
              <p className="mt-1 font-semibold">{restaurant.neighborhood}</p>
              <p className="text-xs text-muted-foreground">Neighborhood</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {restaurant.blurb}
          </p>
        </div>

        <div className="mt-12 mb-24">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold">Menu</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                All dishes made to order, late at night.
              </p>
            </div>
            {cartBelongsToThis && cartCount > 0 && (
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm">
                <ShoppingBag className="size-4 text-primary" />
                {cartCount} item{cartCount !== 1 ? "s" : ""} in bag
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {restaurant.menu.map((dish, i) => (
              <div
                key={dish.id}
                className="card-night animate-rise group rounded-2xl overflow-hidden"
                style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="size-full object-cover brightness-[0.55] group-hover:brightness-[0.65] transition-all duration-500 float-anim-delayed"
                  />
                  {dish.tag && (
                    <Badge className="absolute left-3 top-3 bg-primary/10 text-primary border-primary/30">
                      {dish.tag}
                    </Badge>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{dish.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {dish.desc}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {currency(dish.price)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(restaurant.id, dish);
                    }}
                    className="mt-4 w-full rounded-full bg-primary/20 py-2.5 text-sm font-semibold text-primary hover:bg-primary/30 transition-colors"
                  >
                    Add to bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {cartBelongsToThis && cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-rise">
          <Button
            onClick={() => navigate({ to: "/checkout" })}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
            style={{ boxShadow: "0 0 30px -6px var(--neon)" }}
          >
            <ShoppingBag className="size-5" /> View bag ({cartCount})
          </Button>
        </div>
      )}
    </div>
  );
}
