"use client";

import React, { useState } from "react";
import {
  Palette,
  Sparkles,
  Check,
  Copy,
  Download,
  RotateCcw,
  Sliders,
  Sun,
  Moon,
  Shield,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  useThemeStore,
  themePresets,
  ThemeColors,
} from "@/store/theme-store";
import {
  generateCssVariablesString,
  designTokensList,
} from "@/lib/theme-generator";
import { copyToClipboard } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ThemesPage() {
  const {
    activePreset,
    setPreset,
    isDarkMode,
    toggleDarkMode,
    radius,
    setRadius,
    updateColorToken,
    resetTheme,
    customLight,
    customDark,
  } = useThemeStore();

  const [activeTab, setActiveTab] = useState<"builder" | "tokens" | "css">("builder");
  const [copiedCss, setCopiedCss] = useState(false);

  const currentPreset = themePresets[activePreset] || themePresets.zinc;
  const effectiveLight: ThemeColors = {
    ...currentPreset.light,
    ...customLight,
  };
  const effectiveDark: ThemeColors = {
    ...currentPreset.dark,
    ...customDark,
  };

  const activeColors = isDarkMode ? effectiveDark : effectiveLight;
  const cssVariables = generateCssVariablesString(
    effectiveLight,
    effectiveDark,
    radius
  );

  const colorFields: { key: keyof ThemeColors; label: string; desc: string }[] = [
    { key: "primary", label: "Primary Color", desc: "Main call-to-action & brand color" },
    { key: "background", label: "Background", desc: "Page and canvas background surface" },
    { key: "foreground", label: "Foreground", desc: "Primary text and icons" },
    { key: "card", label: "Card Surface", desc: "Card and elevated panel background" },
    { key: "muted", label: "Muted Surface", desc: "Subtle buttons and secondary backgrounds" },
    { key: "mutedForeground", label: "Muted Foreground", desc: "Helper text and placeholders" },
    { key: "border", label: "Border", desc: "Lines, dividers and component boundaries" },
    { key: "accent", label: "Accent", desc: "Hover states and active element highlights" },
  ];

  const radiiOptions = [
    { label: "0px", value: "0rem" },
    { label: "4px", value: "0.25rem" },
    { label: "8px", value: "0.5rem" },
    { label: "12px", value: "0.75rem" },
    { label: "16px", value: "1rem" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              Design Token System
            </Badge>
            <span className="text-xs text-muted-foreground">
              Forge Theme Studio
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mt-1">
            Theme Builder & Tokens
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Fine-tune design tokens, preview real-time CSS variable mutations across components,
            and export production ready stylesheets.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            className="h-8 text-xs gap-1.5"
          >
            {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={resetTheme}
            className="h-8 text-xs gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </Button>

          <Button
            size="sm"
            onClick={async () => {
              const ok = await copyToClipboard(cssVariables);
              if (ok) {
                setCopiedCss(true);
                setTimeout(() => setCopiedCss(false), 2000);
              }
            }}
            className="h-8 text-xs gap-1.5"
          >
            {copiedCss ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Copied CSS!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Export CSS</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center border-b border-border/80">
        <button
          onClick={() => setActiveTab("builder")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition-all ${
            activeTab === "builder"
              ? "border-primary text-foreground font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Palette className="h-3.5 w-3.5" />
          <span>Theme Builder</span>
        </button>
        <button
          onClick={() => setActiveTab("tokens")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition-all ${
            activeTab === "tokens"
              ? "border-primary text-foreground font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sliders className="h-3.5 w-3.5" />
          <span>Design Token Inspector</span>
        </button>
        <button
          onClick={() => setActiveTab("css")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition-all ${
            activeTab === "css"
              ? "border-primary text-foreground font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Copy className="h-3.5 w-3.5" />
          <span>CSS Variables Output</span>
        </button>
      </div>

      {/* Tab: Theme Builder */}
      {activeTab === "builder" && (
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Preset Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                Base Color Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.keys(themePresets).map((presetKey) => {
                  const preset = themePresets[presetKey];
                  const isSelected = activePreset === presetKey;

                  return (
                    <button
                      key={presetKey}
                      onClick={() => setPreset(presetKey)}
                      className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? "border-primary bg-accent/60 shadow-xs"
                          : "border-border/60 hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="h-3 w-3 rounded-full border border-black/20"
                          style={{
                            backgroundColor: `hsl(${preset.light.primary})`,
                          }}
                        />
                        <span className="font-semibold text-xs text-foreground">
                          {preset.label}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground line-clamp-1">
                        {presetKey}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Corner Radius Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">
                  Corner Radius (--radius)
                </label>
                <span className="font-mono text-xs text-muted-foreground">
                  {radius}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {radiiOptions.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setRadius(r.value)}
                    className={`rounded-md border py-1.5 text-xs font-medium transition-all ${
                      radius === r.value
                        ? "border-primary bg-primary text-primary-foreground font-semibold"
                        : "border-border/60 hover:bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Tokens Editor */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground">
                Token Color Overrides ({isDarkMode ? "Dark Mode" : "Light Mode"})
              </label>
              <div className="divide-y divide-border/60 rounded-xl border border-border/80 bg-card p-3">
                {colorFields.map((field) => (
                  <div
                    key={field.key}
                    className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-medium text-foreground">
                        {field.label}
                      </span>
                      <p className="text-[10px] text-muted-foreground">
                        {field.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-5 w-5 rounded border border-border/80 shadow-xs"
                        style={{
                          backgroundColor: `hsl(${activeColors[field.key]})`,
                        }}
                      />
                      <input
                        type="text"
                        value={activeColors[field.key] || ""}
                        onChange={(e) =>
                          updateColorToken(
                            isDarkMode ? "dark" : "light",
                            field.key,
                            e.target.value
                          )
                        }
                        className="h-7 w-28 rounded bg-muted/40 px-2 font-mono text-[11px] border border-border/80 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">
                Live Theme Component Preview
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                Preset: {currentPreset.label} • Mode: {isDarkMode ? "Dark" : "Light"}
              </span>
            </div>

            <div
              className={`rounded-2xl border border-border p-6 space-y-6 shadow-sm ${
                isDarkMode ? "bg-zinc-950 text-zinc-50" : "bg-white text-zinc-950"
              }`}
            >
              {/* Sample Card */}
              <div
                className="rounded-lg border p-5 shadow-sm space-y-4"
                style={{
                  backgroundColor: `hsl(${activeColors.card})`,
                  borderColor: `hsl(${activeColors.border})`,
                  borderRadius: radius,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm">Deployment Dashboard</h3>
                    <p
                      className="text-xs"
                      style={{ color: `hsl(${activeColors.mutedForeground})` }}
                    >
                      Instant preview reacting to theme token modifications.
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    style={{
                      borderColor: `hsl(${activeColors.border})`,
                      borderRadius: radius,
                    }}
                  >
                    Active Token
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="p-3 rounded border text-xs"
                    style={{
                      backgroundColor: `hsl(${activeColors.muted})`,
                      borderColor: `hsl(${activeColors.border})`,
                      borderRadius: radius,
                    }}
                  >
                    <span
                      className="text-[10px] uppercase font-mono"
                      style={{ color: `hsl(${activeColors.mutedForeground})` }}
                    >
                      Primary Metric
                    </span>
                    <p className="text-lg font-bold font-mono">99.98%</p>
                  </div>
                  <div
                    className="p-3 rounded border text-xs"
                    style={{
                      backgroundColor: `hsl(${activeColors.muted})`,
                      borderColor: `hsl(${activeColors.border})`,
                      borderRadius: radius,
                    }}
                  >
                    <span
                      className="text-[10px] uppercase font-mono"
                      style={{ color: `hsl(${activeColors.mutedForeground})` }}
                    >
                      Response Time
                    </span>
                    <p className="text-lg font-bold font-mono">24ms</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: `hsl(${activeColors.primary})`,
                      color: `hsl(${activeColors.primaryForeground})`,
                      borderRadius: radius,
                    }}
                  >
                    Primary Button
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{
                      borderColor: `hsl(${activeColors.border})`,
                      borderRadius: radius,
                    }}
                  >
                    Secondary Action
                  </Button>
                </div>
              </div>

              {/* Sample Form Elements */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Text Field</label>
                  <Input
                    defaultValue="hello@forge-ui.dev"
                    style={{ borderRadius: radius }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Notification Switch</label>
                  <div
                    className="flex items-center justify-between p-2 rounded border"
                    style={{
                      borderColor: `hsl(${activeColors.border})`,
                      borderRadius: radius,
                    }}
                  >
                    <span className="text-xs">Push alerts</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Token Inspector */}
      {activeTab === "tokens" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border/80 bg-card overflow-hidden">
            <div className="border-b border-border/80 bg-muted/40 px-4 py-3">
              <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                Full Design Token Registry
              </h3>
            </div>
            <div className="divide-y divide-border/60 text-xs">
              {designTokensList.map((token, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {token.previewType === "color" && (
                      <span
                        className="h-6 w-6 rounded-md border border-border/80 shadow-xs"
                        style={{ backgroundColor: token.value }}
                      />
                    )}
                    {token.previewType === "radius" && (
                      <span
                        className="h-6 w-6 border-2 border-primary bg-primary/20"
                        style={{ borderRadius: token.value }}
                      />
                    )}
                    {token.previewType === "box" && (
                      <span className="h-6 w-6 rounded bg-muted border border-border flex items-center justify-center font-mono text-[10px]">
                        ■
                      </span>
                    )}
                    {token.previewType === "text" && (
                      <span className="font-serif font-bold text-sm">Aa</span>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {token.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[9px] font-mono py-0"
                        >
                          {token.category}
                        </Badge>
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {token.variable}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {token.value}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => copyToClipboard(token.value)}
                      title="Copy token value"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: CSS Output */}
      {activeTab === "css" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Paste this into your global styles or globals.css
            </span>
            <Button
              size="sm"
              onClick={async () => {
                const ok = await copyToClipboard(cssVariables);
                if (ok) {
                  setCopiedCss(true);
                  setTimeout(() => setCopiedCss(false), 2000);
                }
              }}
              className="h-7 text-xs gap-1.5"
            >
              {copiedCss ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedCss ? "Copied!" : "Copy Stylesheet"}</span>
            </Button>
          </div>

          <pre className="rounded-xl border border-border/80 bg-zinc-950 p-4 font-mono text-xs text-zinc-100 overflow-x-auto">
            {cssVariables}
          </pre>
        </div>
      )}
    </div>
  );
}
