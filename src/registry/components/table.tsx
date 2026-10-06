import React from "react";
import { ComponentDefinition } from "@/registry/schema";
import { Badge } from "@/components/ui/badge";
import { getVisualStylesClass, getVisualStylesInline } from "@/lib/style-utils";

export const tableDefinition: ComponentDefinition = {
  id: "table",
  name: "Table",
  description: "A responsive table for displaying tabular data with customizable headers, rows, and cells.",
  category: "Data Display",
  icon: "Table",
  tags: ["table", "grid", "data", "rows", "columns"],
  props: [
    {
      name: "dense",
      label: "Dense Padding",
      type: "boolean",
      defaultValue: false,
      group: "Style",
      description: "Reduces cell padding for compact data",
    },
    {
      name: "striped",
      label: "Striped Rows",
      type: "boolean",
      defaultValue: true,
      group: "Style",
      description: "Alternating row background colors",
    },
  ],
  defaultProps: {
    dense: false,
    striped: true,
  },
  examples: [],
  docs: {
    overview: "Accessible semantic HTML table component with responsive overflow wrapper.",
    installation: {
      cli: "npx forge-ui add table",
      npm: "npm install @forge-ui/table",
    },
    usage: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function Example() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,
    api: [
      {
        prop: "striped",
        type: "boolean",
        defaultValue: "false",
        description: "Adds alternating row striping",
      },
    ],
    accessibility: {
      keyboardNav: ["Tab: Navigates interactive elements inside table cells"],
      ariaNotes: ["Uses <table>, <thead>, <tbody>, <th>, <td> semantic elements"],
    },
  },
  component: ({ props, visualStyles }) => {
    const pad = props.dense ? "py-1.5 px-3" : "py-2.5 px-4";

    return (
      <div
        className={`w-full overflow-hidden rounded-lg border text-left text-xs ${getVisualStylesClass(
          visualStyles
        )}`}
        style={getVisualStylesInline(visualStyles)}
      >
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/50 border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className={pad}>Service</th>
              <th className={pad}>Status</th>
              <th className={pad}>Uptime</th>
              <th className={`${pad} text-right`}>Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            <tr className={props.striped ? "hover:bg-muted/30" : ""}>
              <td className={`${pad} font-medium`}>Auth Edge API</td>
              <td className={pad}>
                <Badge variant="success" className="text-[10px]">Operational</Badge>
              </td>
              <td className={`${pad} text-muted-foreground font-mono`}>99.98%</td>
              <td className={`${pad} text-right font-mono text-muted-foreground`}>18ms</td>
            </tr>
            <tr className={props.striped ? "bg-muted/15 hover:bg-muted/30" : ""}>
              <td className={`${pad} font-medium`}>Postgres Primary</td>
              <td className={pad}>
                <Badge variant="success" className="text-[10px]">Operational</Badge>
              </td>
              <td className={`${pad} text-muted-foreground font-mono`}>100%</td>
              <td className={`${pad} text-right font-mono text-muted-foreground`}>2ms</td>
            </tr>
            <tr className={props.striped ? "hover:bg-muted/30" : ""}>
              <td className={`${pad} font-medium`}>Vector Indexing</td>
              <td className={pad}>
                <Badge variant="warning" className="text-[10px]">Degraded</Badge>
              </td>
              <td className={`${pad} text-muted-foreground font-mono`}>98.40%</td>
              <td className={`${pad} text-right font-mono text-muted-foreground`}>140ms</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
  generateCode: (props, visualStyles) => {
    return `<div className="w-full overflow-hidden rounded-lg border text-xs">
  <table className="w-full text-left border-collapse">
    <thead className="bg-muted/50 border-b">
      <tr>
        <th className="py-2.5 px-4">Service</th>
        <th className="py-2.5 px-4">Status</th>
        <th className="py-2.5 px-4 text-right">Latency</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="py-2.5 px-4 font-medium">Auth Edge API</td>
        <td className="py-2.5 px-4"><Badge variant="success">Operational</Badge></td>
        <td className="py-2.5 px-4 text-right font-mono">18ms</td>
      </tr>
    </tbody>
  </table>
</div>`;
  },
};
