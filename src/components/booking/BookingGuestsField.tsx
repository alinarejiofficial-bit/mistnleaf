"use client";

import { fieldClass } from "@/components/booking/BookingUi";

type BookingGuestsFieldProps = {
  defaultValue?: string;
};

export function BookingGuestsField({
  defaultValue = "2",
}: BookingGuestsFieldProps) {
  return (
    <label className="block text-sm text-muted">
      Guests
      <input
        type="number"
        name="guests"
        min={1}
        max={6}
        required
        defaultValue={defaultValue}
        className={fieldClass}
        suppressHydrationWarning
      />
    </label>
  );
}
