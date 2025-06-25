import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useColorStore } from "./store";

export default function PreviewCard() {
  const { colors, darkMode } = useColorStore();
  const mode = darkMode ? "dark" : "light";

  return (
    <div
      className={`p-4 rounded-lg ${darkMode ? "dark bg-sidebar" : "bg-background"}`}
      style={Object.entries(colors[mode]).reduce(
        (acc, [key, { value }]) => ({ ...acc, [`--${key}`]: value }),
        {}
      )}
    >
      <h3 className="text-lg font-semibold mb-2">UI Preview</h3>
      <div className="space-y-4">
        <Button variant="default">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="destructive">Destructive Button</Button>
        <p className="text-foreground">Sample text with foreground color.</p>
        <p className="text-muted-foreground">Muted text.</p>
        <Card>
          <CardContent className="pt-6">
            <p className="text-card-foreground">Card content</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}