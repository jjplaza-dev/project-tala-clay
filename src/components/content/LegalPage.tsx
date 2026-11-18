import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { DraftNotice } from "./DraftNotice";

export interface LegalSection {
  title: string;
  body: string;
}

export function LegalPage({ id, title, intro, sections }: { id: string; title: string; intro: string; sections: LegalSection[] }) {
  return (
    <SectionBand labelledBy={id} className="lg:py-20">
      <SectionHeading id={id} level={1} eyebrow="Draft" title={title} intro={intro} />
      <DraftNotice label="Draft, to be reviewed by the studio" className="mt-6 max-w-[62ch]">
        This is placeholder text, not legal advice. The studio should have it reviewed by a qualified professional before
        launch.
      </DraftNotice>
      <div className="mt-12 grid max-w-[62ch] gap-10">
        {sections.map((s) => (
          <section key={s.title} aria-labelledby={`${id}-${s.title.replace(/\W+/g, "-").toLowerCase()}`}>
            <h2 id={`${id}-${s.title.replace(/\W+/g, "-").toLowerCase()}`} className="text-2xl font-semibold">
              {s.title}
            </h2>
            <p className="mt-3 leading-[1.65]">{s.body}</p>
          </section>
        ))}
      </div>
    </SectionBand>
  );
}
