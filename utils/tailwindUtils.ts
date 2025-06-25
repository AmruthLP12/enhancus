import { parse, formatCss } from "culori";
import { ThemeConfig } from "@/types/tailwindforge";

export const convertToOKLCH = (color: string): string => {
  const parsed = parse(color);
  return parsed ? formatCss(parsed) : color;
};



export const generateThemeCSS = (config: ThemeConfig): string => {
  const lightVars = Object.entries(config.light)
    .map(([key, { value }]) => `  --${key}: ${value};`)
    .join("\n");

  const darkVars = Object.entries(config.dark)
    .map(([key, { value }]) => `  --${key}: ${value};`)
    .join("\n");

  return `
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark-states (&:is(.dark *));

@theme inline {
${Object.keys(config.light).map((key) => `  --color-${key}: var(--${key});`).join("\n")}
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
${lightVars}
}

.dark {
${darkVars}
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
};

export const generateThemeJSON = (config: ThemeConfig) => ({
  theme: {
    colors: Object.fromEntries(
      Object.entries(config.light).map(([key, { value }]) => [key, value])
    ),
    extend: {
      colors: Object.fromEntries(
        Object.entries(config.dark).map(([key, { value }]) => [key, value])
      ),
    },
  },
});