import { redirect } from "next/navigation";
import { parseBookingQuery, requireSearch, toQuery } from "@/lib/booking";

type Props = PageProps<"/booking/availability">;

/** Legacy step — search now goes straight to room selection. */
export default async function BookingAvailabilityPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = parseBookingQuery(params);
  const q = toQuery(query);

  if (!requireSearch(query)) {
    redirect("/booking/search");
  }

  const suffix = params.error === "unavailable" ? "&error=unavailable" : "";
  redirect(`/booking/select?${q}${suffix}`);
}
