"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { HeaderCard } from "@/components/HeaderCard";
import { FAQCard } from "@/components/FAQCard";
import { InfoCard } from "@/components/InfoCard";
import { EnvVariableTable } from "@/components/envbuddy/EnvVariableTable";
import { EnvImportCard } from "@/components/envbuddy/EnvImportCard";
import { envBuddyFAQs } from "@/data/envBuddyFAQ";
import { Home, FileText, Download, Shield, Copy, Check, RotateCcw } from "lucide-react";
import { EnvVariable } from "@/types/envbuddy";
import { exportEnv, exportEnvExample, exportJson, validateVariables, downloadFile } from "@/utils/envUtils";
import { v4 as uuidv4 } from "uuid";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "EnvBuddy – .env Manager & Exporter",
  description: "Easily manage and export environment variables as .env, .env.example, or JSON.",
  keywords: [".env manager", "envbuddy", "export .env", ".env.example", "JSON environment variables"],
};


export default function EnvBuddyPage() {
  const [variables, setVariables] = useState<EnvVariable[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [useLocalStorage, setUseLocalStorage] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (useLocalStorage) {
      const saved = localStorage.getItem("envBuddyVariables");
      if (saved) setVariables(JSON.parse(saved));
    }
  }, [useLocalStorage]);

  useEffect(() => {
    if (useLocalStorage) {
      localStorage.setItem("envBuddyVariables", JSON.stringify(variables));
    }
    setErrors(validateVariables(variables));
  }, [variables, useLocalStorage]);

  const handleImport = (imported: EnvVariable[]) => {
    setVariables(imported);
  };

  const handleExport = (type: "env" | "example" | "json") => {
    let content: string;
    let filename: string;
    let mimeType: string;

    switch (type) {
      case "env":
        content = exportEnv(variables);
        filename = "envbuddy.env";
        mimeType = "text/plain";
        break;
      case "example":
        content = exportEnvExample(variables);
        filename = "envbuddy.env.example";
        mimeType = "text/plain";
        break;
      case "json":
        content = exportJson(variables);
        filename = "envbuddy.json";
        mimeType = "application/json";
        break;
    }

    downloadFile(content, filename, mimeType);
  };

  const handleReset = () => {
    setVariables([]);
    setErrors({});
    if (useLocalStorage) {
      localStorage.removeItem("envBuddyVariables");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportEnv(variables));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <HeaderCard
          title="EnvBuddy"
          description="Manage environment variables with ease, supporting .env, .env.example, and JSON exports."
          icon={FileText}
          breadcrumbs={[
            { label: "Home", href: "/", icon: Home },
            { label: "EnvBuddy", href: "/env-buddy" },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Environment Variables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EnvVariableTable
                  variables={variables}
                  onUpdate={setVariables}
                  errors={errors}
                />
              </CardContent>
            </Card>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setVariables([
                    {
                      id: uuidv4(),
                      key: "API_KEY",
                      value: "12345",
                      description: "Your API key",
                      optional: false,
                      isSecret: true,
                    },
                    {
                      id: uuidv4(),
                      key: "DEBUG_MODE",
                      value: "true",
                      description: "Enable debug logs",
                      optional: true,
                      isSecret: false,
                    },
                  ]);
                }}
              >
                Load Sample Data
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Save to Local Storage</p>
                  <Switch
                    checked={useLocalStorage}
                    onCheckedChange={setUseLocalStorage}
                  />
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Textarea
                      value={exportEnv(variables)}
                      readOnly
                      placeholder="Your .env content will appear here..."
                      rows={5}
                      className="pr-12"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleCopy}
                      disabled={variables.length === 0}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => handleExport("env")}
                      disabled={Object.keys(errors).length > 0}
                    >
                      Export .env
                    </Button>
                    <Button
                      onClick={() => handleExport("example")}
                      disabled={Object.keys(errors).length > 0}
                    >
                      Export .env.example
                    </Button>
                    <Button
                      onClick={() => handleExport("json")}
                      disabled={Object.keys(errors).length > 0}
                    >
                      Export JSON
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <EnvImportCard onImport={handleImport} />
            <FAQCard
              title="EnvBuddy FAQs"
              icon={FileText}
              faqs={envBuddyFAQs}
              defaultOpenIndex={0}
            />
          </div>

          <div className="space-y-6">
            <InfoCard
              title="Variable Information"
              icon={Shield}
              items={[
                { label: "Total Variables", value: variables.length },
                { label: "Optional Variables", value: variables.filter((v) => v.optional).length },
                { label: "Secret Variables", value: variables.filter((v) => v.isSecret).length },
                { label: "Errors", value: Object.keys(errors).length },
              ]}
            />
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Total Variables: {variables.length}</li>
                  <li>Optional Variables: {variables.filter((v) => v.optional).length}</li>
                  <li>Secret Variables: {variables.filter((v) => v.isSecret).length}</li>
                  <li>Errors: {Object.keys(errors).length}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}