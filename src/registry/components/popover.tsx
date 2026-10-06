import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";
import { SlidersHorizontal } from "lucide-react";

export const popoverDefinition: ComponentDefinition = {
  id: "popover",
  name: "Popover",
  description: "Displays rich interactive content in a portal, triggered by a button.",
  category: "Overlay",
  icon: "PanelTopClose",
  tags: ["popover", "card", "flyout", "overlay"],
  props: [
    {
      name: "triggerText",
      label: "Trigger Text",
      type: "text",
      defaultValue: "Dimensions",
      group: "Content",
      description: "Trigger button label",
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Dimensions",
      group: "Content",
      description: "Popover content header",
    },
  ],
  defaultProps: {
    triggerText: "Dimensions",
    title: "Dimensions",
  },
  examples: [],
  docs: {
    overview: "Built using Radix Popover with focus management, custom alignment and positioning offsets.",
    installation: {
      cli: "npx forge-ui add popover",
      npm: "npm install @radix-ui/react-popover",
    },
    usage: `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
}`,
    api: [
      {
        prop: "align",
        type: '"start" | "center" | "end"',
        defaultValue: '"center"',
        description: "Preferred alignment against trigger",
      },
    ],
    accessibility: {
      keyboardNav: ["Escape: Dismisses popover", "Tab: Trapped within popover when focused"],
      ariaNotes: ["Uses role='dialog' with aria-expanded on trigger"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`gap-2 ${getVisualStylesClass(visualStyles)}`}
            style={getVisualStylesInline(visualStyles)}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {props.triggerText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 text-left">
          <div className="grid gap-4">
            <div className="space-y-1">
              <h4 className="font-semibold text-xs leading-none">{props.title}</h4>
              <p className="text-[11px] text-muted-foreground">
                Set the default dimensions for this layer.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-3">
                <label className="text-xs text-muted-foreground">Width</label>
                <Input defaultValue="100%" className="col-span-2 h-7 text-xs" />
              </div>
              <div className="grid grid-cols-3 items-center gap-3">
                <label className="text-xs text-muted-foreground">Max Width</label>
                <Input defaultValue="1200px" className="col-span-2 h-7 text-xs" />
              </div>
              <div className="grid grid-cols-3 items-center gap-3">
                <label className="text-xs text-muted-foreground">Height</label>
                <Input defaultValue="auto" className="col-span-2 h-7 text-xs" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">${props.triggerText}</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <h4 className="font-medium text-xs">${props.title}</h4>
      <div className="grid gap-2">
        <Input defaultValue="100%" />
      </div>
    </div>
  </PopoverContent>
</Popover>`;
  },
};
