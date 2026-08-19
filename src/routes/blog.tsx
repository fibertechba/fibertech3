import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { name: "keywords", content: "blog de internet, dicas de wi-fi, velocidade de internet, fibra óptica dicas, Fiber Tech blog" },
      { title: "Blog — Dicas de Internet e Tecnologia | Fiber Tech" },
      {
        name: "description",
        content:
          "Artigos da Fiber Tech sobre internet, tecnologia, fibra óptica, segurança digital, promoções e dicas para melhorar seu Wi-Fi.",
      },
      { property: "og:title", content: "Blog — Fiber Tech" },
      {
        property: "og:description",
        content: "Conteúdos sobre internet, tecnologia, fibra óptica e segurança digital.",
      },
      { property: "og:url", content: "https://fibertech3.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://fibertech3.lovable.app/blog" }],
  }),
  component: Blog,
});

const CATEGORIES = [
  "Todos",
  "Internet",
  "Tecnologia",
  "Promoções",
  "Dicas",
  "Fibra Óptica",
  "Segurança Digital",
];

const POSTS = [
  {
    category: "Fibra Óptica",
    title: "Como funciona a internet 100% fibra óptica",
    excerpt:
      "Entenda a diferença entre fibra e cabo de cobre e por que a fibra entrega mais velocidade e estabilidade.",
    date: "12 de junho de 2026",
  },
  {
    category: "Dicas",
    title: "7 dicas para melhorar o sinal do seu Wi-Fi em casa",
    excerpt:
      "Posicionamento do roteador, interferências e configurações simples que aumentam a qualidade da conexão.",
    date: "28 de maio de 2026",
  },
  {
    category: "Internet",
    title: "Quantos Mega eu preciso para minha casa?",
    excerpt:
      "Um guia prático para escolher o plano ideal conforme o número de dispositivos e o uso da família.",
    date: "15 de maio de 2026",
  },
  {
    category: "Segurança Digital",
    title: "Como proteger sua rede doméstica de invasores",
    excerpt: "Senhas fortes, atualização de firmware e boas práticas para navegar com segurança.",
    date: "02 de maio de 2026",
  },
  {
    category: "Tecnologia",
    title: "Baixa latência: por que ela importa para jogos online",
    excerpt: "O ping explica muito mais sobre sua experiência do que a velocidade de download.",
    date: "20 de abril de 2026",
  },
  {
    category: "Promoções",
    title: "Plano PREMIUM 300 Mega: o mais contratado da Fiber Tech",
    excerpt: "Descubra por que o plano de 300 Mega é a escolha favorita dos nossos clientes.",
    date: "05 de abril de 2026",
  },
];

function Blog() {
  const [active, setActive] = useState("Todos");
  const posts = active === "Todos" ? POSTS : POSTS.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Conteúdo sobre <span className="text-gradient">internet e tecnologia</span>
          </>
        }
        text="Dicas, novidades e guias produzidos pelo time técnico da Fiber Tech."
      />

      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={
                  active === c
                    ? "rounded-full bg-gradient-brand px-5 py-2 text-xs font-semibold text-primary-foreground"
                    : "rounded-full border border-border px-5 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
                }
              >
                {c}
              </button>
            ))}
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <article className="glass flex h-full flex-col rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">
                    {p.category}
                  </p>
                  <h2 className="mt-4 text-lg font-semibold leading-snug">{p.title}</h2>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-6 text-xs text-muted-foreground">{p.date}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link
              to="/contato"
              className="inline-flex rounded-full border border-border px-7 py-3.5 text-sm font-semibold hover:bg-secondary"
            >
              Sugerir um tema para o blog
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
