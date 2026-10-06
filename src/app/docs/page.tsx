import React from "react";
import Link from "next/link";
import { allComponents, categories } from "@/registry";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Terminal, Sparkles, Sliders, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-12">
      {/* Intro */}
      <div className="space-y-3">
        <Badge variant="outline" className="font-mono text-xs">
          Documentation & Reference
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Forge UI Design System
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          A high-performance design system and component playground built for modern React and Next.js applications. Accessible, fully customizable, and developer-centric.
        </p>
      </div>

      {/* Quick Setup / Installation */}
      <div className="space-y-4 rounded-xl border border-border/80 bg-card p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Quick Setup</h2>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Install the Forge UI primitives into your Next.js App Router project using our CLI or individual packages.
        </p>
        <div className="rounded-lg bg-zinc-950 p-3.5 font-mono text-xs text-zinc-100 flex items-center justify-between border border-border/40">
          <code>npx forge-ui@latest init</code>
        </div>
      </div>

      {/* Architectural Principles */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-border/80 bg-card p-5 space-y-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="font-semibold text-sm">Copy & Paste Ownership</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            You own the component code. It lives in your repository, zero lock-in, and customizable to your exact needs.
          </p>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-5 space-y-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h3 className="font-semibold text-sm">WAI-ARIA Accessibility</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All interactive overlays, selects, menus, and form inputs meet strict WCAG AA accessibility criteria.
          </p>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-5 space-y-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
            <Sliders className="h-4 w-4" />
          </div>
          <h3 className="font-semibold text-sm">Design Tokens & Themes</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Powered by CSS variables and Tailwind utility classes for instant runtime theme switching and token customization.
          </p>
        </div>
      </div>

      {/* Component Index by Category */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-foreground">Component Directory</h2>

        <div className="space-y-6">
          {categories.map((cat) => {
            const comps = allComponents.filter((c) => c.category === cat);
            if (comps.length === 0) return null;

            return (
              <div key={cat} className="space-y-3">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  {cat} ({comps.length})
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {comps.map((comp) => (
                    <Link
                      key={comp.id}
                      href={`/docs/${comp.id}`}
                      className="group flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card hover:border-primary/50 hover:bg-accent/40 transition-all text-xs"
                    >
                      <div>
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {comp.name}
                        </span>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                          {comp.description}
                        </p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
