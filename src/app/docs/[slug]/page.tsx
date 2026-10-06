"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Sliders,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  Code2,
  Table as TableIcon,
} from "lucide-react";
import { getComponent } from "@/registry";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/utils";
import { usePlaygroundStore } from "@/store/playground-store";

export default function ComponentDocPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const component = getComponent(slug);
  const { selectComponent } = usePlaygroundStore();

  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedNpm, setCopiedNpm] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);

  if (!component) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold">Component Not Found</h1>
        <p className="text-muted-foreground text-sm">
          The component &quot;{slug}&quot; could not be found in the registry.
        </p>
        <Link href="/docs">
          <Button variant="outline" size="sm">
            Back to Documentation
          </Button>
        </Link>
      </div>
    );
  }

  const handleOpenPlayground = () => {
    selectComponent(component.id);
    router.push("/playground");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-10">
      {/* Top Breadcrumb and Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/docs"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Back to Documentation</span>
        </Link>

        <Button
          size="sm"
          onClick={handleOpenPlayground}
          className="h-8 text-xs gap-1.5"
        >
          <Sliders className="h-3.5 w-3.5" />
          <span>Open in Playground</span>
        </Button>
      </div>

      {/* Header Info */}
      <div className="space-y-3 border-b border-border/80 pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            {component.category}
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">
            {component.id}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          {component.name}
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          {component.docs.overview}
        </p>
      </div>

      {/* Live Preview Container */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Preview</h2>
        <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-border/80 bg-dots-pattern p-8 shadow-xs">
          <component.component
            props={component.defaultProps}
            visualStyles={{}}
          />
        </div>
      </div>

      {/* Installation */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span>Installation</span>
        </h2>
        <div className="space-y-2">
          {/* CLI */}
          <div className="flex items-center justify-between rounded-lg border border-border/80 bg-zinc-950 px-4 py-2.5 font-mono text-xs text-zinc-100">
            <code>{component.docs.installation.cli}</code>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={async () => {
                const ok = await copyToClipboard(component.docs.installation.cli);
                if (ok) {
                  setCopiedCli(true);
                  setTimeout(() => setCopiedCli(false), 2000);
                }
              }}
              className="text-zinc-400 hover:text-white"
            >
              {copiedCli ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          </div>

          {/* NPM */}
          <div className="flex items-center justify-between rounded-lg border border-border/80 bg-zinc-950 px-4 py-2.5 font-mono text-xs text-zinc-100">
            <code>{component.docs.installation.npm}</code>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={async () => {
                const ok = await copyToClipboard(component.docs.installation.npm);
                if (ok) {
                  setCopiedNpm(true);
                  setTimeout(() => setCopiedNpm(false), 2000);
                }
              }}
              className="text-zinc-400 hover:text-white"
            >
              {copiedNpm ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Usage Code */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <span>Usage</span>
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              const ok = await copyToClipboard(component.docs.usage);
              if (ok) {
                setCopiedUsage(true);
                setTimeout(() => setCopiedUsage(false), 2000);
              }
            }}
            className="h-7 text-xs gap-1"
          >
            {copiedUsage ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            <span>{copiedUsage ? "Copied" : "Copy Code"}</span>
          </Button>
        </div>
        <pre className="rounded-xl border border-border/80 bg-zinc-950 p-4 font-mono text-xs text-zinc-100 overflow-x-auto leading-relaxed">
          {component.docs.usage}
        </pre>
      </div>

      {/* API Reference Table */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <TableIcon className="h-4 w-4 text-primary" />
          <span>API Reference</span>
        </h2>
        <div className="overflow-hidden rounded-xl border border-border/80 bg-card text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
              <tr>
                <th className="py-2.5 px-4">Prop</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4">Default</th>
                <th className="py-2.5 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {component.docs.api.map((item, idx) => (
                <tr key={idx} className="hover:bg-muted/20">
                  <td className="py-2.5 px-4 font-mono font-semibold text-foreground">
                    {item.prop}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-indigo-400">
                    {item.type}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-muted-foreground">
                    {item.defaultValue}
                  </td>
                  <td className="py-2.5 px-4 text-muted-foreground">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility Guidelines */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Accessibility (WAI-ARIA)</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-4 rounded-xl border border-border/80 bg-card p-5 text-xs">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Keyboard Navigation</h3>
            <ul className="space-y-1.5 text-muted-foreground">
              {component.docs.accessibility.keyboardNav.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-foreground font-mono">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 border-t md:border-t-0 md:border-l border-border/60 md:pl-5 pt-3 md:pt-0">
            <h3 className="font-semibold text-foreground">ARIA Attributes</h3>
            <ul className="space-y-1.5 text-muted-foreground">
              {component.docs.accessibility.ariaNotes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-foreground font-mono">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
