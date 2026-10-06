import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, PanelRight } from "lucide-react";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

function DrawerPreviewComponent({
  props,
  visualStyles,
}: {
  props: Record<string, any>;
  visualStyles: any;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="text-center">
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className={`gap-2 ${getVisualStylesClass(visualStyles)}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <PanelRight className="h-3.5 w-3.5" />
        <span>Open Slideout Sheet</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in text-left">
          <div className="relative w-full max-w-sm h-full bg-background border-l border-border p-6 shadow-2xl flex flex-col justify-between animate-scale-in">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold">{props.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{props.description}</p>
              </div>
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Variable Key</label>
                  <Input defaultValue="DATABASE_URL" className="h-8 text-xs font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Secret Value</label>
                  <Input defaultValue="postgres://user:***@host/db" type="password" className="h-8 text-xs font-mono" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setIsOpen(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const drawerDefinition: ComponentDefinition = {
  id: "drawer",
  name: "Drawer / Sheet",
  description: "Extends the Dialog component to display content that complements the screen, sliding from any edge.",
  category: "Overlay",
  icon: "PanelRight",
  tags: ["sheet", "drawer", "sidebar", "panel", "flyout"],
  props: [
    {
      name: "title",
      label: "Sheet Title",
      type: "text",
      defaultValue: "Edit Configuration",
      group: "Content",
      description: "Header title of the slideout",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      defaultValue: "Configure deployment properties and environment variables.",
      group: "Content",
      description: "Subtitle in header",
    },
  ],
  defaultProps: {
    title: "Edit Configuration",
    description: "Configure deployment properties and environment variables.",
  },
  examples: [],
  docs: {
    overview: "A slideout sheet component typically anchored to the right or bottom of the viewport.",
    installation: {
      cli: "npx forge-ui add sheet",
      npm: "npm install @radix-ui/react-dialog",
    },
    usage: `<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    api: [],
    accessibility: {
      keyboardNav: ["Escape: Dismisses sheet", "Focus trap inside sheet"],
      ariaNotes: ["Renders role='dialog' with aria-modal='true'"],
    },
  },
  component: DrawerPreviewComponent,
  generateCode: (props, _visualStyles) => {
    return `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>${props.title}</SheetTitle>
      <SheetDescription>
        ${props.description}
      </SheetDescription>
    </SheetHeader>
    <div className="py-4">
      <Input placeholder="Enter key" />
    </div>
  </SheetContent>
</Sheet>`;
  },
};
