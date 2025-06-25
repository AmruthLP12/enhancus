import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useColorStore } from "./store";
import { generateThemeCSS, generateThemeJSON } from "@/utils/tailwindUtils";

export default function ExportCard() {
  const { colors, saveConfig } = useColorStore();
  const [cssCopied, setCssCopied] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);

  const cssContent = generateThemeCSS(colors);
  const jsonContent = generateThemeJSON(colors);

  const copyToClipboard = (content: string, type: "css" | "json") => {
    navigator.clipboard.writeText(content);
    if (type === "css") {
      setCssCopied(true);
      setTimeout(() => setCssCopied(false), 2000);
    } else {
      setJsonCopied(true);
      setTimeout(() => setJsonCopied(false), 2000);
    }
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Theme</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">CSS Output</h3>
          <Textarea
            value={cssContent}
            readOnly
            className="h-64 font-mono text-sm"
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={() => copyToClipboard(cssContent, "css")}>
              <Copy className="mr-2 h-4 w-4" />{" "}
              {cssCopied ? "Copied" : "Copy CSS"}
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadFile(cssContent, "tailwindforge.css")}
            >
              <Download className="mr-2 h-4 w-4" /> Download CSS
            </Button>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">JSON Output</h3>
          <Textarea
            value={JSON.stringify(jsonContent, null, 2)}
            readOnly
            className="h-64 font-mono text-sm"
          />
          <div className="flex gap-2 mt-2">
            <Button
              onClick={() =>
                copyToClipboard(JSON.stringify(jsonContent, null, 2), "json")
              }
            >
              <Copy className="mr-2 h-4 w-4" />{" "}
              {jsonCopied ? "Copied" : "Copy JSON"}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                downloadFile(
                  JSON.stringify(jsonContent, null, 2),
                  "tailwindforge.json"
                )
              }
            >
              <Download className="mr-2 h-4 w-4" /> Download JSON
            </Button>
          </div>
        </div>
        <Button onClick={() => saveConfig()} variant="outline">
          Save to LocalStorage
        </Button>
      </CardContent>
    </Card>
  );
}
