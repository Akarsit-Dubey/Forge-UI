"use client";

import React from "react";
import { PropDefinition } from "@/registry/schema";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface PropControlProps {
  propDef: PropDefinition;
  value: any;
  onChange: (value: any) => void;
}

export function PropControl({ propDef, value, onChange }: PropControlProps) {
  const currentValue = value !== undefined ? value : propDef.defaultValue;

  switch (propDef.type) {
    case "boolean":
      return (
        <div className="flex items-center justify-between py-1">
          <div className="space-y-0.5 pr-2">
            <span className="text-xs font-medium text-foreground">{propDef.label}</span>
            {propDef.description && (
              <p className="text-[10px] text-muted-foreground">{propDef.description}</p>
            )}
          </div>
          <Switch
            checked={Boolean(currentValue)}
            onCheckedChange={(checked) => onChange(checked)}
          />
        </div>
      );

    case "select":
      return (
        <div className="space-y-1.5 py-1">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-foreground">{propDef.label}</span>
            {propDef.description && (
              <span className="text-[10px] text-muted-foreground">{propDef.description}</span>
            )}
          </div>
          <Select
            value={String(currentValue)}
            onValueChange={(val) => onChange(val)}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {propDef.options?.map((opt) => (
                <SelectItem key={String(opt.value)} value={String(opt.value)}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case "segmented":
      return (
        <div className="space-y-1.5 py-1">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-foreground">{propDef.label}</span>
          </div>
          <div className="grid grid-flow-col auto-cols-fr gap-1 rounded-md bg-muted/50 p-1 border border-border/60">
            {propDef.options?.map((opt) => {
              const isSelected = String(currentValue) === String(opt.value);
              return (
                <button
                  key={String(opt.value)}
                  onClick={() => onChange(opt.value)}
                  className={`rounded px-2 py-1 text-[11px] font-medium transition-all ${
                    isSelected
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      );

    case "slider":
      return (
        <div className="space-y-1.5 py-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-foreground">{propDef.label}</span>
            <span className="font-mono text-[11px] text-muted-foreground">
              {currentValue}
            </span>
          </div>
          <Slider
            value={[Number(currentValue) || 0]}
            onValueChange={(vals) => onChange(vals[0])}
            min={propDef.min ?? 0}
            max={propDef.max ?? 100}
            step={propDef.step ?? 1}
          />
        </div>
      );

    case "number":
      return (
        <div className="flex items-center justify-between py-1">
          <span className="text-xs font-medium text-foreground">{propDef.label}</span>
          <Input
            type="number"
            value={currentValue ?? 0}
            onChange={(e) => onChange(Number(e.target.value))}
            min={propDef.min}
            max={propDef.max}
            step={propDef.step}
            className="h-7 w-20 text-xs font-mono text-right"
          />
        </div>
      );

    case "color":
      return (
        <div className="flex items-center justify-between py-1">
          <span className="text-xs font-medium text-foreground">{propDef.label}</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={currentValue || "#000000"}
              onChange={(e) => onChange(e.target.value)}
              className="h-6 w-6 cursor-pointer rounded border border-border bg-transparent p-0"
            />
            <span className="font-mono text-[11px] text-muted-foreground">
              {currentValue}
            </span>
          </div>
        </div>
      );

    case "text":
    default:
      return (
        <div className="space-y-1 py-1">
          <span className="text-xs font-medium text-foreground">{propDef.label}</span>
          <Input
            value={currentValue ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 text-xs"
          />
        </div>
      );
  }
}
