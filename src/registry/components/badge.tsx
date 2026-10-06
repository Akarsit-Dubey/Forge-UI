import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Badge } from "@/components/ui/badge";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const badgeDefinition: ComponentDefinition = {
  id: "badge",
  name: "Badge",
  description: "Displays a small status pill, category tag or count counter badge.",
  category: "Feedback",
  icon: "Tag",
  tags: ["pill", "tag", "chip", "status", "counter"],
  props: [
    {
      name: "label",
      label: "Label",
      type: "text",
      defaultValue: "Active",
      group: "Content",
      description: "Text inside badge",
    },
    {
      name: "variant",
      label: "Variant",
      type: "select",
      defaultValue: "default",
      group: "Core",
      description: "Semantic color variant",
      options: [
        { label: "Default", value: "default" },
        { label: "Secondary", value: "secondary" },
        { label: "Destructive", value: "destructive" },
        { label: "Outline", value: "outline" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
        { label: "Info", value: "info" },
      ],
    },
    {
      name: "showDot",
      label: "Status Dot",
      type: "boolean",
      defaultValue: true,
      group: "Style",
      description: "Includes a glowing ping or status circle dot",
    },
  ],
  defaultProps: {
    label: "Active",
    variant: "default",
    showDot: true,
  },
  examples: [
    {
      id: "success-dot",
      title: "Live Operational",
      description: "Green indicator for healthy servers",
      props: { label: "System Operational", variant: "success", showDot: true },
    },
    {
      id: "warning-badge",
      title: "Warning Alert",
      description: "Amber pill for rate limits or quotas",
      props: { label: "85% Quota Used", variant: "warning", showDot: false },
    },
    {
      id: "destructive-badge",
      title: "Error Detected",
      description: "Red badge for failed builds",
      props: { label: "Build Failed", variant: "destructive", showDot: true },
    },
  ],
  docs: {
    overview:
      "Badges are used to highlight status, emphasize categories, or display small numerical values like notifications count.",
    installation: {
      cli: "npx forge-ui add badge",
      npm: "npm install @forge-ui/badge",
    },
    usage: `import { Badge } from "@/components/ui/badge";

export function Example() {
  return <Badge variant="outline">Preview</Badge>;
}`,
    api: [
      {
        prop: "variant",
        type: '"default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"',
        defaultValue: '"default"',
        description: "Visual semantic theme",
      },
    ],
    accessibility: {
      keyboardNav: ["Non-interactive badge does not receive focus"],
      ariaNotes: [
        "If used as a live status indicator, consider wrapping in aria-live='polite'",
      ],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <Badge
        variant={props.variant}
        className={`gap-1.5 py-1 px-2.5 ${getVisualStylesClass(visualStyles)}`}
        style={getVisualStylesInline(visualStyles)}
      >
        {props.showDot && (
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              props.variant === "success"
                ? "bg-emerald-500 animate-pulse"
                : props.variant === "warning"
                ? "bg-amber-500"
                : props.variant === "destructive"
                ? "bg-red-500"
                : "bg-current opacity-70"
            }`}
          />
        )}
        {props.label}
      </Badge>
    );
  },
  generateCode: (props, visualStyles) => {
    const visualClass = getVisualStylesClass(visualStyles).trim();
    const classProp = visualClass ? ` className="${visualClass}"` : "";

    if (props.showDot) {
      return `<Badge variant="${props.variant}"${classProp} className="gap-1.5">
  <span className="h-1.5 w-1.5 rounded-full bg-current" />
  ${props.label}
</Badge>`;
    }
    return `<Badge variant="${props.variant}"${classProp}>\n  ${props.label}\n</Badge>`;
  },
};
