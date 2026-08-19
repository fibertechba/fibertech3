import { createFileRoute } from "@tanstack/react-router";
import { Wifi, Wrench, LayoutDashboard, Tv, Receipt, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Fiber Tech" },
      {
        name: "description",
        content:
          "Internet fibra, suporte técnico, Portal do Assinante, Aplicativo de TV, segunda via de boletos e atendimento via WhatsApp com a Fiber Tech.",
      },
      { property: "og:title", content: "Serviços — Fiber Tech" },
      {
        property: "og:description",
        content: "Conheça todos os serviços Fiber Tech para sua casa e sua empresa.",
      },
      { property: "og:url", content: "https://fibertech3.lovable.app/servicos" },
    ],
    links: [{ rel: "canonical", href: "https://fibertech3.lovable.app/servicos" }],
  }),
  component: Servicos,
});

const SERVICES = [
  {
    icon: Wifi,
    title: "Internet Fibra",
    text: "Conexão 100% fibra óptica com velocidade real, baixa latência e estabilidade para residências e empresas.",
  },
  {
    icon: Wrench,
    title: "Suporte Técnico",
    text: "Diagnóstico remoto imediato e visitas técnicas agendadas com profissionais certificados.",
  },
  {
    icon: LayoutDashboard,
    title: "Portal do Assinante",
    text: "Acompanhe faturas, contratos, consumo e solicitações em um painel simples e seguro.",
  },
  {
    icon: Tv,
    title: "Aplicativo de TV",
    text: "Assista aos seus conteúdos favoritos na TV, no celular ou no tablet, onde estiver.",
  },
  {
    icon: Receipt,
    title: "Segunda Via de Boletos",
    text: "Emita a segunda via, copie o código de barras e pague com PIX em poucos segundos.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento via WhatsApp",
    text: "Fale com nosso time por mensagem e resolva tudo sem sair de casa.",
  },
];

function Servicos() {
  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title={
          <>
            Serviços feitos para <span className="text-gradient">simplificar</span> sua vida
          </>
        }
        text="Da instalação ao suporte do dia a dia, a Fiber Tech acompanha você em cada etapa."
      />

      <section className="pb-8">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <article className="glass flex h-full flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1.5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                  <s.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-lg font-semibold">{s.title}</h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection title="Solicitar instalação agora" />
    </>
  );
}
