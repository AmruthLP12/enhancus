import { parse, formatCss, converter } from "culori";
import { ThemeConfig } from "@/types/tailwindforge";
import JSON5 from "json5";

const toOklch = converter("oklch");

export const convertToOKLCH = (color: string): string => {
  const parsed = parse(color);
  return parsed ? formatCss(parsed) : color;
};

export function generateTailwindConfig(colors: ThemeConfig): string {
  const formatColorValue = (v: string) => `"${v}"`;

  const lightColors = Object.entries(colors.light)
    .map(([key, val]) => `      "${key}": ${formatColorValue(val.value)}`)
    .join(",\n");

  const darkColors = Object.entries(colors.dark)
    .map(([key, val]) => `      "${key}": ${formatColorValue(val.value)}`)
    .join(",\n");

  return `/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  theme: {
    colors: {
${lightColors}
    },
    extend: {
      colors: {
${darkColors}
      }
    }
  }
};

export default config;
`;
}

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
${Object.keys(config.light)
  .map((key) => `  --color-${key}: var(--${key});`)
  .join("\n")}
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

// Recursively flatten nested colors object for migration tool
interface NestedColorValue {
  [key: string]: string | NestedColorValue;
}
type ColorValue = string | NestedColorValue;

function flattenColors(
  prefix: string,
  obj: Record<string, ColorValue>
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const varPrefix = prefix ? `${prefix}-${key}` : key;
    if (typeof value === "string") {
      result[varPrefix] = value;
    } else {
      Object.assign(result, flattenColors(varPrefix, value));
    }
  }

  return result;
}

// Recursively flatten nested colors object for migration tool

function extractBalancedObject(
  text: string,
  startKeyword: string
): string | null {
  const startIndex = text.indexOf(startKeyword);
  if (startIndex === -1) return null;

  const braceStart = text.indexOf("{", startIndex);
  if (braceStart === -1) return null;

  let depth = 0;
  let endIndex = braceStart;

  for (let i = braceStart; i < text.length; i++) {
    if (text[i] === "{") depth++;
    if (text[i] === "}") depth--;
    if (depth === 0) {
      endIndex = i;
      break;
    }
  }

  return text.slice(braceStart, endIndex + 1);
}

export function generateFromNestedColors(configText: string): string {
  let colors: Record<string, ColorValue> = {};
  try {
    const rawObject = extractBalancedObject(configText, "colors:");
    if (!rawObject) return "// Could not find or extract `colors` block";

    const quotedNumericKeys = rawObject.replace(
      /(\s*)(\d+)(\s*):/g,
      '$1"$2"$3:'
    );
    colors = JSON5.parse(quotedNumericKeys);
  } catch (e: unknown) {
    return `// Error parsing config: ${
      e instanceof Error ? e.message : String(e)
    }`;
  }

  const flat = flattenColors("", colors);

  const themeInline = Object.keys(flat)
    .map((k) => `  --color-${k}: var(--${k});`)
    .join("\n");

  const toCSSVar = ([k, v]: [string, string]) => {
    if (v.startsWith("#")) {
      const ok = toOklch(v);
      if (!ok) return `  --${k}: ${v};`;
      return `  --${k}: oklch(${ok.l.toFixed(3)} ${ok.c.toFixed(3)} ${(
        ok.h ?? 0
      ).toFixed(2)});`;
    }
    return `  --${k}: ${v};`;
  };

  const rootVars = Object.entries(flat).map(toCSSVar).join("\n");
  const darkVars = rootVars; // Currently mirroring light values

  return `@theme inline {
${themeInline}
}

:root {
${rootVars}
}

.dark {
${darkVars}
}`;
}
