import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Textarea } from "@/components/ui/textarea";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const textareaDefinition: ComponentDefinition = {
  id: "textarea",
  name: "Textarea",
  description: "Displays a form textarea or a component that looks like a textarea.",
  category: "Forms",
  icon: "AlignLeft",
  tags: ["form", "input", "multiline", "textarea", "comment"],
  props: [
    {
      name: "placeholder",
      label: "Placeholder",
      type: "text",
      defaultValue: "Type your message here...",
      group: "Content",
      description: "Default placeholder text",
    },
    {
      name: "label",
      label: "Label",
      type: "text",
      defaultValue: "Bio / Description",
      group: "Content",
      description: "Label above field",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      defaultValue: false,
      group: "State",
      description: "Locks field",
    },
  ],
  defaultProps: {
    placeholder: "Type your message here...",
    label: "Bio / Description",
    disabled: false,
  },
  examples: [],
  docs: {
    overview: "Accessible multiline text input with focus ring styling and auto-expand capabilities.",
    installation: {
      cli: "npx forge-ui add textarea",
      npm: "npm install @forge-ui/textarea",
    },
    usage: `import { Textarea } from "@/components/ui/textarea";

export function Example() {
  return <Textarea placeholder="Type your message here." />;
}`,
    api: [],
    accessibility: {
      keyboardNav: ["Tab: Enters and exits focus"],
      ariaNotes: ["Link with label via htmlFor and id"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <div
        className={`w-full max-w-sm space-y-1.5 text-left ${getVisualStylesClass(visualStyles)}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <label className="text-xs font-medium text-foreground">{props.label}</label>
        <Textarea
          placeholder={props.placeholder}
          disabled={props.disabled}
          rows={3}
        />
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<div className="grid w-full gap-1.5">
  <label className="text-xs font-medium">${props.label}</label>
  <Textarea placeholder="${props.placeholder}"${props.disabled ? " disabled" : ""} />
</div>`;
  },
};
