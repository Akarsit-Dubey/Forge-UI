"use client";

import React from "react";
import { VisualStyles } from "@/registry/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw } from "lucide-react";

interface VisualStylesEditorProps {
  styles: VisualStyles;
  onChange: (styles: Partial<VisualStyles>) => void;
  onReset: () => void;
}

export function VisualStylesEditor({
  styles,
  onChange,
  onReset,
}: VisualStylesEditorProps) {
  const radii = [
    { label: "None", value: "none" },
    { label: "SM", value: "sm" },
    { label: "MD", value: "md" },
    { label: "LG", value: "lg" },
    { label: "Full", value: "full" },
  ];

  const shadows = [
    { label: "None", value: "none" },
    { label: "SM", value: "sm" },
    { label: "MD", value: "md" },
    { label: "LG", value: "lg" },
  ];

  const weights = [
    { label: "Normal", value: "normal" },
    { label: "Medium", value: "medium" },
    { label: "Semibold", value: "semibold" },
    { label: "Bold", value: "bold" },
  ];

  const fontSizes = [
    { label: "XS", value: "xs" },
    { label: "SM", value: "sm" },
    { label: "Base", value: "base" },
    { label: "LG", value: "lg" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div>
          <h4 className="font-semibold text-foreground">Visual Styles</h4>
          <p className="text-[11px] text-muted-foreground">
            Customize surface, radius and typography
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </Button>
      </div>

      {/* Border Radius */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-muted-foreground">Border Radius</label>
        <div className="grid grid-cols-5 gap-1 rounded-md bg-muted/40 p-1 border border-border/50">
          {radii.map((r) => (
            <button
              key={r.value}
              onClick={() => onChange({ radius: r.value })}
              className={`rounded py-1 text-[11px] font-medium transition-all ${
                styles.radius === r.value
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Box Shadow */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-muted-foreground">Elevation & Shadow</label>
        <div className="grid grid-cols-4 gap-1 rounded-md bg-muted/40 p-1 border border-border/50">
          {shadows.map((s) => (
            <button
              key={s.value}
              onClick={() => onChange({ shadow: s.value })}
              className={`rounded py-1 text-[11px] font-medium transition-all ${
                styles.shadow === s.value
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-3 rounded-lg border border-border/50 p-2.5 bg-card/40">
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-muted-foreground">Font Weight</label>
          <div className="grid grid-cols-4 gap-1">
            {weights.map((w) => (
              <button
                key={w.value}
                onClick={() => onChange({ fontWeight: w.value })}
                className={`rounded border py-1 text-[10px] transition-all ${
                  styles.fontWeight === w.value
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border/60 hover:bg-muted/50 text-muted-foreground"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-muted-foreground">Font Size</label>
          <div className="grid grid-cols-4 gap-1">
            {fontSizes.map((f) => (
              <button
                key={f.value}
                onClick={() => onChange({ fontSize: f.value })}
                className={`rounded border py-1 text-[10px] transition-all ${
                  styles.fontSize === f.value
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border/60 hover:bg-muted/50 text-muted-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Colors Override */}
      <div className="space-y-2.5 rounded-lg border border-border/50 p-2.5 bg-card/40">
        <h5 className="text-[11px] font-semibold text-foreground">Color Overrides</h5>
        
        {/* Background Color */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-[11px]">Background</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={styles.customBg || "#000000"}
              onChange={(e) => onChange({ customBg: e.target.value })}
              className="h-6 w-6 cursor-pointer rounded border border-border bg-transparent p-0"
            />
            {styles.customBg ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-1.5 text-[10px]"
                onClick={() => onChange({ customBg: undefined })}
              >
                Clear
              </Button>
            ) : (
              <span className="text-[10px] text-muted-foreground">Default</span>
            )}
          </div>
        </div>

        {/* Text Color */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-[11px]">Text Color</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={styles.customTextColor || "#ffffff"}
              onChange={(e) => onChange({ customTextColor: e.target.value })}
              className="h-6 w-6 cursor-pointer rounded border border-border bg-transparent p-0"
            />
            {styles.customTextColor ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-1.5 text-[10px]"
                onClick={() => onChange({ customTextColor: undefined })}
              >
                Clear
              </Button>
            ) : (
              <span className="text-[10px] text-muted-foreground">Default</span>
            )}
          </div>
        </div>

        {/* Border Color */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-[11px]">Border Color</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={styles.customBorderColor || "#888888"}
              onChange={(e) => onChange({ customBorderColor: e.target.value })}
              className="h-6 w-6 cursor-pointer rounded border border-border bg-transparent p-0"
            />
            {styles.customBorderColor ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-1.5 text-[10px]"
                onClick={() => onChange({ customBorderColor: undefined })}
              >
                Clear
              </Button>
            ) : (
              <span className="text-[10px] text-muted-foreground">Default</span>
            )}
          </div>
        </div>
      </div>

      {/* Sizing & Width */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-muted-foreground">Width Mode</label>
        <div className="grid grid-cols-2 gap-1 rounded-md bg-muted/40 p-1 border border-border/50">
          <button
            onClick={() => onChange({ width: "auto" })}
            className={`rounded py-1 text-[11px] font-medium transition-all ${
              styles.width !== "full"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Auto Content
          </button>
          <button
            onClick={() => onChange({ width: "full" })}
            className={`rounded py-1 text-[11px] font-medium transition-all ${
              styles.width === "full"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Full Width (100%)
          </button>
        </div>
      </div>
    </div>
  );
}
