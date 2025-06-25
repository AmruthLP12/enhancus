import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useColorStore } from "./store";

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useColorStore();

  return (
    <div className="flex items-center gap-2">
      <Switch id="dark-mode" checked={darkMode} onCheckedChange={toggleDarkMode} />
      <Label htmlFor="dark-mode">{darkMode ? "Dark Mode" : "Light Mode"}</Label>
    </div>
  );
}