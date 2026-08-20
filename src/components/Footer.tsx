"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const explore = [
  { href: "/about", label: "About" },
  { href: "/rooms", label: "Rooms" },
  { href: "/experiences", label: "Experiences" },
  { href: "/amenities", label: "Amenities" },
  { href: "/dining", label: "Dining" },
  { href: "/gallery", label: "Gallery" },
];

const plan = [
  { href: "/offers", label: "Offers" },
  { href: "/dining", label: "Dining" },
  { href: "/things-to-do", label: "Things to Do" },
  { href: "/explore", label: "Site guide" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact / Enquiry" },
  { href: "/booking/search", label: "Check availability" },
];

const policies = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cancellation", label: "Cancellation Policy" },
  { href: "/staff/login", label: "Staff login" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/staff")) return null;

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="font-display text-3xl tracking-tight">{site.name}</p>
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-fog/70">
            {site.tagline}
          </p>
          <div className="mt-8 space-y-1.5 text-sm text-fog/65">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p className="pt-3">
              <a href={`mailto:${site.email}`} className="hover:text-fog">
                {site.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="hover:text-fog"
              >
                {site.phone}
              </a>
            </p>
          </div>
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-fog/45">
            Explore
          </p>
          <nav className="mt-4 flex flex-col gap-2.5 text-sm text-fog/75">
            {explore.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-fog">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-fog/45">
            Plan
          </p>
          <nav className="mt-4 flex flex-col gap-2.5 text-sm text-fog/75">
            {plan.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-fog">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-fog/45">
            Policies
          </p>
          <nav className="mt-4 flex flex-col gap-2.5 text-sm text-fog/75">
            {policies.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-fog">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="site-footer__bar">
        © {new Date().getFullYear()} {site.name}. Nature in every breath.
      </div>
    </footer>
  );
}
