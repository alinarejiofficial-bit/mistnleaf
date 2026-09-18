"use client";

import { useMemo, useState } from "react";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const fieldClass =
  "mt-1 w-full border border-[#d7dbd6] px-3 py-2 text-sm normal-case tracking-normal";

type StaffBookingDateFieldsProps = {
  initialCheckIn?: string;
  initialCheckOut?: string;
};

export function StaffBookingDateFields({
  initialCheckIn = "",
  initialCheckOut = "",
}: StaffBookingDateFieldsProps) {
  const today = useMemo(() => todayISO(), []);
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
    <>
      <label className="block text-xs uppercase tracking-[0.12em] text-[#667069]">
        Check-in
        <input
          type="date"
          name="checkIn"
          required
          min={today}
          value={checkIn}
          onChange={(event) => onCheckInChange(event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="block text-xs uppercase tracking-[0.12em] text-[#667069]">
        Check-out
        <input
          type="date"
          name="checkOut"
          required
          min={minCheckOut}
          value={checkOut}
          onChange={(event) => setCheckOut(event.target.value)}
          className={fieldClass}
        />
      </label>
    </>
  );
}
