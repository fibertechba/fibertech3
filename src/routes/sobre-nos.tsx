import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Gem, History, Cpu, ShieldCheck } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";

export const Route = createFileRoute("/sobre-nos")({
  head: () => ({
    meta: [
      { title: "Sobre Nós — Fiber Tech" },
      {
        name: "description",
        content:
          "Conheça a Fiber Tech: missão, visão, valores, história e a tecnologia por trás da nossa rede 100% fibra óptica.",
      },
      { property: "og:title", content: "Sobre Nós — Fiber Tech" },
      {
        property: "og:description",
        content: "Nossa história, missão e a tecnologia que conecta você ao mundo.",
      },
      { property: "og:url", content: "/sobre-nos" },
    ],
    links: [{ rel: "canonical", href: "/sobre-nos" }],
  }),
  component: Sobre,
});

const PILLARS = [
  {
    icon: Target,
    title: "Missão",
    text: "Conectar pessoas e empresas a uma internet rápida, estável e acessível, com atendimento humano e próximo.",
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Ser reconhecida como o provedor de fibra óptica mais confiável e admirado da região onde atuamos.",
  },
  {
    icon: Gem,
    title: "Valores",
    text: "Transparência, respeito ao cliente, excelência técnica, inovação constante e compromisso com a comunidade.",
  },
];

const HIGHLIGHTS = [
  {
    icon: History,
    title: "Nossa história",
    text: "A Fiber Tech nasceu do desejo de levar conexão de verdade para bairros e cidades mal atendidas. Começamos com uma pequena rede local e, cliente após cliente, expandimos nossa infraestrutura de fibra óptica mantendo o mesmo cuidado no atendimento.",
  },
  {
    icon: Cpu,
    title: "Tecnologia",
    text: "Operamos uma rede totalmente óptica (FTTH) com equipamentos de última geração, links redundantes e monitoramento 24 horas. Isso garante baixa latência, alta disponibilidade e velocidade real em qualquer horário.",
  },
  {
    icon: ShieldCheck,
    title: "Por que escolher a Fiber Tech",
    text: "Suporte técnico próprio, instalação rápida, equipamentos em comodato, planos sem franquia e um time que conhece você pelo nome. Aqui, tecnologia de ponta caminha junto com atendimento humanizado.",
  },
];

function Sobre() {
  return (
    <>
      <PageHero
        eyebrow="Sobre Nós"
        title={
          <>
            Somos a <span className="text-gradient">Fiber Tech</span>
          </>
        }
        text="Um provedor regional apaixonado por tecnologia, feito para conectar você ao mundo com velocidade e confiança."
      />

      <section className="pb-8">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="glass h-full rounded-3xl p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                  <p.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-semibold">{p.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading eyebrow="Nossa essência" title="Tecnologia com propósito" />
          <div className="mt-14 space-y-5">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.06}>
                <article className="glass flex gap-5 rounded-3xl p-8">
                  <h.icon className="h-8 w-8 shrink-0 text-brand-blue" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-semibold">{h.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection title="Venha fazer parte da Fiber Tech" />
    </>
  );
}
