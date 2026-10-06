import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const selectDefinition: ComponentDefinition = {
  id: "select",
  name: "Select",
  description: "Displays a list of options for the user to pick from—triggered by a button.",
  category: "Forms",
  icon: "ChevronsUpDown",
  tags: ["dropdown", "picker", "select", "options", "form"],
  props: [
    {
      name: "placeholder",
      label: "Placeholder",
      type: "text",
      defaultValue: "Select a framework",
      group: "Content",
      description: "Default unselected prompt",
    },
    {
      name: "label",
      label: "Label",
      type: "text",
      defaultValue: "Framework",
      group: "Content",
      description: "Field title",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      defaultValue: false,
      group: "State",
      description: "Locks select dropdown",
    },
  ],
  defaultProps: {
    placeholder: "Select a framework",
    label: "Framework",
    disabled: false,
  },
  examples: [
    {
      id: "region-select",
      title: "Cloud Region",
      description: "Datacenter region selector",
      props: { label: "Deployment Region", placeholder: "Choose AWS region" },
    },
  ],
  docs: {
    overview:
      "A customized select component built on Radix UI Select with full keyboard support, custom styling, scroll buttons, and position collision handling.",
    installation: {
      cli: "npx forge-ui add select",
      npm: "npm install @radix-ui/react-select",
    },
    usage: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Example() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}`,
    api: [
      {
        prop: "defaultValue",
        type: "string",
        defaultValue: "-",
        description: "Initial value",
      },
      {
        prop: "onValueChange",
        type: "(value: string) => void",
        defaultValue: "-",
        description: "Handler for value changes",
      },
    ],
    accessibility: {
      keyboardNav: [
        "Space / Enter: Opens select menu",
        "Up / Down Arrow: Navigates through options",
        "Escape: Closes menu without change",
      ],
      ariaNotes: ["Renders role='combobox' with aria-expanded and aria-haspopup"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <div
        className={`w-full max-w-sm space-y-1.5 text-left ${getVisualStylesClass(visualStyles)}`}
        style={getVisualStylesInline(visualStyles)}
      >
        {props.label && (
          <label className="text-xs font-medium text-foreground">{props.label}</label>
        )}
        <Select defaultValue="next">
          <SelectTrigger disabled={props.disabled}>
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="next">Next.js 14 (App Router)</SelectItem>
            <SelectItem value="remix">Remix Run</SelectItem>
            <SelectItem value="astro">Astro</SelectItem>
            <SelectItem value="vite">Vite + React</SelectItem>
            <SelectItem value="svelte">SvelteKit</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<Select defaultValue="next"${props.disabled ? " disabled" : ""}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="${props.placeholder}" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="next">Next.js 14 (App Router)</SelectItem>
    <SelectItem value="remix">Remix Run</SelectItem>
    <SelectItem value="astro">Astro</SelectItem>
    <SelectItem value="vite">Vite + React</SelectItem>
  </SelectContent>
</Select>`;
  },
};
