import { formatInr, getRoom, rooms, type Room } from "@/lib/site";
import { db } from "@/lib/store/db";

export const bookingSteps = [
  { key: "search", label: "Search", shortLabel: "Search", href: "/booking/search" },
  {
    key: "select",
    label: "Room Selection",
    shortLabel: "Room",
    href: "/booking/select",
  },
  { key: "addons", label: "Add-ons", shortLabel: "Add-ons", href: "/booking/add-ons" },
  {
    key: "guest",
    label: "Guest Details",
    shortLabel: "Guest",
    href: "/booking/guest",
  },
  { key: "summary", label: "Price", shortLabel: "Price", href: "/booking/summary" },
  { key: "payment", label: "Payment", shortLabel: "Pay", href: "/booking/payment" },
  {
    key: "confirmation",
    label: "Confirmation",
    shortLabel: "Done",
    href: "/booking/confirmation",
  },
] as const;

export type BookingStepKey = (typeof bookingSteps)[number]["key"];

export type BookingQuery = {
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  /** When "1", room was chosen before search — skip room selection. */
  locked: string;
  addons: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  ref: string;
  id: string;
};

export const roomSlugToTypeId: Record<string, string> = {
  "canopy-suite": "rt-canopy",
  "mist-cottage": "rt-mist",
  "leaf-room": "rt-leaf",
};

export function param(
  params: Record<string, string | string[] | undefined>,
  key: string,
  fallback = "",
) {
  const value = params[key];
  return typeof value === "string" ? value : fallback;
}

export function parseBookingQuery(
  params: Record<string, string | string[] | undefined>,
): BookingQuery {
  return {
    checkIn: param(params, "checkIn"),
    checkOut: param(params, "checkOut"),
    guests: param(params, "guests", "2"),
    room: param(params, "room"),
    locked: param(params, "locked") === "1" ? "1" : "",
    addons: param(params, "addons"),
    name: param(params, "name"),
    email: param(params, "email"),
    phone: param(params, "phone"),
    notes: param(params, "notes"),
    ref: param(params, "ref"),
    id: param(params, "id"),
  };
}

export function parseAddonIds(addons: string) {
  return addons
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export function toQuery(data: Partial<BookingQuery>) {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return params.toString();
}

export function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const start = parseDateOnly(checkIn);
  const end = parseDateOnly(checkOut);
  if (!start || !end) return 0;
  const diff = end.getTime() - start.getTime();
  if (diff <= 0) return 0;
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

function parseDateOnly(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return new Date(Date.UTC(year, month - 1, day));
}

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
] as const;

function formatDateOnly(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return `${day} ${MONTHS_SHORT[month - 1]} ${year}`;
}

export function formatStayRange(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return "Dates not selected";
  return `${formatDateOnly(checkIn)} → ${formatDateOnly(checkOut)}`;
}

export function getSelectedAddons(addonCsv: string) {
  const ids = parseAddonIds(addonCsv);
  if (ids.length === 0) return [];
  const catalog = db().addons.filter((a) => a.active);
  return catalog.filter((a) => ids.includes(a.id));
}

export function calcStayTotal(
  room: Room,
  nights: number,
  addonCsv = "",
) {
  const selected = getSelectedAddons(addonCsv);
  const addonTotal = selected.reduce((sum, item) => sum + item.price, 0);
  const roomSubtotal = room.price * nights;
  const subtotal = roomSubtotal + addonTotal;
  const taxes = 0;
  const total = subtotal;
  return {
    roomSubtotal,
    addonTotal,
    subtotal,
    taxes,
    total,
    perNight: room.price,
    addons: selected,
  };
}

export function getAvailability(
  checkIn: string,
  checkOut: string,
  guests: number,
) {
  const nights = nightsBetween(checkIn, checkOut);
  const store = db();

  return rooms.map((room) => {
    const typeId = roomSlugToTypeId[room.slug];
    const fits = room.guests >= guests && nights > 0;
    const unitsOpen = typeId
      ? store.roomUnits.filter(
          (u) =>
            u.roomTypeId === typeId &&
            u.status !== "maintenance" &&
            !store.bookings.some((b) => {
              if (b.roomUnitId !== u.id) return false;
              if (b.status === "cancelled" || b.status === "checked_out")
                return false;
              return checkIn < b.checkOut && b.checkIn < checkOut;
            }),
        ).length
      : 0;

    const available = fits && unitsOpen > 0;

    return {
      room,
      available,
      status: !fits
        ? ("too-small" as const)
        : !available
          ? ("sold-out" as const)
          : unitsOpen === 1
            ? ("limited" as const)
            : ("available" as const),
      nights,
      estimate: fits && nights > 0 ? formatInr(room.price * nights) : null,
    };
  });
}

export function requireSearch(query: BookingQuery) {
  const nights = nightsBetween(query.checkIn, query.checkOut);
  const guests = Number(query.guests) || 0;
  return Boolean(query.checkIn && query.checkOut && nights > 0 && guests > 0);
}

export function requireRoom(query: BookingQuery) {
  return requireSearch(query) && Boolean(getRoom(query.room));
}

export function requireGuest(query: BookingQuery) {
  return requireRoom(query) && Boolean(query.name && query.email);
}

export { formatInr, getRoom, rooms };
