import { Link } from "@tanstack/react-router";
import { MessageCircle, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function CtaSection({
  title = "Pronto para se tornar cliente Fiber Tech?",
  text = "Consulte a disponibilidade no seu endereço e solicite sua instalação hoje mesmo.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="aurora" aria-hidden="true" />
      <Reveal className="relative mx-auto max-w-4xl px-5">
        <div className="glass-strong rounded-4xl px-8 py-14 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{text}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/planos"
              className="rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              Contratar Agora
            </Link>
            <Link
              to="/cobertura"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" /> Consultar Cobertura
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
