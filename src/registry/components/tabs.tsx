import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const tabsDefinition: ComponentDefinition = {
  id: "tabs",
  name: "Tabs",
  description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  category: "Navigation",
  icon: "Folders",
  tags: ["segmented", "panels", "navigation", "switcher"],
  props: [
    {
      name: "tab1",
      label: "Tab 1 Title",
      type: "text",
      defaultValue: "Overview",
      group: "Content",
      description: "First tab trigger label",
    },
    {
      name: "tab2",
      label: "Tab 2 Title",
      type: "text",
      defaultValue: "Deployments",
      group: "Content",
      description: "Second tab trigger label",
    },
    {
      name: "tab3",
      label: "Tab 3 Title",
      type: "text",
      defaultValue: "Settings",
      group: "Content",
      description: "Third tab trigger label",
    },
  ],
  defaultProps: {
    tab1: "Overview",
    tab2: "Deployments",
    tab3: "Settings",
  },
  examples: [
    {
      id: "code-preview-tabs",
      title: "Preview & Code Switcher",
      description: "Developer tool tab switcher pattern",
      props: { tab1: "Preview", tab2: "Code", tab3: "CSS" },
    },
  ],
  docs: {
    overview:
      "Accessible tabs conforming to WAI-ARIA tab pattern, supporting arrow key cycling, roving tabindex, and animated transitions.",
    installation: {
      cli: "npx forge-ui add tabs",
      npm: "npm install @radix-ui/react-tabs",
    },
    usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Example() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings content.</TabsContent>
      <TabsContent value="password">Change password here.</TabsContent>
    </Tabs>
  );
}`,
    api: [
      {
        prop: "defaultValue",
        type: "string",
        defaultValue: "-",
        description: "The value of the tab that should be active when initially rendered",
      },
    ],
    accessibility: {
      keyboardNav: [
        "Left Arrow: Moves focus to previous tab trigger",
        "Right Arrow: Moves focus to next tab trigger",
        "Home / End: Focuses first / last tab",
      ],
      ariaNotes: [
        "Renders role='tablist' on TabsList",
        "Renders role='tab' on TabsTrigger with aria-selected",
        "Renders role='tabpanel' on TabsContent with aria-labelledby",
      ],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <Tabs
        defaultValue="tab1"
        className={`w-full max-w-sm text-left ${getVisualStylesClass(visualStyles)}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tab1">{props.tab1}</TabsTrigger>
          <TabsTrigger value="tab2">{props.tab2}</TabsTrigger>
          <TabsTrigger value="tab3">{props.tab3}</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="mt-3">
          <div className="rounded-lg border bg-card p-4 text-card-foreground text-xs shadow-sm space-y-2">
            <h4 className="font-semibold">{props.tab1} Dashboard</h4>
            <p className="text-muted-foreground">All systems operational in eu-west-1 and us-east-1.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab2" className="mt-3">
          <div className="rounded-lg border bg-card p-4 text-card-foreground text-xs shadow-sm space-y-2">
            <h4 className="font-semibold">{props.tab2} List</h4>
            <p className="text-muted-foreground">Recent deployment pushed 12 minutes ago by @alex.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab3" className="mt-3">
          <div className="rounded-lg border bg-card p-4 text-card-foreground text-xs shadow-sm space-y-2">
            <h4 className="font-semibold">{props.tab3} Panel</h4>
            <p className="text-muted-foreground">Manage environment variables and webhook secrets.</p>
          </div>
        </TabsContent>
      </Tabs>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<Tabs defaultValue="tab1" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="tab1">${props.tab1}</TabsTrigger>
    <TabsTrigger value="tab2">${props.tab2}</TabsTrigger>
    <TabsTrigger value="tab3">${props.tab3}</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <div className="p-4 border rounded-md text-xs">
      ${props.tab1} content.
    </div>
  </TabsContent>
  <TabsContent value="tab2">
    <div className="p-4 border rounded-md text-xs">
      ${props.tab2} content.
    </div>
  </TabsContent>
  <TabsContent value="tab3">
    <div className="p-4 border rounded-md text-xs">
      ${props.tab3} content.
    </div>
  </TabsContent>
</Tabs>`;
  },
};
