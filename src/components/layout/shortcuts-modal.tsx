"use client";

import React, { useEffect } from "react";
import { X, Keyboard } from "lucide-react";
import { useSettingsStore } from "@/store/settings-store";

export function ShortcutsModal() {
  const { isShortcutsModalOpen, setShortcutsModalOpen } = useSettingsStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in input or textarea
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setShortcutsModalOpen(!isShortcutsModalOpen);
      }
      if (e.key === "Escape" && isShortcutsModalOpen) {
        setShortcutsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isShortcutsModalOpen, setShortcutsModalOpen]);

  if (!isShortcutsModalOpen) return null;

  const shortcuts = [
    { key: "⌘ / Ctrl + K", description: "Open Command Palette" },
    { key: "⌘ / Ctrl + C", description: "Copy generated code (when focused)" },
    { key: "⌘ / Ctrl + S", description: "Export current theme / tokens" },
    { key: "R", description: "Reset playground component props" },
    { key: "1", description: "Switch to Preview tab" },
    { key: "2", description: "Switch to Code (TSX) tab" },
    { key: "3", description: "Switch to CSS tab" },
    { key: "?", description: "Toggle this Keyboard Shortcuts cheat sheet" },
    { key: "Esc", description: "Close any active modal or popover" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="fixed inset-0 -z-10"
        onClick={() => setShortcutsModalOpen(false)}
      />
      <div className="w-full max-w-md rounded-xl border border-border bg-popover p-5 text-popover-foreground shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between pb-3 border-b border-border/80">
          <div className="flex items-center gap-2">
            <Keyboard className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm">Keyboard Shortcuts</h3>
          </div>
          <button
            onClick={() => setShortcutsModalOpen(false)}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 divide-y divide-border/50 text-xs">
          {shortcuts.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
            >
              <span className="text-muted-foreground">{item.description}</span>
              <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted/60 px-2 font-mono text-[11px] font-medium text-foreground">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-border/60 text-[11px] text-muted-foreground text-center">
          Shortcuts are active across the entire application workspace.
        </div>
      </div>
    </div>
  );
}
