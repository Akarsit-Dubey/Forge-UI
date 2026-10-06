import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SettingsState {
  editorFontSize: number;
  editorWordWrap: "on" | "off";
  editorMinimap: boolean;
  editorTabSize: number;
  reducedMotion: boolean;
  isCommandPaletteOpen: boolean;
  isShortcutsModalOpen: boolean;

  setEditorFontSize: (size: number) => void;
  setEditorWordWrap: (wrap: "on" | "off") => void;
  setEditorMinimap: (show: boolean) => void;
  setEditorTabSize: (tabSize: number) => void;
  setReducedMotion: (enabled: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setShortcutsModalOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  toggleShortcutsModal: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      editorFontSize: 13,
      editorWordWrap: "on",
      editorMinimap: false,
      editorTabSize: 2,
      reducedMotion: false,
      isCommandPaletteOpen: false,
      isShortcutsModalOpen: false,

      setEditorFontSize: (editorFontSize) => set({ editorFontSize }),
      setEditorWordWrap: (editorWordWrap) => set({ editorWordWrap }),
      setEditorMinimap: (editorMinimap) => set({ editorMinimap }),
      setEditorTabSize: (editorTabSize) => set({ editorTabSize }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),
      setShortcutsModalOpen: (isShortcutsModalOpen) => set({ isShortcutsModalOpen }),
      toggleCommandPalette: () =>
        set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
      toggleShortcutsModal: () =>
        set((state) => ({ isShortcutsModalOpen: !state.isShortcutsModalOpen })),
    }),
    {
      name: "forge-ui-settings-storage",
      partialize: (state) => ({
        editorFontSize: state.editorFontSize,
        editorWordWrap: state.editorWordWrap,
        editorMinimap: state.editorMinimap,
        editorTabSize: state.editorTabSize,
        reducedMotion: state.reducedMotion,
      }),
    }
  )
);
