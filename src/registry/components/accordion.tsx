import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const accordionDefinition: ComponentDefinition = {
  id: "accordion",
  name: "Accordion",
  description: "A vertically stacked set of interactive headings that each reveal a section of content.",
  category: "Layout",
  icon: "ChevronsDownUp",
  tags: ["collapse", "expand", "disclosure", "accordion", "faq"],
  props: [
    {
      name: "type",
      label: "Expansion Mode",
      type: "segmented",
      defaultValue: "single",
      group: "Core",
      description: "Allow single or multiple open items",
      options: [
        { label: "Single", value: "single" },
        { label: "Multiple", value: "multiple" },
      ],
    },
    {
      name: "item1Title",
      label: "Section 1 Title",
      type: "text",
      defaultValue: "Is it accessible?",
      group: "Content",
      description: "First accordion header",
    },
    {
      name: "item2Title",
      label: "Section 2 Title",
      type: "text",
      defaultValue: "Is it customizable?",
      group: "Content",
      description: "Second accordion header",
    },
  ],
  defaultProps: {
    type: "single",
    item1Title: "Is it accessible?",
    item2Title: "Is it customizable?",
  },
  examples: [],
  docs: {
    overview: "Built using Radix Accordion with keyboard navigation and smooth height animations.",
    installation: {
      cli: "npx forge-ui add accordion",
      npm: "npm install @radix-ui/react-accordion",
    },
    usage: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
    api: [
      {
        prop: "type",
        type: '"single" | "multiple"',
        defaultValue: '"single"',
        description: "Determines whether one or multiple items can be opened at the same time",
      },
    ],
    accessibility: {
      keyboardNav: [
        "Enter / Space: Expands or collapses item",
        "Down Arrow: Focuses next accordion trigger",
        "Up Arrow: Focuses previous accordion trigger",
      ],
      ariaNotes: ["Renders button with aria-expanded and aria-controls"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <div
        className={`w-full max-w-sm text-left ${getVisualStylesClass(visualStyles)}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <Accordion type={props.type as any} collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{props.item1Title}</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern with full keyboard navigation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>{props.item2Title}</AccordionTrigger>
            <AccordionContent>
              Yes. Styled with Tailwind CSS and CSS variables for instant theming.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I use it with Next.js?</AccordionTrigger>
            <AccordionContent>
              Absolutely. Works seamlessly with Next.js 14 App Router and Server Components.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<Accordion type="${props.type}" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>${props.item1Title}</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>${props.item2Title}</AccordionTrigger>
    <AccordionContent>
      Yes. Styled with Tailwind CSS and CSS variables.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;
  },
};
