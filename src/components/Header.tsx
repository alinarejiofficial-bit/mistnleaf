"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/staff")) {
    return null;
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled || open
          ? "border-b border-line/70 bg-fog/90 shadow-[0_10px_40px_-28px_rgba(18,32,24,0.45)] backdrop-blur-md"
          : "bg-fog/55 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-[1.15rem]">
        <Link
          href="/"
          className="site-nav-brand shrink-0 pt-0.5 text-[1.55rem] leading-none text-pine transition hover:text-pine-soft sm:text-[1.75rem] md:text-[1.95rem]"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`site-nav-link px-2.5 py-2 transition ${
                  active
                    ? "text-pine"
                    : "text-muted/90 hover:text-pine"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/booking/search"
            className="site-nav-cta site-nav-book ml-4"
          >
            Book my room
          </Link>
        </nav>

        <button
          type="button"
          className="site-nav-cta inline-flex min-h-9 items-center justify-center border border-line px-3.5 py-2 text-pine transition hover:bg-sand-cool/60 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-fog/95 px-5 py-5 backdrop-blur-md md:px-6 xl:hidden"
        >
          <nav className="flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`site-nav-link border-b border-line/60 py-3.5 ${
                    active ? "text-pine" : "text-muted hover:text-pine"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/booking/search"
              className="site-nav-cta site-nav-book mt-4 w-full"
              onClick={() => setOpen(false)}
            >
              Book my room
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
