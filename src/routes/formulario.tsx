import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, MessageCircle, Send, Wifi } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { sendLead } from "@/lib/leads";
import { PLANS, waLink } from "@/lib/site";
import {
  documentKind,
  formatCEP,
  formatDocument,
  formatPhone,
  isValidDocument,
  lookupCEP,
  onlyDigits,
} from "@/lib/validators";

export const Route = createFileRoute("/formulario")({
  head: () => ({
    meta: [
      { title: "Formulário de Cadastro — Fiber Tech" },
      {
        name: "description",
        content:
          "Preencha o formulário de cadastro da Fiber Tech com seus dados, plano de interesse, endereço e configuração do Wi-Fi para agendar sua instalação.",
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
  const [doc, setDoc] = useState("");
  const [cep, setCep] = useState("");
  const [celular, setCelular] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "ok" | "erro">("idle");
  const [cepErro, setCepErro] = useState<"not_found" | "unavailable" | null>(null);
  const [vencimento, setVencimento] = useState("");
  const [enviando, setEnviando] = useState(false);

  const senhaCurta = senha.length > 0 && senha.length < 8;
  const docDigits = onlyDigits(doc);
  const docKind = documentKind(doc);
  const docInvalido = docDigits.length >= 11 && !isValidDocument(doc);

  async function buscarCep(value: string) {
    if (onlyDigits(value).length !== 8) {
      setCepStatus("idle");
      return;
    }
    setCepStatus("loading");
    const result = await lookupCEP(value);
    if (!result.ok) {
      setCepStatus("erro");
      if (result.reason === "unavailable") {
        toast.error("Serviço de consulta indisponível", {
          description: "Preencha o endereço manualmente e tente novamente mais tarde.",
        });
      }
      return;
    }
    setCepStatus("ok");
    const { logradouro, bairro, cidade, uf } = result.address;
    setLogradouro(logradouro);
    setBairro(bairro);
    setCidade(cidade);
    setUf(uf);
  }

  return (
    <>
      <PageHero
        eyebrow="Formulário"
        title={
          <>
            Cadastro do <span className="text-gradient">novo cliente</span>
          </>
        }
        text="Preencha seus dados, o plano de interesse e a configuração desejada do Wi-Fi. Nossa equipe entrará em contato para agendar a instalação."
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

                if (!isValidDocument(doc)) {
                  toast.error("CPF/CNPJ inválido", {
                    description: "Confira o número digitado — usamos a validação oficial.",
                  });
                  return;
                }
                const wifiSenha = String(fd.get("wifiSenha") ?? "");
                if (wifiSenha.length < 8) {
                  toast.error("Senha do Wi-Fi muito curta", {
                    description: "A senha deve ter no mínimo 8 caracteres.",
                  });
                  return;
                }

                setEnviando(true);
                const venc =
                  vencimento === "Outro"
                    ? `Outro — ${String(fd.get("vencimentoOutro") ?? "")}`
                    : vencimento;
                const ok = await sendLead("Novo cadastro do site — Fiber Tech", {
                  "Plano de interesse": String(fd.get("plano") ?? ""),
                  "Nome Completo / Empresa": String(fd.get("nome") ?? ""),
                  "Tipo de cadastro": docKind === "CNPJ" ? "Pessoa Jurídica" : "Pessoa Física",
                  "CPF / CNPJ": doc,
                  "Data de Nascimento / Fundação": String(fd.get("nascimento") ?? ""),
                  "E-mail": String(fd.get("email") ?? ""),
                  CEP: cep,
                  Endereço: logradouro,
                  "Número da Residência": String(fd.get("numero") ?? ""),
                  Complemento: String(fd.get("complemento") ?? ""),
                  Bairro: bairro,
                  Cidade: cidade,
                  UF: uf,
                  "Ponto de referência": String(fd.get("referencia") ?? ""),
                  "Data de Vencimento": venc,
                  "Número do Celular": celular,
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
                  setDoc("");
                  setCep("");
                  setCelular("");
                  setLogradouro("");
                  setBairro("");
                  setCidade("");
                  setUf("");
                  setVencimento("");
                  setCepStatus("idle");
                } else {
                  toast.error("Não conseguimos enviar seu cadastro", {
                    description: "Tente novamente ou fale com a gente pelo WhatsApp.",
                  });
                }
              }}
            >
              <h2 className="text-2xl font-bold">Plano de interesse</h2>
              <div className="mt-5">
                <label htmlFor="plano" className="text-sm font-medium">
                  Escolha o plano
                </label>
                <select id="plano" name="plano" required defaultValue="" className={field}>
                  <option value="" disabled>
                    Selecione o plano
                  </option>
                  {PLANS.map((p) => (
                    <option key={p.name} value={`${p.name} — ${p.speed} (R$ ${p.price}${p.cents})`}>
                      {p.name} — {p.speed} · R$ {p.price}
                      {p.cents}/mês
                    </option>
                  ))}
                </select>
              </div>

              <h2 className="mt-10 text-2xl font-bold">Dados do cliente</h2>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="nome" className="text-sm font-medium">
                    Nome Completo / Empresa
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    required
                    maxLength={140}
                    placeholder="Pessoa física: nome completo · Empresa: razão social"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="documento" className="text-sm font-medium">
                    CPF / CNPJ
                  </label>
                  <input
                    id="documento"
                    name="documento"
                    inputMode="numeric"
                    required
                    value={doc}
                    onChange={(e) => setDoc(formatDocument(e.target.value))}
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                    aria-invalid={docInvalido}
                    className={field}
                  />
                  {docInvalido ? (
                    <p className="mt-1.5 text-xs text-destructive">
                      Documento inválido. Confira os números digitados.
                    </p>
                  ) : docKind ? (
                    <p className="mt-1.5 text-xs text-primary">
                      {docKind} válido — cadastro como{" "}
                      {docKind === "CNPJ" ? "empresa" : "pessoa física"}.
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="nascimento" className="text-sm font-medium">
                    {docKind === "CNPJ" ? "Data de Fundação" : "Data de Nascimento"}
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
                  <label htmlFor="celular" className="text-sm font-medium">
                    Número do celular
                  </label>
                  <input
                    id="celular"
                    name="celular"
                    inputMode="tel"
                    required
                    value={celular}
                    onChange={(e) => setCelular(formatPhone(e.target.value))}
                    placeholder="(71) 90000-0000"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="vencimento" className="text-sm font-medium">
                    Data de Vencimento
                  </label>
                  <select
                    id="vencimento"
                    name="vencimento"
                    required
                    value={vencimento}
                    onChange={(e) => setVencimento(e.target.value)}
                    className={field}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="Dia 5">Dia 5</option>
                    <option value="Dia 10">Dia 10</option>
                    <option value="Dia 15">Dia 15</option>
                    <option value="Outro">Outro</option>
                  </select>
                  {vencimento === "Outro" && (
                    <input
                      name="vencimentoOutro"
                      required
                      maxLength={40}
                      placeholder="Informe o dia desejado"
                      className={field}
                    />
                  )}
                </div>
              </div>

              <h2 className="mt-10 text-2xl font-bold">Endereço de instalação</h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label htmlFor="cep" className="text-sm font-medium">
                    CEP
                  </label>
                  <input
                    id="cep"
                    name="cep"
                    inputMode="numeric"
                    required
                    value={cep}
                    onChange={(e) => {
                      const v = formatCEP(e.target.value);
                      setCep(v);
                      if (onlyDigits(v).length === 8) void buscarCep(v);
                      else setCepStatus("idle");
                    }}
                    onBlur={(e) => void buscarCep(e.target.value)}
                    placeholder="00000-000"
                    className={field}
                  />
                  {cepStatus === "loading" && (
                    <p className="mt-1.5 text-xs text-muted-foreground">Buscando endereço...</p>
                  )}
                  {cepStatus === "erro" && (
                    <p className="mt-1.5 text-xs text-destructive">
                      CEP não encontrado. Preencha o endereço manualmente.
                    </p>
                  )}
                  {cepStatus === "ok" && (
                    <p className="mt-1.5 text-xs text-primary">Endereço preenchido automaticamente.</p>
                  )}
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="logradouro" className="text-sm font-medium">
                    Endereço (rua/avenida)
                  </label>
                  <input
                    id="logradouro"
                    name="logradouro"
                    required
                    maxLength={160}
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                    placeholder="Ex.: Av. Principal"
                    className={field}
                  />
                </div>
                <div className="sm:col-span-2">
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
                <div className="sm:col-span-4">
                  <label htmlFor="complemento" className="text-sm font-medium">
                    Complemento (opcional)
                  </label>
                  <input
                    id="complemento"
                    name="complemento"
                    maxLength={80}
                    placeholder="Apto, bloco, casa..."
                    className={field}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="bairro" className="text-sm font-medium">
                    Bairro
                  </label>
                  <input
                    id="bairro"
                    name="bairro"
                    required
                    maxLength={80}
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    className={field}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cidade" className="text-sm font-medium">
                    Cidade
                  </label>
                  <input
                    id="cidade"
                    name="cidade"
                    required
                    maxLength={80}
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className={field}
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="uf" className="text-sm font-medium">
                    UF
                  </label>
                  <input
                    id="uf"
                    name="uf"
                    required
                    maxLength={2}
                    value={uf}
                    onChange={(e) => setUf(e.target.value.toUpperCase())}
                    className={field}
                  />
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="referencia" className="text-sm font-medium">
                    Ponto de referência (opcional)
                  </label>
                  <input
                    id="referencia"
                    name="referencia"
                    maxLength={120}
                    placeholder="Ex.: próximo à praça central"
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
