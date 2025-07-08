"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Palette } from "lucide-react";
import { HeaderCard } from "@/components/HeaderCard";
import { FAQCard } from "@/components/FAQCard";
import { cronmateFAQs } from "@/data/cronmateFAQ";
import {
  parseNaturalLanguage,
  validateCron,
  getNextRunTimes,
  getCronDescription,
} from "@/utils/cronUtils";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HistoryItem {
  id: string;
  expression: string;
  description: string;
  timestamp: string;
}

export default function CronMatePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [runTimes, setRunTimes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [timezone, setTimezone] = useState("UTC");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cronmateHistory");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!input.trim()) {
        setOutput("");
        setError("");
        setRunTimes([]);
        return;
      }
      try {
        const expression = parseNaturalLanguage(input);
        const isValid = validateCron(expression, timezone);
        if (isValid) {
          setOutput(
            `${expression}\n\n# Description: ${getCronDescription(expression)}`
          );
          setError("");
          setRunTimes(getNextRunTimes(expression, 5, timezone));
          const newItem: HistoryItem = {
            id: uuidv4(),
            expression,
            description: getCronDescription(expression),
            timestamp: new Date().toISOString(),
          };
          setHistory((prev) => {
            const newHistory = [
              newItem,
              ...prev.filter((item) => item.expression !== expression),
            ].slice(0, 5);
            if (typeof window !== "undefined") {
              localStorage.setItem(
                "cronmateHistory",
                JSON.stringify(newHistory)
              );
            }
            return newHistory;
          });
        } else {
          setError(
            "Generated cron expression is invalid. Ensure your input matches supported formats like 'Every Monday at 9 AM' or 'Every 15 minutes'. See FAQs for examples."
          );
          setOutput("");
          setRunTimes([]);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred. Try 'Every Monday at 9 AM' or check the FAQs."
        );
        setOutput("");
        setRunTimes([]);
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [input, timezone]);

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output.split("\n\n")[0]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setRunTimes([]);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <HeaderCard
        title="CronMate - Natural Language to Cron Expression"
        icon={Palette}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "CronMate", href: "/cronmate" },
        ]}
      />
      <div className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Mode Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="/tailwind-forge">
                <Button variant="default" className="w-full cursor-pointer">
                  <span className="mr-2">🛠</span> Go to TailwindForge
                </Button>
              </a>
              <a href="/env-buddy">
                <Button variant="default" className="w-full cursor-pointer">
                  <span className="mr-2">🔧</span> Go to EnvBuddy
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>CronMate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Enter a schedule in natural language (e.g., &quot;Every Monday at
              9 AM&quot;) to generate a cron expression. Select a timezone for
              run time previews.
            </p>
            <div className="flex gap-4 items-center">
              <div>
                <h3 className="text-md font-semibold mb-2">Timezone</h3>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">
                      America/New_York
                    </SelectItem>
                    <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex gap-2">
              <Button className="cursor-pointer" onClick={() => setInput("Every Monday at 9 AM")}>
                Load Sample
              </Button>
              <Button className="cursor-pointer" variant="ghost" onClick={handleClear}>
                Clear
              </Button>
              <Button
                className="cursor-pointer"
                variant={copied ? "default" : "outline"}
                onClick={handleCopy}
                disabled={!output}
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "Copied!" : "Copy Cron"}
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h3 className="text-md font-semibold mb-2">Input Schedule</h3>
                <Textarea
                  className="min-h-[200px] font-mono text-sm"
                  placeholder="e.g., Every Monday at 9 AM"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Cron Expression Output
                </h3>
                <Textarea
                  className="min-h-[200px] font-mono text-sm"
                  value={output}
                  readOnly
                  placeholder="Cron expression and description will appear here..."
                />
              </div>
            </div>
            {runTimes.length > 0 && (
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Next 5 Run Times ({timezone})
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Run Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {runTimes.map((time, index) => (
                      <TableRow key={index}>
                        <TableCell>{time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            {history.length > 0 && (
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Recent Expressions
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Expression</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.expression}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                          {new Date(item.timestamp).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <FAQCard faqs={cronmateFAQs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
