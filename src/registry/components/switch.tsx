import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Switch } from "@/components/ui/switch";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

function SwitchPreviewComponent({
  props,
  visualStyles,
}: {
  props: Record<string, any>;
  visualStyles: any;
}) {
  const [isChecked, setIsChecked] = React.useState(props.checked);
  React.useEffect(() => {
    setIsChecked(props.checked);
  }, [props.checked]);

  return (
    <div
      className={`flex items-center justify-between space-x-4 rounded-lg border p-3 w-full max-w-sm text-left ${getVisualStylesClass(
        visualStyles
      )}`}
      style={getVisualStylesInline(visualStyles)}
    >
      <div className="space-y-0.5">
        <label className="text-xs font-medium cursor-pointer">{props.label}</label>
        {props.sublabel && (
          <p className="text-[11px] text-muted-foreground">{props.sublabel}</p>
        )}
      </div>
      <Switch
        checked={isChecked}
        onCheckedChange={setIsChecked}
        disabled={props.disabled}
      />
    </div>
  );
}

export const switchDefinition: ComponentDefinition = {
  id: "switch",
  name: "Switch",
  description: "A control that allows the user to toggle between checked and unchecked states.",
  category: "Forms",
  icon: "ToggleLeft",
  tags: ["toggle", "boolean", "switch", "control", "form"],
  props: [
    {
      name: "label",
      label: "Label",
      type: "text",
      defaultValue: "Airplane Mode",
      group: "Content",
      description: "Descriptive label next to the toggle",
    },
    {
      name: "sublabel",
      label: "Sublabel",
      type: "text",
      defaultValue: "Disable all network transmissions.",
      group: "Content",
      description: "Supporting explanation text below title",
    },
    {
      name: "checked",
      label: "Default Checked",
      type: "boolean",
      defaultValue: true,
      group: "State",
      description: "Initial toggle state",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      defaultValue: false,
      group: "State",
      description: "Locks the switch interaction",
    },
  ],
  defaultProps: {
    label: "Airplane Mode",
    sublabel: "Disable all network transmissions.",
    checked: true,
    disabled: false,
  },
  examples: [
    {
      id: "notifications",
      title: "Marketing Emails",
      description: "Email preferences toggle",
      props: {
        label: "Marketing Notifications",
        sublabel: "Receive weekly product updates and changelogs.",
        checked: false,
      },
    },
  ],
  docs: {
    overview:
      "A switch component styled according to modern design system standards, featuring accessible keyboard toggling with Space or Enter.",
    installation: {
      cli: "npx forge-ui add switch",
      npm: "npm install @radix-ui/react-switch",
    },
    usage: `import { Switch } from "@/components/ui/switch";

export function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm">Airplane Mode</label>
    </div>
  );
}`,
    api: [
      {
        prop: "checked",
        type: "boolean",
        defaultValue: "false",
        description: "Controlled checked state",
      },
      {
        prop: "onCheckedChange",
        type: "(checked: boolean) => void",
        defaultValue: "undefined",
        description: "Callback called when state changes",
      },
    ],
    accessibility: {
      keyboardNav: ["Space: Toggles the switch between on and off"],
      ariaNotes: ["Renders role='switch' with aria-checked='true|false'"],
    },
  },
  component: SwitchPreviewComponent,
  generateCode: (props, _visualStyles) => {
    return `<div className="flex items-center justify-between space-x-4 rounded-lg border p-3">
  <div className="space-y-0.5">
    <label className="text-xs font-medium">${props.label}</label>
    <p className="text-[11px] text-muted-foreground">${props.sublabel}</p>
  </div>
  <Switch defaultChecked={${props.checked}}${props.disabled ? " disabled" : ""} />
</div>`;
  },
};
