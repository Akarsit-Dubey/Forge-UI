import { VisualStyles } from "@/registry/schema";

export function getVisualStylesClass(visualStyles: VisualStyles): string {
  const classes: string[] = [];

  // Radius
  if (visualStyles.radius === "none") classes.push("!rounded-none");
  else if (visualStyles.radius === "sm") classes.push("!rounded-sm");
  else if (visualStyles.radius === "md") classes.push("!rounded-md");
  else if (visualStyles.radius === "lg") classes.push("!rounded-lg");
  else if (visualStyles.radius === "full") classes.push("!rounded-full");

  // Shadow
  if (visualStyles.shadow === "none") classes.push("shadow-none");
  else if (visualStyles.shadow === "sm") classes.push("shadow-sm");
  else if (visualStyles.shadow === "md") classes.push("shadow-md");
  else if (visualStyles.shadow === "lg") classes.push("shadow-lg");
  else if (visualStyles.shadow === "xl") classes.push("shadow-xl");

  // Width
  if (visualStyles.width === "full") classes.push("w-full");

  // Font Weight
  if (visualStyles.fontWeight === "normal") classes.push("font-normal");
  else if (visualStyles.fontWeight === "medium") classes.push("font-medium");
  else if (visualStyles.fontWeight === "semibold") classes.push("font-semibold");
  else if (visualStyles.fontWeight === "bold") classes.push("font-bold");

  // Font Size
  if (visualStyles.fontSize === "xs") classes.push("text-xs");
  else if (visualStyles.fontSize === "sm") classes.push("text-sm");
  else if (visualStyles.fontSize === "base") classes.push("text-base");
  else if (visualStyles.fontSize === "lg") classes.push("text-lg");

  return classes.join(" ");
}

export function getVisualStylesInline(visualStyles: VisualStyles): React.CSSProperties {
  const style: React.CSSProperties = {};
  if (visualStyles.customBg) {
    style.backgroundColor = visualStyles.customBg;
  }
  if (visualStyles.customTextColor) {
    style.color = visualStyles.customTextColor;
  }
  if (visualStyles.customBorderColor) {
    style.borderColor = visualStyles.customBorderColor;
  }
  if (visualStyles.width === "fixed" && visualStyles.customWidth) {
    style.width = visualStyles.customWidth;
  }
  return style;
}
