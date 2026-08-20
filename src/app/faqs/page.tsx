import type { Metadata } from "next";
import { PageIntro, Section } from "@/components/PageShell";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Common questions about staying at Mistnleaf.",
};

export default function FaqsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Help"
        title="FAQs"
        lead="Answers to the questions guests ask most before arrival."
      />
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl space-y-6">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group border-t border-line pt-4 open:pb-2"
            >
              <summary className="cursor-pointer list-none font-display text-xl text-pine marker:content-none">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="text-lichen transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
