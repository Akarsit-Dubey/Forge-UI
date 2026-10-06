import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const avatarDefinition: ComponentDefinition = {
  id: "avatar",
  name: "Avatar",
  description: "An image element with a fallback for representing the user or project profile.",
  category: "Data Display",
  icon: "User",
  tags: ["user", "image", "profile", "avatar", "identity"],
  props: [
    {
      name: "src",
      label: "Image URL",
      type: "text",
      defaultValue: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      group: "Content",
      description: "Remote avatar image link",
    },
    {
      name: "fallback",
      label: "Fallback Text",
      type: "text",
      defaultValue: "SC",
      group: "Content",
      description: "Letters displayed if image fails to load",
    },
    {
      name: "status",
      label: "Status Indicator",
      type: "select",
      defaultValue: "online",
      group: "Style",
      description: "Presence ring or badge dot",
      options: [
        { label: "None", value: "none" },
        { label: "Online", value: "online" },
        { label: "Busy", value: "busy" },
        { label: "Offline", value: "offline" },
      ],
    },
  ],
  defaultProps: {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    fallback: "SC",
    status: "online",
  },
  examples: [],
  docs: {
    overview: "An avatar component rendering an image or fallback initials with status dots.",
    installation: {
      cli: "npx forge-ui add avatar",
      npm: "npm install @radix-ui/react-avatar",
    },
    usage: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}`,
    api: [
      {
        prop: "src",
        type: "string",
        defaultValue: "-",
        description: "Image source URL",
      },
    ],
    accessibility: {
      keyboardNav: ["Non-interactive element"],
      ariaNotes: ["Always provide alt text on AvatarImage or role='img' on AvatarFallback"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <div className="relative inline-flex items-center">
        <Avatar
          className={`${getVisualStylesClass(visualStyles)}`}
          style={getVisualStylesInline(visualStyles)}
        >
          <AvatarImage src={props.src} alt="User Avatar" />
          <AvatarFallback>{props.fallback}</AvatarFallback>
        </Avatar>
        {props.status !== "none" && (
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
              props.status === "online"
                ? "bg-emerald-500"
                : props.status === "busy"
                ? "bg-amber-500"
                : "bg-muted-foreground"
            }`}
          />
        )}
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<div className="relative inline-flex">
  <Avatar>
    <AvatarImage src="${props.src}" alt="Avatar" />
    <AvatarFallback>${props.fallback}</AvatarFallback>
  </Avatar>
  ${props.status !== "none" ? `<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${props.status === "online" ? "bg-emerald-500" : "bg-amber-500"}" />` : ""}
</div>`;
  },
};
