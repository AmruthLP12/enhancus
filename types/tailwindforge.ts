export interface TailwindColor {
  id: string;
  name: string;
  value: string; // OKLCH
  hex: string;
}

export interface ThemeConfig {
  light: Record<string, TailwindColor>;
  dark: Record<string, TailwindColor>;
}