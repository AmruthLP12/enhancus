import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { converter } from "culori";
import { useColorStore } from "./store";

const toOklch = converter("oklch");

function formatOklchRounded(color: string): string {
  const parsed = toOklch(color);
  if (!parsed || parsed.mode !== "oklch") return color;

  const l = parsed.l.toFixed(3); // Lightness: round to 3 decimals
  const c = parsed.c.toFixed(3); // Chroma
  const h = (parsed.h ?? 0).toFixed(2); // Hue

  return `oklch(${l} ${c} ${h})`;
}


interface ColorPickerCardProps {
  isBasic?: boolean;
}

export default function ColorPickerCard({ isBasic = false }: ColorPickerCardProps) {
  const { colors, setColor, darkMode } = useColorStore();
  const mode = darkMode ? "dark" : "light";
  const toHsv = converter("hsv");

  const colorKeys = isBasic
    ? [
        "background",
        "foreground",
        "primary",
        "primary-foreground",
        "secondary",
        "secondary-foreground",
        "accent",
        "accent-foreground",
        "destructive",
        "border",
        "input",
        "ring",
      ]
    : Object.keys(colors[mode]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {colorKeys.map((key) => {
        const { id, name, value, hex } = colors[mode][key] || {};
        if (!id) return null;
        return (
          <Card key={id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium capitalize">{name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <HexColorPicker
                color={hex}
                onChange={(hexColor) => {
                  const oklchColor = toOklch(hexColor);
                  setColor(
                    mode,
                    key,
                    oklchColor ? formatOklchRounded(hexColor) : value,
                    hexColor
                  );
                }}
                className="!w-full !h-24"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Label className="w-16 text-xs">HEX</Label>
                  <Input
                    value={hex}
                    onChange={(e) => {
                      const hexColor = e.target.value;
                      const oklchColor = toOklch(hexColor);
                      setColor(
                        mode,
                        key,
                        oklchColor ? formatOklchRounded(hexColor) : value,
                        hexColor
                      );
                    }}
                    placeholder="HEX"
                    className="h-8 text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-16 text-xs">OKLCH</Label>
                  <Input
                    value={value}
                    readOnly
                    className="h-8 text-xs"
                    placeholder="OKLCH"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-16 text-xs">HSB</Label>
                  <Input
                    value={
                      toHsv(hex)?.h + ", " + toHsv(hex)?.s + ", " + toHsv(hex)?.v || ""
                    }
                    readOnly
                    className="h-8 text-xs"
                    placeholder="HSB"
                  />
                </div>
              </div>
              <div
                className="w-full h-8 rounded-md border"
                style={{ backgroundColor: hex }}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}