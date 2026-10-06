import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const paginationDefinition: ComponentDefinition = {
  id: "pagination",
  name: "Pagination",
  description: "Pagination with page navigation, next and previous buttons.",
  category: "Navigation",
  icon: "ArrowLeftRight",
  tags: ["pagination", "pages", "navigation", "table"],
  props: [
    {
      name: "currentPage",
      label: "Active Page",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 10,
      group: "Core",
      description: "Active page index",
    },
  ],
  defaultProps: {
    currentPage: 2,
  },
  examples: [],
  docs: {
    overview: "Accessible pagination bar with previous/next triggers and active page state.",
    installation: {
      cli: "npx forge-ui add pagination",
      npm: "npm install @forge-ui/pagination lucide-react",
    },
    usage: `<nav role="navigation" aria-label="pagination">
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</nav>`,
    api: [],
    accessibility: {
      keyboardNav: ["Tab: Navigates through page buttons"],
      ariaNotes: ["Uses role='navigation' with aria-label='pagination'"],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <nav
        role="navigation"
        aria-label="pagination"
        className={`flex items-center space-x-1 ${getVisualStylesClass(visualStyles)}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2.5 text-xs">
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Previous</span>
        </Button>
        <Button variant={props.currentPage === 1 ? "outline" : "ghost"} size="sm" className="h-8 w-8 text-xs p-0">
          1
        </Button>
        <Button variant={props.currentPage === 2 ? "outline" : "ghost"} size="sm" className="h-8 w-8 text-xs p-0">
          2
        </Button>
        <Button variant={props.currentPage === 3 ? "outline" : "ghost"} size="sm" className="h-8 w-8 text-xs p-0">
          3
        </Button>
        <div className="flex h-8 w-8 items-center justify-center text-xs">
          <MoreHorizontal className="h-3.5 w-3.5 opacity-60" />
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 text-xs p-0">
          10
        </Button>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2.5 text-xs">
          <span>Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </nav>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<nav role="navigation" aria-label="pagination" className="flex items-center space-x-1">
  <Button variant="ghost" size="sm" className="gap-1">
    <ChevronLeft className="h-3.5 w-3.5" /> Previous
  </Button>
  <Button variant="${props.currentPage === 1 ? "outline" : "ghost"}" size="sm">1</Button>
  <Button variant="${props.currentPage === 2 ? "outline" : "ghost"}" size="sm">2</Button>
  <Button variant="${props.currentPage === 3 ? "outline" : "ghost"}" size="sm">3</Button>
  <Button variant="ghost" size="sm" className="gap-1">
    Next <ChevronRight className="h-3.5 w-3.5" />
  </Button>
</nav>`;
  },
};
