import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Phone, Mail } from "lucide-react";
import logo from "@/assets/fibertech-logo.png.asset.json";
import { NAV, SITE, WA } from "@/lib/site";

const LEGAL = [
  { to: "/termo-de-responsabilidade", label: "Termo de Responsabilidade" },
  { to: "/politica-de-privacidade", label: "Política de Privacidade" },
  { to: "/lgpd", label: "LGPD" },
  { to: "/perguntas-frequentes", label: "Perguntas Frequentes" },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src={logo.url}
            alt="Logotipo Fiber Tech"
            width={220}
            height={62}
            loading="lazy"
            decoding="async"
            className="h-14 w-auto rounded-lg object-cover"
            style={{ objectFit: "cover", aspectRatio: "3.6 / 1" }}
          />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {SITE.slogan}. Internet 100% fibra óptica com velocidade, estabilidade e suporte
            humanizado para sua casa e sua empresa.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={WA.contato}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Falar no WhatsApp
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" /> {SITE.instagramHandle}
            </a>
          </div>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">Navegação</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
            Institucional
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {LEGAL.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-blue" aria-hidden="true" /> {SITE.phoneDisplay}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-blue" aria-hidden="true" /> {SITE.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Fiber Tech — {SITE.slogan}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
