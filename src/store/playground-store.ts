import { create } from "zustand";
import { persist } from "zustand/middleware";
import { VisualStyles } from "@/registry/schema";

export type ViewportMode = "desktop" | "laptop" | "tablet" | "mobile" | "custom";
export type BottomTab = "preview" | "code" | "css" | "tailwind" | "a11y";

export interface PlaygroundState {
  selectedComponentId: string;
  componentProps: Record<string, Record<string, any>>;
  visualStyles: VisualStyles;
  viewport: ViewportMode;
  customViewportWidth: number;
  canvasZoom: number;
  showDeviceFrame: boolean;
  canvasTheme: "system" | "light" | "dark";
  activeBottomTab: BottomTab;
  inspectMode: boolean;
  favorites: string[];
  recentlyViewed: string[];

  // Actions
  selectComponent: (id: string) => void;
  setProp: (propName: string, value: any) => void;
  setProps: (props: Record<string, any>) => void;
  resetProps: (id?: string, defaultProps?: Record<string, any>) => void;
  setVisualStyles: (styles: Partial<VisualStyles>) => void;
  resetVisualStyles: () => void;
  setViewport: (viewport: ViewportMode) => void;
  setCustomViewportWidth: (width: number) => void;
  setCanvasZoom: (zoom: number) => void;
  toggleDeviceFrame: () => void;
  setCanvasTheme: (theme: "system" | "light" | "dark") => void;
  setActiveBottomTab: (tab: BottomTab) => void;
  toggleInspectMode: () => void;
  toggleFavorite: (id: string) => void;
  recordRecentlyViewed: (id: string) => void;
}

const defaultVisualStyles: VisualStyles = {
  radius: "md",
  shadow: "none",
  padding: "default",
  borderWidth: "default",
  fontSize: "default",
  fontWeight: "default",
  width: "auto",
};

export const usePlaygroundStore = create<PlaygroundState>()(
  persist(
    (set) => ({
      selectedComponentId: "button",
      componentProps: {},
      visualStyles: defaultVisualStyles,
      viewport: "desktop",
      customViewportWidth: 375,
      canvasZoom: 100,
      showDeviceFrame: false,
      canvasTheme: "system",
      activeBottomTab: "preview",
      inspectMode: false,
      favorites: ["button", "card", "dialog", "tabs"],
      recentlyViewed: ["button", "input", "card"],

      selectComponent: (id: string) => {
        set((state) => {
          const recent = [id, ...state.recentlyViewed.filter((item) => item !== id)].slice(0, 8);
          return {
            selectedComponentId: id,
            recentlyViewed: recent,
          };
        });
      },

      setProp: (propName: string, value: any) => {
        set((state) => {
          const currentId = state.selectedComponentId;
          const currentComponentProps = state.componentProps[currentId] || {};
          return {
            componentProps: {
              ...state.componentProps,
              [currentId]: {
                ...currentComponentProps,
                [propName]: value,
              },
            },
          };
        });
      },

      setProps: (props: Record<string, any>) => {
        set((state) => {
          const currentId = state.selectedComponentId;
          return {
            componentProps: {
              ...state.componentProps,
              [currentId]: {
                ...(state.componentProps[currentId] || {}),
                ...props,
              },
            },
          };
        });
      },

      resetProps: (id?: string, defaultProps?: Record<string, any>) => {
        set((state) => {
          const targetId = id || state.selectedComponentId;
          return {
            componentProps: {
              ...state.componentProps,
              [targetId]: defaultProps || {},
            },
            visualStyles: defaultVisualStyles,
          };
        });
      },

      setVisualStyles: (styles: Partial<VisualStyles>) => {
        set((state) => ({
          visualStyles: {
            ...state.visualStyles,
            ...styles,
          },
        }));
      },

      resetVisualStyles: () => {
        set({ visualStyles: defaultVisualStyles });
      },

      setViewport: (viewport: ViewportMode) => {
        set({ viewport });
      },

      setCustomViewportWidth: (customViewportWidth: number) => {
        set({ customViewportWidth });
      },

      setCanvasZoom: (canvasZoom: number) => {
        set({ canvasZoom });
      },

      toggleDeviceFrame: () => {
        set((state) => ({ showDeviceFrame: !state.showDeviceFrame }));
      },

      setCanvasTheme: (canvasTheme: "system" | "light" | "dark") => {
        set({ canvasTheme });
      },

      setActiveBottomTab: (activeBottomTab: BottomTab) => {
        set({ activeBottomTab });
      },

      toggleInspectMode: () => {
        set((state) => ({ inspectMode: !state.inspectMode }));
      },

      toggleFavorite: (id: string) => {
        set((state) => {
          const exists = state.favorites.includes(id);
          return {
            favorites: exists
              ? state.favorites.filter((f) => f !== id)
              : [...state.favorites, id],
          };
        });
      },

      recordRecentlyViewed: (id: string) => {
        set((state) => ({
          recentlyViewed: [
            id,
            ...state.recentlyViewed.filter((item) => item !== id),
          ].slice(0, 8),
        }));
      },
    }),
    {
      name: "forge-ui-playground-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        recentlyViewed: state.recentlyViewed,
        showDeviceFrame: state.showDeviceFrame,
        viewport: state.viewport,
      }),
    }
  )
);
