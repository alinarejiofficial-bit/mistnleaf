import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BookingStepper } from "@/components/booking/BookingStepper";
import { RoomSelectForm } from "@/components/booking/RoomSelectForm";
import { PageIntro, Section } from "@/components/PageShell";
import {
  getAvailability,
  parseBookingQuery,
  requireSearch,
  toQuery,
} from "@/lib/booking";
import { goToAddons } from "../actions";

export const metadata: Metadata = {
  title: "Room Selection · Booking",
};

type Props = PageProps<"/booking/select">;

export default async function BookingSelectPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = parseBookingQuery(params);

  if (!requireSearch(query)) {
    redirect("/booking/search");
  }

  const guests = Number(query.guests) || 1;
  const options = getAvailability(query.checkIn, query.checkOut, guests).filter(
    (item) => item.available,
  );
  const q = toQuery(query);

  if (options.length === 0) {
    redirect(`/booking/search?${q}&error=dates`);
  }

  return (
    <>
      <BookingStepper current="select" query={q} />
      <PageIntro
        eyebrow="Step 2"
        title="Select Room Type"
        lead="Choose the room that fits your stay. Pricing is shown for your selected nights."
      />
      <Section className="pt-0">
        <RoomSelectForm
          query={query}
          options={options}
          backHref={`/booking/search?${q}`}
          action={goToAddons}
        />
      </Section>
    </>
  );
}
