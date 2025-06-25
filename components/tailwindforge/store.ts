import { create } from "zustand";
import { converter, formatHex } from "culori";


const toOklch = converter("oklch");

interface TailwindColor {
  id: string;
  name: string;
  value: string; // OKLCH
  hex: string;
}

interface ColorStore {
  colors: Record<"light" | "dark", Record<string, TailwindColor>>;
  darkMode: boolean;
  setColor: (
    mode: "light" | "dark",
    key: string,
    value: string,
    hex: string
  ) => void;
  toggleDarkMode: () => void;
  saveConfig: (isBasic?: boolean) => void;
  loadConfig: (isBasic?: boolean) => void;
  resetColors: (isBasic?: boolean) => void;
  randomizeColors: (isBasic?: boolean) => void;
}

const basicColors: Record<string, TailwindColor> = {
  background: {
    id: "background",
    name: "Background",
    value: "oklch(1 0 0)",
    hex: "#FFFFFF",
  },
  foreground: {
    id: "foreground",
    name: "Foreground",
    value: "oklch(0.145 0 0)",
    hex: "#000000",
  },
  primary: {
    id: "primary",
    name: "Primary",
    value: "oklch(0.205 0 0)",
    hex: "#000000",
  },
  "primary-foreground": {
    id: "primary-foreground",
    name: "Primary Foreground",
    value: "oklch(0.985 0 0)",
    hex: "#FFFFFF",
  },
  secondary: {
    id: "secondary",
    name: "Secondary",
    value: "oklch(0.97 0 0)",
    hex: "#F5F5F5",
  },
  "secondary-foreground": {
    id: "secondary-foreground",
    name: "Secondary Foreground",
    value: "oklch(0.205 0 0)",
    hex: "#000000",
  },
  accent: {
    id: "accent",
    name: "Accent",
    value: "oklch(0.97 0 0)",
    hex: "#F5F5F5",
  },
  "accent-foreground": {
    id: "accent-foreground",
    name: "Accent Foreground",
    value: "oklch(0.205 0 0)",
    hex: "#000000",
  },
  destructive: {
    id: "destructive",
    name: "Destructive",
    value: "oklch(0.577 0.245 27.325)",
    hex: "#D32F2F",
  },
  border: {
    id: "border",
    name: "Border",
    value: "oklch(0.922 0 0)",
    hex: "#E0E0E0",
  },
  input: {
    id: "input",
    name: "Input",
    value: "oklch(0.922 0 0)",
    hex: "#E0E0E0",
  },
  ring: { id: "ring", name: "Ring", value: "oklch(0.708 0 0)", hex: "#888888" },
};

