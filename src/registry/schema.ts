import React from "react";

export type PropType =
  | "text"
  | "number"
  | "boolean"
  | "select"
  | "segmented"
  | "slider"
  | "color"
  | "icon";

export interface PropOption {
  label: string;
  value: any;
  description?: string;
}

export interface PropDefinition {
  name: string;
  label: string;
  type: PropType;
  defaultValue: any;
  options?: PropOption[];
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  group?: "Core" | "Content" | "State" | "Style";
}

export interface VisualStyles {
  radius?: string;
  shadow?: string;
  padding?: string;
  borderWidth?: string;
  customBg?: string;
  customTextColor?: string;
  customBorderColor?: string;
  fontSize?: string;
  fontWeight?: string;
  width?: "auto" | "full" | "fixed";
  customWidth?: string;
}

export type ComponentCategory =
  | "Forms"
  | "Layout"
  | "Navigation"
  | "Feedback"
  | "Overlay"
  | "Data Display"
  | "Typography"
  | "Utility";

export interface Example {
  id: string;
  title: string;
  description: string;
  props: Record<string, any>;
  visualStyles?: Partial<VisualStyles>;
}

export interface ApiDocProp {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface ComponentDocs {
  overview: string;
  installation: {
    cli: string;
    npm: string;
  };
  usage: string;
  api: ApiDocProp[];
  accessibility: {
    keyboardNav: string[];
    ariaNotes: string[];
  };
}

export interface ComponentDefinition {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  icon: string;
  tags: string[];
  props: PropDefinition[];
  defaultProps: Record<string, any>;
  examples: Example[];
  docs: ComponentDocs;
  component: React.ComponentType<{
    props: Record<string, any>;
    visualStyles: VisualStyles;
  }>;
  generateCode: (
    props: Record<string, any>,
    visualStyles: VisualStyles
  ) => string;
}
