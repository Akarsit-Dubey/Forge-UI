"use client";

import React from "react";
import {
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sun,
  Moon,
  Inspect,
  SmartphoneNfc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlaygroundStore, ViewportMode } from "@/store/playground-store";

export function ViewportToolbar() {
  const {
    viewport,
    setViewport,
    customViewportWidth,
    setCustomViewportWidth,
    canvasZoom,
    setCanvasZoom,
    showDeviceFrame,
    toggleDeviceFrame,
    canvasTheme,
    setCanvasTheme,
    inspectMode,
    toggleInspectMode,
    resetProps,
    selectedComponentId,
  } = usePlaygroundStore();

  const viewports: { mode: ViewportMode; label: string; icon: any; width?: number }[] = [
    { mode: "desktop", label: "Desktop (100%)", icon: Monitor },
    { mode: "laptop", label: "Laptop (1024px)", icon: Laptop, width: 1024 },
    { mode: "tablet", label: "Tablet (768px)", icon: Tablet, width: 768 },
    { mode: "mobile", label: "Mobile (375px)", icon: Smartphone, width: 375 },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/80 bg-background/80 px-4 py-2 text-xs">
      {/* Viewport Selectors */}
      <div className="flex items-center gap-1 bg-muted/40 p-0.5 rounded-lg border border-border/60">
        {viewports.map((vp) => {
          const Icon = vp.icon;
          const isActive = viewport === vp.mode;
          return (
            <button
              key={vp.mode}
              onClick={() => {
                setViewport(vp.mode);
                if (vp.width) setCustomViewportWidth(vp.width);
              }}
              title={vp.label}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {vp.mode.charAt(0).toUpperCase() + vp.mode.slice(1)}
              </span>
            </button>
          );
        })}

        {/* Custom Width Input */}
        <div className="flex items-center gap-1 pl-1 pr-1 border-l border-border/60 ml-0.5">
          <input
            type="number"
            value={viewport === "desktop" ? "" : customViewportWidth}
            placeholder={viewport === "desktop" ? "100%" : "px"}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val)) {
                setCustomViewportWidth(val);
                setViewport("custom");
              }
            }}
            className="h-6 w-14 rounded bg-background px-1.5 text-center font-mono text-[11px] border border-border/80 focus:outline-none focus:ring-1 focus:ring-ring"
            title="Custom viewport width in pixels"
          />
          <span className="text-[10px] text-muted-foreground">px</span>
        </div>
      </div>

      {/* Frame, Zoom & Mode Controls */}
      <div className="flex items-center gap-1">
        {/* Device Frame Toggle */}
        <Button
          variant={showDeviceFrame ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={toggleDeviceFrame}
          title={showDeviceFrame ? "Hide device bezel" : "Show device bezel"}
          className={showDeviceFrame ? "border border-border" : ""}
        >
          <SmartphoneNfc className="h-3.5 w-3.5" />
        </Button>

        {/* Inspect Mode Toggle */}
        <Button
          variant={inspectMode ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={toggleInspectMode}
          title="Toggle Inspect Overlay (Bounding Box & Dimensions)"
          className={inspectMode ? "border border-border text-indigo-500" : ""}
        >
          <Inspect className="h-3.5 w-3.5" />
        </Button>

        {/* Canvas Theme Toggle */}
        <div className="flex items-center rounded-md border border-border/60 bg-muted/30 p-0.5">
          <button
            onClick={() => setCanvasTheme("light")}
            className={`px-1.5 py-0.5 rounded text-[11px] ${
              canvasTheme === "light" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
            }`}
            title="Light Canvas"
          >
            <Sun className="h-3 w-3" />
          </button>
          <button
            onClick={() => setCanvasTheme("system")}
            className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
              canvasTheme === "system" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
            }`}
            title="Auto Theme"
          >
            Auto
          </button>
          <button
            onClick={() => setCanvasTheme("dark")}
            className={`px-1.5 py-0.5 rounded text-[11px] ${
              canvasTheme === "dark" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
            }`}
            title="Dark Canvas"
          >
            <Moon className="h-3 w-3" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="hidden md:flex items-center gap-0.5 border border-border/60 bg-muted/30 rounded-md p-0.5">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCanvasZoom(Math.max(50, canvasZoom - 25))}
            disabled={canvasZoom <= 50}
            className="h-6 w-6"
            title="Zoom Out"
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          <span className="font-mono text-[10px] w-8 text-center text-muted-foreground">
            {canvasZoom}%
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCanvasZoom(Math.min(150, canvasZoom + 25))}
            disabled={canvasZoom >= 150}
            className="h-6 w-6"
            title="Zoom In"
          >
            <ZoomIn className="h-3 w-3" />
          </Button>
        </div>

        {/* Reset Button */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => resetProps(selectedComponentId)}
          title="Reset Props to Defaults (R)"
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
