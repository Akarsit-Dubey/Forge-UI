import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const cardDefinition: ComponentDefinition = {
  id: "card",
  name: "Card",
  description: "Displays a grouped surface container with structured header, title, description, content body and interactive footer.",
  category: "Layout",
  icon: "SquareDashed",
  tags: ["container", "surface", "panel", "box", "layout"],
  props: [
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Project Deployment",
      group: "Content",
      description: "Card header primary title",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      defaultValue: "Production build completed in 42s with zero warnings.",
      group: "Content",
      description: "Header description subtitle",
    },
    {
      name: "badgeText",
      label: "Badge Text",
      type: "text",
      defaultValue: "Live Active",
      group: "Content",
      description: "Header status badge label",
    },
    {
      name: "showBadge",
      label: "Show Badge",
      type: "boolean",
      defaultValue: true,
      group: "Style",
      description: "Renders status pill in top right corner",
    },
    {
      name: "showFooter",
      label: "Show Footer",
      type: "boolean",
      defaultValue: true,
      group: "Core",
      description: "Includes action buttons in bottom container",
    },
    {
      name: "primaryButtonText",
      label: "Action Label",
      type: "text",
      defaultValue: "Inspect Domain",
      group: "Content",
      description: "Primary action button label",
    },
  ],
  defaultProps: {
    title: "Project Deployment",
    description: "Production build completed in 42s with zero warnings.",
    badgeText: "Live Active",
    showBadge: true,
    showFooter: true,
    primaryButtonText: "Inspect Domain",
  },
  examples: [
    {
      id: "metric-card",
      title: "Metric Summary",
      description: "Clean analytics card with KPI stat",
      props: {
        title: "API Throughput",
        description: "1.4M requests processed in the last 24 hours.",
        badgeText: "+14.2%",
        showBadge: true,
        showFooter: true,
        primaryButtonText: "View Analytics",
      },
    },
    {
      id: "billing-plan",
      title: "Subscription Tier",
      description: "SaaS pricing or resource tier card",
      props: {
        title: "Enterprise Plan",
        description: "Unlimited seats, dedicated compute and 99.99% uptime SLA.",
        badgeText: "Popular",
        showBadge: true,
        showFooter: true,
        primaryButtonText: "Upgrade Workspace",
      },
    },
  ],
  docs: {
    overview:
      "Cards group related content and actions about a single subject. Highly modular with subcomponents for Header, Title, Description, Content, and Footer.",
    installation: {
      cli: "npx forge-ui add card",
      npm: "npm install @forge-ui/card",
    },
    usage: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Card body content goes here.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}`,
    api: [
      {
        prop: "CardHeader",
        type: "ReactNode",
        defaultValue: "-",
        description: "Container for title, description and action badges",
      },
      {
        prop: "CardTitle",
        type: "ReactNode",
        defaultValue: "-",
        description: "Prominent card heading (renders h3 by default)",
      },
      {
        prop: "CardContent",
        type: "ReactNode",
        defaultValue: "-",
        description: "Main body area of the card",
      },
      {
        prop: "CardFooter",
        type: "ReactNode",
        defaultValue: "-",
        description: "Bottom action bar aligned with flex justify-between",
      },
    ],
    accessibility: {
      keyboardNav: [
        "Card itself is not interactive unless wrapped in link/button",
        "Tab: Cycles through interactive children within CardContent and CardFooter",
      ],
      ariaNotes: [
        "Use CardTitle as the accessible name for landmark regions if applicable",
        "Ensure contrast of border and background meets WCAG AA 3:1",
      ],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <Card
        className={`w-full max-w-sm text-left ${getVisualStylesClass(visualStyles)}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">{props.title}</CardTitle>
            {props.showBadge && (
              <Badge variant="success" className="text-[10px] font-medium">
                {props.badgeText}
              </Badge>
            )}
          </div>
          <CardDescription className="text-xs">{props.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-3 text-xs text-muted-foreground space-y-2">
          <div className="flex items-center gap-2 rounded-md bg-muted/40 p-2.5 border border-border/40">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span className="font-mono text-[11px] text-foreground">edge-prod-iad1.internal</span>
          </div>
        </CardContent>
        {props.showFooter && (
          <CardFooter className="flex justify-between pt-1">
            <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
              Dismiss
            </Button>
            <Button size="sm" className="h-7 text-xs">
              {props.primaryButtonText} <ArrowUpRight className="ml-1.5 h-3 w-3" />
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  },
  generateCode: (props, visualStyles) => {
    const visualClass = getVisualStylesClass(visualStyles).trim();
    const classNameStr = visualClass ? ` className="w-full max-w-sm ${visualClass}"` : ' className="w-full max-w-sm"';

    return `<Card${classNameStr}>
  <CardHeader className="pb-3">
    <div className="flex items-center justify-between">
      <CardTitle className="text-sm font-semibold">${props.title}</CardTitle>
      ${props.showBadge ? `<Badge variant="success">${props.badgeText}</Badge>` : ""}
    </div>
    <CardDescription className="text-xs">${props.description}</CardDescription>
  </CardHeader>
  <CardContent className="pb-3 text-xs text-muted-foreground">
    <div className="flex items-center gap-2 rounded-md bg-muted/40 p-2.5 border border-border/40 font-mono text-[11px]">
      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      <span>edge-prod-iad1.internal</span>
    </div>
  </CardContent>
  ${
    props.showFooter
      ? `<CardFooter className="flex justify-between pt-1">
    <Button variant="ghost" size="sm">Dismiss</Button>
    <Button size="sm">
      ${props.primaryButtonText} <ArrowUpRight className="ml-1.5 h-3 w-3" />
    </Button>
  </CardFooter>`
      : ""
  }
</Card>`;
  },
};
