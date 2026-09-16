import type { Metadata } from "next";
import Link from "next/link";
import { BookingDateFields } from "@/components/booking/BookingDateFields";
import { BookingGuestsField } from "@/components/booking/BookingGuestsField";
import { BookingStepper } from "@/components/booking/BookingStepper";
import { BookingSubmitButton } from "@/components/booking/BookingUi";
import { PageIntro, Section } from "@/components/PageShell";
import { getRoom, param, toQuery } from "@/lib/booking";
import { goToAvailability } from "../actions";

export const metadata: Metadata = {
  title: "Search · Booking",
  description: "Search available dates at Mistnleaf.",
};

type Props = PageProps<"/booking/search">;

export default async function BookingSearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const error = param(params, "error");
  const roomSlug = param(params, "room");
  const locked = param(params, "locked") === "1" ? "1" : "";
  const room = roomSlug ? getRoom(roomSlug) : null;
  const today = new Date().toISOString().slice(0, 10);
  const stepperQuery = toQuery({
    room: roomSlug,
    locked,
    checkIn: param(params, "checkIn"),
    checkOut: param(params, "checkOut"),
    guests: param(params, "guests"),
  });

  return (
    <>
      <BookingStepper current="search" query={stepperQuery} />
      <PageIntro
        eyebrow="Step 1"
        title={room ? `Check availability · ${room.name}` : "Search"}
        lead={
          room
            ? `Choose dates and guests for ${room.name}. We’ll confirm it’s available, then continue with packages and payment.`
            : "Choose check-in, check-out, and guests — then view rooms, add packages, see the price, enter details, and pay."
        }
      />
      <Section className="pt-0">
        <form
          action={goToAvailability}
          className="mx-auto grid max-w-xl gap-4"
        >
          {roomSlug ? <input type="hidden" name="room" value={roomSlug} /> : null}
          {locked ? <input type="hidden" name="locked" value="1" /> : null}
          {error === "dates" ? (
            <p className="border border-line bg-mist px-4 py-3 text-sm text-pine">
              Please select a check-out date that is after check-in.
            </p>
          ) : null}
          {error === "unavailable" ? (
            <p className="border border-line bg-mist px-4 py-3 text-sm text-pine">
              {room
                ? `${room.name} isn’t available for those dates. Try different dates, or `
                : "That room isn’t available for those dates. "}
              {room ? (
                <Link href="/booking/search" className="underline">
                  browse all rooms
                </Link>
              ) : null}
              {room ? "." : null}
            </p>
          ) : null}
          <BookingDateFields
            today={today}
            initialCheckIn={param(params, "checkIn")}
            initialCheckOut={param(params, "checkOut")}
          />
          <BookingGuestsField defaultValue={param(params, "guests", "2")} />
          <BookingSubmitButton>
            {room ? "Continue" : "Continue to rooms"}
          </BookingSubmitButton>
        </form>
      </Section>
    </>
  );
}
