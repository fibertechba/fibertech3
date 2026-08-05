import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "@/assets/fibertech-logo.png.asset.json";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled ? "glass-strong py-2" : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5">
        <Link to="/" className="flex items-center gap-3" aria-label="Fiber Tech — página inicial">
          <img
            src={logo.url}
            alt="Logotipo Fiber Tech"
            width={160}
            height={44}
            className="h-11 w-auto rounded-lg object-cover object-center"
            style={{ objectFit: "cover", aspectRatio: "3.6 / 1" }}
          />
          <span className="sr-only">Fiber Tech — Conectando Você ao Mundo</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WA.contato}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Falar no WhatsApp
          </a>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Navegação móvel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="glass-strong mx-4 mt-3 grid gap-1 rounded-2xl p-3">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={WA.contato}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 rounded-xl bg-gradient-brand px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Falar no WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
