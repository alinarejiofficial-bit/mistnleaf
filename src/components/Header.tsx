"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { navLinks } from "@/lib/site";

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
      className={`site-header fixed inset-x-0 top-0 z-50 ${
        scrolled || open ? "is-scrolled" : ""
      }`}
    >
      <div className="site-header__inner">
        <div className="site-header__brand">
          <Logo size="header" priority onClick={() => setOpen(false)} />
        </div>

        <div className="site-header__end">
          <nav className="site-header__nav" aria-label="Main">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`site-header__link ${active ? "is-active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/booking/search"
            className="site-header__cta inline-flex shrink-0 items-center justify-center rounded-xl bg-pine px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-fog no-underline shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] transition hover:bg-pine-soft"
          >
            Book my room
          </Link>

          <button
            type="button"
            className="site-header__menu inline-flex shrink-0 items-center justify-center rounded-xl border border-line bg-white/40 px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-pine transition hover:bg-white/60"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="site-header__drawer">
          <nav className="site-header__drawer-nav" aria-label="Mobile">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`site-header__drawer-link ${
                    active ? "is-active" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/booking/search"
              className="site-header__cta site-header__cta--block inline-flex w-full items-center justify-center rounded-xl bg-pine px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-fog no-underline"
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
