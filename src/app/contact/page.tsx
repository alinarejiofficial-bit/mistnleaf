import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { CmsSectionEdit } from "@/components/cms/CmsSectionEdit";
import { PageIntro, Section } from "@/components/PageShell";
import { getSiteContent } from "@/lib/cms/get-site-content";
import "./contact-page.css";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description: "Contact Mistnleaf or submit a stay enquiry.",
};

type Props = PageProps<"/contact">;

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const content = await getSiteContent();
  const siteInfo = content.site;
  const contact = content.contact;
  const sent = params.sent === "1";
  const missing = params.error === "missing";

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Contact & Enquiries"
        lead="Reach the resort desk, ask about availability, or send an enquiry — we will respond with next steps."
      />
      <Section className="relative pt-0">
        <Suspense fallback={null}>
          <CmsSectionEdit section="contact" label="Contact" />
        </Suspense>
        <div className="contact-layout">
          <div className="contact-details">
            <h2 className="contact-details__title">Resort contact</h2>
            <dl className="contact-details__list">
              <div className="contact-detail">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${contact.email || siteInfo.email}`}>
                    {contact.email || siteInfo.email}
                  </a>
                </dd>
              </div>
              <div className="contact-detail">
                <dt>Phone</dt>
                <dd>
                  <a
                    href={`tel:${(contact.phone || siteInfo.phone).replace(/\s/g, "")}`}
                  >
                    {contact.phone || siteInfo.phone}
                  </a>
                </dd>
              </div>
              <div className="contact-detail">
                <dt>Hours</dt>
                <dd>{siteInfo.hours}</dd>
              </div>
              <div className="contact-detail">
                <dt>Address</dt>
                <dd>
                  {contact.addressLine1 || siteInfo.address.line1}
                  <br />
                  {contact.addressLine2 || siteInfo.address.line2}
                  <br />
                  {siteInfo.address.country}
                </dd>
              </div>
            </dl>
            {contact.checkInNote ? (
              <p className="contact-details__note">{contact.checkInNote}</p>
            ) : null}
            <div className="contact-details__links">
              <Link href="/location" className="link-arrow">
                View location & directions
              </Link>
              <Link href="/booking/search" className="link-arrow">
                Check availability
              </Link>
            </div>
          </div>

          <div className="contact-form-panel">
            <h2 className="contact-form-panel__title">Submit an enquiry</h2>
            <p className="contact-form-panel__lead">
              Tell us what you need — stays, transfers, experiences, or general
              questions.
            </p>
            {sent ? (
              <div className="contact-form-panel__success">
                Thank you. Your enquiry has been received
                {typeof params.id === "string" ? ` (ref ${params.id})` : ""}.
                Our team will follow up by email.
              </div>
            ) : null}
            {missing ? (
              <p className="contact-form-panel__error">
                Please complete the required fields and try again.
              </p>
            ) : null}
            {!sent ? (
              <EnquiryForm />
            ) : (
              <Link href="/contact" className="contact-form-panel__again">
                Send another enquiry
              </Link>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
