"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookingHiddens,
  BookingSubmitButton,
  ghostBtnClass,
  StaySummaryCard,
} from "@/components/booking/BookingUi";
import { formatInr, type BookingQuery } from "@/lib/booking";

type AddonOption = {
  id: string;
  name: string;
  price: number;
};

type AddonsSelectFormProps = {
  query: BookingQuery;
  catalog: AddonOption[];
  initialSelected: string[];
  backHref: string;
  action: (formData: FormData) => void | Promise<void>;
};

export function AddonsSelectForm({
  query,
  catalog,
  initialSelected,
  backHref,
  action,
}: AddonsSelectFormProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelected);

  const summaryQuery = useMemo(
    () => ({ ...query, addons: selectedIds.join(",") }),
    [query, selectedIds],
  );

  function toggleAddon(id: string, checked: boolean) {
    setSelectedIds((current) => {
      if (checked) {
        return current.includes(id) ? current : [...current, id];
      }
      return current.filter((item) => item !== id);
    });
  }

  return (
    <form
      action={action}
      className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start"
    >
      <div className="space-y-4">
        <BookingHiddens query={{ ...query, addons: "" }} includeGuest />
        <input type="hidden" name="addonsStep" value="1" />

        {catalog.map((addon) => (
          <label
            key={addon.id}
            className="flex cursor-pointer items-start gap-4 border border-line bg-fog/70 p-5 has-[:checked]:border-pine"
          >
            <input
              type="checkbox"
              name="addonIds"
              value={addon.id}
              checked={selectedIds.includes(addon.id)}
              onChange={(event) => toggleAddon(addon.id, event.target.checked)}
              className="mt-1"
            />
            <span className="flex-1">
              <span className="block font-display text-xl text-pine">
                {addon.name}
              </span>
              <span className="mt-1 block text-sm text-muted">
                Optional package for your reservation.
              </span>
            </span>
            <span className="text-sm text-pine">{formatInr(addon.price)}</span>
          </label>
        ))}

        <div className="flex flex-wrap gap-3 pt-2">
          <BookingSubmitButton>Continue to guest details</BookingSubmitButton>
          <Link href={backHref} className={ghostBtnClass}>
            Back
          </Link>
        </div>
      </div>

      <StaySummaryCard query={summaryQuery} />
    </form>
  );
}
