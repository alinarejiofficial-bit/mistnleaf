import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/PageShell";
import { formatInr, offers } from "@/lib/site";
import "./offers-page.css";

export const metadata: Metadata = {
  title: "Offers & Packages",
  description: "Seasonal packages and stay inclusions at Mistnleaf.",
};

export default function OffersPage() {
  return (
    <>
      <section className="offers-page">
        <header className="offers-page__intro">
          <p className="eyebrow">Packages</p>
          <h1 className="offers-page__title">Offers &amp; Packages</h1>
          <p className="offers-page__lead">
            Thoughtful combinations of stay, meals, and experiences — without
            the clutter.
          </p>
        </header>

        <section className="offers-page__body">
          <div className="offers-list offers-list--page">
            {offers.map((offer, index) => (
              <article key={offer.title} className="offer-panel">
                <p className="offer-index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="offer-panel__copy">
                  <h2 className="offer-panel__title">{offer.title}</h2>
                  <p className="offer-panel__detail">{offer.detail}</p>
                  <p className="offer-panel__valid">{offer.valid}</p>
                </div>
                <div className="offer-panel__price">
                  <p className="offer-panel__from">From</p>
                  <p className="offer-panel__amount">
                    {formatInr(offer.priceFrom)}
                  </p>
                  <Link href="/booking/search" className="offer-panel__cta">
                    Book package
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
      <CtaBand />
    </>
  );
}
