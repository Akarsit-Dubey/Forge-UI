import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { ChevronRight, Home } from "lucide-react";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const breadcrumbDefinition: ComponentDefinition = {
  id: "breadcrumb",
  name: "Breadcrumb",
  description: "Displays the path to the current resource using a hierarchy of links.",
  category: "Navigation",
  icon: "ChevronRight",
  tags: ["navigation", "breadcrumb", "hierarchy", "path"],
  props: [
    {
      name: "root",
      label: "Root Item",
      type: "text",
      defaultValue: "Dashboard",
      group: "Content",
      description: "First parent directory",
    },
    {
      name: "section",
      label: "Section Item",
      type: "text",
      defaultValue: "Settings",
      group: "Content",
      description: "Intermediate category",
    },
    {
      name: "current",
      label: "Current Page",
      type: "text",
      defaultValue: "API Keys",
      group: "Content",
      description: "Active terminal page",
    },
  ],
  defaultProps: {
    root: "Dashboard",
    section: "Settings",
    current: "API Keys",
  },
  examples: [],
  docs: {
    overview: "Accessible breadcrumb component with nav landmark and aria-current='page'.",
    installation: {
      cli: "npx forge-ui add breadcrumb",
      npm: "npm install @forge-ui/breadcrumb lucide-react",
    },
    usage: `<nav aria-label="Breadcrumb">
  <ol className="flex items-center space-x-2 text-xs">
    <li><a href="/">Home</a></li>
    <li>/</li>
    <li><span>Docs</span></li>
  </ol>
</nav>`,
    api: [],
    accessibility: {
      keyboardNav: ["Tab: Cycles through link anchors"],
      ariaNotes: ["Uses nav with aria-label='Breadcrumb' and aria-current='page' on active"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-xs text-muted-foreground ${getVisualStylesClass(
          visualStyles
        )}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <ol className="inline-flex items-center space-x-1.5">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              <span>{props.root}</span>
            </a>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          </li>
          <li>
            <a href="#" className="hover:text-foreground transition-colors">
              {props.section}
            </a>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          </li>
          <li aria-current="page">
            <span className="font-semibold text-foreground">{props.current}</span>
          </li>
        </ol>
      </nav>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground">
  <ol className="inline-flex items-center space-x-1.5">
    <li><a href="#" className="hover:text-foreground">${props.root}</a></li>
    <li><ChevronRight className="h-3.5 w-3.5" /></li>
    <li><a href="#" className="hover:text-foreground">${props.section}</a></li>
    <li><ChevronRight className="h-3.5 w-3.5" /></li>
    <li aria-current="page" className="font-semibold text-foreground">${props.current}</li>
  </ol>
</nav>`;
  },
};
