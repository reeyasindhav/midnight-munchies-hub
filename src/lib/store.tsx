import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { restaurants, type Dish } from "./data";

export type CartLine = { dishId: string; name: string; price: number; qty: number; restaurantId: string };
export type User = { name: string; email: string; role: "customer" | "restaurant" };
export type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  placedAt: number;
  total: number;
  items: CartLine[];
  etaMinutes: number;
  status: "cooking" | "on-the-way" | "delivered";
};

export type RestaurantProfile = {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  hero: string;
  deliveryFee: number;
  price: "$" | "$$" | "$$$";
  openUntilHour: number;
  closesAt: string;
  neighborhood: string;
  menu: Dish[];
};

type Store = {
  hydrated: boolean;
  user: User | null;
  signIn: (name: string, email: string, role: "customer" | "restaurant") => void;
  signOut: () => void;
  cart: CartLine[];
  cartRestaurantId: string | null;
  addToCart: (restaurantId: string, dish: Dish) => void;
  setQty: (dishId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  orders: Order[];
  placeOrder: () => Order | null;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  restaurantProfile: RestaurantProfile | null;
  registerRestaurant: (profile: RestaurantProfile) => void;
  updateRestaurant: (updates: Partial<RestaurantProfile>) => void;
  addMenuItem: (dish: Dish) => void;
  removeMenuItem: (dishId: string) => void;
};

const Ctx = createContext<Store | null>(null);
const KEY = "nightowl.state.v1";

const seedOrders: Order[] = [
  {
    id: "NO-4821",
    restaurantId: "luna-taqueria",
    restaurantName: "Luna Taquería",
    placedAt: Date.now() - 1000 * 60 * 60 * 26,
    total: 27.4,
    items: [],
    etaMinutes: 19,
    status: "delivered",
  },
  {
    id: "NO-4790",
    restaurantId: "burger-basement",
    restaurantName: "The Burger Basement",
    placedAt: Date.now() - 1000 * 60 * 60 * 74,
    total: 34.9,
    items: [],
    etaMinutes: 23,
    status: "delivered",
  },
  {
    id: "NO-4712",
    restaurantId: "owl-roasters",
    restaurantName: "Owl Roasters",
    placedAt: Date.now() - 1000 * 60 * 60 * 120,
    total: 11.25,
    items: [],
    etaMinutes: 12,
    status: "delivered",
  },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartRestaurantId, setCartRestaurantId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [restaurantProfile, setRestaurantProfile] = useState<RestaurantProfile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setUser(s.user ?? null);
        setCart(s.cart ?? []);
        setCartRestaurantId(s.cartRestaurantId ?? null);
        setOrders(s.orders?.length ? s.orders : seedOrders);
        setRestaurantProfile(s.restaurantProfile ?? null);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ user, cart, cartRestaurantId, orders, restaurantProfile }));
  }, [hydrated, user, cart, cartRestaurantId, orders, restaurantProfile]);

  const addToCart = useCallback(
    (restaurantId: string, dish: Dish) => {
      setCartRestaurantId((prev) => (prev && prev !== restaurantId ? restaurantId : restaurantId));
      setCart((prev) => {
        const base = cartRestaurantId && cartRestaurantId !== restaurantId ? [] : prev;
        const found = base.find((l) => l.dishId === dish.id);
        if (found)
          return base.map((l) => (l.dishId === dish.id ? { ...l, qty: l.qty + 1 } : l));
        return [...base, { dishId: dish.id, name: dish.name, price: dish.price, qty: 1, restaurantId }];
      });
    },
    [cartRestaurantId],
  );

  const setQty = useCallback((dishId: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.dishId !== dishId) : prev.map((l) => (l.dishId === dishId ? { ...l, qty } : l)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setCartRestaurantId(null);
  }, []);

  const cartTotal = useMemo(() => cart.reduce((s, l) => s + l.price * l.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);

  const updateOrderStatus = useCallback((orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
  }, []);

  const registerRestaurant = useCallback((profile: RestaurantProfile) => {
    setRestaurantProfile(profile);
  }, []);

  const updateRestaurant = useCallback((updates: Partial<RestaurantProfile>) => {
    setRestaurantProfile((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const addMenuItem = useCallback((dish: Dish) => {
    setRestaurantProfile((prev) => {
      if (!prev) return prev;
      return { ...prev, menu: [...prev.menu, dish] };
    });
  }, []);

  const removeMenuItem = useCallback((dishId: string) => {
    setRestaurantProfile((prev) => {
      if (!prev) return prev;
      return { ...prev, menu: prev.menu.filter((d) => d.id !== dishId) };
    });
  }, []);

  const placeOrder = useCallback(() => {
    if (!cart.length || !cartRestaurantId) return null;
    const r = restaurants.find((x) => x.id === cartRestaurantId);
    const order: Order = {
      id: `NO-${Math.floor(4900 + Math.random() * 90)}${Math.floor(Math.random() * 9)}`,
      restaurantId: cartRestaurantId,
      restaurantName: r?.name ?? "Kitchen",
      placedAt: Date.now(),
      total: cartTotal + (r?.deliveryFee ?? 2.49),
      items: cart,
      etaMinutes: r?.eta[0] ?? 20,
      status: "cooking",
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setCartRestaurantId(null);
    return order;
  }, [cart, cartRestaurantId, cartTotal]);

  const signIn = useCallback((name: string, email: string, role: "customer" | "restaurant" = "customer") => {
    setUser({ name, email, role });
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const value: Store = {
    hydrated,
    user,
    signIn,
    signOut,
    cart,
    cartRestaurantId,
    addToCart,
    setQty,
    clearCart,
    cartTotal,
    cartCount,
    orders,
    placeOrder,
    updateOrderStatus,
    restaurantProfile,
    registerRestaurant,
    updateRestaurant,
    addMenuItem,
    removeMenuItem,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
