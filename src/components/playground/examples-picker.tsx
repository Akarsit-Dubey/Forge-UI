"use client";

import React from "react";
import { Example } from "@/registry/schema";
import { Sparkles, ArrowRight } from "lucide-react";

interface ExamplesPickerProps {
  examples: Example[];
  onSelectExample: (example: Example) => void;
}

export function ExamplesPicker({
  examples,
  onSelectExample,
}: ExamplesPickerProps) {
  if (!examples || examples.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-muted-foreground">
        No preset variations available for this component.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="border-b border-border/60 pb-2">
        <h4 className="text-xs font-semibold text-foreground">Preset Examples</h4>
        <p className="text-[11px] text-muted-foreground">
          Click any example to quickly load its prop state
        </p>
      </div>

      <div className="space-y-2">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => onSelectExample(example)}
            className="w-full text-left rounded-lg border border-border/60 bg-card p-3 hover:border-primary/50 hover:bg-accent/40 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors">
                {example.title}
              </span>
              <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {example.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
