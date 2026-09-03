import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { CtaBand } from "@/components/PageShell";
import { site } from "@/lib/site";
import "./contact-page.css";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description: "Contact Mistnleaf or submit a stay enquiry.",
};

type Props = PageProps<"/contact">;

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const sent = params.sent === "1";
  const missing = params.error === "missing";

  return (
    <>
      <section className="contact-page">
        <header className="contact-page__intro">
          <p className="eyebrow">Contact</p>
          <h1 className="contact-page__title">Contact &amp; Enquiries</h1>
          <p className="contact-page__lead">
            Reach the resort desk, ask about availability, or send an enquiry —
            we will respond with next steps.
          </p>
        </header>

        <section className="contact-page__body">
          <div className="contact-page__grid">
            <aside className="contact-page__details">
              <h2 className="contact-page__heading">Resort contact</h2>
              <dl className="contact-page__list">
                <div className="contact-page__item">
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </dd>
                </div>
                <div className="contact-page__item">
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div className="contact-page__item">
                  <dt>Hours</dt>
                  <dd>{site.hours}</dd>
                </div>
                <div className="contact-page__item">
                  <dt>Address</dt>
                  <dd className="contact-page__address">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <br />
                    {site.address.country}
                  </dd>
                </div>
              </dl>
              <div className="contact-page__links">
                <Link href="/location" className="link-arrow">
                  View location &amp; directions
                </Link>
                <Link href="/booking/search" className="link-arrow">
                  Check availability
                </Link>
              </div>
            </aside>

            <div className="contact-page__panel">
              <h2 className="contact-page__heading">Submit an enquiry</h2>
              <p className="contact-page__panel-lead">
                Tell us what you need — stays, transfers, experiences, or
                general questions.
              </p>
              {sent ? (
                <div className="contact-page__success" role="status">
                  <p>
                    Thank you. Your enquiry has been received
                    {typeof params.id === "string" ? ` (ref ${params.id})` : ""}
                    . Our team will follow up by email.
                  </p>
                  <Link href="/contact" className="link-arrow">
                    Send another enquiry
                  </Link>
                </div>
              ) : null}
              {missing ? (
                <p className="contact-form__error" style={{ marginTop: "1rem" }}>
                  Please complete the required fields and try again.
                </p>
              ) : null}
              {!sent ? <EnquiryForm /> : null}
            </div>
          </div>
        </section>
      </section>
      <CtaBand />
    </>
  );
}