const advancedColors: Record<string, TailwindColor> = {
  ...basicColors,
  card: { id: "card", name: "Card", value: "oklch(1 0 0)", hex: "#FFFFFF" },
  "card-foreground": {
    id: "card-foreground",
    name: "Card Foreground",
    value: "oklch(0.145 0 0)",
    hex: "#000000",
  },
  popover: {
    id: "popover",
    name: "Popover",
    value: "oklch(1 0 0)",
    hex: "#FFFFFF",
  },
  "popover-foreground": {
    id: "popover-foreground",
    name: "Popover Foreground",
    value: "oklch(0.145 0 0)",
    hex: "#000000",
  },
  muted: {
    id: "muted",
    name: "Muted",
    value: "oklch(0.97 0 0)",
    hex: "#F5F5F5",
  },
  "muted-foreground": {
    id: "muted-foreground",
    name: "Muted Foreground",
    value: "oklch(0.556 0 0)",
    hex: "#666666",
  },
  "chart-1": {
    id: "chart-1",
    name: "Chart 1",
    value: "oklch(0.646 0.222 41.116)",
    hex: "#FF9800",
  },
  "chart-2": {
    id: "chart-2",
    name: "Chart 2",
    value: "oklch(0.6 0.118 184.704)",
    hex: "#00BCD4",
  },
  "chart-3": {
    id: "chart-3",
    name: "Chart 3",
    value: "oklch(0.398 0.07 227.392)",
    hex: "#3F51B5",
  },
  "chart-4": {
    id: "chart-4",
    name: "Chart 4",
    value: "oklch(0.828 0.189 84.429)",
    hex: "#4CAF50",
  },
  "chart-5": {
    id: "chart-5",
    name: "Chart 5",
    value: "oklch(0.769 0.188 70.08)",
    hex: "#8BC34A",
  },
  sidebar: {
    id: "sidebar",
    name: "Sidebar",
    value: "oklch(0.985 0 0)",
    hex: "#FAFAFA",
  },
  "sidebar-foreground": {
    id: "sidebar-foreground",
    name: "Sidebar Foreground",
    value: "oklch(0.145 0 0)",
    hex: "#000000",
  },
  "sidebar-primary": {
    id: "sidebar-primary",
    name: "Sidebar Primary",
    value: "oklch(0.205 0 0)",
    hex: "#000000",
  },
  "sidebar-primary-foreground": {
    id: "sidebar-primary-foreground",
    name: "Sidebar Primary Foreground",
    value: "oklch(0.985 0 0)",
    hex: "#FFFFFF",
  },
  "sidebar-accent": {
    id: "sidebar-accent",
    name: "Sidebar Accent",
    value: "oklch(0.97 0 0)",
    hex: "#F5F5F5",
  },
  "sidebar-accent-foreground": {
    id: "sidebar-accent-foreground",
    name: "Sidebar Accent Foreground",
    value: "oklch(0.205 0 0)",
    hex: "#000000",
  },
  "sidebar-border": {
    id: "sidebar-border",
    name: "Sidebar Border",
    value: "oklch(0.922 0 0)",
    hex: "#E0E0E0",
  },
  "sidebar-ring": {
    id: "sidebar-ring",
    name: "Sidebar Ring",
    value: "oklch(0.708 0 0)",
    hex: "#888888",
  },
};

const darkBasicColors: Record<string, string> = {
  background: "oklch(0.145 0 0)",
  foreground: "oklch(0.985 0 0)",
  primary: "oklch(0.922 0 0)",
  "primary-foreground": "oklch(0.205 0 0)",
  secondary: "oklch(0.269 0 0)",
  "secondary-foreground": "oklch(0.985 0 0)",
  accent: "oklch(0.269 0 0)",
  "accent-foreground": "oklch(0.985 0 0)",
  destructive: "oklch(0.704 0.191 22.216)",
  border: "oklch(1 0 0 / 10%)",
  input: "oklch(1 0 0 / 15%)",
  ring: "oklch(0.556 0 0)",
};

const darkAdvancedColors: Record<string, string> = {
  ...darkBasicColors,
  card: "oklch(0.205 0 0)",
  "card-foreground": "oklch(0.985 0 0)",
  popover: "oklch(0.205 0 0)",
  "popover-foreground": "oklch(0.985 0 0)",
  muted: "oklch(0.269 0 0)",
  "muted-foreground": "oklch(0.708 0 0)",
  "chart-1": "oklch(0.488 0.243 264.376)",
  "chart-2": "oklch(0.696 0.17 162.48)",
  "chart-3": "oklch(0.769 0.188 70.08)",
  "chart-4": "oklch(0.627 0.265 303.9)",
  "chart-5": "oklch(0.645 0.246 16.439)",
  sidebar: "oklch(0.205 0 0)",
  "sidebar-foreground": "oklch(0.985 0 0)",
  "sidebar-primary": "oklch(0.488 0.243 264.376)",
  "sidebar-primary-foreground": "oklch(0.985 0 0)",
  "sidebar-accent": "oklch(0.269 0 0)",
  "sidebar-accent-foreground": "oklch(0.985 0 0)",
  "sidebar-border": "oklch(1 0 0 / 10%)",
  "sidebar-ring": "oklch(0.556 0 0)",
};

