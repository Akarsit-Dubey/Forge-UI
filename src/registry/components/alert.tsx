import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

export const alertDefinition: ComponentDefinition = {
  id: "alert",
  name: "Alert",
  description: "Displays a callout for user attention with semantic status indicators.",
  category: "Feedback",
  icon: "AlertCircle",
  tags: ["alert", "notification", "callout", "message", "warning"],
  props: [
    {
      name: "title",
      label: "Alert Title",
      type: "text",
      defaultValue: "Heads up!",
      group: "Content",
      description: "Primary headline",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      defaultValue: "You can add components to your app using the Forge UI cli.",
      group: "Content",
      description: "Explanatory body message",
    },
    {
      name: "variant",
      label: "Variant",
      type: "select",
      defaultValue: "default",
      group: "Core",
      description: "Color style and semantic tone",
      options: [
        { label: "Default", value: "default" },
        { label: "Destructive", value: "destructive" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
      ],
    },
  ],
  defaultProps: {
    title: "Heads up!",
    description: "You can add components to your app using the Forge UI cli.",
    variant: "default",
  },
  examples: [],
  docs: {
    overview: "Alerts provide prompt feedback or contextual information within content workflows.",
    installation: {
      cli: "npx forge-ui add alert",
      npm: "npm install @forge-ui/alert lucide-react",
    },
    usage: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export function Example() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  );
}`,
    api: [
      {
        prop: "variant",
        type: '"default" | "destructive" | "success" | "warning"',
        defaultValue: '"default"',
        description: "Semantic color variant",
      },
    ],
    accessibility: {
      keyboardNav: ["Static element"],
      ariaNotes: ["Uses role='alert' for screen reader announcements"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <Alert
        variant={props.variant}
        className={`w-full max-w-sm text-left ${getVisualStylesClass(visualStyles)}`}
        style={getVisualStylesInline(visualStyles)}
      >
        {props.variant === "destructive" && <AlertCircle className="h-4 w-4" />}
        {props.variant === "warning" && <AlertTriangle className="h-4 w-4" />}
        {props.variant === "success" && <CheckCircle2 className="h-4 w-4" />}
        {props.variant === "default" && <Info className="h-4 w-4" />}
        <AlertTitle>{props.title}</AlertTitle>
        <AlertDescription>{props.description}</AlertDescription>
      </Alert>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<Alert variant="${props.variant}">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>${props.title}</AlertTitle>
  <AlertDescription>
    ${props.description}
  </AlertDescription>
</Alert>`;
  },
};
