import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Slider } from "@/components/ui/slider";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

function SliderPreviewComponent({
  props,
  visualStyles,
}: {
  props: Record<string, any>;
  visualStyles: any;
}) {
  const [val, setVal] = React.useState([props.defaultValue]);
  React.useEffect(() => {
    setVal([props.defaultValue]);
  }, [props.defaultValue]);

  return (
    <div
      className={`w-full max-w-sm space-y-2 text-left ${getVisualStylesClass(visualStyles)}`}
      style={getVisualStylesInline(visualStyles)}
    >
      <div className="flex justify-between items-center text-xs">
        <label className="font-medium text-foreground">{props.label}</label>
        <span className="font-mono text-muted-foreground">{val[0]}%</span>
      </div>
      <Slider
        value={val}
        onValueChange={setVal}
        max={100}
        step={props.step}
        disabled={props.disabled}
      />
    </div>
  );
}

export const sliderDefinition: ComponentDefinition = {
  id: "slider",
  name: "Slider",
  description: "An input where the user selects a value from within a given range.",
  category: "Forms",
  icon: "Sliders",
  tags: ["range", "slider", "volume", "scale", "form"],
  props: [
    {
      name: "label",
      label: "Label",
      type: "text",
      defaultValue: "Capacity Limit",
      group: "Content",
      description: "Header text for slider",
    },
    {
      name: "defaultValue",
      label: "Value",
      type: "slider",
      defaultValue: 60,
      min: 0,
      max: 100,
      step: 1,
      group: "Core",
      description: "Default position value",
    },
    {
      name: "step",
      label: "Step Interval",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 20,
      group: "Core",
      description: "Granularity of steps",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      defaultValue: false,
      group: "State",
      description: "Locks the slider interaction",
    },
  ],
  defaultProps: {
    label: "Capacity Limit",
    defaultValue: 60,
    step: 5,
    disabled: false,
  },
  examples: [
    {
      id: "volume-slider",
      title: "Audio Volume",
      description: "Fine-grained percentage slider",
      props: { label: "Master Audio Gain", defaultValue: 75, step: 1 },
    },
  ],
  docs: {
    overview:
      "A numeric range control that allows users to adjust continuous or discrete values using keyboard arrows or mouse dragging.",
    installation: {
      cli: "npx forge-ui add slider",
      npm: "npm install @radix-ui/react-slider",
    },
    usage: `import { Slider } from "@/components/ui/slider";

export function Example() {
  return <Slider defaultValue={[33]} max={100} step={1} />;
}`,
    api: [
      {
        prop: "defaultValue",
        type: "number[]",
        defaultValue: "[0]",
        description: "Initial value of the slider thumb(s)",
      },
      {
        prop: "min",
        type: "number",
        defaultValue: "0",
        description: "Minimum value",
      },
      {
        prop: "max",
        type: "number",
        defaultValue: "100",
        description: "Maximum value",
      },
      {
        prop: "step",
        type: "number",
        defaultValue: "1",
        description: "Stepping interval",
      },
    ],
    accessibility: {
      keyboardNav: [
        "Right / Up Arrow: Increases value by step",
        "Left / Down Arrow: Decreases value by step",
        "Home / End: Sets to minimum / maximum",
      ],
      ariaNotes: ["Renders role='slider' with aria-valuenow and aria-valuemax"],
    },
  },
  component: SliderPreviewComponent,
  generateCode: (props, _visualStyles) => {
    return `<div className="w-full max-w-sm space-y-2">
  <div className="flex justify-between text-xs">
    <label className="font-medium">${props.label}</label>
    <span className="font-mono text-muted-foreground">{val}%</span>
  </div>
  <Slider
    defaultValue={[${props.defaultValue}]}
    max={100}
    step={${props.step}}${props.disabled ? "\n    disabled" : ""}
  />
</div>`;
  },
};
