import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Button } from "@/components/ui/button";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  Heart,
  Mail,
  Plus,
  Send,
  Trash2,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  none: null,
  arrow: <ArrowRight className="h-3.5 w-3.5 ml-2" />,
  chevron: <ChevronRight className="h-3.5 w-3.5 ml-2" />,
  download: <Download className="h-3.5 w-3.5 mr-2" />,
  heart: <Heart className="h-3.5 w-3.5 mr-2" />,
  mail: <Mail className="h-3.5 w-3.5 mr-2" />,
  plus: <Plus className="h-3.5 w-3.5 mr-2" />,
  send: <Send className="h-3.5 w-3.5 ml-2" />,
  trash: <Trash2 className="h-3.5 w-3.5 mr-2" />,
  check: <Check className="h-3.5 w-3.5 mr-2" />,
};

export const buttonDefinition: ComponentDefinition = {
  id: "button",
  name: "Button",
  description: "Displays a button or a component that looks like a button with multiple variants, sizes and interactive states.",
  category: "Forms",
  icon: "Square",
  tags: ["action", "trigger", "clickable", "form"],
  props: [
    {
      name: "label",
      label: "Label",
      type: "text",
      defaultValue: "Button Action",
      group: "Content",
      description: "Text content displayed inside the button",
    },
    {
      name: "variant",
      label: "Variant",
      type: "select",
      defaultValue: "default",
      group: "Core",
      description: "Visual appearance style of the button",
      options: [
        { label: "Default", value: "default" },
        { label: "Secondary", value: "secondary" },
        { label: "Destructive", value: "destructive" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
        { label: "Link", value: "link" },
        { label: "Subtle", value: "subtle" },
      ],
    },
    {
      name: "size",
      label: "Size",
      type: "segmented",
      defaultValue: "default",
      group: "Core",
      description: "Button dimensions and padding",
      options: [
        { label: "SM", value: "sm" },
        { label: "MD", value: "default" },
        { label: "LG", value: "lg" },
        { label: "Icon", value: "icon" },
      ],
    },
    {
      name: "icon",
      label: "Icon",
      type: "select",
      defaultValue: "none",
      group: "Content",
      description: "Optional Lucide icon paired with button",
      options: [
        { label: "None", value: "none" },
        { label: "Arrow Right", value: "arrow" },
        { label: "Chevron Right", value: "chevron" },
        { label: "Download", value: "download" },
        { label: "Heart", value: "heart" },
        { label: "Mail", value: "mail" },
        { label: "Plus", value: "plus" },
        { label: "Send", value: "send" },
        { label: "Trash", value: "trash" },
        { label: "Check", value: "check" },
      ],
    },
    {
      name: "isLoading",
      label: "Loading",
      type: "boolean",
      defaultValue: false,
      group: "State",
      description: "Displays a loading spinner and disables user interaction",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      defaultValue: false,
      group: "State",
      description: "Disables pointer events and lowers opacity",
    },
  ],
  defaultProps: {
    label: "Button Action",
    variant: "default",
    size: "default",
    icon: "none",
    isLoading: false,
    disabled: false,
  },
  examples: [
    {
      id: "primary",
      title: "Primary Call to Action",
      description: "High-emphasis default button for key user actions",
      props: { label: "Get Started", variant: "default", size: "default", icon: "arrow" },
    },
    {
      id: "outline-icon",
      title: "Outline with Icon",
      description: "Secondary action with leading icon",
      props: { label: "Download Report", variant: "outline", size: "default", icon: "download" },
    },
    {
      id: "destructive-action",
      title: "Destructive Action",
      description: "Irreversible action warning pattern",
      props: { label: "Delete Repository", variant: "destructive", size: "default", icon: "trash" },
    },
    {
      id: "loading-state",
      title: "Loading State",
      description: "Active asynchronous submission state",
      props: { label: "Saving changes...", variant: "default", size: "default", isLoading: true },
    },
    {
      id: "ghost-subtle",
      title: "Ghost Minimal",
      description: "Subtle action blending into the toolbar",
      props: { label: "Learn More", variant: "ghost", size: "sm", icon: "chevron" },
    },
  ],
  docs: {
    overview:
      "Buttons initiate app actions or navigate to other destinations. Built with accessible keyboard focus rings, variant states, and fluid micro-interaction feedback.",
    installation: {
      cli: "npx forge-ui add button",
      npm: "npm install @forge-ui/button class-variance-authority lucide-react",
    },
    usage: `import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Example() {
  return (
    <Button variant="default" size="default">
      Get Started <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}`,
    api: [
      {
        prop: "variant",
        type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "subtle"',
        defaultValue: '"default"',
        description: "Visual aesthetic style variant",
      },
      {
        prop: "size",
        type: '"default" | "sm" | "lg" | "icon"',
        defaultValue: '"default"',
        description: "Height, padding and typography scale",
      },
      {
        prop: "isLoading",
        type: "boolean",
        defaultValue: "false",
        description: "Displays animated spinner and locks interactions",
      },
      {
        prop: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Prevents click events and applies 50% opacity",
      },
      {
        prop: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Merges props onto child element (e.g. Next.js Link)",
      },
    ],
    accessibility: {
      keyboardNav: [
        "Space: Activates button action",
        "Enter: Activates button action",
        "Tab: Moves focus to button with visible ring",
      ],
      ariaNotes: [
        "Uses native <button> with type='button' by default",
        "Sets aria-disabled when disabled or isLoading is active",
        "For icon-only buttons, provide an aria-label attribute",
      ],
    },
  },
  component: ({ props, visualStyles }) => {
    const isIconOnly = props.size === "icon";
    const selectedIcon = iconMap[props.icon] || null;
    const isLeading = ["download", "heart", "mail", "plus", "trash", "check"].includes(props.icon);

    return (
      <Button
        variant={props.variant}
        size={props.size}
        isLoading={props.isLoading}
        disabled={props.disabled}
        className={getVisualStylesClass(visualStyles)}
        style={getVisualStylesInline(visualStyles)}
      >
        {isIconOnly ? (
          selectedIcon || <Plus className="h-4 w-4" />
        ) : (
          <>
            {isLeading && selectedIcon}
            {props.label}
            {!isLeading && selectedIcon}
          </>
        )}
      </Button>
    );
  },
  generateCode: (props, visualStyles) => {
    const hasIcon = props.icon && props.icon !== "none";
    const isLeading = ["download", "heart", "mail", "plus", "trash", "check"].includes(props.icon);
    const iconName = props.icon ? props.icon.charAt(0).toUpperCase() + props.icon.slice(1) : "";

    const propsList: string[] = [];
    if (props.variant && props.variant !== "default") propsList.push(`variant="${props.variant}"`);
    if (props.size && props.size !== "default") propsList.push(`size="${props.size}"`);
    if (props.isLoading) propsList.push("isLoading");
    if (props.disabled) propsList.push("disabled");

    const visualClass = getVisualStylesClass(visualStyles).trim();
    if (visualClass) propsList.push(`className="${visualClass}"`);

    const propsString = propsList.length > 0 ? " " + propsList.join(" ") : "";

    if (props.size === "icon") {
      return `<Button${propsString} aria-label="${props.label}">\n  <${hasIcon ? iconName : "Plus"} className="h-4 w-4" />\n</Button>`;
    }

    if (hasIcon) {
      if (isLeading) {
        return `<Button${propsString}>\n  <${iconName} className="mr-2 h-3.5 w-3.5" />\n  ${props.label}\n</Button>`;
      }
      return `<Button${propsString}>\n  ${props.label}\n  <${iconName} className="ml-2 h-3.5 w-3.5" />\n</Button>`;
    }

    return `<Button${propsString}>\n  ${props.label}\n</Button>`;
  },
};
