import Link from "next/link";
import { CheckIcon, XIcon } from "lucide-react";
import { DraftNotice } from "@/components/content/DraftNotice";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { getCareGuideSections, getCategories } from "@/lib/selectors";

export default function CarePage() {
  const sections = getCareGuideSections();
  const categories = getCategories();

  return (
    <>
      <SectionBand labelledBy="care-title" className="lg:py-20 print:py-6">
        <SectionHeading
          id="care-title"
          level={1}
          eyebrow="Ceramic care guide"
          title="Looking after handmade ceramics"
          intro="Simple habits help handmade pieces last. Choose the kind of piece you have, or read the handling and troubleshooting notes."
        />
        <DraftNotice label="General guidance" className="mt-6 max-w-[62ch]">
          This is general guidance only. Please confirm details for your glaze and firing with the studio, including
          whether a piece suits the microwave or dishwasher.
        </DraftNotice>
      </SectionBand>

      <SectionBand tone="deep" className="lg:py-20 print:py-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <nav aria-label="Care guide sections" className="print:hidden lg:col-span-3">
            <ul className="lg:sticky lg:top-6">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-14 lg:col-span-8 lg:col-start-5">
            {sections.map((s) => {
              const category = categories.find((c) => c.id === s.categoryId);
              return (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-6">
                  <h2 id={`${s.id}-title`} className="text-3xl font-semibold">{s.title}</h2>
                  <ol className="mt-5 grid list-decimal gap-2 pl-5 leading-relaxed marker:font-semibold">
                    {s.steps.map((step) => <li key={step}>{step}</li>)}
                  </ol>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-label mb-3">Do</h3>
                      <ul className="grid gap-2 text-sm leading-relaxed">
                        {s.dos.map((d) => (
                          <li key={d} className="flex gap-2">
                            <CheckIcon aria-hidden strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-olive-deep" />
                            <span><span className="sr-only">Do: </span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-label mb-3">Don’t</h3>
                      <ul className="grid gap-2 text-sm leading-relaxed">
                        {s.donts.map((d) => (
                          <li key={d} className="flex gap-2">
                            <XIcon aria-hidden strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-terracotta-deep" />
                            <span><span className="sr-only">Don’t: </span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {category ? (
                    <p className="mt-6 print:hidden">
                      <Link href={`/shop/${category.slug}`} className="underline underline-offset-4 hover:text-terracotta-deep">
                        Shop {category.name.toLowerCase()}
                      </Link>
                    </p>
                  ) : null}
                </section>
              );
            })}
          </div>
        </div>
      </SectionBand>
    </>
  );
}
