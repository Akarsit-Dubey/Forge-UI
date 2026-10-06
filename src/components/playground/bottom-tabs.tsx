"use client";

import React, { useState } from "react";
import {
  Code2,
  FileCode2,
  Palette,
  Eye,
  ShieldCheck,
  Check,
  Copy,
  Terminal,
} from "lucide-react";
import { ComponentDefinition, VisualStyles } from "@/registry/schema";
import { usePlaygroundStore, BottomTab } from "@/store/playground-store";
import {
  generateTsxCode,
  generateCssCode,
  generateTailwindClasses,
} from "@/lib/code-generator";
import { MonacoWrapper } from "./monaco-wrapper";
import { copyToClipboard } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BottomTabsProps {
  component: ComponentDefinition;
  props: Record<string, any>;
  visualStyles: VisualStyles;
  onResetProps: () => void;
}

export function BottomTabs({
  component,
  props,
  visualStyles,
  onResetProps,
}: BottomTabsProps) {
  const { activeBottomTab, setActiveBottomTab } = usePlaygroundStore();
  const [copiedTailwind, setCopiedTailwind] = useState(false);

  const tsxCode = generateTsxCode(component, props, visualStyles);
  const cssCode = generateCssCode(component, props, visualStyles);
  const tailwindClasses = generateTailwindClasses(component, props, visualStyles);

  const tabs: { id: BottomTab; label: string; icon: any }[] = [
    { id: "preview", label: "Live Preview", icon: Eye },
    { id: "code", label: "React (TSX)", icon: Code2 },
    { id: "css", label: "CSS Variables", icon: FileCode2 },
    { id: "tailwind", label: "Tailwind Classes", icon: Palette },
    { id: "a11y", label: "Accessibility (WAI-ARIA)", icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col border-t border-border/80 bg-background">
      {/* Tab Navigation Header */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 bg-muted/20">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeBottomTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveBottomTab(tab.id)}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "border-primary text-foreground font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Body */}
      <div className="p-3">
        {activeBottomTab === "code" && (
          <div className="h-[220px]">
            <MonacoWrapper
              code={tsxCode}
              language="typescript"
              onReset={onResetProps}
            />
          </div>
        )}

        {activeBottomTab === "css" && (
          <div className="h-[220px]">
            <MonacoWrapper code={cssCode} language="css" readOnly />
          </div>
        )}

        {activeBottomTab === "tailwind" && (
          <div className="rounded-lg border border-border/80 bg-card p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-semibold text-foreground">Active Tailwind Utility Classes</h5>
                <p className="text-[11px] text-muted-foreground">
                  Compiled class string reflecting current props & visual configuration
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={async () => {
                  const ok = await copyToClipboard(tailwindClasses);
                  if (ok) {
                    setCopiedTailwind(true);
                    setTimeout(() => setCopiedTailwind(false), 2000);
                  }
                }}
              >
                {copiedTailwind ? (
                  <>
                    <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                    <span>Copy Classes</span>
                  </>
                )}
              </Button>
            </div>
            <div className="rounded-md bg-muted/60 p-3 font-mono text-xs text-foreground break-all border border-border/50">
              {tailwindClasses}
            </div>
          </div>
        )}

        {activeBottomTab === "a11y" && (
          <div className="grid md:grid-cols-2 gap-4 rounded-lg border border-border/80 bg-card p-4 text-xs">
            <div className="space-y-2">
              <h5 className="font-semibold text-foreground flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-indigo-500" />
                <span>Keyboard Interactions</span>
              </h5>
              <ul className="space-y-1 text-muted-foreground">
                {component.docs.accessibility.keyboardNav.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-foreground font-mono">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2 border-t md:border-t-0 md:border-l border-border/60 md:pl-4 pt-2 md:pt-0">
              <h5 className="font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>ARIA Guidelines</span>
              </h5>
              <ul className="space-y-1 text-muted-foreground">
                {component.docs.accessibility.ariaNotes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-foreground font-mono">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeBottomTab === "preview" && (
          <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1 py-1">
            <span>
              Live Canvas active above • Inspect dimensions: {component.name}
            </span>
            <span className="font-mono">
              Press 2 for TSX Code, 3 for CSS Variables
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
