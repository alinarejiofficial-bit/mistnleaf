import Link from "next/link";
import { bookingSteps, type BookingStepKey } from "@/lib/booking";

type Props = {
  current: BookingStepKey;
  query?: string;
};

export function BookingStepper({ current, query = "" }: Props) {
  const currentIndex = bookingSteps.findIndex((step) => step.key === current);
  const suffix = query ? `?${query}` : "";

  return (
    <nav
      aria-label="Booking progress"
      className="mx-auto max-w-5xl px-6 pb-6 pt-24 md:pt-28"
    >
      <ol className="flex gap-2 overflow-x-auto pb-1 md:justify-between md:gap-0 md:overflow-visible">
        {bookingSteps.map((step, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          const reachable = index <= currentIndex;
          const href =
            step.key === "confirmation"
              ? `${step.href}${suffix}`
              : reachable
                ? `${step.href}${suffix}`
                : undefined;

          const content = (
            <span
              className={`flex min-w-max items-center gap-2 text-[0.68rem] uppercase tracking-[0.08em] md:min-w-0 md:flex-col md:items-start md:gap-2 ${
                active ? "text-pine" : done ? "text-leaf" : "text-muted/55"
              }`}
            >
              <span
                className={`inline-flex h-7 w-7 items-center justify-center text-[0.7rem] ${
                  active || done
                    ? "bg-pine text-fog"
                    : "border border-line bg-fog text-muted"
                }`}
              >
                {index + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </span>
          );

          return (
            <li key={step.key} className="md:flex-1">
              {href && index < currentIndex ? (
                <Link href={href} className="hover:opacity-80">
                  {content}
                </Link>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
