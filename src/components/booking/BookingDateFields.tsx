"use client";

import { useState } from "react";
import { fieldClass } from "@/components/booking/BookingUi";

type BookingDateFieldsProps = {
  today: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  fieldClassName?: string;
};

export function BookingDateFields({
  today,
  initialCheckIn = "",
  initialCheckOut = "",
  fieldClassName = fieldClass,
}: BookingDateFieldsProps) {
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);

  const minCheckOut = checkIn || today;

  function onCheckInChange(value: string) {
    setCheckIn(value);
    if (!value) return;
    if (!checkOut || checkOut < value) {
      setCheckOut(value);
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block text-sm text-muted">
        Check-in
        <input
          type="date"
          name="checkIn"
          required
          min={today}
          value={checkIn}
          onChange={(event) => onCheckInChange(event.target.value)}
          className={fieldClassName}
          suppressHydrationWarning
        />
      </label>
      <label className="block text-sm text-muted">
        Check-out
        <input
          type="date"
          name="checkOut"
          required
          min={minCheckOut}
          value={checkOut}
          onChange={(event) => setCheckOut(event.target.value)}
          className={fieldClassName}
          suppressHydrationWarning
        />
      </label>
    </div>
  );
}
