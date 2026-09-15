"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookingHiddens,
  ghostBtnClass,
  primaryBtnClass,
  StaySummaryCard,
} from "@/components/booking/BookingUi";
import {
  formatInr,
  type BookingQuery,
} from "@/lib/booking";
import type { Room } from "@/lib/site";

type RoomOption = {
  room: Room;
  estimate: string | null;
  nights: number;
};

type RoomSelectFormProps = {
  query: BookingQuery;
  options: RoomOption[];
  backHref: string;
  action: (formData: FormData) => void | Promise<void>;
};

export function RoomSelectForm({
  query,
  options,
  backHref,
  action,
}: RoomSelectFormProps) {
  const initialSlug =
    (query.room && options.some((o) => o.room.slug === query.room)
      ? query.room
      : options[0]?.room.slug) || "";
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);

  const summaryQuery = useMemo(
    () => ({ ...query, room: selectedSlug }),
    [query, selectedSlug],
  );

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
      <div className="space-y-5">
        <BookingHiddens query={{ ...query, room: "" }} includeGuest />

        {options.map(({ room, estimate, nights }) => (
          <label
            key={room.slug}
            className="flex cursor-pointer flex-col gap-4 border border-line bg-fog/70 p-4 has-[:checked]:border-pine sm:flex-row"
          >
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:w-44">
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover"
                sizes="176px"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-3">
              <div>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="room"
                    value={room.slug}
                    required
                    checked={selectedSlug === room.slug}
                    onChange={() => setSelectedSlug(room.slug)}
                    className="mt-1"
                  />
                  <div>
                    <h2 className="font-display text-2xl text-pine">
                      {room.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted">{room.short}</p>
                    <p className="mt-2 text-sm text-pine">
                      {formatInr(room.price)} / night · {room.beds} · up to{" "}
                      {room.guests} guests
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted sm:text-right">
                {nights} night{nights === 1 ? "" : "s"}
                {estimate ? ` · ${estimate}` : ""}
              </p>
            </div>
          </label>
        ))}

        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" className={primaryBtnClass}>
            Continue to packages & add-ons
          </button>
          <Link href={backHref} className={ghostBtnClass}>
            Back
          </Link>
        </div>
      </div>

      <StaySummaryCard query={summaryQuery} />
    </form>
  );
}
