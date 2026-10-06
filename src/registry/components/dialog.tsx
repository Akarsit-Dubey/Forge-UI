import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const dialogDefinition: ComponentDefinition = {
  id: "dialog",
  name: "Dialog",
  description: "A modal window that interrupts the user with critical information or an interactive sub-flow.",
  category: "Overlay",
  icon: "AppWindow",
  tags: ["modal", "popup", "window", "overlay", "confirm"],
  props: [
    {
      name: "triggerText",
      label: "Trigger Text",
      type: "text",
      defaultValue: "Open Dialog",
      group: "Content",
      description: "Button text to open modal",
    },
    {
      name: "title",
      label: "Dialog Title",
      type: "text",
      defaultValue: "Edit Profile",
      group: "Content",
      description: "Modal header title",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      defaultValue: "Make changes to your profile here. Click save when you're done.",
      group: "Content",
      description: "Sub-heading context text",
    },
    {
      name: "confirmText",
      label: "Confirm Button",
      type: "text",
      defaultValue: "Save Changes",
      group: "Content",
      description: "Primary action button label",
    },
  ],
  defaultProps: {
    triggerText: "Open Dialog",
    title: "Edit Profile",
    description: "Make changes to your profile here. Click save when you're done.",
    confirmText: "Save Changes",
  },
  examples: [
    {
      id: "delete-confirmation",
      title: "Destructive Confirmation",
      description: "Confirm dangerous irreversible action",
      props: {
        triggerText: "Delete Project",
        title: "Are you absolutely sure?",
        description: "This action cannot be undone. This will permanently delete your cluster.",
        confirmText: "Delete Project",
      },
    },
  ],
  docs: {
    overview:
      "A modal dialog built with Radix UI Dialog primitive featuring focus trapping, escape key closing, backdrop click dismissal, and accessible ARIA attributes.",
    installation: {
      cli: "npx forge-ui add dialog",
      npm: "npm install @radix-ui/react-dialog",
    },
    usage: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Description goes here.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}`,
    api: [
      {
        prop: "open",
        type: "boolean",
        defaultValue: "undefined",
        description: "Controlled open state of the dialog",
      },
      {
        prop: "onOpenChange",
        type: "(open: boolean) => void",
        defaultValue: "undefined",
        description: "Event handler called when open state changes",
      },
    ],
    accessibility: {
      keyboardNav: [
        "Escape: Closes the dialog and returns focus to trigger",
        "Tab: Traps focus strictly within dialog contents",
      ],
      ariaNotes: [
        "Renders role='dialog' with aria-modal='true'",
        "Automatically links DialogTitle via aria-labelledby",
        "Links DialogDescription via aria-describedby",
      ],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={getVisualStylesClass(visualStyles)}
            style={getVisualStylesInline(visualStyles)}
          >
            {props.triggerText}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>{props.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-3">
            <div className="grid grid-cols-4 items-center gap-3">
              <label className="text-right text-xs font-medium text-muted-foreground">Name</label>
              <Input defaultValue="Sarah Connor" className="col-span-3 h-8 text-xs" />
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <label className="text-right text-xs font-medium text-muted-foreground">Username</label>
              <Input defaultValue="@sconnor" className="col-span-3 h-8 text-xs" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" size="sm">
              {props.confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">${props.triggerText}</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>${props.title}</DialogTitle>
      <DialogDescription>
        ${props.description}
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <Input placeholder="Enter username" />
    </div>
    <DialogFooter>
      <Button type="submit">${props.confirmText}</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;
  },
};
