import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Search, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";

export const Route = createFileRoute("/cobertura")({
  head: () => ({
    meta: [
      { title: "Cobertura — Consulte a disponibilidade | Fiber Tech" },
      {
        name: "description",
        content:
          "Consulte a cobertura da Fiber Tech pelo CEP ou endereço e descubra se a internet fibra óptica já está disponível na sua região.",
      },
      { property: "og:title", content: "Cobertura — Fiber Tech" },
      {
        property: "og:description",
        content: "Verifique a disponibilidade da internet fibra óptica no seu endereço.",
      },
      { property: "og:url", content: "/cobertura" },
    ],
    links: [{ rel: "canonical", href: "/cobertura" }],
  }),
  component: Cobertura,
});

function Cobertura() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");

  return (
    <>
      <PageHero
        eyebrow="Cobertura"
        title={
          <>
            A Fiber Tech já está <span className="text-gradient">perto de você</span>
          </>
        }
        text="Informe seu CEP e endereço para consultarmos a viabilidade técnica de instalação."
      />

      <section className="pb-10">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <form
              className="glass-strong rounded-4xl p-8 sm:p-10"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Consulta enviada!", {
                  description:
                    "Nosso time verificará a viabilidade no endereço informado e entrará em contato.",
                });
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="cep" className="text-sm font-medium">
                    CEP
                  </label>
                  <input
                    id="cep"
                    name="cep"
                    inputMode="numeric"
                    required
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="00000-000"
                    className="mt-2 w-full rounded-xl border border-input bg-surface/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div>
                  <label htmlFor="endereco" className="text-sm font-medium">
                    Endereço
                  </label>
                  <input
                    id="endereco"
                    name="endereco"
                    required
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    placeholder="Rua, número e bairro"
                    className="mt-2 w-full rounded-xl border border-input bg-surface/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]"
              >
                <Search className="h-4 w-4" aria-hidden="true" /> Consultar Disponibilidade
              </button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                A consulta será validada por nossa equipe técnica em horário comercial.
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass mt-6 flex items-center justify-center gap-3 rounded-3xl p-8 text-sm text-muted-foreground">
              <MapPin className="h-5 w-5 text-brand-blue" aria-hidden="true" />
              Mapa de cobertura em breve nesta área.
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Bairros atendidos em expansão", "Viabilidade em até 24h úteis", "Instalação sem taxa surpresa"].map(
                (t) => (
                  <li key={t} className="glass flex items-start gap-2 rounded-2xl p-5 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaSection title="Ainda não temos cobertura no seu endereço?" text="Fale com a gente pelo WhatsApp: avisamos assim que a fibra chegar na sua rua." />
    </>
  );
}
