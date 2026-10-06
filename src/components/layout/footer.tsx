import React from "react";
import Link from "next/link";
import { Terminal, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20 py-6 px-4 sm:px-6 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-foreground">Forge UI</span>
          <span>• Interactive Design System Playground</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/components" className="hover:text-foreground transition-colors">
            Components
          </Link>
          <Link href="/playground" className="hover:text-foreground transition-colors">
            Playground
          </Link>
          <Link href="/themes" className="hover:text-foreground transition-colors">
            Themes
          </Link>
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Documentation
          </Link>
          <Link href="/settings" className="hover:text-foreground transition-colors">
            Settings
          </Link>
        </div>

        <div className="flex items-center gap-1 text-[11px]">
          <span>Built with Next.js, Radix & Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
