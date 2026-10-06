"use client";

import React, { useRef, useState, useEffect } from "react";
import { ComponentDefinition, VisualStyles } from "@/registry/schema";
import { usePlaygroundStore } from "@/store/playground-store";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";
import { Layers } from "lucide-react";

interface CanvasPreviewProps {
  component: ComponentDefinition;
  props: Record<string, any>;
  visualStyles: VisualStyles;
}

export function CanvasPreview({
  component,
  props,
  visualStyles,
}: CanvasPreviewProps) {
  const {
    viewport,
    customViewportWidth,
    canvasZoom,
    showDeviceFrame,
    canvasTheme,
    inspectMode,
  } = usePlaygroundStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
  }, [props, visualStyles, viewport, customViewportWidth, canvasZoom, component]);

  // Determine viewport width style
  const getViewportWidth = (): string => {
    switch (viewport) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      case "laptop":
        return "1024px";
      case "custom":
        return `${customViewportWidth}px`;
      case "desktop":
      default:
        return "100%";
    }
  };

  // Determine canvas theme class
  const getThemeClass = (): string => {
    if (canvasTheme === "light") return "light bg-white text-zinc-950";
    if (canvasTheme === "dark") return "dark bg-zinc-950 text-zinc-50";
    return "";
  };

  const isFrameActive = showDeviceFrame || viewport === "mobile";

  return (
    <div
      ref={containerRef}
      className={`relative flex-1 overflow-auto bg-dots-pattern p-6 flex items-center justify-center transition-colors min-h-[360px] ${getThemeClass()}`}
    >
      {/* Viewport Boundary Container */}
      <div
        style={{
          width: getViewportWidth(),
          maxWidth: "100%",
          transform: `scale(${canvasZoom / 100})`,
          transformOrigin: "center center",
          transition: "width 250ms ease, transform 150ms ease",
        }}
        className={`relative flex items-center justify-center ${
          isFrameActive
            ? "rounded-[36px] border-[8px] border-zinc-800 bg-background/95 p-8 shadow-2xl ring-1 ring-border/50"
            : "w-full"
        }`}
      >
        {/* Device Camera Notch / Speaker Bar for mobile frame */}
        {isFrameActive && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 h-3.5 w-24 bg-zinc-800 rounded-full flex items-center justify-center">
            <div className="h-1 w-8 bg-zinc-700 rounded-full" />
          </div>
        )}

        {/* The Live Rendered Component */}
        <div
          ref={elementRef}
          className={`relative transition-all ${
            inspectMode
              ? "outline-2 outline-dashed outline-indigo-500/70 outline-offset-4"
              : ""
          }`}
        >
          {/* Inspect Mode Badge */}
          {inspectMode && (
            <div className="absolute -top-7 left-0 flex items-center gap-1.5 rounded bg-indigo-600 px-2 py-0.5 text-[10px] font-mono text-white shadow-md z-20">
              <Layers className="h-3 w-3" />
              <span>{component.name}</span>
              <span className="opacity-75">
                {dimensions.width} × {dimensions.height}px
              </span>
            </div>
          )}

          {/* Component Render */}
          <component.component props={props} visualStyles={visualStyles} />
        </div>
      </div>
    </div>
  );
}
