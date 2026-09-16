import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AddonsSelectForm } from "@/components/booking/AddonsSelectForm";
import { BookingStepper } from "@/components/booking/BookingStepper";
import { PageIntro, Section } from "@/components/PageShell";
import {
  parseAddonIds,
  parseBookingQuery,
  requireRoom,
  toQuery,
} from "@/lib/booking";
import { db } from "@/lib/store/db";
import { goToGuest } from "../actions";

export const metadata: Metadata = {
  title: "Packages & Add-ons · Booking",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BookingAddonsPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = parseBookingQuery(params);

  if (!requireRoom(query)) {
    redirect(`/booking/select?${toQuery(query)}`);
  }

  const catalog = db()
    .addons.filter((a) => a.active)
    .map((a) => ({ id: a.id, name: a.name, price: a.price }));
  const initialSelected = parseAddonIds(query.addons);
  const q = toQuery(query);

  return (
    <>
      <BookingStepper current="addons" query={q} />
      <PageIntro
        eyebrow="Step 3"
        title="Packages & Add-ons"
        lead="Optional extras for your stay. Continue without selecting any if you prefer."
      />
      <Section className="pt-0">
        <AddonsSelectForm
          query={query}
          catalog={catalog}
          initialSelected={initialSelected}
          backHref={`/booking/select?${q}`}
          action={goToGuest}
        />
      </Section>
    </>
  );
}
