"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { useSettingsStore } from "@/store/settings-store";
import { useThemeStore } from "@/store/theme-store";

// Lazy-load Monaco editor to avoid heavy initial bundle
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[160px] w-full items-center justify-center bg-zinc-950 font-mono text-xs text-zinc-500">
      Loading Monaco Editor...
    </div>
  ),
});

interface MonacoWrapperProps {
  code: string;
  language?: "typescript" | "css" | "javascript" | "html";
  readOnly?: boolean;
  onReset?: () => void;
}

export function MonacoWrapper({
  code,
  language = "typescript",
  readOnly = false,
  onReset,
}: MonacoWrapperProps) {
  const [copied, setCopied] = useState(false);
  const [currentCode, setCurrentCode] = useState(code);
  const { editorFontSize, editorWordWrap, editorMinimap, editorTabSize } =
    useSettingsStore();
  const { isDarkMode } = useThemeStore();

  React.useEffect(() => {
    setCurrentCode(code);
  }, [code]);

  const handleCopy = async () => {
    const success = await copyToClipboard(currentCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-md border border-border/80 bg-zinc-950">
      {/* Editor Header Toolbar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-3 py-1.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold text-zinc-300 uppercase">
            {language}
          </span>
          <span className="text-[10px] text-zinc-500">
            {readOnly ? "(Read-only)" : "(Live Editable)"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onReset && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setCurrentCode(code);
                onReset();
              }}
              className="h-6 px-2 text-[11px] text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              title="Reset code"
            >
              <RotateCcw className="mr-1 h-3 w-3" />
              <span>Reset</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 px-2 text-[11px] text-zinc-300 hover:text-white hover:bg-zinc-800"
          >
            {copied ? (
              <>
                <Check className="mr-1 h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="mr-1 h-3 w-3" />
                <span>Copy Code</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="flex-1 min-h-[160px] h-[220px]">
        <Editor
          height="100%"
          language={language}
          value={currentCode}
          theme={isDarkMode ? "vs-dark" : "vs-light"}
          onChange={(val) => {
            if (val !== undefined && !readOnly) {
              setCurrentCode(val);
            }
          }}
          options={{
            fontSize: editorFontSize,
            minimap: { enabled: editorMinimap },
            wordWrap: editorWordWrap,
            tabSize: editorTabSize,
            scrollBeyondLastLine: false,
            readOnly: readOnly,
            lineNumbers: "on",
            renderLineHighlight: "all",
            fontFamily: "var(--font-mono)",
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
}
