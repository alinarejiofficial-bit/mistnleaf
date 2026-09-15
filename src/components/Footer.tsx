"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import type { MappedSiteContent } from "@/lib/cms/map-to-site";
import { site } from "@/lib/site";

const defaultExplore = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/rooms", label: "Rooms" },
  { href: "/experiences", label: "Experiences" },
  { href: "/amenities", label: "Amenities" },
  { href: "/dining", label: "Dining" },
  { href: "/gallery", label: "Gallery" },
];

const defaultPlan = [
  { href: "/offers", label: "Offers" },
  { href: "/things-to-do", label: "Things to Do" },
  { href: "/explore", label: "Site guide" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact / Enquiry" },
  { href: "/booking/search", label: "Check availability" },
];

const defaultPolicies = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cancellation", label: "Cancellation Policy" },
];

function ensureHomeLink(links: { href: string; label: string }[]) {
  const withoutHome = links.filter(
    (link) => link.href !== "/" && link.label.toLowerCase() !== "home",
  );
  return [{ href: "/", label: "Home" }, ...withoutHome];
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="site-footer__col">
      <p className="site-footer__heading">{title}</p>
      <nav className="site-footer__nav" aria-label={title}>
        {links.map((link) => {
          const href =
            link.label.toLowerCase() === "home" || link.href === "/"
              ? "/"
              : link.href;

          return (
            <Link
              key={`${link.label}-${href}`}
              href={href}
              className="site-footer__link"
              prefetch
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function Footer({ content }: { content?: MappedSiteContent }) {
  const pathname = usePathname();
  if (pathname.startsWith("/staff")) return null;

  const siteInfo = content?.site ?? site;
  const footer = content?.footer;
  const contact = content?.contact;
  const explore = ensureHomeLink(footer?.exploreLinks ?? defaultExplore);
  const plan = footer?.planLinks ?? defaultPlan;
  const policies = (footer?.policyLinks ?? defaultPolicies).filter(
    (link) =>
      link.label.toLowerCase() !== "staff login" &&
      link.href !== "/staff/login" &&
      link.href !== "/login",
  );

  return (
    <footer className="site-footer relative">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Logo size="footer" variant="light" href="/" />
        </div>

        <div className="site-footer__col">
          <p className="site-footer__heading">Contact</p>
          <address className="site-footer__contact not-italic">
            <p className="site-footer__contact-line">
              <span className="site-footer__contact-label">Address</span>
              <Link href="/location" className="site-footer__address-link">
                {contact?.addressLine1 ?? siteInfo.address.line1}
                <br />
                {contact?.addressLine2 ?? siteInfo.address.line2}
              </Link>
            </p>
            <p className="site-footer__contact-line">
              <span className="site-footer__contact-label">Email</span>
              <a href={`mailto:${contact?.email ?? siteInfo.email}`}>
                {contact?.email ?? siteInfo.email}
              </a>
            </p>
            <p className="site-footer__contact-line">
              <span className="site-footer__contact-label">Phone</span>
              <a href={`tel:${(contact?.phone ?? siteInfo.phone).replace(/\s/g, "")}`}>
                {contact?.phone ?? siteInfo.phone}
              </a>
            </p>
          </address>
        </div>

        <FooterColumn title="Explore" links={explore} />
        <FooterColumn title="Plan" links={plan} />
        <FooterColumn title="Policies" links={policies} />
      </div>

      <div className="site-footer__bar">
        <p>{footer?.copyright ?? `© ${new Date().getFullYear()} ${siteInfo.name}. Nature in every breath.`}</p>
      </div>
    </footer>
  );
}
