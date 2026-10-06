import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Input } from "@/components/ui/input";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";
import { Search, Mail, DollarSign } from "lucide-react";

export const inputDefinition: ComponentDefinition = {
  id: "input",
  name: "Input",
  description: "Displays a form text input field or a component that looks like an input field with label and helper states.",
  category: "Forms",
  icon: "FormInput",
  tags: ["form", "text", "field", "entry", "search"],
  props: [
    {
      name: "placeholder",
      label: "Placeholder",
      type: "text",
      defaultValue: "Enter your email...",
      group: "Content",
      description: "Placeholder text rendered when value is empty",
    },
    {
      name: "label",
      label: "Field Label",
      type: "text",
      defaultValue: "Email address",
      group: "Content",
      description: "Accessible label above the input element",
    },
    {
      name: "helperText",
      label: "Helper Text",
      type: "text",
      defaultValue: "We will never share your email with third parties.",
      group: "Content",
      description: "Descriptive or error text below the input field",
    },
    {
      name: "type",
      label: "Input Type",
      type: "select",
      defaultValue: "text",
      group: "Core",
      description: "HTML input element type",
      options: [
        { label: "Text", value: "text" },
        { label: "Email", value: "email" },
        { label: "Password", value: "password" },
        { label: "Search", value: "search" },
        { label: "Number", value: "number" },
      ],
    },
    {
      name: "prefixIcon",
      label: "Prefix Icon",
      type: "select",
      defaultValue: "none",
      group: "Style",
      description: "Leading contextual icon inside input container",
      options: [
        { label: "None", value: "none" },
        { label: "Search", value: "search" },
        { label: "Mail", value: "mail" },
        { label: "Dollar", value: "dollar" },
      ],
    },
    {
      name: "error",
      label: "Error State",
      type: "boolean",
      defaultValue: false,
      group: "State",
      description: "Triggers red destructive border and alert styling",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      defaultValue: false,
      group: "State",
      description: "Prevents focus and user input",
    },
  ],
  defaultProps: {
    placeholder: "Enter your email...",
    label: "Email address",
    helperText: "We will never share your email with third parties.",
    type: "text",
    prefixIcon: "none",
    error: false,
    disabled: false,
  },
  examples: [
    {
      id: "search-input",
      title: "Search with Icon",
      description: "Clean search input with leading magnifier icon",
      props: {
        label: "Quick Search",
        placeholder: "Search documentation, components, tokens...",
        type: "search",
        prefixIcon: "search",
        helperText: "Press ⌘K to open global search palette anytime.",
      },
    },
    {
      id: "currency-field",
      title: "Currency Amount",
      description: "Numeric input with dollar icon prefix",
      props: {
        label: "Monthly Budget",
        placeholder: "5,000",
        type: "number",
        prefixIcon: "dollar",
        helperText: "Set a hard spending limit for cloud resources.",
      },
    },
    {
      id: "error-field",
      title: "Validation Error",
      description: "Destructive error outline with explanatory feedback",
      props: {
        label: "Work Email",
        placeholder: "user@company.com",
        type: "email",
        error: true,
        helperText: "Please enter a valid corporate email address.",
      },
    },
  ],
  docs: {
    overview:
      "A flexible, fully accessible text field supporting leading/trailing adornments, clear visual feedback, error states, and responsive layout.",
    installation: {
      cli: "npx forge-ui add input",
      npm: "npm install @forge-ui/input",
    },
    usage: `import { Input } from "@/components/ui/input";

export function Example() {
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <label className="text-xs font-medium">Email address</label>
      <Input type="email" placeholder="Email" />
      <p className="text-xs text-muted-foreground">We'll never share your email.</p>
    </div>
  );
}`,
    api: [
      {
        prop: "type",
        type: '"text" | "email" | "password" | "search" | "number"',
        defaultValue: '"text"',
        description: "Standard HTML input type",
      },
      {
        prop: "error",
        type: "boolean",
        defaultValue: "false",
        description: "Highlights the input border in destructive red",
      },
      {
        prop: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Locks the input against editing",
      },
    ],
    accessibility: {
      keyboardNav: [
        "Tab: Navigates focus directly into the input",
        "Escape: Clears active search in type='search'",
      ],
      ariaNotes: [
        "Associate label with input using htmlFor and id or wrapping label",
        "Set aria-invalid='true' when error state is active",
        "Link helper/error text with aria-describedby",
      ],
    },
  },
  component: ({ props, visualStyles }) => {
    return (
      <div className="w-full max-w-sm space-y-1.5 text-left">
        {props.label && (
          <label className="block text-xs font-medium text-foreground">
            {props.label}
          </label>
        )}
        <div className="relative flex items-center">
          {props.prefixIcon === "search" && (
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          )}
          {props.prefixIcon === "mail" && (
            <Mail className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          )}
          {props.prefixIcon === "dollar" && (
            <DollarSign className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          )}
          <Input
            type={props.type}
            placeholder={props.placeholder}
            disabled={props.disabled}
            error={props.error}
            className={`${props.prefixIcon !== "none" ? "pl-8" : ""} ${getVisualStylesClass(visualStyles)}`}
            style={getVisualStylesInline(visualStyles)}
          />
        </div>
        {props.helperText && (
          <p
            className={`text-xs ${
              props.error ? "text-destructive font-medium" : "text-muted-foreground"
            }`}
          >
            {props.helperText}
          </p>
        )}
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    const visualClass = getVisualStylesClass(visualStyles).trim();
    const hasIcon = props.prefixIcon && props.prefixIcon !== "none";

    return `<div className="grid w-full max-w-sm items-center gap-1.5">
  <label className="text-xs font-medium text-foreground">${props.label}</label>
  <div className="relative">
    ${hasIcon ? `<${props.prefixIcon === "search" ? "Search" : props.prefixIcon === "mail" ? "Mail" : "DollarSign"} className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />\n    ` : ""}<Input
      type="${props.type}"
      placeholder="${props.placeholder}"${props.disabled ? "\n      disabled" : ""}${props.error ? "\n      error" : ""}${hasIcon ? '\n      className="pl-8' + (visualClass ? " " + visualClass : "") + '"' : visualClass ? `\n      className="${visualClass}"` : ""}
    />
  </div>
  ${props.helperText ? `<p className="text-xs ${props.error ? "text-destructive" : "text-muted-foreground"}">${props.helperText}</p>` : ""}
</div>`;
  },
};
