import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
      <div className="aurora" aria-hidden="true" />
      <div className="fiber-lines" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl md:text-6xl">{title}</h1>
          {text && <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{text}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue">{eyebrow}</p>
      )}
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} text={intro} />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl space-y-6 px-5">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.04}>
              <article className="glass rounded-3xl p-7">
                <h2 className="text-xl font-semibold">{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </article>
            </Reveal>
          ))}
          <p className="pt-4 text-center text-xs text-muted-foreground">
            Documento preparado para revisão jurídica. Última atualização: consulte nossa equipe.
          </p>
        </div>
      </section>
    </>
  );
}