export const useColorStore = create<ColorStore>((set) => ({
  colors: {
    light: advancedColors,
    dark: Object.fromEntries(
      Object.entries(advancedColors).map(([key, { id, name }]) => [
        key,
        {
          id,
          name,
          value: darkAdvancedColors[key],
          hex: formatHex(toOklch(darkAdvancedColors[key])) || "#000000",
        },
      ])
    ),
  },
  darkMode: false,
  setColor: (mode, key, value, hex) =>
    set((state) => ({
      colors: {
        ...state.colors,
        [mode]: {
          ...state.colors[mode],
          [key]: { ...state.colors[mode][key], value, hex },
        },
      },
    })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  saveConfig: (isBasic = false) =>
    set((state) => {
      const key = isBasic
        ? "enhancus-tailwindforge-basic-config"
        : "enhancus-tailwindforge-config";
      const config = isBasic
        ? {
            light: Object.fromEntries(
              Object.entries(state.colors.light).filter(([k]) =>
                Object.keys(basicColors).includes(k)
              )
            ),
            dark: Object.fromEntries(
              Object.entries(state.colors.dark).filter(([k]) =>
                Object.keys(darkBasicColors).includes(k)
              )
            ),
          }
        : state.colors;
      localStorage.setItem(key, JSON.stringify(config));
      return state;
    }),
  loadConfig: (isBasic = false) =>
    set((state) => {
      const key = isBasic
        ? "enhancus-tailwindforge-basic-config"
        : "enhancus-tailwindforge-config";
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const initialColors = isBasic ? basicColors : advancedColors;
          const initialDarkColors = isBasic
            ? darkBasicColors
            : darkAdvancedColors;
          return {
            ...state,
            colors: {
              light: Object.fromEntries(
                Object.entries(initialColors).map(([k, v]) => [
                  k,
                  parsed.light[k] || v,
                ])
              ),
              dark: Object.fromEntries(
                Object.entries(initialColors).map(([k, v]) => [
                  k,
                  parsed.dark[k] || {
                    ...v,
                    value: initialDarkColors[k],
                    hex: formatHex(toOklch(initialDarkColors[k])) || v.hex,
                  },
                ])
              ),
            },
          };
        } catch {
          return state;
        }
      }
      return state;
    }),
  resetColors: (isBasic = false) =>
    set((state) => {
      const initialColors = isBasic ? basicColors : advancedColors;
      const initialDarkColors = isBasic ? darkBasicColors : darkAdvancedColors;
      const newColors = {
        light: initialColors,
        dark: Object.fromEntries(
          Object.entries(initialColors).map(([key, { id, name }]) => [
            key,
            {
              id,
              name,
              value: initialDarkColors[key],
              hex: formatHex(toOklch(initialDarkColors[key])) || "#000000",
            },
          ])
        ),
      };
      localStorage.setItem(
        isBasic
          ? "enhancus-tailwindforge-basic-config"
          : "enhancus-tailwindforge-config",
        JSON.stringify(newColors)
      );
      return { ...state, colors: newColors };
    }),
  randomizeColors: (isBasic = false) =>
    set((state) => {
      const initialColors = isBasic ? basicColors : advancedColors;
      const newColors = {
        light: Object.fromEntries(
          Object.entries(initialColors).map(([key, { id, name }]) => {
            const l = (Math.random() * 0.8 + 0.2).toFixed(3); // 0.2–1.0
            const c = (Math.random() * 0.4).toFixed(3); // 0–0.4
            const h = (Math.random() * 360).toFixed(2); // 0–360
            const value = `oklch(${l} ${c} ${h})`;
            const hex = formatHex(toOklch(value)) || "#FFFFFF";
            return [key, { id, name, value, hex }];
          })
        ),
        dark: Object.fromEntries(
          Object.entries(initialColors).map(([key, { id, name }]) => {
            const l = (Math.random() * 0.6 + 0.2).toFixed(3); // 0.2–0.8
            const c = (Math.random() * 0.4).toFixed(3); // 0–0.4
            const h = (Math.random() * 360).toFixed(2); // 0–360
            const value = `oklch(${l} ${c} ${h})`;
            const hex = formatHex(toOklch(value)) || "#000000";
            return [key, { id, name, value, hex }];
          })
        ),
      };
      localStorage.setItem(
        isBasic
          ? "enhancus-tailwindforge-basic-config"
          : "enhancus-tailwindforge-config",
        JSON.stringify(newColors)
      );
      return { ...state, colors: newColors };
    }),
}));
