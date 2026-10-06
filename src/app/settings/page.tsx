"use client";

import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  Monitor,
  Code2,
  Keyboard,
  Shield,
  RotateCcw,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSettingsStore } from "@/store/settings-store";
import { useThemeStore, themePresets } from "@/store/theme-store";

export default function SettingsPage() {
  const {
    editorFontSize,
    setEditorFontSize,
    editorWordWrap,
    setEditorWordWrap,
    editorMinimap,
    setEditorMinimap,
    editorTabSize,
    setEditorTabSize,
    reducedMotion,
    setReducedMotion,
  } = useSettingsStore();

  const { activePreset, setPreset, isDarkMode, toggleDarkMode } = useThemeStore();
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              Preferences
            </Badge>
            <span className="text-xs text-muted-foreground">User Workspace Settings</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mt-1">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your workspace appearance, Monaco editor preferences, and keyboard configurations.
          </p>
        </div>

        <Button
          onClick={handleSave}
          size="sm"
          className="h-8 text-xs gap-1.5"
        >
          {savedFeedback ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Saved!</span>
            </>
          ) : (
            <span>Save Preferences</span>
          )}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="rounded-xl border border-border/80 bg-card p-6 space-y-5">
          <div className="border-b border-border/60 pb-3">
            <h3 className="font-semibold text-sm text-foreground">Appearance</h3>
            <p className="text-xs text-muted-foreground">
              Customize the look and feel of the Forge UI workspace.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Color Mode */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-foreground block">Color Mode</span>
                <span className="text-muted-foreground text-[11px]">
                  Toggle between dark and light themes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={!isDarkMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => isDarkMode && toggleDarkMode()}
                  className="h-7 text-xs gap-1"
                >
                  <Sun className="h-3.5 w-3.5" />
                  <span>Light</span>
                </Button>
                <Button
                  variant={isDarkMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => !isDarkMode && toggleDarkMode()}
                  className="h-7 text-xs gap-1"
                >
                  <Moon className="h-3.5 w-3.5" />
                  <span>Dark</span>
                </Button>
              </div>
            </div>

            {/* Accent Theme Preset */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/40">
              <div>
                <span className="font-medium text-foreground block">Active Theme Preset</span>
                <span className="text-muted-foreground text-[11px]">
                  Select the primary design system palette
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {Object.keys(themePresets).map((presetKey) => (
                  <button
                    key={presetKey}
                    onClick={() => setPreset(presetKey)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      activePreset === presetKey
                        ? "bg-foreground text-background font-semibold"
                        : "bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {themePresets[presetKey].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <div>
                <span className="font-medium text-foreground block">Reduced Motion</span>
                <span className="text-muted-foreground text-[11px]">
                  Disable non-essential animations across transitions
                </span>
              </div>
              <Switch
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
          </div>
        </div>

        {/* Editor Preferences Section */}
        <div className="rounded-xl border border-border/80 bg-card p-6 space-y-5">
          <div className="border-b border-border/60 pb-3">
            <h3 className="font-semibold text-sm text-foreground">Monaco Code Editor</h3>
            <p className="text-xs text-muted-foreground">
              Configure font sizing, word wrapping and layout for the playground code inspector.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Font Size */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-foreground block">Font Size</span>
                <span className="text-muted-foreground text-[11px]">
                  Code editor typography size in pixels
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={11}
                  max={20}
                  value={editorFontSize}
                  onChange={(e) => setEditorFontSize(Number(e.target.value))}
                  className="h-7 w-20 text-center font-mono text-xs"
                />
                <span className="text-muted-foreground text-[11px]">px</span>
              </div>
            </div>

            {/* Word Wrap */}
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <div>
                <span className="font-medium text-foreground block">Word Wrap</span>
                <span className="text-muted-foreground text-[11px]">
                  Soft wrap long JSX and CSS statements
                </span>
              </div>
              <Switch
                checked={editorWordWrap === "on"}
                onCheckedChange={(checked) => setEditorWordWrap(checked ? "on" : "off")}
              />
            </div>

            {/* Minimap */}
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <div>
                <span className="font-medium text-foreground block">Code Minimap</span>
                <span className="text-muted-foreground text-[11px]">
                  Display visual overview map along editor right gutter
                </span>
              </div>
              <Switch
                checked={editorMinimap}
                onCheckedChange={setEditorMinimap}
              />
            </div>

            {/* Tab Size */}
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <div>
                <span className="font-medium text-foreground block">Indentation Tab Size</span>
                <span className="text-muted-foreground text-[11px]">
                  Number of spaces per indentation level
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[2, 4].map((size) => (
                  <button
                    key={size}
                    onClick={() => setEditorTabSize(size)}
                    className={`h-7 px-3 rounded border text-xs font-mono transition-all ${
                      editorTabSize === size
                        ? "border-primary bg-primary text-primary-foreground font-semibold"
                        : "border-border/60 text-muted-foreground hover:bg-muted/40"
                    }`}
                  >
                    {size} spaces
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts Reference */}
        <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4">
          <div className="border-b border-border/60 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-foreground">Keyboard Shortcuts Reference</h3>
              <p className="text-xs text-muted-foreground">
                Work faster using built-in keyboard navigation shortcuts.
              </p>
            </div>
            <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted/60 px-2 font-mono text-[11px] font-medium text-muted-foreground">
              ?
            </kbd>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/40">
              <span className="text-muted-foreground">Command Palette</span>
              <kbd className="font-mono text-[11px] bg-background px-1.5 py-0.5 rounded border">
                ⌘ / Ctrl + K
              </kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/40">
              <span className="text-muted-foreground">Copy Code</span>
              <kbd className="font-mono text-[11px] bg-background px-1.5 py-0.5 rounded border">
                ⌘ / Ctrl + C
              </kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/40">
              <span className="text-muted-foreground">Reset Props</span>
              <kbd className="font-mono text-[11px] bg-background px-1.5 py-0.5 rounded border">
                R
              </kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/40">
              <span className="text-muted-foreground">Switch Preview / Code</span>
              <kbd className="font-mono text-[11px] bg-background px-1.5 py-0.5 rounded border">
                1 / 2 / 3
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
