"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sliders,
  Layers,
  Palette,
  BookOpen,
  ArrowRight,
  Sparkles,
  Command,
  CheckCircle2,
  Terminal,
  Code2,
  Star,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { allComponents } from "@/registry";
import { usePlaygroundStore } from "@/store/playground-store";
import { useThemeStore } from "@/store/theme-store";
import { copyToClipboard } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const { selectComponent, recentlyViewed } = usePlaygroundStore();
  const { isDarkMode } = useThemeStore();
  const [copiedCli, setCopiedCli] = useState(false);

  // Quick interactive states on hero
  const [heroButtonVariant, setHeroButtonVariant] = useState<"default" | "secondary" | "outline" | "destructive">("default");
  const [heroSwitchChecked, setHeroSwitchChecked] = useState(true);

  const featuredComponents = allComponents.slice(0, 6);

  const handleOpenComponent = (id: string) => {
    selectComponent(id);
    router.push("/playground");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/80 bg-background/50 px-4 py-16 sm:px-6 lg:py-24">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-6xl space-y-12">
          {/* Main Title & CTA */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-xs text-foreground shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span className="font-semibold">Forge UI 1.0</span>
              <span className="text-muted-foreground">• Interactive Design System Playground</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Build, customize and ship <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                production interfaces.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              An interactive design system playground inspired by shadcn/ui, Figma, and modern developer tools.
              Browse primitives, tweak props live, inspect design tokens, and generate clean TypeScript code.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link href="/playground">
                <Button size="lg" className="h-10 px-5 text-xs font-semibold gap-2 shadow-md">
                  <Sliders className="h-4 w-4" />
                  <span>Open Playground</span>
                </Button>
              </Link>
              <Link href="/components">
                <Button variant="outline" size="lg" className="h-10 px-5 text-xs font-semibold gap-2">
                  <Layers className="h-4 w-4" />
                  <span>Explore 27 Components</span>
                </Button>
              </Link>
              <Link href="/themes">
                <Button variant="ghost" size="lg" className="h-10 px-4 text-xs font-semibold gap-1.5 text-muted-foreground hover:text-foreground">
                  <Palette className="h-4 w-4" />
                  <span>Theme Studio</span>
                </Button>
              </Link>
            </div>

            {/* Quick CLI command */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-zinc-950 px-3.5 py-1.5 font-mono text-xs text-zinc-100 shadow-sm">
                <Terminal className="h-3.5 w-3.5 text-zinc-400" />
                <span>npx forge-ui init</span>
                <button
                  onClick={async () => {
                    const ok = await copyToClipboard("npx forge-ui init");
                    if (ok) {
                      setCopiedCli(true);
                      setTimeout(() => setCopiedCli(false), 2000);
                    }
                  }}
                  className="ml-2 text-zinc-400 hover:text-white"
                >
                  {copiedCli ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Live Playground Showcase Card */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="font-mono text-xs font-semibold ml-2 text-foreground">
                  Interactive Live Preview Sandbox
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-mono">
                  React 18 + Radix UI + Tailwind
                </Badge>
              </div>
            </div>

            {/* Interactive Workbench */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Left: Live Interactive Components */}
              <div className="space-y-4 rounded-xl border border-border/60 bg-muted/20 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">Live Component</span>
                  <div className="flex gap-1">
                    {(["default", "secondary", "outline", "destructive"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setHeroButtonVariant(v)}
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono transition-all ${
                          heroButtonVariant === v
                            ? "bg-foreground text-background font-bold"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center p-6 bg-background rounded-lg border border-border/50">
                  <Button variant={heroButtonVariant} size="default">
                    Interactive Button Action
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background">
                  <div className="space-y-0.5">
                    <span className="text-xs font-medium">Auto-sync Code</span>
                    <p className="text-[11px] text-muted-foreground">Real-time TypeScript generation</p>
                  </div>
                  <Switch checked={heroSwitchChecked} onCheckedChange={setHeroSwitchChecked} />
                </div>
              </div>

              {/* Right: Live Generated Code Preview */}
              <div className="rounded-xl border border-border/60 bg-zinc-950 p-4 font-mono text-xs text-zinc-100 space-y-2 overflow-x-auto">
                <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-2 border-b border-zinc-800">
                  <span>generated-code.tsx</span>
                  <span className="text-emerald-400">● Live Synced</span>
                </div>
                <pre className="text-[11px] text-zinc-300 leading-relaxed py-2">
{`import { Button } from "@/components/ui/button";

export function Action() {
  return (
    <Button variant="${heroButtonVariant}">
      Interactive Button Action
    </Button>
  );
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Components Showcase */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Badge variant="outline" className="font-mono text-xs mb-2">
              Component Primitives
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Featured UI Primitives
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Select any component to customize props, styles, and generate ready-to-use React code.
            </p>
          </div>
          <Link href="/components">
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
              <span>View All 27 Components</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredComponents.map((component) => (
            <div
              key={component.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card hover:border-primary/50 transition-all hover:shadow-md cursor-pointer"
              onClick={() => handleOpenComponent(component.id)}
            >
              <div className="relative flex h-40 w-full items-center justify-center bg-dots-pattern p-4 border-b border-border/60">
                <div className="pointer-events-none scale-90 group-hover:scale-100 transition-transform">
                  <component.component
                    props={component.defaultProps}
                    visualStyles={{}}
                  />
                </div>
                <Badge
                  variant="outline"
                  className="absolute left-3 top-3 text-[10px] font-mono bg-background/80 backdrop-blur"
                >
                  {component.category}
                </Badge>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {component.name}
                    </h3>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {component.props.length} props
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {component.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs text-muted-foreground">
                  <span>Open in Playground</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design System Workflow: Browse -> Customize -> Preview -> Inspect -> Generate Code -> Copy */}
      <section className="border-t border-border/80 bg-muted/10 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Engineered for Developer Velocity
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              A frictionless workflow designed from the ground up for frontend engineers and design system teams.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {[
              { step: "01", title: "Browse", desc: "27 primitives across forms, overlays & navigation" },
              { step: "02", title: "Customize", desc: "Interactive prop controls & visual style editor" },
              { step: "03", title: "Preview", desc: "Responsive viewports, device frames & zoom" },
              { step: "04", title: "Inspect", desc: "Dimensions, ARIA guidelines & DOM box models" },
              { step: "05", title: "Generate", desc: "Compiled TypeScript TSX, CSS & Tailwind classes" },
              { step: "06", title: "Copy", desc: "One-click copy straight into your Next.js project" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border/80 bg-card p-4 space-y-2 hover:border-primary/50 transition-colors"
              >
                <span className="font-mono text-xs font-bold text-primary">
                  {item.step}
                </span>
                <h4 className="font-semibold text-xs text-foreground">
                  {item.title}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
