import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";
import { User, CreditCard, Settings, LogOut } from "lucide-react";

export const dropdownMenuDefinition: ComponentDefinition = {
  id: "dropdown-menu",
  name: "Dropdown Menu",
  description: "Displays a menu to the user—such as a set of actions or functions—triggered by a button.",
  category: "Overlay",
  icon: "Menu",
  tags: ["menu", "context", "actions", "dropdown", "popup"],
  props: [
    {
      name: "triggerText",
      label: "Trigger Text",
      type: "text",
      defaultValue: "Options",
      group: "Content",
      description: "Button text for menu trigger",
    },
    {
      name: "menuLabel",
      label: "Menu Header",
      type: "text",
      defaultValue: "My Account",
      group: "Content",
      description: "Section title inside menu",
    },
  ],
  defaultProps: {
    triggerText: "Options",
    menuLabel: "My Account",
  },
  examples: [],
  docs: {
    overview: "Accessible dropdown menu with keyboard roving, submenus, shortcuts, and custom positioning.",
    installation: {
      cli: "npx forge-ui add dropdown-menu",
      npm: "npm install @radix-ui/react-dropdown-menu",
    },
    usage: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    api: [
      {
        prop: "trigger",
        type: "ReactNode",
        defaultValue: "-",
        description: "The button or element that opens the dropdown",
      },
    ],
    accessibility: {
      keyboardNav: [
        "Down Arrow / Enter / Space: Opens dropdown and focuses first item",
        "Up / Down Arrow: Navigates through items",
        "Escape: Closes menu",
      ],
      ariaNotes: ["Renders role='menu' with role='menuitem'"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={getVisualStylesClass(visualStyles)}
            style={getVisualStylesInline(visualStyles)}
          >
            {props.triggerText}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>{props.menuLabel}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-3.5 w-3.5" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-3.5 w-3.5" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-3.5 w-3.5" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-3.5 w-3.5" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">${props.triggerText}</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-52">
    <DropdownMenuLabel>${props.menuLabel}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User className="mr-2 h-3.5 w-3.5" />
      <span>Profile</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="mr-2 h-3.5 w-3.5" />
      <span>Settings</span>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      <LogOut className="mr-2 h-3.5 w-3.5" />
      <span>Log out</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;
  },
};
