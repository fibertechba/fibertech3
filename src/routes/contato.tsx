import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { SITE, WA } from "@/lib/site";
import { sendLead } from "@/lib/leads";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Fale com a Fiber Tech" },
      {
        name: "description",
        content:
          "Entre em contato com a Fiber Tech por WhatsApp, telefone, e-mail ou Instagram e solicite sua instalação de internet fibra óptica.",
      },
      { property: "og:title", content: "Contato — Fiber Tech" },
      {
        property: "og:description",
        content: "Solicite instalação, suporte ou informações sobre nossos planos.",
      },
      { property: "og:url", content: "https://fibertech3.lovable.app/contato" },
    ],
    links: [{ rel: "canonical", href: "https://fibertech3.lovable.app/contato" }],
  }),
  component: Contato,
});

function Contato() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title={
          <>
            Vamos <span className="text-gradient">conversar</span>
          </>
        }
        text="Preencha o formulário ou escolha o canal que preferir. Respondemos em horário comercial."
      />

      <section className="pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form
              className="glass-strong h-full rounded-4xl p-8 sm:p-10"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const fd = new FormData(form);
                const ok = await sendLead("Nova mensagem do site — Fiber Tech", {
                  Nome: String(fd.get("nome") ?? ""),
                  "Telefone/WhatsApp": String(fd.get("telefone") ?? ""),
                  "E-mail": String(fd.get("email") ?? ""),
                  Assunto: String(fd.get("assunto") ?? ""),
                  Mensagem: String(fd.get("mensagem") ?? ""),
                });
                if (ok) {
                  toast.success("Mensagem enviada!", {
                    description: "Nosso time entrará em contato em breve.",
                  });
                  form.reset();
                } else {
                  toast.error("Não conseguimos enviar sua mensagem", {
                    description: "Tente novamente ou fale com a gente pelo WhatsApp.",
                  });
                }
              }}
            >

              <h2 className="text-2xl font-bold">Envie sua mensagem</h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome" className="text-sm font-medium">
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    required
                    className="mt-2 w-full rounded-xl border border-input bg-surface/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
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
                    className="mt-2 w-full rounded-xl border border-input bg-surface/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-xl border border-input bg-surface/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="assunto" className="text-sm font-medium">
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    className="mt-2 w-full rounded-xl border border-input bg-surface/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  >
                    <option>Quero contratar um plano</option>
                    <option>Suporte técnico</option>
                    <option>Financeiro / boletos</option>
                    <option>Outro assunto</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="mensagem" className="text-sm font-medium">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    required
                    className="mt-2 w-full rounded-xl border border-input bg-surface/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-gradient-brand px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]"
              >
                Enviar mensagem
              </button>
            </form>
          </Reveal>

          <div className="grid gap-4 lg:col-span-2">
            <Reveal delay={0.08}>
              <div className="glass rounded-3xl p-7">
                <h2 className="text-lg font-semibold">Canais de atendimento</h2>
                <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                    {SITE.phoneDisplay}
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                    {SITE.email}
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                    {SITE.address}
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                    {SITE.hours}
                  </li>
                </ul>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={WA.contato}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> Falar no WhatsApp
                  </a>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold"
                  >
                    <Instagram className="h-4 w-4" aria-hidden="true" /> {SITE.instagramHandle}
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="glass flex min-h-52 items-center justify-center rounded-3xl p-7 text-center text-sm text-muted-foreground">
                <span>
                  <MapPin className="mx-auto mb-3 h-6 w-6 text-brand-blue" aria-hidden="true" />
                  Mapa do endereço será exibido aqui.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
