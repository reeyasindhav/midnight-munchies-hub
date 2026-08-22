export type Dish = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  tag?: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  eta: [number, number];
  price: "$" | "$$" | "$$$";
  closesAt: string;
  openUntilHour: number; // 24h, may exceed 24 for after-midnight
  cravings: string[];
  hero: string;
  neighborhood: string;
  owlsPick?: boolean;
  deliveryFee: number;
  blurb: string;
  menu: Dish[];
};

export const cravings = [
  {
    id: "midnight-munchies",
    emoji: "🍔",
    name: "Midnight Munchies",
    tagline: "Big, bold, salty",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "sweet-dreams",
    emoji: "🍩",
    name: "Sweet Dreams",
    tagline: "Dessert after dark",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "hot-spicy",
    emoji: "🌶️",
    name: "Hot & Spicy",
    tagline: "Turn up the heat",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "breakfast",
    emoji: "🥞",
    name: "24/7 Breakfast",
    tagline: "Any hour, any mood",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "comfort-carbs",
    emoji: "🍜",
    name: "Comfort Carbs",
    tagline: "Warm bowls, slow sips",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "fuel-up",
    emoji: "☕",
    name: "Fuel Up",
    tagline: "For the night shift",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=70",
  },
];

const menuFor = (base: string, images: string[]): Dish[] =>
  [
    { n: "House Signature", d: "The one people set alarms for.", p: 14.5, t: "Owl's pick" },
    { n: "Late Plate", d: "Built for 2am appetites.", p: 12.0 },
    { n: "Side of Everything", d: "Crispy, salty, shareable.", p: 6.5 },
    { n: "Night Cap", d: "Sweet finish, small format.", p: 5.0 },
  ].map((m, i) => ({
    id: `${base}-${i}`,
    name: m.n,
    desc: m.d,
    price: m.p,
    tag: m.t,
    image: images[i % images.length],
  }));

const img = {
  burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=70",
  pizza:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=70",
  ramen:
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=70",
  tacos:
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=70",
  donut:
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=70",
  pancakes:
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=70",
  sushi:
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=70",
  chicken:
    "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1200&q=70",
  coffee:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=70",
  kebab:
    "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=70",
  curry:
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=70",
  street:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=70",
};

