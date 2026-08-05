import { Check, Zap } from "lucide-react";
import { PLANS, WA } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";


export function PlanCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {PLANS.map((plan, i) => (
        <Reveal key={plan.name} delay={i * 0.08}>
          <article
            className={cn(
              "relative flex h-full flex-col rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2",
              plan.featured
                ? "glass-strong border-primary/40 shadow-glow lg:scale-[1.04]"
                : "glass hover:shadow-elegant",
            )}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-brand px-4 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground">
                {plan.badge}
              </span>
            )}
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">
              {plan.name}
            </p>
            <p className="mt-3 flex items-center gap-2 text-2xl font-bold">
              <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
              {plan.speed}
            </p>
            <p className="mt-6 flex items-end gap-1">
              <span className="text-sm text-muted-foreground">R$</span>
              <span className="text-5xl font-bold leading-none text-gradient">{plan.price}</span>
              <span className="text-xl font-bold text-gradient">{plan.cents}</span>
              <span className="ml-1 text-sm text-muted-foreground">/mês</span>
            </p>
            <ul className="mt-7 flex-1 space-y-3 text-sm text-muted-foreground">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={WA.plano(plan.name, plan.speed)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.03]",
                plan.featured
                  ? "bg-gradient-brand text-primary-foreground shadow-glow"
                  : "border border-border text-foreground hover:bg-secondary",
              )}
            >
              Contratar Agora
            </a>

          </article>
        </Reveal>
      ))}
    </div>
  );
}
