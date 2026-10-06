import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";
import { Bookmark } from "lucide-react";

export const tooltipDefinition: ComponentDefinition = {
  id: "tooltip",
  name: "Tooltip",
  description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  category: "Overlay",
  icon: "MessageSquare",
  tags: ["tooltip", "hint", "hover", "help", "popup"],
  props: [
    {
      name: "tooltipText",
      label: "Tooltip Content",
      type: "text",
      defaultValue: "Add bookmark to favorites",
      group: "Content",
      description: "Text rendered inside floating tooltip",
    },
    {
      name: "side",
      label: "Placement Side",
      type: "select",
      defaultValue: "top",
      group: "Core",
      description: "Side of trigger element",
      options: [
        { label: "Top", value: "top" },
        { label: "Right", value: "right" },
        { label: "Bottom", value: "bottom" },
        { label: "Left", value: "left" },
      ],
    },
  ],
  defaultProps: {
    tooltipText: "Add bookmark to favorites",
    side: "top",
  },
  examples: [],
  docs: {
    overview: "Built using Radix UI Tooltip with collision detection and keyboard focus support.",
    installation: {
      cli: "npx forge-ui add tooltip",
      npm: "npm install @radix-ui/react-tooltip",
    },
    usage: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`,
    api: [
      {
        prop: "delayDuration",
        type: "number",
        defaultValue: "700",
        description: "Duration before tooltip opens in milliseconds",
      },
    ],
    accessibility: {
      keyboardNav: [
        "Focus trigger to reveal tooltip",
        "Escape: Dismisses open tooltip",
      ],
      ariaNotes: ["Renders role='tooltip' linked with aria-describedby"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={getVisualStylesClass(visualStyles)}
              style={getVisualStylesInline(visualStyles)}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side={props.side as any}>
            <p className="text-xs">{props.tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon">
        <Bookmark className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent side="${props.side}">
      <p>${props.tooltipText}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`;
  },
};
