import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";

const FAQ = [
  {
    q: "O que é internet 100% fibra óptica?",
    a: "É uma conexão em que a fibra chega até a sua casa (FTTH), sem trechos de cabo metálico. Isso garante mais velocidade, menor latência e muito mais estabilidade.",
  },
  {
    q: "Quanto tempo leva para instalar?",
    a: "Após a confirmação de viabilidade técnica no seu endereço, a instalação normalmente é agendada em poucos dias úteis.",
  },
  {
    q: "Os planos têm franquia de dados?",
    a: "Não. Todos os planos Fiber Tech são sem franquia: você navega à vontade, sem redução de velocidade por consumo.",
  },
  {
    q: "O roteador é meu?",
    a: "O equipamento é cedido em regime de comodato durante a vigência do contrato, sem custo adicional de aluguel.",
  },
  {
    q: "Como emito a segunda via do boleto?",
    a: "Pela Área do Assinante ou falando com nosso atendimento pelo WhatsApp, que envia o boleto ou o PIX na hora.",
  },
  {
    q: "Posso mudar de plano depois?",
    a: "Sim. É possível alterar o plano conforme a disponibilidade técnica do endereço. Fale com nosso time comercial.",
  },
  {
    q: "Como funciona o Aplicativo de TV?",
    a: "Nos planos elegíveis você recebe o acesso ao Aplicativo de TV e pode assistir na TV, celular ou tablet.",
  },
  {
    q: "Qual é o horário do suporte técnico?",
    a: "Nosso atendimento funciona de segunda a sábado, das 08h às 18h, com monitoramento da rede 24 horas por dia.",
  },
];

export const Route = createFileRoute("/perguntas-frequentes")({
  head: () => ({
    meta: [
      { title: "Perguntas Frequentes — Fiber Tech" },
      {
        name: "description",
        content:
          "Tire suas dúvidas sobre planos, instalação, franquia de dados, equipamentos, boletos e suporte técnico da Fiber Tech.",
      },
      { property: "og:title", content: "Perguntas Frequentes — Fiber Tech" },
      {
        property: "og:description",
        content: "Respostas rápidas sobre planos, instalação, faturas e suporte.",
      },
      { property: "og:url", content: "https://fibertech3.lovable.app/perguntas-frequentes" },
    ],
    links: [{ rel: "canonical", href: "https://fibertech3.lovable.app/perguntas-frequentes" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  const [query, setQuery] = useState("");
  const items = FAQ.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHero
        eyebrow="Perguntas Frequentes"
        title={
          <>
            Suas dúvidas, <span className="text-gradient">respondidas</span>
          </>
        }
        text="Não encontrou o que procurava? Nosso time responde rapidinho pelo WhatsApp."
      />

      <section className="pb-8">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <div className="glass flex items-center gap-3 rounded-full px-5 py-3.5">
              <Search className="h-4 w-4 text-brand-blue" aria-hidden="true" />
              <label htmlFor="faq-search" className="sr-only">
                Buscar nas perguntas frequentes
              </label>
              <input
                id="faq-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar uma dúvida..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="mt-8 space-y-3">
              {items.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="glass rounded-2xl border-none px-6"
                >
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {items.length === 0 && (
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Nenhuma pergunta encontrada para “{query}”.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <CtaSection title="Ficou com alguma dúvida?" text="Fale com nosso time e receba atendimento humanizado agora mesmo." />
    </>
  );
}
