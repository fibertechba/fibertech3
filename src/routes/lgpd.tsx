import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Sections";

export const Route = createFileRoute("/lgpd")({
  head: () => ({
    meta: [
      { title: "LGPD — Proteção de Dados | Fiber Tech" },
      {
        name: "description",
        content:
          "Conheça o compromisso da Fiber Tech com a Lei Geral de Proteção de Dados (LGPD), as bases legais utilizadas e os direitos dos titulares.",
      },
      { property: "og:title", content: "LGPD — Fiber Tech" },
      {
        property: "og:description",
        content: "Nosso compromisso com a Lei Geral de Proteção de Dados.",
      },
      { property: "og:url", content: "https://fibertech3.lovable.app/lgpd" },
    ],
    links: [{ rel: "canonical", href: "https://fibertech3.lovable.app/lgpd" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Institucional"
      title="LGPD"
      intro="A Fiber Tech atua em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais)."
      sections={[
        {
          heading: "1. Nosso compromisso",
          body: [
            "Tratamos dados pessoais com transparência, finalidade legítima, necessidade e segurança, respeitando os princípios previstos na LGPD.",
          ],
        },
        {
          heading: "2. Bases legais",
          body: [
            "O tratamento se apoia principalmente na execução de contrato, no cumprimento de obrigação legal ou regulatória, no legítimo interesse e, quando aplicável, no consentimento do titular.",
          ],
        },
        {
          heading: "3. Direitos do titular",
          body: [
            "Você pode solicitar: confirmação da existência de tratamento; acesso aos dados; correção de dados incompletos ou desatualizados; anonimização, bloqueio ou eliminação; portabilidade; informação sobre compartilhamentos; e revogação do consentimento.",
          ],
        },
        {
          heading: "4. Como exercer seus direitos",
          body: [
            "As solicitações podem ser feitas pelos canais oficiais de atendimento da Fiber Tech. Responderemos dentro dos prazos legais, podendo solicitar informações para confirmar sua identidade.",
          ],
        },
        {
          heading: "5. Segurança da informação",
          body: [
            "Mantemos controles de acesso, registros de operações e boas práticas de segurança para reduzir riscos de incidentes envolvendo dados pessoais.",
          ],
        },
        {
          heading: "6. Incidentes de segurança",
          body: [
            "Na hipótese de incidente relevante, adotaremos as medidas de contenção necessárias e realizaremos as comunicações previstas na legislação.",
          ],
        },
        {
          heading: "7. Encarregado de dados (DPO)",
          body: [
            "O contato do encarregado pelo tratamento de dados pessoais será disponibilizado nesta página e nos nossos canais oficiais de atendimento.",
          ],
        },
      ]}
    />
  ),
});
