import type { Metadata } from "next";
import { BookingStepper } from "@/components/booking/BookingStepper";
import { param } from "@/lib/booking";
import { goToAvailability } from "../actions";
import "./booking-page.css";

export const metadata: Metadata = {
  title: "Search · Booking",
  description: "Search available dates at Mistnleaf.",
};

type Props = PageProps<"/booking/search">;

export default async function BookingSearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const error = param(params, "error");
  const room = param(params, "room");
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <BookingStepper current="search" />
      <section className="booking-page">
        <header className="booking-page__intro">
          <p className="eyebrow">Step 1</p>
          <h1 className="booking-page__title">Search</h1>
          <p className="booking-page__lead">
            Choose check-in, check-out, and guests — then continue to rooms and
            payment.
          </p>
        </header>

        <section className="booking-page__body">
          <form action={goToAvailability} className="booking-panel">
            {room ? <input type="hidden" name="room" value={room} /> : null}
            {error === "dates" ? (
              <p className="booking-panel__alert" role="alert">
                Please select valid check-in and check-out dates.
              </p>
            ) : null}
            <div className="booking-panel__row">
              <label className="booking-field">
                <span className="booking-field__label">Check-in</span>
                <input
                  type="date"
                  name="checkIn"
                  required
                  min={today}
                  defaultValue={param(params, "checkIn")}
                  className="booking-field__input"
                />
              </label>
              <label className="booking-field">
                <span className="booking-field__label">Check-out</span>
                <input
                  type="date"
                  name="checkOut"
                  required
                  min={today}
                  defaultValue={param(params, "checkOut")}
                  className="booking-field__input"
                />
              </label>
            </div>
            <label className="booking-field">
              <span className="booking-field__label">Guests</span>
              <input
                type="number"
                name="guests"
                min={1}
                max={6}
                required
                defaultValue={param(params, "guests", "2")}
                className="booking-field__input"
              />
            </label>
            <button type="submit" className="booking-panel__submit">
              Check availability
            </button>
          </form>
        </section>
      </section>
    </>
  );
}
