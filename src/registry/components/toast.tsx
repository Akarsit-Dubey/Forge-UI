import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Button } from "@/components/ui/button";
import { CheckCircle2, X } from "lucide-react";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const toastDefinition: ComponentDefinition = {
  id: "toast",
  name: "Toast",
  description: "A succinct message that is displayed temporarily to provide feedback on an action.",
  category: "Feedback",
  icon: "BellRing",
  tags: ["toast", "notification", "snackbar", "alert", "feedback"],
  props: [
    {
      name: "title",
      label: "Toast Title",
      type: "text",
      defaultValue: "Project published",
      group: "Content",
      description: "Title of toast card",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      defaultValue: "Your website is now live at forge-ui.sh",
      group: "Content",
      description: "Toast detail description",
    },
    {
      name: "actionText",
      label: "Action Button",
      type: "text",
      defaultValue: "View Site",
      group: "Content",
      description: "Right button action",
    },
  ],
  defaultProps: {
    title: "Project published",
    description: "Your website is now live at forge-ui.sh",
    actionText: "View Site",
  },
  examples: [],
  docs: {
    overview: "Accessible toast component with timed auto-dismiss and action triggers.",
    installation: {
      cli: "npx forge-ui add toast",
      npm: "npm install @radix-ui/react-toast",
    },
    usage: `import { useToast } from "@/components/ui/use-toast";

export function Example() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2026 at 5:57 PM",
        });
      }}
    >
      Show Toast
    </Button>
  );
}`,
    api: [],
    accessibility: {
      keyboardNav: ["Tab: Navigates to action button inside toast"],
      ariaNotes: ["Uses role='status' with aria-live='polite'"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <div
        className={`w-full max-w-sm rounded-lg border bg-background p-3.5 shadow-lg flex items-start justify-between gap-3 text-left ${getVisualStylesClass(
          visualStyles
        )}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <h5 className="font-semibold text-xs leading-none text-foreground">{props.title}</h5>
            <p className="text-[11px] text-muted-foreground">{props.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Button size="sm" variant="outline" className="h-7 text-[11px] px-2">
            {props.actionText}
          </Button>
          <button className="text-muted-foreground hover:text-foreground p-0.5">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    return `toast({
  title: "${props.title}",
  description: "${props.description}",
  action: <ToastAction altText="${props.actionText}">${props.actionText}</ToastAction>,
});`;
  },
};
