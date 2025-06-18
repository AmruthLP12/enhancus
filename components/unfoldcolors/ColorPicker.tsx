import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ label, value, onChange }: ColorPickerProps) => {
  const rgbToHex = (rgb: string) => {
    const [r, g, b] = rgb.split(" ").map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r} ${g} ${b}`;
  };

  return (
    <div className="flex items-center gap-4">
      <Label className="w-20">{label}</Label>
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded border border-gray-300"
          style={{ backgroundColor: `rgb(${value})` }}
        />
        <Input
          type="color"
          value={rgbToHex(value)}
          onChange={(e) => onChange(hexToRgb(e.target.value))}
          className="w-12 h-8 p-0 border-none"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="R G B"
          className="w-24"
        />
      </div>
    </div>
  );
};