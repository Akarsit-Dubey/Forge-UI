import { ComponentDefinition, ComponentCategory } from "./schema";
import { buttonDefinition } from "./components/button";
import { inputDefinition } from "./components/input";
import { textareaDefinition } from "./components/textarea";
import { selectDefinition } from "./components/select";
import { checkboxDefinition } from "./components/checkbox";
import { radioGroupDefinition } from "./components/radio-group";
import { switchDefinition } from "./components/switch";
import { sliderDefinition } from "./components/slider";
import { badgeDefinition } from "./components/badge";
import { avatarDefinition } from "./components/avatar";
import { cardDefinition } from "./components/card";
import { alertDefinition } from "./components/alert";
import { dialogDefinition } from "./components/dialog";
import { drawerDefinition } from "./components/drawer";
import { dropdownMenuDefinition } from "./components/dropdown-menu";
import { tabsDefinition } from "./components/tabs";
import { accordionDefinition } from "./components/accordion";
import { tooltipDefinition } from "./components/tooltip";
import { popoverDefinition } from "./components/popover";
import { tableDefinition } from "./components/table";
import { paginationDefinition } from "./components/pagination";
import { breadcrumbDefinition } from "./components/breadcrumb";
import { commandDefinition } from "./components/command";
import { calendarDefinition } from "./components/calendar";
import { toastDefinition } from "./components/toast";
import { skeletonDefinition } from "./components/skeleton";
import { progressDefinition } from "./components/progress";

export const componentRegistry: Record<string, ComponentDefinition> = {
  button: buttonDefinition,
  input: inputDefinition,
  textarea: textareaDefinition,
  select: selectDefinition,
  checkbox: checkboxDefinition,
  "radio-group": radioGroupDefinition,
  switch: switchDefinition,
  slider: sliderDefinition,
  badge: badgeDefinition,
  avatar: avatarDefinition,
  card: cardDefinition,
  alert: alertDefinition,
  dialog: dialogDefinition,
  drawer: drawerDefinition,
  "dropdown-menu": dropdownMenuDefinition,
  tabs: tabsDefinition,
  accordion: accordionDefinition,
  tooltip: tooltipDefinition,
  popover: popoverDefinition,
  table: tableDefinition,
  pagination: paginationDefinition,
  breadcrumb: breadcrumbDefinition,
  command: commandDefinition,
  calendar: calendarDefinition,
  toast: toastDefinition,
  skeleton: skeletonDefinition,
  progress: progressDefinition,
};

export const allComponents: ComponentDefinition[] = Object.values(componentRegistry);

export const categories: ComponentCategory[] = [
  "Forms",
  "Layout",
  "Navigation",
  "Feedback",
  "Overlay",
  "Data Display",
  "Typography",
  "Utility",
];

export function getComponent(id: string): ComponentDefinition | undefined {
  return componentRegistry[id];
}

export function getAllComponents(): ComponentDefinition[] {
  return allComponents;
}

export function getComponentsByCategory(category: ComponentCategory): ComponentDefinition[] {
  return allComponents.filter((comp) => comp.category === category);
}

export function searchComponents(query: string): ComponentDefinition[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return allComponents;
  return allComponents.filter(
    (c) =>
      c.name.toLowerCase().includes(clean) ||
      c.description.toLowerCase().includes(clean) ||
      c.tags.some((t) => t.toLowerCase().includes(clean)) ||
      c.category.toLowerCase().includes(clean)
  );
}
