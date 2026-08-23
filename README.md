# Midnight Munchies Hub

NightOwl - Late Night Food Delivery

please create a full UI/UX design for this website. make sure to have design-focused pages

make sure to use and iterate on the given images to create UI,

the final site should be production-ready with functional implementation, it should include a minimum of 8 to 10 pages, including login/signup pages and authenticated pages like dashboard. the focus should be on design while maintaining all mockup data

add animations to the site, and please give a simple user flow in the response.

Design Idea: Dark, moody night theme, neon accent colours, time-based restaurant filtering, crave category cards, estimated delivery time UI.

Problem Statement:

Late-night diners frequently struggle to find reliable food delivery options after midnight due to standard delivery apps cluttering feeds with closed venues, inaccurate operating hours, and daylight-oriented interfaces that cause eye strain in low-light environments. This leads to friction, cancelled orders, and decision fatigue for hungry nocturnal users like shift workers, students, and night owls. Nightowl solves this by curating only actively open, post-midnight kitchens through a high-contrast, dark-mode platform that prioritises crave-based categorisation, precise late-night delivery estimates, and instant ordering. 

use open sources online images it needed. don't generate the images

Ask me if you have any questions

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e4d771e9-3e9f-47d3-be5c-bd8c89d2f8ad).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

Done

Dark neon design system in src/styles.css (night surfaces, lime --neon accent, glow/lift utilities, rise/marquee/shimmer animations, Playfair + DM Sans tokens)
Mock data layer (src/lib/data.ts): 12 late-night restaurants with menus, ETAs, closing hours, craving tags, Unsplash imagery; 6 crave categories
Time logic (src/lib/night.ts) for after-midnight "open now" filtering
Client store (src/lib/store.tsx): mock auth, cart, order history — persisted to localStorage
Components: logo, sticky header with live clock + cart badge, marquee footer, restaurant card, auth gate
Home page (src/routes/index.tsx): hero, live-now panel, crave cards, "still serving right now" grid, stats
Remaining (the current type errors are only unresolved <Link to=...> targets and will clear once these route files exist): /discover (search param craving, time slider, neighborhood filter), /cravings, /restaurant/$id, /how-it-works, /for-restaurants, /auth (login+signup tabs), /checkout, /dashboard, /orders, /orders/$id (live tracking), /profile — plus mounting header/footer + StoreProvider in __root.tsx and adding the Google Fonts <link>.

Intended user flow: land on home → pick a craving or hit "Find my craving" → /discover filters to kitchens open at the current hour → open a restaurant → add dishes to cart → checkout prompts sign-in at /auth → order placed → live ETA tracking at /orders/$id → history and saved kitchens in /dashboard.
