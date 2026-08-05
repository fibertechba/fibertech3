import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, MessageCircle, Send, Wifi } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { sendLead } from "@/lib/leads";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/formulario")({
  head: () => ({
    meta: [
      { title: "Formulário de Cadastro — Fiber Tech" },
      {
        name: "description",
        content:
          "Preencha o formulário de cadastro da Fiber Tech com seus dados, data de vencimento e configuração do Wi-Fi para agendar sua instalação.",
      },
      { property: "og:title", content: "Formulário de Cadastro — Fiber Tech" },
      {
        property: "og:description",
        content: "Envie seus dados e a configuração do seu Wi-Fi para iniciarmos sua instalação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/formulario" },
    ],
    links: [{ rel: "canonical", href: "/formulario" }],
  }),
  component: Formulario,
});

const field =
  "mt-2 w-full rounded-xl border border-input bg-surface/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40";

function Formulario() {
  const [senha, setSenha] = useState("");
  const [enviando, setEnviando] = useState(false);
  const senhaCurta = senha.length > 0 && senha.length < 8;

  return (
    <>
      <PageHero
        eyebrow="Formulário"
        title={
          <>
            Cadastro do <span className="text-gradient">novo cliente</span>
          </>
        }
        text="Preencha seus dados e a configuração desejada do Wi-Fi. Nossa equipe entrará em contato para agendar a instalação."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <form
              className="glass-strong rounded-4xl p-8 sm:p-10"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const fd = new FormData(form);
                const wifiSenha = String(fd.get("wifiSenha") ?? "");
                if (wifiSenha.length < 8) {
                  toast.error("Senha do Wi-Fi muito curta", {
                    description: "A senha deve ter no mínimo 8 caracteres.",
                  });
                  return;
                }
                setEnviando(true);
                const ok = await sendLead("Novo cadastro do site — Fiber Tech", {
                  Nome: String(fd.get("nome") ?? ""),
                  CPF: String(fd.get("cpf") ?? ""),
                  "Data de Nascimento": String(fd.get("nascimento") ?? ""),
                  "E-mail": String(fd.get("email") ?? ""),
                  CEP: String(fd.get("cep") ?? ""),
                  "Número da Residência": String(fd.get("numero") ?? ""),
                  "Data de Vencimento": String(fd.get("vencimento") ?? ""),
                  "Número do Celular": String(fd.get("celular") ?? ""),
                  "Wi-Fi — Nome da Rede": String(fd.get("wifiNome") ?? ""),
                  "Wi-Fi — Senha": wifiSenha,
                });
                setEnviando(false);
                if (ok) {
                  toast.success("Cadastro enviado!", {
                    description: "Recebemos seus dados e entraremos em contato em breve.",
                  });
                  form.reset();
                  setSenha("");
                } else {
                  toast.error("Não conseguimos enviar seu cadastro", {
                    description: "Tente novamente ou fale com a gente pelo WhatsApp.",
                  });
                }
              }}
            >
              <h2 className="text-2xl font-bold">Dados do cliente</h2>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="nome" className="text-sm font-medium">
                    Nome completo
                  </label>
                  <input id="nome" name="nome" required maxLength={120} className={field} />
                </div>
                <div>
                  <label htmlFor="cpf" className="text-sm font-medium">
                    CPF
                  </label>
                  <input
                    id="cpf"
                    name="cpf"
                    inputMode="numeric"
                    required
                    maxLength={14}
                    placeholder="000.000.000-00"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="nascimento" className="text-sm font-medium">
                    Data de Nascimento
                  </label>
                  <input id="nascimento" name="nascimento" type="date" required className={field} />
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
                    maxLength={255}
                    className={field}
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
                    maxLength={9}
                    placeholder="00000-000"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="numero" className="text-sm font-medium">
                    Número da Residência
                  </label>
                  <input
                    id="numero"
                    name="numero"
                    required
                    maxLength={10}
                    placeholder="Ex.: 123"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="vencimento" className="text-sm font-medium">
                    Data de Vencimento
                  </label>
                  <select id="vencimento" name="vencimento" required defaultValue="" className={field}>
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="Dia 5">Dia 5</option>
                    <option value="Dia 10">Dia 10</option>
                    <option value="Dia 15">Dia 15</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="celular" className="text-sm font-medium">
                    Número do celular
                  </label>
                  <input
                    id="celular"
                    name="celular"
                    inputMode="tel"
                    required
                    maxLength={20}
                    placeholder="(71) 90000-0000"
                    className={field}
                  />
                </div>
              </div>

              <h2 className="mt-10 flex items-center gap-2 text-2xl font-bold">
                <Wifi className="h-5 w-5 text-primary" aria-hidden="true" />
                Configuração do Wi-Fi
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="wifiNome" className="text-sm font-medium">
                    Nome da Rede
                  </label>
                  <input
                    id="wifiNome"
                    name="wifiNome"
                    required
                    maxLength={32}
                    placeholder="Ex.: Casa da Ana"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="wifiSenha" className="text-sm font-medium">
                    Senha
                  </label>
                  <input
                    id="wifiSenha"
                    name="wifiSenha"
                    type="text"
                    required
                    minLength={8}
                    maxLength={63}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Mínimo de 8 caracteres"
                    aria-describedby="senha-aviso"
                    className={field}
                  />
                  {senhaCurta && (
                    <p className="mt-1.5 text-xs text-destructive">
                      A senha precisa ter pelo menos 8 caracteres.
                    </p>
                  )}
                </div>
              </div>

              <div
                id="senha-aviso"
                className="glass mt-6 flex items-start gap-3 rounded-2xl p-5 text-sm text-muted-foreground"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Atenção:</strong> a senha do Wi-Fi deve possuir
                  no mínimo 8 caracteres — podem ser letras, números ou caracteres especiais (ou
                  todos juntos).
                </span>
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {enviando ? "Enviando..." : "Enviar cadastro"}
              </button>

              <a
                href={waLink(
                  "Olá, vim do site da Fiber Tech e gostaria de enviar meus dados de cadastro para instalação.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Prefiro enviar pelo WhatsApp
              </a>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
