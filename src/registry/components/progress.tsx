import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Progress } from "@/components/ui/progress";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const progressDefinition: ComponentDefinition = {
  id: "progress",
  name: "Progress",
  description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  category: "Feedback",
  icon: "Percent",
  tags: ["progress", "bar", "meter", "loading", "percentage"],
  props: [
    {
      name: "value",
      label: "Progress Value",
      type: "slider",
      defaultValue: 66,
      min: 0,
      max: 100,
      step: 1,
      group: "Core",
      description: "Current completion percentage",
    },
    {
      name: "label",
      label: "Task Label",
      type: "text",
      defaultValue: "Uploading assets...",
      group: "Content",
      description: "Header text for task",
    },
  ],
  defaultProps: {
    value: 66,
    label: "Uploading assets...",
  },
  examples: [],
  docs: {
    overview: "Built using Radix UI Progress with ARIA value attributes.",
    installation: {
      cli: "npx forge-ui add progress",
      npm: "npm install @radix-ui/react-progress",
    },
    usage: `import { Progress } from "@/components/ui/progress";

export function Example() {
  return <Progress value={33} />;
}`,
    api: [
      {
        prop: "value",
        type: "number",
        defaultValue: "0",
        description: "The progress value between 0 and 100",
      },
    ],
    accessibility: {
      keyboardNav: ["Non-interactive read-only element"],
      ariaNotes: ["Renders role='progressbar' with aria-valuenow, aria-valuemin, aria-valuemax"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <div
        className={`w-full max-w-sm space-y-2 text-left ${getVisualStylesClass(visualStyles)}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium text-foreground">{props.label}</span>
          <span className="font-mono text-muted-foreground">{props.value}%</span>
        </div>
        <Progress value={props.value} />
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<div className="w-full max-w-sm space-y-2">
  <div className="flex justify-between text-xs">
    <span>${props.label}</span>
    <span>${props.value}%</span>
  </div>
  <Progress value={${props.value}} />
</div>`;
  },
};
