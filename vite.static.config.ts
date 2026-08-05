// Static build config for shared hosting (cPanel / HostGator).
// Generates a fully pre-rendered site (index.html + one folder per page)
// that can be uploaded straight into public_html.
//
// Usage:  npm run build:static
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const ROUTES = [
  "/",
  "/planos",
  "/servicos",
  "/cobertura",
  "/sobre-nos",
  "/contato",
  "/formulario",
  "/blog",
  "/perguntas-frequentes",
  "/area-do-assinante",
  "/lgpd",
  "/politica-de-privacidade",
  "/termo-de-responsabilidade",
];

export default defineConfig({
  nitro: false,
  tanstackStart: {
    prerender: {
      enabled: true,
      crawlLinks: true,
      filter: ({ path }: { path: string }) => !path.startsWith("/api"),
    },
    pages: ROUTES.map((path) => ({ path, prerender: { enabled: true } })),
  },
});
