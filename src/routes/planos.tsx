import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/Sections";
import { PlanCards } from "@/components/site/PlanCards";
import { CtaSection } from "@/components/site/CtaSection";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { name: "keywords", content: "planos de internet, internet 100 mega, internet 200 mega, internet 300 mega, internet 500 mega, plano de internet barato, internet fibra óptica preço, Fiber Tech planos" },
      { title: "Planos de Internet Fibra Óptica — Fiber Tech" },
      {
        name: "description",
        content:
          "Planos Fiber Tech de 100 a 500 Mega a partir de R$69,90: sem franquia, Wi-Fi moderno, equipamento em comodato e suporte especializado.",
      },
      { property: "og:title", content: "Planos de Internet Fibra Óptica — Fiber Tech" },
      {
        property: "og:description",
        content: "START, PLUS, PREMIUM e ULTRA: escolha a velocidade ideal para sua casa ou empresa.",
      },
      { property: "og:url", content: "https://fibertech3.lovable.app/planos" },
    ],
    links: [{ rel: "canonical", href: "https://fibertech3.lovable.app/planos" }],
  }),
  component: Planos,
});

const INCLUDED = [
  "Instalação rápida e agendada",
  "Roteador Wi-Fi em comodato",
  "Sem franquia de dados",
  "Suporte técnico especializado",
  "Atendimento via WhatsApp",
  "Portal do Assinante",
];

function Planos() {
  return (
    <>
      <PageHero
        eyebrow="Planos"
        title={
          <>
            Velocidade que <span className="text-gradient">cabe no seu dia</span>
          </>
        }
        text="Planos residenciais e empresariais em fibra óptica pura. O plano PREMIUM de 300 Mega é o mais contratado."
      />

      <section className="pb-4">
        <div className="mx-auto max-w-7xl px-5">
          <PlanCards />
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <div className="glass rounded-4xl p-9">
              <h2 className="text-2xl font-bold">Todos os planos incluem</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {INCLUDED.map((i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-xs text-muted-foreground">
                Valores promocionais sujeitos a análise de viabilidade técnica no endereço de
                instalação. Consulte as condições com nossa equipe comercial.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection title="Contrate agora e conecte-se em poucos dias" />
    </>
  );
}
