"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  Sliders,
  Palette,
  Layers,
  BookOpen,
  Settings,
  Sun,
  Moon,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { allComponents } from "@/registry";
import { usePlaygroundStore } from "@/store/playground-store";
import { useThemeStore, themePresets } from "@/store/theme-store";
import { useSettingsStore } from "@/store/settings-store";

export function CommandPalette() {
  const router = useRouter();
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useSettingsStore();
  const { selectComponent, resetProps } = usePlaygroundStore();
  const { isDarkMode, toggleDarkMode, setPreset } = useThemeStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const handleSelectComponent = (id: string) => {
    selectComponent(id);
    router.push("/playground");
    setCommandPaletteOpen(false);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close */}
      <div
        className="fixed inset-0 -z-10"
        onClick={() => setCommandPaletteOpen(false)}
      />

      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl animate-scale-in">
        <Command
          className="flex h-full w-full flex-col overflow-hidden"
          filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1;
            return 0;
          }}
        >
          {/* Search Input */}
          <div className="flex items-center border-b border-border/80 px-3.5">
            <Search className="mr-2.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input
              autoFocus
              placeholder="Search components, actions, themes, or docs..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-xs outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <kbd className="inline-flex h-5 select-none items-center rounded border border-border bg-muted/60 px-1.5 font-mono text-[10px] text-muted-foreground">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <Command.List className="max-h-[340px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-xs text-muted-foreground">
              No matching results found.
            </Command.Empty>

            {/* Quick Navigation */}
            <Command.Group heading="Navigation" className="px-1 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase">
              <Command.Item
                onSelect={() => handleNavigate("/components")}
                className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-foreground hover:bg-accent aria-selected:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Component Gallery</span>
                </div>
                <ArrowRight className="h-3 w-3 opacity-40" />
              </Command.Item>
              <Command.Item
                onSelect={() => handleNavigate("/playground")}
                className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-foreground hover:bg-accent aria-selected:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Sliders className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Interactive Playground</span>
                </div>
                <ArrowRight className="h-3 w-3 opacity-40" />
              </Command.Item>
              <Command.Item
                onSelect={() => handleNavigate("/themes")}
                className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-foreground hover:bg-accent aria-selected:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Palette className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Theme Builder & Tokens</span>
                </div>
                <ArrowRight className="h-3 w-3 opacity-40" />
              </Command.Item>
              <Command.Item
                onSelect={() => handleNavigate("/docs")}
                className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-foreground hover:bg-accent aria-selected:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Documentation</span>
                </div>
                <ArrowRight className="h-3 w-3 opacity-40" />
              </Command.Item>
            </Command.Group>

            {/* Components */}
            <Command.Group heading="Components" className="px-1 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase">
              {allComponents.map((component) => (
                <Command.Item
                  key={component.id}
                  value={`${component.name} ${component.description} ${component.category}`}
                  onSelect={() => handleSelectComponent(component.id)}
                  className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-foreground hover:bg-accent aria-selected:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{component.name}</span>
                    <span className="text-[10px] text-muted-foreground">({component.category})</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">Open in Playground</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Quick Actions */}
            <Command.Group heading="Actions & Themes" className="px-1 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase">
              <Command.Item
                onSelect={() => {
                  toggleDarkMode();
                  setCommandPaletteOpen(false);
                }}
                className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-foreground hover:bg-accent aria-selected:bg-accent"
              >
                <div className="flex items-center gap-2">
                  {isDarkMode ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5 text-indigo-400" />}
                  <span>Toggle Dark / Light Mode</span>
                </div>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  resetProps();
                  setCommandPaletteOpen(false);
                }}
                className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-foreground hover:bg-accent aria-selected:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Reset Playground Props</span>
                </div>
              </Command.Item>
              {Object.keys(themePresets).map((presetKey) => (
                <Command.Item
                  key={presetKey}
                  value={`Theme preset ${presetKey}`}
                  onSelect={() => {
                    setPreset(presetKey);
                    setCommandPaletteOpen(false);
                  }}
                  className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-foreground hover:bg-accent aria-selected:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 opacity-60" />
                    <span>Apply Theme Preset: {themePresets[presetKey].label}</span>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          {/* Footer note */}
          <div className="flex items-center justify-between border-t border-border/80 px-3 py-2 text-[10px] text-muted-foreground bg-muted/20">
            <span>Use ↑ ↓ to navigate, ↵ to select</span>
            <span>Forge UI Quick Launcher</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
