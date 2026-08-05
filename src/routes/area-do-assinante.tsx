import { createFileRoute } from "@tanstack/react-router";
import {
  Wallet,
  Receipt,
  History,
  LifeBuoy,
  KeyRound,
  Bot,
  Bell,
  Tv,
  ArrowUpRight,
} from "lucide-react";
import { PageHero } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { SITE, WA } from "@/lib/site";

export const Route = createFileRoute("/area-do-assinante")({
  head: () => ({
    meta: [
      { title: "Área do Assinante — Fiber Tech" },
      {
        name: "description",
        content:
          "Acesse a Área do Assinante Fiber Tech: portal financeiro, segunda via, histórico de pagamentos, suporte, senha do Wi-Fi e Aplicativo de TV.",
      },
      { property: "og:title", content: "Área do Assinante — Fiber Tech" },
      {
        property: "og:description",
        content: "Gerencie seu plano, faturas e suporte em um painel simples e seguro.",
      },
      { property: "og:url", content: "/area-do-assinante" },
    ],
    links: [{ rel: "canonical", href: "/area-do-assinante" }],
  }),
  component: Assinante,
});

const CARDS: {
  icon: typeof Wallet;
  title: string;
  text: string;
  href?: string;
}[] = [
  {
    icon: Wallet,
    title: "Central do Assinante",
    text: "Acesse seu plano, faturas e serviços no portal oficial.",
    href: SITE.centralAssinante,
  },
  {
    icon: Receipt,
    title: "Segunda Via de Boletos",
    text: "Emita o boleto ou PIX da sua fatura atual.",
    href: SITE.segundaVia,
  },
  { icon: History, title: "Histórico de Pagamentos", text: "Acompanhe todos os pagamentos realizados.", href: SITE.centralAssinante },
  { icon: LifeBuoy, title: "Solicitação de Suporte", text: "Abra um atendimento técnico em poucos cliques.", href: WA.suporte },
  { icon: KeyRound, title: "Alteração da Senha Wi-Fi", text: "Troque o nome e a senha da sua rede.", href: WA.suporte },
  { icon: Bot, title: "Assistente Virtual", text: "Resolva dúvidas rápidas a qualquer hora do dia.", href: WA.assinante },
  { icon: Bell, title: "Notificações", text: "Receba avisos de manutenção e novidades.", href: SITE.centralAssinante },
  { icon: Tv, title: "Aplicativo de TV", text: "Gerencie seu acesso ao Aplicativo de TV.", href: WA.assinante },
];


function Assinante() {
  return (
    <>
      <PageHero
        eyebrow="Área do Assinante"
        title={
          <>
            Seu plano sob <span className="text-gradient">controle total</span>
          </>
        }
        text="Um painel premium para cuidar de tudo: faturas, suporte, Wi-Fi e entretenimento."
      />

      <section className="pb-8">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <article className="glass group h-full rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                  <c.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 flex items-center gap-1.5 text-base font-semibold">
                  {c.title}
                  <ArrowUpRight
                    className="h-4 w-4 text-brand-blue opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <div className="glass-strong rounded-4xl p-10">
              <h2 className="text-2xl font-bold">Acessar minha conta</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                O acesso ao portal do assinante estará disponível em breve. Enquanto isso, nosso time
                resolve tudo pelo WhatsApp.
              </p>
              <a
                href={WA.assinante}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex rounded-full bg-gradient-brand px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Falar no WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection title="Ainda não é cliente Fiber Tech?" />
    </>
  );
}
