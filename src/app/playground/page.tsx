"use client";

import React, { useState, useEffect } from "react";
import { getComponent, allComponents } from "@/registry";
import { usePlaygroundStore } from "@/store/playground-store";
import { ComponentSidebar } from "@/components/playground/component-sidebar";
import { ViewportToolbar } from "@/components/playground/viewport-toolbar";
import { CanvasPreview } from "@/components/playground/canvas-preview";
import { PropsEditor } from "@/components/playground/props-editor";
import { VisualStylesEditor } from "@/components/playground/visual-styles-editor";
import { ExamplesPicker } from "@/components/playground/examples-picker";
import { BottomTabs } from "@/components/playground/bottom-tabs";
import { Sliders, Palette, Sparkles, PanelLeftClose, PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlaygroundPage() {
  const {
    selectedComponentId,
    selectComponent,
    componentProps,
    setProp,
    setProps,
    resetProps,
    visualStyles,
    setVisualStyles,
    resetVisualStyles,
    setActiveBottomTab,
  } = usePlaygroundStore();

  const [rightPanelTab, setRightPanelTab] = useState<"props" | "styles" | "presets">("props");
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);

  const activeComponent = getComponent(selectedComponentId) || allComponents[0];
  const activeProps = componentProps[activeComponent.id] || activeComponent.defaultProps;

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "1") {
        setActiveBottomTab("preview");
      } else if (e.key === "2") {
        setActiveBottomTab("code");
      } else if (e.key === "3") {
        setActiveBottomTab("css");
      } else if (e.key.toLowerCase() === "r" && !e.metaKey && !e.ctrlKey) {
        resetProps(activeComponent.id, activeComponent.defaultProps);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeComponent, resetProps, setActiveBottomTab]);

  return (
    <div className="flex h-[calc(100vh-3rem)] w-full flex-col overflow-hidden bg-background">
      {/* Top Viewport & Tooling Toolbar */}
      <div className="flex items-center justify-between border-b border-border/80">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowLeftSidebar(!showLeftSidebar)}
            className="ml-2 h-7 w-7 text-muted-foreground hover:text-foreground"
            title={showLeftSidebar ? "Hide components sidebar" : "Show components sidebar"}
          >
            <PanelLeftClose className={`h-4 w-4 transition-transform ${!showLeftSidebar ? "rotate-180" : ""}`} />
          </Button>
        </div>

        <div className="flex-1">
          <ViewportToolbar />
        </div>

        <div className="flex items-center mr-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowRightPanel(!showRightPanel)}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            title={showRightPanel ? "Hide properties panel" : "Show properties panel"}
          >
            <PanelRightClose className={`h-4 w-4 transition-transform ${!showRightPanel ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Components List Sidebar */}
        {showLeftSidebar && (
          <div className="hidden md:block">
            <ComponentSidebar
              onSelectComponent={(id) => {
                selectComponent(id);
              }}
            />
          </div>
        )}

        {/* Center: Live Canvas Preview + Bottom Inspection Panel */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Canvas Render Area */}
          <CanvasPreview
            component={activeComponent}
            props={activeProps}
            visualStyles={visualStyles}
          />

          {/* Bottom Tabs (Preview, Monaco Code, CSS Variables, Tailwind, Accessibility) */}
          <BottomTabs
            component={activeComponent}
            props={activeProps}
            visualStyles={visualStyles}
            onResetProps={() => resetProps(activeComponent.id, activeComponent.defaultProps)}
          />
        </main>

        {/* Right: Properties, Visual Styles, and Preset Variations Panel */}
        {showRightPanel && (
          <aside className="w-80 border-l border-border/80 bg-background/50 flex flex-col h-full overflow-hidden text-xs">
            {/* Panel Tabs Header */}
            <div className="grid grid-cols-3 border-b border-border/60 p-1 bg-muted/30">
              <button
                onClick={() => setRightPanelTab("props")}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-all ${
                  rightPanelTab === "props"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>Props</span>
              </button>
              <button
                onClick={() => setRightPanelTab("styles")}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-all ${
                  rightPanelTab === "styles"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Palette className="h-3.5 w-3.5" />
                <span>Styles</span>
              </button>
              <button
                onClick={() => setRightPanelTab("presets")}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-all ${
                  rightPanelTab === "presets"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Presets</span>
              </button>
            </div>

            {/* Panel Content Body */}
            <div className="flex-1 overflow-y-auto p-3">
              {rightPanelTab === "props" && (
                <PropsEditor
                  component={activeComponent}
                  props={activeProps}
                  onPropChange={(name, val) => setProp(name, val)}
                  onReset={() => resetProps(activeComponent.id, activeComponent.defaultProps)}
                />
              )}

              {rightPanelTab === "styles" && (
                <VisualStylesEditor
                  styles={visualStyles}
                  onChange={(st) => setVisualStyles(st)}
                  onReset={resetVisualStyles}
                />
              )}

              {rightPanelTab === "presets" && (
                <ExamplesPicker
                  examples={activeComponent.examples}
                  onSelectExample={(example) => {
                    setProps(example.props);
                    if (example.visualStyles) {
                      setVisualStyles(example.visualStyles);
                    }
                  }}
                />
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
