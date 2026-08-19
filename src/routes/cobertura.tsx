import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Search, CheckCircle2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { AddressAutocomplete } from "@/components/site/AddressAutocomplete";
import { sendLead } from "@/lib/leads";
import { waLink, WA } from "@/lib/site";
import { formatCEP, lookupCEP, onlyDigits } from "@/lib/validators";

export const Route = createFileRoute("/cobertura")({
  head: () => ({
    meta: [
      { name: "keywords", content: "cobertura de internet, consultar cobertura fibra óptica, internet no meu endereço, viabilidade técnica internet, cobertura Fiber Tech" },
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
      { property: "og:url", content: "https://fibertech3.lovable.app/cobertura" },
    ],
    links: [{ rel: "canonical", href: "https://fibertech3.lovable.app/cobertura" }],
  }),
  component: Cobertura,
});

const INPUT =
  "mt-2 w-full rounded-xl border border-input bg-surface/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40";

function Cobertura() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const ok = await sendLead("Nova consulta de viabilidade — Site Fiber Tech", {
      Nome: nome,
      "Telefone/WhatsApp": telefone,
      CEP: cep,
      "Endereço": endereco,
      "Link do mapa": mapUrl || "não informado",
      Origem: "Formulário de cobertura",
    });
    setSending(false);
    if (ok) {
      toast.success("Consulta enviada!", {
        description: "Nosso time verificará a viabilidade no endereço informado e entrará em contato.",
      });
    } else {
      toast.error("Não conseguimos enviar por e-mail", {
        description: "Use o botão do WhatsApp abaixo para enviar sua consulta.",
      });
    }
  }

  const waConsulta = waLink(
    `Olá, vim do site e gostaria de consultar a viabilidade de instalação.\n\nNome: ${nome || "-"}\nTelefone: ${telefone || "-"}\nCEP: ${cep || "-"}\nEndereço: ${endereco || "-"}${mapUrl ? `\nMapa: ${mapUrl}` : ""}`,
  );

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
            <form className="glass-strong rounded-4xl p-8 sm:p-10" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome" className="text-sm font-medium">
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className={INPUT}
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="text-sm font-medium">
                    Telefone / WhatsApp
                  </label>
                  <input
                    id="telefone"
                    name="telefone"
                    inputMode="tel"
                    required
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(71) 90000-0000"
                    className={INPUT}
                  />
                </div>
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
                    onChange={async (e) => {
                      const formatted = formatCEP(e.target.value);
                      setCep(formatted);
                      if (onlyDigits(formatted).length === 8) {
                        const result = await lookupCEP(formatted);
                        if (result.ok) {
                          const { logradouro, bairro, cidade, uf } = result.address;
                          const full = [logradouro, bairro, cidade, uf].filter(Boolean).join(", ");
                          setEndereco(full);
                          setMapUrl(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(full)}`,
                          );
                          toast.success("Endereço preenchido pelo CEP", {
                            description: full,
                          });
                        } else if (result.reason === "not_found") {
                          toast.error("CEP não encontrado", {
                            description: "Verifique o CEP digitado e tente novamente.",
                          });
                        } else if (result.reason === "unavailable") {
                          toast.error("Serviço de consulta indisponível", {
                            description:
                              "Não foi possível consultar o CEP agora. Preencha o endereço manualmente.",
                          });
                        }
                      }
                    }}
                    placeholder="00000-000"
                    className={INPUT}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="endereco" className="text-sm font-medium">
                    Endereço
                  </label>
                  <AddressAutocomplete
                    value={endereco}
                    onChange={setEndereco}
                    onPlace={(info) => {
                      if (info.cep) setCep(formatCEP(info.cep));
                      setMapUrl(info.mapUrl ?? "");
                    }}
                    required
                    className={INPUT}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                {sending ? "Enviando..." : "Consultar Disponibilidade"}
              </button>
              <a
                href={waConsulta}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Enviar consulta pelo WhatsApp
              </a>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                A consulta será validada por nossa equipe técnica em horário comercial.
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass mt-6 overflow-hidden rounded-3xl">
              {endereco ? (
                <iframe
                  title="Mapa do endereço informado"
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed`}
                />
              ) : (
                <div className="flex items-center justify-center gap-3 p-8 text-sm text-muted-foreground">
                  <MapPin className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                  Digite seu endereço para visualizar o mapa.
                </div>
              )}
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

      <CtaSection
        title="Ainda não temos cobertura no seu endereço?"
        text="Fale com a gente pelo WhatsApp: avisamos assim que a fibra chegar na sua rua."
        whatsappHref={WA.cobertura}
      />
    </>
  );
}
