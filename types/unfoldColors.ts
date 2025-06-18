export type ShadeKeys = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950";

export type ColorShades = {
  [key in ShadeKeys]: string;
};

export interface FontColors {
  subtle: string;
  default: string;
  important: string;
}

export interface Colors {
  primary: ColorShades;
  secondary: ColorShades;
  success: ColorShades;
  warning: ColorShades;
  danger: ColorShades;
  font: FontColors;
}

export interface BaseColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  font: FontColors;
}