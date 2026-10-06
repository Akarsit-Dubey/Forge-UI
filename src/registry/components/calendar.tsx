import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

function CalendarPreviewComponent({
  props,
  visualStyles,
}: {
  props: Record<string, any>;
  visualStyles: any;
}) {
  const days = [
    "", "", "", 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, ""
  ];

  const [selectedDay, setSelectedDay] = React.useState<number | null>(6);

  return (
    <div
      className={`w-full max-w-[280px] rounded-lg border bg-card p-3 shadow-sm text-center text-xs ${getVisualStylesClass(
        visualStyles
      )}`}
      style={getVisualStylesInline(visualStyles)}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b">
        <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-muted">
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="font-semibold text-xs">{props.month}</span>
        <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-muted">
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-[10px] text-muted-foreground font-medium mb-1">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs">
        {days.map((d, i) => (
          <button
            key={i}
            onClick={() => typeof d === "number" && setSelectedDay(d)}
            className={`h-7 w-7 rounded flex items-center justify-center text-[11px] transition-colors ${
              d === "" ? "opacity-0 pointer-events-none" : ""
            } ${
              d === selectedDay
                ? "bg-primary text-primary-foreground font-semibold"
                : "hover:bg-accent text-foreground"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

export const calendarDefinition: ComponentDefinition = {
  id: "calendar",
  name: "Calendar",
  description: "A date field component that allows users to enter and select date values.",
  category: "Forms",
  icon: "Calendar",
  tags: ["date", "picker", "calendar", "month", "schedule"],
  props: [
    {
      name: "month",
      label: "Month Title",
      type: "text",
      defaultValue: "October 2026",
      group: "Content",
      description: "Active month header",
    },
  ],
  defaultProps: {
    month: "October 2026",
  },
  examples: [],
  docs: {
    overview: "Accessible calendar component supporting keyboard navigation across date cells.",
    installation: {
      cli: "npx forge-ui add calendar",
      npm: "npm install @forge-ui/calendar lucide-react",
    },
    usage: `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`,
    api: [],
    accessibility: {
      keyboardNav: ["Arrow keys: Traverse days", "Enter: Selects date"],
      ariaNotes: ["Renders role='grid' with aria-selected='true' on chosen date"],
    },
  },
  component: CalendarPreviewComponent,
  generateCode: (_props, _visualStyles) => {
    return `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`;
  },
};
