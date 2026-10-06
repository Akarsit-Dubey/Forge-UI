import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Search, User, Settings, Sparkles } from "lucide-react";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const commandDefinition: ComponentDefinition = {
  id: "command",
  name: "Command",
  description: "Fast, composable, unstyled command menu for React.",
  category: "Navigation",
  icon: "Command",
  tags: ["command", "palette", "cmdk", "search", "shortcuts"],
  props: [
    {
      name: "placeholder",
      label: "Placeholder",
      type: "text",
      defaultValue: "Type a command or search...",
      group: "Content",
      description: "Search prompt in command header",
    },
  ],
  defaultProps: {
    placeholder: "Type a command or search...",
  },
  examples: [],
  docs: {
    overview: "In-app command bar inspired by macOS Spotlight, Linear and Raycast.",
    installation: {
      cli: "npx forge-ui add command",
      npm: "npm install cmdk lucide-react",
    },
    usage: `<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    api: [],
    accessibility: {
      keyboardNav: ["Arrow Down / Up: Moves active cursor", "Enter: Selects command"],
      ariaNotes: ["Uses combobox pattern with listbox and options"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <div
        className={`w-full max-w-sm rounded-lg border bg-popover text-popover-foreground shadow-md overflow-hidden text-left ${getVisualStylesClass(
          visualStyles
        )}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-3.5 w-3.5 shrink-0 opacity-50" />
          <input
            className="flex h-9 w-full rounded-md bg-transparent py-2 text-xs outline-none placeholder:text-muted-foreground"
            placeholder={props.placeholder}
          />
        </div>
        <div className="p-1 space-y-1 text-xs">
          <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase">
            Suggestions
          </div>
          <div className="flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer hover:bg-accent text-xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>Generate Design Tokens</span>
          </div>
          <div className="flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer hover:bg-accent text-xs">
            <User className="h-3.5 w-3.5" />
            <span>Profile Settings</span>
          </div>
          <div className="flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer hover:bg-accent text-xs">
            <Settings className="h-3.5 w-3.5" />
            <span>Project Preferences</span>
          </div>
        </div>
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="${props.placeholder}" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Generate Design Tokens</CommandItem>
      <CommandItem>Profile Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`;
  },
};
