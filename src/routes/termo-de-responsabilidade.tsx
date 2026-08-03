import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Sections";

export const Route = createFileRoute("/termo-de-responsabilidade")({
  head: () => ({
    meta: [
      { title: "Termo de Responsabilidade — Fiber Tech" },
      {
        name: "description",
        content:
          "Termo de Responsabilidade da Fiber Tech sobre uso do serviço de internet, equipamentos em comodato, instalação e obrigações do assinante.",
      },
      { property: "og:title", content: "Termo de Responsabilidade — Fiber Tech" },
      {
        property: "og:description",
        content: "Condições de uso do serviço, equipamentos e responsabilidades do assinante.",
      },
      { property: "og:url", content: "/termo-de-responsabilidade" },
    ],
    links: [{ rel: "canonical", href: "/termo-de-responsabilidade" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Institucional"
      title="Termo de Responsabilidade"
      intro="Este documento reúne as condições gerais de uso do serviço de internet da Fiber Tech e as responsabilidades das partes."
      sections={[
        {
          heading: "1. Objeto",
          body: [
            "Este termo estabelece as condições de utilização do serviço de acesso à internet em fibra óptica fornecido pela Fiber Tech ao assinante, bem como dos equipamentos cedidos em comodato.",
          ],
        },
        {
          heading: "2. Instalação e viabilidade técnica",
          body: [
            "A contratação está condicionada à viabilidade técnica no endereço informado. A instalação é realizada por técnicos autorizados, em data previamente agendada com o assinante.",
            "O assinante deve garantir o acesso ao local e as condições mínimas de infraestrutura necessárias à instalação.",
          ],
        },
        {
          heading: "3. Equipamentos em comodato",
          body: [
            "Os equipamentos fornecidos permanecem de propriedade da Fiber Tech e são cedidos em comodato durante a vigência do contrato.",
            "O assinante é responsável pela guarda e conservação dos equipamentos, respondendo por danos decorrentes de mau uso, violação, furto ou extravio.",
          ],
        },
        {
          heading: "4. Uso do serviço",
          body: [
            "O serviço deve ser utilizado de forma lícita. É vedada a revenda, o compartilhamento comercial não autorizado e qualquer utilização que viole a legislação vigente ou os direitos de terceiros.",
          ],
        },
        {
          heading: "5. Velocidade e disponibilidade",
          body: [
            "As velocidades contratadas referem-se à capacidade máxima do plano. Fatores como equipamentos do cliente, cabeamento interno, interferências e uso simultâneo podem influenciar o desempenho percebido.",
            "A Fiber Tech realiza manutenções programadas e emergenciais, comunicando o assinante sempre que possível.",
          ],
        },
        {
          heading: "6. Suporte técnico",
          body: [
            "O suporte é prestado nos canais oficiais de atendimento, em horário comercial, com monitoramento da rede em regime contínuo.",
          ],
        },
        {
          heading: "7. Faturamento e inadimplência",
          body: [
            "O pagamento deve ser realizado até a data de vencimento informada na fatura. O atraso pode ocasionar suspensão do serviço, conforme regulamentação aplicável.",
          ],
        },
        {
          heading: "8. Vigência e rescisão",
          body: [
            "A vigência, prazos e condições de rescisão constam no contrato firmado entre as partes. Na rescisão, os equipamentos em comodato devem ser devolvidos em boas condições de uso.",
          ],
        },
        {
          heading: "9. Disposições finais",
          body: [
            "Este termo pode ser atualizado a qualquer momento para adequação legal ou operacional. A versão vigente estará sempre disponível neste site.",
            "Dúvidas sobre este documento podem ser encaminhadas aos nossos canais oficiais de atendimento.",
          ],
        },
      ]}
    />
  ),
});