export const restaurants: Restaurant[] = [
  {
    id: "burger-basement",
    name: "The Burger Basement",
    cuisine: "Smash burgers · Fries",
    rating: 4.9,
    reviews: 1284,
    eta: [18, 25],
    price: "$$",
    closesAt: "3:00 AM",
    openUntilHour: 27,
    cravings: ["midnight-munchies"],
    hero: img.burger,
    neighborhood: "Downtown",
    owlsPick: true,
    deliveryFee: 2.49,
    blurb: "A basement griddle that never cools down. Smash patties, glossy cheese, no daylight.",
    menu: menuFor("bb", [img.burger, img.chicken, img.donut, img.coffee]),
  },
  {
    id: "sofias-slice",
    name: "Sofia's Slice",
    cuisine: "New York pizza · Sides",
    rating: 4.8,
    reviews: 902,
    eta: [24, 32],
    price: "$$",
    closesAt: "3:00 AM",
    openUntilHour: 27,
    cravings: ["midnight-munchies", "comfort-carbs"],
    hero: img.pizza,
    neighborhood: "East Side",
    deliveryFee: 1.99,
    blurb: "Foldable slices pulled from a deck oven that's been hot since noon.",
    menu: menuFor("ss", [img.pizza, img.donut, img.coffee, img.burger]),
  },
  {
    id: "wok-after-dark",
    name: "Wok After Dark",
    cuisine: "Asian fusion · Noodles",
    rating: 4.7,
    reviews: 654,
    eta: [20, 28],
    price: "$$",
    closesAt: "4:00 AM",
    openUntilHour: 28,
    cravings: ["comfort-carbs", "hot-spicy"],
    hero: img.ramen,
    neighborhood: "Riverside",
    deliveryFee: 2.99,
    blurb: "Broth simmered overnight, noodles pulled to order, chili oil with intent.",
    menu: menuFor("wad", [img.ramen, img.sushi, img.curry, img.coffee]),
  },
  {
    id: "luna-taqueria",
    name: "Luna Taquería",
    cuisine: "Tacos · Salsas",
    rating: 4.8,
    reviews: 1490,
    eta: [15, 22],
    price: "$",
    closesAt: "5:00 AM",
    openUntilHour: 29,
    cravings: ["hot-spicy", "midnight-munchies"],
    hero: img.tacos,
    neighborhood: "Downtown",
    owlsPick: true,
    deliveryFee: 1.49,
    blurb: "Trompo spinning till sunrise. Three salsas, one of which you should respect.",
    menu: menuFor("lt", [img.tacos, img.curry, img.donut, img.coffee]),
  },
  {
    id: "glazed-shift",
    name: "Glazed Shift",
    cuisine: "Donuts · Soft serve",
    rating: 4.6,
    reviews: 388,
    eta: [12, 18],
    price: "$",
    closesAt: "2:00 AM",
    openUntilHour: 26,
    cravings: ["sweet-dreams"],
    hero: img.donut,
    neighborhood: "North Loop",
    deliveryFee: 1.99,
    blurb: "Fried in small batches every 90 minutes, all night, on purpose.",
    menu: menuFor("gs", [img.donut, img.coffee, img.pancakes, img.pizza]),
  },
  {
    id: "third-shift-diner",
    name: "Third Shift Diner",
    cuisine: "Pancakes · Eggs",
    rating: 4.7,
    reviews: 2210,
    eta: [22, 30],
    price: "$$",
    closesAt: "24 hours",
    openUntilHour: 48,
    cravings: ["breakfast", "comfort-carbs"],
    hero: img.pancakes,
    neighborhood: "Midtown",
    deliveryFee: 2.49,
    blurb: "Breakfast has no schedule here. Neither do you.",
    menu: menuFor("tsd", [img.pancakes, img.coffee, img.burger, img.donut]),
  },
  {
    id: "kebab-kingdom",
    name: "Kebab Kingdom",
    cuisine: "Grills · Wraps",
    rating: 4.5,
    reviews: 731,
    eta: [17, 24],
    price: "$",
    closesAt: "4:30 AM",
    openUntilHour: 28.5,
    cravings: ["midnight-munchies", "hot-spicy"],
    hero: img.kebab,
    neighborhood: "East Side",
    deliveryFee: 1.99,
    blurb: "Charcoal, garlic sauce, and a queue that only exists after 1am.",
    menu: menuFor("kk", [img.kebab, img.curry, img.tacos, img.coffee]),
  },
  {
    id: "owl-roasters",
    name: "Owl Roasters",
    cuisine: "Coffee · Pastry",
    rating: 4.9,
    reviews: 512,
    eta: [10, 16],
    price: "$",
    closesAt: "24 hours",
    openUntilHour: 48,
    cravings: ["fuel-up", "sweet-dreams"],
    hero: img.coffee,
    neighborhood: "Downtown",
    deliveryFee: 1.49,
    blurb: "Espresso for the night shift, decaf for the ones pretending to sleep.",
    menu: menuFor("or", [img.coffee, img.donut, img.pancakes, img.pizza]),
  },
  {
    id: "midnight-masala",
    name: "Midnight Masala",
    cuisine: "Indian · Curries",
    rating: 4.8,
    reviews: 1123,
    eta: [26, 35],
    price: "$$",
    closesAt: "3:30 AM",
    openUntilHour: 27.5,
    cravings: ["hot-spicy", "comfort-carbs"],
    hero: img.curry,
    neighborhood: "Riverside",
    deliveryFee: 2.99,
    blurb: "Slow-cooked gravies, fresh naan, heat levels measured honestly.",
    menu: menuFor("mm", [img.curry, img.kebab, img.ramen, img.donut]),
  },
  {
    id: "neon-sushi",
    name: "Neon Sushi Bar",
    cuisine: "Sushi · Small plates",
    rating: 4.6,
    reviews: 415,
    eta: [28, 38],
    price: "$$$",
    closesAt: "2:30 AM",
    openUntilHour: 26.5,
    cravings: ["comfort-carbs"],
    hero: img.sushi,
    neighborhood: "North Loop",
    deliveryFee: 3.49,
    blurb: "Cold counter, warm lighting, rice still at body temperature.",
    menu: menuFor("ns", [img.sushi, img.ramen, img.coffee, img.donut]),
  },
  {
    id: "cluck-oclock",
    name: "Cluck O'Clock",
    cuisine: "Fried chicken · Wings",
    rating: 4.7,
    reviews: 1876,
    eta: [19, 27],
    price: "$$",
    closesAt: "4:00 AM",
    openUntilHour: 28,
    cravings: ["midnight-munchies", "hot-spicy"],
    hero: img.chicken,
    neighborhood: "Midtown",
    owlsPick: true,
    deliveryFee: 2.49,
    blurb: "Double-dredged, hot-honey optional, napkins non-negotiable.",
    menu: menuFor("co", [img.chicken, img.burger, img.donut, img.coffee]),
  },
  {
    id: "street-lamp-noodles",
    name: "Street Lamp Noodles",
    cuisine: "Street food · Broths",
    rating: 4.5,
    reviews: 289,
    eta: [21, 29],
    price: "$",
    closesAt: "5:30 AM",
    openUntilHour: 29.5,
    cravings: ["comfort-carbs", "fuel-up"],
    hero: img.street,
    neighborhood: "East Side",
    deliveryFee: 1.49,
    blurb: "A cart with a rice-cooker soul. Cheapest bowl still open in the city.",
    menu: menuFor("sln", [img.street, img.ramen, img.curry, img.coffee]),
  },
];

export const neighborhoods = ["All areas", "Downtown", "East Side", "Riverside", "Midtown", "North Loop"];

export const getRestaurant = (id: string) => restaurants.find((r) => r.id === id);

export const currency = (n: number) => `$${n.toFixed(2)}`;
