import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { ShortcutsModal } from "@/components/layout/shortcuts-modal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Forge UI — Design System Playground & Component Studio",
  description:
    "An interactive design system playground inspired by shadcn/ui, Figma, and modern developer tools. Customize props, inspect tokens, and generate clean TypeScript code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-background text-foreground antialiased flex flex-col font-sans`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <CommandPalette />
        <ShortcutsModal />
      </body>
    </html>
  );
}
