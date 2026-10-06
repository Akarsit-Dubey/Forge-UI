import { ComponentDefinition, VisualStyles } from "@/registry/schema";
import { getVisualStylesClass } from "./style-utils";

export function generateTsxCode(
  component: ComponentDefinition,
  props: Record<string, any>,
  visualStyles: VisualStyles
): string {
  try {
    return component.generateCode(props, visualStyles);
  } catch (e) {
    return `// Error generating code: ${String(e)}`;
  }
}

export function generateCssCode(
  component: ComponentDefinition,
  props: Record<string, any>,
  visualStyles: VisualStyles
): string {
  const lines: string[] = [
    `/* CSS for ${component.name} */`,
    `.forge-${component.id} {`,
  ];

  if (visualStyles.radius) {
    const radiusMap: Record<string, string> = {
      none: "0px",
      sm: "2px",
      md: "6px",
      lg: "8px",
      full: "9999px",
    };
    lines.push(`  border-radius: ${radiusMap[visualStyles.radius] || visualStyles.radius};`);
  }

  if (visualStyles.shadow && visualStyles.shadow !== "none") {
    const shadowMap: Record<string, string> = {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    };
    lines.push(`  box-shadow: ${shadowMap[visualStyles.shadow] || visualStyles.shadow};`);
  }

  if (visualStyles.customBg) {
    lines.push(`  background-color: ${visualStyles.customBg};`);
  }

  if (visualStyles.customTextColor) {
    lines.push(`  color: ${visualStyles.customTextColor};`);
  }

  if (visualStyles.customBorderColor) {
    lines.push(`  border-color: ${visualStyles.customBorderColor};`);
  }

  if (visualStyles.width === "full") {
    lines.push(`  width: 100%;`);
  } else if (visualStyles.width === "fixed" && visualStyles.customWidth) {
    lines.push(`  width: ${visualStyles.customWidth};`);
  }

  lines.push(`  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);`);
  lines.push(`}`);

  return lines.join("\n");
}

export function generateTailwindClasses(
  component: ComponentDefinition,
  props: Record<string, any>,
  visualStyles: VisualStyles
): string {
  const visualClasses = getVisualStylesClass(visualStyles).trim();
  const baseClasses: string[] = [];

  if (component.id === "button") {
    baseClasses.push(
      "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none"
    );
    if (props.variant === "outline") baseClasses.push("border border-input bg-background shadow-sm");
    else if (props.variant === "destructive") baseClasses.push("bg-destructive text-destructive-foreground");
    else baseClasses.push("bg-primary text-primary-foreground shadow hover:bg-primary/90");

    if (props.size === "sm") baseClasses.push("h-8 px-3 text-xs");
    else if (props.size === "lg") baseClasses.push("h-10 px-6 text-sm");
    else baseClasses.push("h-9 px-4 py-2 text-xs");
  } else {
    baseClasses.push("border rounded-md transition-colors");
  }

  if (visualClasses) {
    baseClasses.push(visualClasses);
  }

  return baseClasses.join(" ");
}
