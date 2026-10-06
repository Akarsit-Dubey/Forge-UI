import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const checkboxDefinition: ComponentDefinition = {
  id: "checkbox",
  name: "Checkbox",
  description: "A control that allows the user to toggle between checked and unchecked options in a form.",
  category: "Forms",
  icon: "CheckSquare",
  tags: ["check", "box", "tick", "form", "multi"],
  props: [
    {
      name: "label",
      label: "Label",
      type: "text",
      defaultValue: "Accept terms and conditions",
      group: "Content",
      description: "Label text",
    },
    {
      name: "sublabel",
      label: "Sublabel",
      type: "text",
      defaultValue: "You agree to our Terms of Service and Privacy Policy.",
      group: "Content",
      description: "Descriptive help text",
    },
    {
      name: "checked",
      label: "Default Checked",
      type: "boolean",
      defaultValue: true,
      group: "State",
      description: "Initial checked state",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      defaultValue: false,
      group: "State",
      description: "Disable checkbox",
    },
  ],
  defaultProps: {
    label: "Accept terms and conditions",
    sublabel: "You agree to our Terms of Service and Privacy Policy.",
    checked: true,
    disabled: false,
  },
  examples: [],
  docs: {
    overview: "Accessible checkbox component conforming to W3C ARIA checkbox requirements.",
    installation: {
      cli: "npx forge-ui add checkbox",
      npm: "npm install @radix-ui/react-checkbox",
    },
    usage: `import { Checkbox } from "@/components/ui/checkbox";

export function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-sm font-medium">Accept terms</label>
    </div>
  );
}`,
    api: [
      {
        prop: "checked",
        type: "boolean | 'indeterminate'",
        defaultValue: "false",
        description: "Controlled checked state",
      },
    ],
    accessibility: {
      keyboardNav: ["Space: Checks or unchecks"],
      ariaNotes: ["Renders role='checkbox' with aria-checked='true|false|mixed'"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <div
        className={`flex items-start space-x-3 text-left max-w-sm ${getVisualStylesClass(
          visualStyles
        )}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <Checkbox
          id="cb-demo"
          defaultChecked={props.checked}
          disabled={props.disabled}
          className="mt-0.5"
        />
        <div className="grid gap-1 leading-none">
          <label
            htmlFor="cb-demo"
            className="text-xs font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {props.label}
          </label>
          {props.sublabel && (
            <p className="text-[11px] text-muted-foreground">{props.sublabel}</p>
          )}
        </div>
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<div className="flex items-start space-x-3">
  <Checkbox id="terms" defaultChecked={${props.checked}}${props.disabled ? " disabled" : ""} />
  <div className="grid gap-1 leading-none">
    <label htmlFor="terms" className="text-xs font-medium leading-none">
      ${props.label}
    </label>
    <p className="text-[11px] text-muted-foreground">
      ${props.sublabel}
    </p>
  </div>
</div>`;
  },
};
