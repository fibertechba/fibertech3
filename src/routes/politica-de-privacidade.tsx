import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Sections";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Fiber Tech" },
      {
        name: "description",
        content:
          "Saiba como a Fiber Tech coleta, utiliza, armazena e protege os dados pessoais dos seus clientes e visitantes.",
      },
      { property: "og:title", content: "Política de Privacidade — Fiber Tech" },
      {
        property: "og:description",
        content: "Como tratamos e protegemos os seus dados pessoais.",
      },
      { property: "og:url", content: "https://fibertech3.lovable.app/politica-de-privacidade" },
    ],
    links: [{ rel: "canonical", href: "https://fibertech3.lovable.app/politica-de-privacidade" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Institucional"
      title="Política de Privacidade"
      intro="A Fiber Tech valoriza a sua privacidade. Esta política explica de forma transparente como tratamos os dados pessoais de clientes e visitantes."
      sections={[
        {
          heading: "1. Dados que coletamos",
          body: [
            "Coletamos dados fornecidos por você, como nome, CPF/CNPJ, endereço de instalação, telefone e e-mail, necessários à contratação e à prestação do serviço.",
            "Também podemos coletar dados técnicos de conexão e de navegação neste site, como endereço IP e informações de dispositivo.",
          ],
        },
        {
          heading: "2. Finalidades do tratamento",
          body: [
            "Utilizamos os dados para viabilidade técnica, instalação, faturamento, suporte, comunicação de manutenções, melhoria dos serviços e cumprimento de obrigações legais e regulatórias.",
          ],
        },
        {
          heading: "3. Compartilhamento",
          body: [
            "Não vendemos dados pessoais. O compartilhamento ocorre apenas com parceiros operacionais estritamente necessários (por exemplo, meios de pagamento) ou por determinação legal.",
          ],
        },
        {
          heading: "4. Armazenamento e segurança",
          body: [
            "Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados, perda ou alteração indevida. Os dados são mantidos pelo período necessário às finalidades informadas ou exigido por lei.",
          ],
        },
        {
          heading: "5. Cookies",
          body: [
            "Este site pode utilizar cookies e tecnologias similares para melhorar a experiência de navegação e mensurar o desempenho das páginas. Você pode gerenciar cookies nas configurações do seu navegador.",
          ],
        },
        {
          heading: "6. Seus direitos",
          body: [
            "Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade ou eliminação dos seus dados, conforme a legislação aplicável.",
          ],
        },
        {
          heading: "7. Contato",
          body: [
            "Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato pelos nossos canais oficiais de atendimento.",
          ],
        },
      ]}
    />
  ),
});
