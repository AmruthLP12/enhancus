import { ShadeKeys } from "@/types/unfoldColors";

// Convert RGB string to HSL
const rgbToHsl = (rgb: string): [number, number, number] => {
  const [r, g, b] = rgb.split(" ").map((v) => Number(v) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

// Convert HSL to RGB string
const hslToRgb = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const r = Math.round(f(0) * 255);
  const g = Math.round(f(8) * 255);
  const b = Math.round(f(4) * 255);
  return `${r} ${g} ${b}`;
};

// Generate shades from a base RGB color
export const generateShades = (baseRgb: string): { [K in ShadeKeys]: string } => {
  const [h, s] = rgbToHsl(baseRgb); // Keep hue and saturation, vary lightness
  const shades: ShadeKeys[] = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
  const lightnessSteps = [95, 85, 75, 65, 55, 45, 35, 25, 15, 10, 5]; // Lightest to darkest

  return shades.reduce((acc, shade, index) => {
    acc[shade] = hslToRgb(h, s, lightnessSteps[index]);
    return acc;
  }, {} as { [K in ShadeKeys]: string });
};

// Generate random RGB color
export const generateRandomRGB = () => `${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)}`;