"use client";

import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { PropControl } from "./prop-control";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface PropsEditorProps {
  component: ComponentDefinition;
  props: Record<string, any>;
  onPropChange: (name: string, value: any) => void;
  onReset: () => void;
}

export function PropsEditor({
  component,
  props,
  onPropChange,
  onReset,
}: PropsEditorProps) {
  // Group props by group or default to "Properties"
  const groups: Record<string, typeof component.props> = {};
  component.props.forEach((prop) => {
    const groupName = prop.group || "Core";
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(prop);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div>
          <h4 className="text-xs font-semibold text-foreground">Properties</h4>
          <p className="text-[11px] text-muted-foreground">
            Configure {component.name} props
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

      <div className="space-y-4">
        {Object.entries(groups).map(([groupName, groupProps]) => (
          <div key={groupName} className="space-y-2">
            <h5 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              {groupName}
            </h5>
            <div className="space-y-2 rounded-lg border border-border/50 bg-card/50 p-2.5">
              {groupProps.map((propDef) => (
                <PropControl
                  key={propDef.name}
                  propDef={propDef}
                  value={props[propDef.name]}
                  onChange={(val) => onPropChange(propDef.name, val)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
