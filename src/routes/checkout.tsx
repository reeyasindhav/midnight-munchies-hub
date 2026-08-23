import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { RequireAuth } from "@/components/require-auth";
import { useStore } from "@/lib/store";
import { AnimatedHeading } from "@/components/animated-heading";
import { Button } from "@/components/ui/button";
import { restaurants } from "@/lib/data";
import { currency } from "@/lib/data";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — NightOwl" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const {
    cart,
    cartTotal,
    cartRestaurantId,
    placeOrder,
    cartCount,
  } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const restaurant = useMemo(
    () => restaurants.find((r) => r.id === cartRestaurantId),
    [cartRestaurantId],
  );

  if (!restaurant || cartCount === 0) {
    return (
      <div className="py-24 text-center">
        <ShoppingBag className="mx-auto size-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-xl font-semibold">Your bag is empty</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse kitchens to add items.
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

  const deliveryFee = restaurant.deliveryFee;
  const tax = cartTotal * 0.08;
  const total = cartTotal + deliveryFee + tax;

  const handlePlaceOrder = () => {
    const order = placeOrder();
    if (order) {
      navigate({ to: "/orders/$id", params: { id: order.id } });
    }
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl px-5">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-secondary p-2"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <AnimatedHeading className="text-2xl font-display font-bold mb-8">Checkout</AnimatedHeading>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="card-night rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Delivery to</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Full name</label>
                  <input
                    type="text"
                    placeholder="Alex Chen"
                    className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 555 0123"
                    className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Street address</label>
                  <input
                    type="text"
                    placeholder="123 Midnight Ave"
                    className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">City</label>
                  <input
                    type="text"
                    placeholder="Austin"
                    className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Zip code</label>
                  <input
                    type="text"
                    placeholder="73301"
                    className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="card-night rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Payment</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="text-primary"
                  />
                  <span className="text-sm">Visa ending in 4242</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="text-primary" />
                  <span className="text-sm">Cash on delivery</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="card-night sticky top-24 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="size-5 text-primary" />
                <h3 className="font-semibold">{restaurant.name}</h3>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.map((line) => (
                  <div
                    key={line.dishId}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <span>{line.name}</span>
                      <span className="text-muted-foreground"> × {line.qty}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {currency(line.price * line.qty)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-border/60 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currency(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{currency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{currency(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-border/60 pt-2 font-bold">
                  <span>Total</span>
                  <span className="text-primary">{currency(total)}</span>
                </div>
              </div>
              <Button
                onClick={handlePlaceOrder}
                className="mt-4 w-full rounded-full bg-primary py-3 text-primary-foreground hover:bg-primary/90"
              >
                Place order for {currency(total)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
