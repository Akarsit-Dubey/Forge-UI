import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const skeletonDefinition: ComponentDefinition = {
  id: "skeleton",
  name: "Skeleton",
  description: "Use to show a placeholder while content is loading.",
  category: "Feedback",
  icon: "SquareDashed",
  tags: ["loading", "placeholder", "skeleton", "shimmer"],
  props: [
    {
      name: "type",
      label: "Layout Preset",
      type: "select",
      defaultValue: "profile",
      group: "Core",
      description: "Sample skeleton wireframe layout",
      options: [
        { label: "Profile Card", value: "profile" },
        { label: "Feed Card", value: "feed" },
        { label: "Text Block", value: "text" },
      ],
    },
  ],
  defaultProps: {
    type: "profile",
  },
  examples: [],
  docs: {
    overview: "Accessible skeleton loader showing subtle pulse animation while assets load.",
    installation: {
      cli: "npx forge-ui add skeleton",
      npm: "npm install @forge-ui/skeleton",
    },
    usage: `import { Skeleton } from "@/components/ui/skeleton";

export function Example() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}`,
    api: [],
    accessibility: {
      keyboardNav: ["Non-interactive"],
      ariaNotes: ["Add aria-busy='true' and aria-live='polite' on parent container"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <div
        className={`w-full max-w-sm rounded-lg border p-4 space-y-4 text-left ${getVisualStylesClass(
          visualStyles
        )}`}
        style={getVisualStylesInline(visualStyles)}
      >
        {props.type === "profile" && (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3.5 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        )}
        {props.type === "feed" && (
          <div className="space-y-3">
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        )}
        {props.type === "text" && (
          <div className="space-y-2.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        )}
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<div className="flex items-center space-x-4">
  <Skeleton className="h-10 w-10 rounded-full" />
  <div className="space-y-2 flex-1">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
</div>`;
  },
};
