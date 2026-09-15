import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { CmsSectionEdit } from "@/components/cms/CmsSectionEdit";
import { PageIntro, Section } from "@/components/PageShell";
import { getSiteContent } from "@/lib/cms/get-site-content";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Location",
  description: "Find Mistnleaf in the hills of Munnar, Kerala.",
};

export default async function LocationPage() {
  const content = await getSiteContent();
  const { site: siteInfo, location } = content;
  const directionsHref =
    location.directionsUrl.startsWith("http")
      ? location.directionsUrl
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${location.addressLine1}, ${location.addressLine2}, ${siteInfo.address.country}`,
        )}`;

  return (
    <>
      <PageIntro
        eyebrow="Find us"
        title={location.title}
        lead={location.description}
      />

      <section className="relative overflow-hidden">
        <Suspense fallback={null}>
          <CmsSectionEdit section="location" label="Location" />
        </Suspense>
        <div className="location-panel absolute inset-0">
          <Image
            src={media.locationHills}
            alt="Hills surrounding Mistnleaf in Munnar"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative z-[2] mx-auto flex min-h-[26rem] max-w-6xl flex-col items-center justify-center px-6 py-16 text-center md:min-h-[32rem] md:py-20">
          <div className="location-panel__copy max-w-xl">
            <p className="font-display text-3xl md:text-4xl">{siteInfo.name}</p>
            <p className="mt-4 leading-relaxed">
              {location.addressLine1}
              <br />
              {location.addressLine2}
              <br />
              {siteInfo.address.country}
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="location-ways">
          <div className="location-way">
            <p className="location-way__label">By air</p>
            <p className="location-way__title">Cochin International</p>
            <p className="location-way__copy">
              {location.airportNote}. Private transfers can be arranged when you
              book.
            </p>
          </div>
          <div className="location-way">
            <p className="location-way__label">Arrival</p>
            <p className="location-way__title">Hill Road access</p>
            <p className="location-way__copy">
              Near Whispering Pines. Share your ETA and we will guide the final
              stretch to the lodge.
            </p>
          </div>
          <div className="location-way">
            <p className="location-way__label">Need help?</p>
            <p className="location-way__title">Ask the desk</p>
            <p className="location-way__copy">
              Email {siteInfo.email} or call {siteInfo.phone} for directions and
              transfer quotes.
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center bg-pine px-6 py-3 text-[0.8rem] font-medium uppercase tracking-[0.08em] text-fog transition hover:bg-pine-soft"
          >
            Get directions
          </a>
          <ButtonLink href="/contact" variant="ghost">
            Ask for directions
          </ButtonLink>
          <Link href="/booking/search" className="link-arrow self-center">
            Check availability
          </Link>
        </div>
      </Section>
    </>
  );
}
