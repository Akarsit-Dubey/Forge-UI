import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const radioGroupDefinition: ComponentDefinition = {
  id: "radio-group",
  name: "Radio Group",
  description: "A set of checkable buttons—known as radio buttons—where no more than one can be checked at once.",
  category: "Forms",
  icon: "CircleDot",
  tags: ["radio", "options", "choice", "single", "form"],
  props: [
    {
      name: "label",
      label: "Group Label",
      type: "text",
      defaultValue: "Select Compute Tier",
      group: "Content",
      description: "Header above radio options",
    },
    {
      name: "defaultValue",
      label: "Selected Option",
      type: "select",
      defaultValue: "pro",
      group: "Core",
      description: "Default chosen value",
      options: [
        { label: "Starter", value: "starter" },
        { label: "Pro", value: "pro" },
        { label: "Enterprise", value: "enterprise" },
      ],
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      defaultValue: false,
      group: "State",
      description: "Disable radio group",
    },
  ],
  defaultProps: {
    label: "Select Compute Tier",
    defaultValue: "pro",
    disabled: false,
  },
  examples: [],
  docs: {
    overview: "A radio group component with accessible roving keyboard navigation.",
    installation: {
      cli: "npx forge-ui add radio-group",
      npm: "npm install @radix-ui/react-radio-group",
    },
    usage: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Example() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <label htmlFor="option-one">Option One</label>
      </div>
    </RadioGroup>
  );
}`,
    api: [
      {
        prop: "defaultValue",
        type: "string",
        defaultValue: "-",
        description: "Default selected radio value",
      },
    ],
    accessibility: {
      keyboardNav: [
        "Up / Down Arrow: Moves selection between radios",
        "Space: Selects focused radio",
      ],
      ariaNotes: ["Renders role='radiogroup' and role='radio' with aria-checked"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <div
        className={`w-full max-w-sm space-y-3 text-left ${getVisualStylesClass(visualStyles)}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <label className="text-xs font-medium text-foreground">{props.label}</label>
        <RadioGroup
          defaultValue={props.defaultValue}
          disabled={props.disabled}
          className="gap-2"
        >
          <div className="flex items-start space-x-3 rounded-md border p-2.5 hover:bg-muted/40 transition-colors">
            <RadioGroupItem value="starter" id="r-starter" className="mt-0.5" />
            <label htmlFor="r-starter" className="text-xs cursor-pointer">
              <span className="font-semibold block">Starter</span>
              <span className="text-muted-foreground text-[11px]">
                1 vCPU, 2GB RAM • Free forever
              </span>
            </label>
          </div>
          <div className="flex items-start space-x-3 rounded-md border p-2.5 hover:bg-muted/40 transition-colors">
            <RadioGroupItem value="pro" id="r-pro" className="mt-0.5" />
            <label htmlFor="r-pro" className="text-xs cursor-pointer">
              <span className="font-semibold block">Pro Dedicated</span>
              <span className="text-muted-foreground text-[11px]">
                4 vCPU, 16GB RAM • $20/month
              </span>
            </label>
          </div>
          <div className="flex items-start space-x-3 rounded-md border p-2.5 hover:bg-muted/40 transition-colors">
            <RadioGroupItem value="enterprise" id="r-enterprise" className="mt-0.5" />
            <label htmlFor="r-enterprise" className="text-xs cursor-pointer">
              <span className="font-semibold block">Enterprise Scale</span>
              <span className="text-muted-foreground text-[11px]">
                Dedicated cluster, 99.99% SLA • Custom
              </span>
            </label>
          </div>
        </RadioGroup>
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<RadioGroup defaultValue="${props.defaultValue}"${props.disabled ? " disabled" : ""}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="starter" id="starter" />
    <label htmlFor="starter">Starter</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="pro" id="pro" />
    <label htmlFor="pro">Pro</label>
  </div>
</RadioGroup>`;
  },
};
