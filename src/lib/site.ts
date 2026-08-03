export const SITE = {
  name: "Fiber Tech",
  slogan: "Conectando Você ao Mundo",
  instagram: "https://instagram.com/fibertechba",
  instagramHandle: "@fibertechba",
  phoneDisplay: "(71) 9116-5630",
  whatsapp: "https://wa.me/5571911656300",
  email: "contato@fibertech.com.br",
  address: "Av. Principal, 000 — Centro, Bahia, Brasil",
  hours: "Segunda a sábado, das 08h às 18h",
};

export const NAV = [
  { to: "/", label: "Início" },
  { to: "/planos", label: "Planos" },
  { to: "/servicos", label: "Serviços" },
  { to: "/cobertura", label: "Cobertura" },
  { to: "/sobre-nos", label: "Sobre Nós" },
  { to: "/area-do-assinante", label: "Área do Assinante" },
  { to: "/contato", label: "Contato" },
  { to: "/blog", label: "Blog" },
] as const;

export type Plan = {
  name: string;
  speed: string;
  price: string;
  cents: string;
  badge?: string;
  featured?: boolean;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    name: "START",
    speed: "100 Mega",
    price: "69",
    cents: ",90",
    features: [
      "100% fibra óptica",
      "Wi-Fi de alta performance",
      "Sem franquia de dados",
      "Equipamento em comodato",
      "Suporte técnico especializado",
    ],
  },
  {
    name: "PLUS",
    speed: "200 Mega",
    price: "79",
    cents: ",90",
    features: [
      "100% fibra óptica",
      "Ideal para streaming em HD",
      "Sem franquia de dados",
      "Equipamento em comodato",
      "Instalação rápida",
    ],
  },
  {
    name: "PREMIUM",
    speed: "300 Mega",
    price: "89",
    cents: ",90",
    badge: "Mais Contratado",
    featured: true,
    features: [
      "100% fibra óptica",
      "Baixa latência para jogos",
      "Wi-Fi para toda a casa",
      "Aplicativo de TV incluso",
      "Atendimento prioritário",
    ],
  },
  {
    name: "ULTRA",
    speed: "500 Mega",
    price: "99",
    cents: ",90",
    features: [
      "100% fibra óptica",
      "Perfeito para home office",
      "Múltiplos dispositivos",
      "Aplicativo de TV incluso",
      "Suporte premium",
    ],
  },
];
