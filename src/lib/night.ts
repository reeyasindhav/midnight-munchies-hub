import type { Restaurant } from "./data";

/** Hour on a 24h+ night scale: 1:47 AM -> 25.78 */
export function nightHour(d: Date = new Date()) {
  const h = d.getHours() + d.getMinutes() / 60;
  return h < 12 ? h + 24 : h;
}

export function isOpenAt(r: Restaurant, hour: number) {
  return hour < r.openUntilHour;
}

export function formatClock(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function formatHourLabel(hour: number) {
  const h24 = Math.floor(hour) % 24;
  const m = Math.round((hour % 1) * 60);
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}
