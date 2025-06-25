"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useColorStore } from "@/components/tailwindforge/store";
import { generateTailwindConfig } from "@/utils/tailwindUtils";

export default function ExportCard() {
  const { colors, saveConfig } = useColorStore();
  const [cssCopied, setCssCopied] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);
  const [configCopied, setConfigCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("css");

  const cssContent = `@theme inline {
${Object.entries(colors.light)
  .map(([key]) => `  --color-${key}: var(--${key});`)
  .join("\n")}
}
:root {
${Object.entries(colors.light)
  .map(([key, val]) => `  --${key}: ${val.value};`)
  .join("\n")}
}
.dark {
${Object.entries(colors.dark)
  .map(([key, val]) => `  --${key}: ${val.value};`)
  .join("\n")}
}
`;

  const jsonContent = {
    light: Object.fromEntries(
      Object.entries(colors.light).map(([key, val]) => [key, val.value])
    ),
    dark: Object.fromEntries(
      Object.entries(colors.dark).map(([key, val]) => [key, val.value])
    ),
  };

  const tailwindConfig = generateTailwindConfig(colors);

  const copyToClipboard = async (content: string, type: string) => {
    await navigator.clipboard.writeText(content);
    if (type === "css") {
      setCssCopied(true);
      setTimeout(() => setCssCopied(false), 2000);
    } else if (type === "json") {
      setJsonCopied(true);
      setTimeout(() => setJsonCopied(false), 2000);
    } else if (type === "config") {
      setConfigCopied(true);
      setTimeout(() => setConfigCopied(false), 2000);
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="config">Tailwind Config</TabsTrigger>
          </TabsList>

          <TabsContent value="css">
            <Textarea
              value={cssContent}
              readOnly
              className="h-64 font-mono text-sm"
            />
            <div className="flex gap-2 mt-2">
              <Button onClick={() => copyToClipboard(cssContent, "css")}>
                <Copy className="mr-2 h-4 w-4" />
                {cssCopied ? "Copied" : "Copy CSS"}
              </Button>
              <Button
                variant="outline"
                onClick={() => downloadFile(cssContent, "tailwindforge.css")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download CSS
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="json">
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
                <Copy className="mr-2 h-4 w-4" />
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
                <Download className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="config">
            <Textarea
              value={tailwindConfig}
              readOnly
              className="h-64 font-mono text-sm"
            />
            <div className="flex gap-2 mt-2">
              <Button onClick={() => copyToClipboard(tailwindConfig, "config")}>
                <Copy className="mr-2 h-4 w-4" />
                {configCopied ? "Copied" : "Copy Config"}
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  downloadFile(tailwindConfig, "tailwind.config.ts")
                }
              >
                <Download className="mr-2 h-4 w-4" />
                Download Config
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Button onClick={() => saveConfig()} variant="outline">
          Save to LocalStorage
        </Button>
      </CardContent>
    </Card>
  );
}