import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Zap,
  Gauge,
  Infinity as InfinityIcon,
  Router,
  Wrench,
  Headphones,
  HeartHandshake,
  Rocket,
  Cable,
  MessageCircle,
  MapPin,
  Wifi,
  Tv,
  Receipt,
  LayoutDashboard,
} from "lucide-react";
import { PlanCards } from "@/components/site/PlanCards";
import { CtaSection } from "@/components/site/CtaSection";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/Sections";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fiber Tech — Internet Fibra Óptica de Alta Velocidade" },
      {
        name: "description",
        content:
          "Internet 100% fibra óptica da Fiber Tech: planos de 100 a 500 Mega, sem franquia, instalação rápida e suporte especializado. Consulte a cobertura.",
      },
      { property: "og:title", content: "Fiber Tech — Internet Fibra Óptica de Alta Velocidade" },
      {
        property: "og:description",
        content:
          "Conectando sua casa e empresa com velocidade, estabilidade e suporte especializado.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const BENEFITS = [
  { icon: Cable, title: "100% Fibra Óptica", text: "Rede de ponta a ponta em fibra, sem cabos de cobre." },
  { icon: Zap, title: "Alta Velocidade", text: "Planos de 100 a 500 Mega para toda a família." },
  { icon: Gauge, title: "Baixa Latência", text: "Jogos online e videochamadas sem travar." },
  { icon: InfinityIcon, title: "Sem Franquia", text: "Navegue à vontade, sem limite de dados." },
  { icon: Router, title: "Equipamentos Modernos", text: "Roteadores Wi-Fi de última geração." },
  { icon: HeartHandshake, title: "Equipamentos em Comodato", text: "Você usa sem pagar nada a mais." },
  { icon: Rocket, title: "Instalação Rápida", text: "Agendamento ágil e técnicos certificados." },
  { icon: Wrench, title: "Suporte Especializado", text: "Time técnico próprio, pronto para resolver." },
  { icon: Headphones, title: "Atendimento Humanizado", text: "Gente de verdade te atendendo sempre." },
];

const SERVICES = [
  { icon: Wifi, title: "Internet Fibra", text: "Conexão estável para residências e empresas." },
  { icon: Wrench, title: "Suporte Técnico", text: "Atendimento remoto e visitas técnicas." },
  { icon: LayoutDashboard, title: "Portal do Assinante", text: "Gerencie seu plano em poucos cliques." },
  { icon: Tv, title: "Aplicativo de TV", text: "Canais e conteúdos direto na sua tela." },
  { icon: Receipt, title: "Segunda Via de Boletos", text: "Emita seu boleto quando precisar." },
  { icon: MessageCircle, title: "Atendimento via WhatsApp", text: "Fale com a gente pelo seu celular." },
];

function Home() {
  return (
    <>
      <section className="relative flex min-h-dvh items-center overflow-hidden">
        <div className="aurora" aria-hidden="true" />
        <div className="fiber-lines" aria-hidden="true" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute h-1.5 w-1.5 rounded-full bg-primary/70"
            style={{ left: `${8 + i * 16}%`, top: `${20 + ((i * 13) % 60)}%` }}
            animate={{ y: [0, -40, 0], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <div className="relative mx-auto w-full max-w-6xl px-5 py-32 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue"
          >
            {SITE.slogan}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            Internet <span className="text-gradient">Fibra Óptica</span> de Alta Velocidade
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            Conectando sua casa e empresa com velocidade, estabilidade e suporte especializado.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <Link
              to="/planos"
              className="rounded-full bg-gradient-brand px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              Ver Planos
            </Link>
            <Link
              to="/cobertura"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" /> Consultar Cobertura
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Falar no WhatsApp
            </a>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
            {[
              { k: "500 Mega", v: "Velocidade máxima" },
              { k: "Zero", v: "Franquia de dados" },
              { k: "24/7", v: "Monitoramento da rede" },
            ].map((s, i) => (
              <Reveal key={s.k} delay={0.4 + i * 0.1}>
                <div className="glass rounded-2xl px-4 py-5">
                  <p className="text-2xl font-bold text-gradient-blue">{s.k}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad relative">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Planos"
            title="Escolha a velocidade ideal para você"
            text="Todos os planos incluem Wi-Fi de alta performance, equipamento em comodato e suporte especializado."
          />
          <div className="mt-14">
            <PlanCards />
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden bg-surface/30">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Benefícios"
            title="Por que escolher a Fiber Tech"
            text="Tecnologia de ponta com atendimento de gente que se importa."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <article className="glass h-full rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                    <b.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Serviços"
            title="Tudo o que você precisa em um só lugar"
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <article className="glass flex h-full flex-col rounded-3xl p-7">
                  <s.icon className="h-7 w-7 text-brand-blue" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              to="/servicos"
              className="inline-flex rounded-full border border-border px-7 py-3.5 text-sm font-semibold hover:bg-secondary"
            >
              Conhecer todos os serviços
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
