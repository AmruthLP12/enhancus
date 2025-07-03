"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Key,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  Download,
  HelpCircle,
} from "lucide-react";
import { HeaderCard } from "@/components/HeaderCard";
import { InfoCard } from "@/components/InfoCard";
import { AlertCard } from "@/components/AlertCard";
import { CodeGuideCard } from "@/components/CodeGuideCard";
import { HistoryCard } from "@/components/django_key_gen/HistoryCard";
import { StrengthIndicator } from "@/components/django_key_gen/StrengthIndicator";
import { DisplayField } from "@/components/DisplayField";
import { FAQCard } from "@/components/FAQCard";
import { generateKey, calculateStrength } from "@/utils/keyUtils";
import { HistoryItem } from "@/types/django_key_gen";
import { djangoFAQs } from "@/data/djangoFAQ";
import Counter from "@/components/analytics/Counter";

interface DjangoHistoryItem extends HistoryItem {
  key: string;
  length: number;
  includeSpecial: boolean;
}

export default function KeyGenPage() {
  const [key, setKey] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [timestamp, setTimestamp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [keyLength, setKeyLength] = useState<number>(50);
  const [includeSpecial, setIncludeSpecial] = useState<boolean>(true);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [history, setHistory] = useState<DjangoHistoryItem[]>([]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const chars = includeSpecial
        ? "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)"
        : "abcdefghijklmnopqrstuvwxyz0123456789";
      const newKey = generateKey(keyLength, chars, includeSpecial);
      const newTimestamp = new Date().toLocaleString();

      setKey(newKey);
      setTimestamp(newTimestamp);
      setCopied(false);
      setVisible(false);
      setFavorite(false);

      setHistory((prev) => [
        {
          key: newKey,
          label: label || "Untitled",
          timestamp: newTimestamp,
          length: keyLength,
          includeSpecial,
          favorite: false,
          id: Date.now(),
        },
        ...prev.slice(0, 9),
      ]);

      setLoading(false);
    }, 300);
  };

  const downloadKey = () => {
    const content = `# ${label || "Django Secret Key"}
# Generated: ${timestamp}
# Length: ${keyLength} characters
# Special characters: ${includeSpecial ? "Yes" : "No"}

SECRET_KEY='${key}'

# Usage in settings.py:
# SECRET_KEY = os.environ.get('SECRET_KEY', '${key}')
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${label ? label.replace(/\s+/g, "_") : "django_secret_key"}.env`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
    if (key) {
      setHistory((prev) =>
        prev.map((item) => (item.key === key ? { ...item, favorite: !favorite } : item))
      );
    }
  };

  const loadFromHistory = (historyItem: DjangoHistoryItem) => {
    setKey(historyItem.key);
    setLabel(historyItem.label);
    setTimestamp(historyItem.timestamp);
    setKeyLength(historyItem.length);
    setIncludeSpecial(historyItem.includeSpecial);
    setFavorite(historyItem.favorite);
    setVisible(false);
    setCopied(false);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteHistoryItem = (id: string | number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const strength = key ? calculateStrength(key) : { score: 0, checks: {} };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
      <Counter page="key-gen" className="text-right px-10 py-2" />
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <HeaderCard
          title="Django Secret Key Generator"
          description="Generate cryptographically secure secret keys for your Django applications"
          icon={Key}
          breadcrumbs={[
            { label: "Home", href: "/", icon: ArrowLeft },
            { label: "Django Secret Key Generator", href: "/key-gen" },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Main Generator */}
          <div className="lg:col-span-3 space-y-6">
            {/* Generation Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Generate Key
                </CardTitle>
                <CardDescription>
                  Generate a new Django secret key with secure defaults (50 chars, special symbols)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Collapsed Advanced Settings */}
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Advanced Settings
                    </span>
                    {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>

                  {showAdvanced && (
                    <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="label" className="text-sm font-medium">
                            Key Label (Optional)
                          </label>
                          <Input
                            id="label"
                            placeholder="e.g., Production Django App"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Add a descriptive name for your key
                          </p>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="keyLength" className="text-sm font-medium">
                            Key Length
                          </label>
                          <Input
                            id="keyLength"
                            type="number"
                            min={32}
                            max={100}
                            value={keyLength}
                            onChange={(e) => setKeyLength(parseInt(e.target.value) || 50)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Recommended: 50+ characters for optimal security
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                        <div className="space-y-1">
                          <label htmlFor="special-chars" className="text-sm font-medium">
                            Include Special Characters
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Adds !@#$%^&*(-_=+) to increase entropy and security
                          </p>
                        </div>
                        <Switch
                          id="special-chars"
                          checked={includeSpecial}
                          onCheckedChange={setIncludeSpecial}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleGenerate}
                  className="w-full h-12 text-lg gap-2"
                  size="lg"
                  disabled={loading}
                >
                  <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
                  {loading ? "Generating..." : "Generate New Key"}
                </Button>

                {key && (
                  <div className="space-y-4">
                    <Separator />

                    {/* Display Field */}
                    <DisplayField
                      value={key}
                      label="Generated Secret Key"
                      visible={visible}
                      onToggleVisibility={() => setVisible(!visible)}
                      favorite={favorite}
                      onToggleFavorite={toggleFavorite}
                      toggleIcons={[Eye, EyeOff]}
                    />

                    {/* Strength Indicator */}
                    <StrengthIndicator score={strength.score} label="Key Strength" />

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        className="gap-2"
                        disabled={copied}
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 text-green-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy Key
                          </>
                        )}
                      </Button>

                      <Button onClick={downloadKey} variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download .env
                      </Button>
                    </div>

                    {/* Metadata */}
                    {timestamp && (
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {timestamp}
                        </div>
                        <div>Length: {key.length}</div>
                        <div>Special chars: {includeSpecial ? "Yes" : "No"}</div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Code Guide */}
            <CodeGuideCard
              title="Usage in Django"
              sections={[
                {
                  title: "In your settings.py:",
                  code: `SECRET_KEY = '${key || "your-generated-key-here"}'`,
                },
                {
                  title: "Or use environment variables (recommended):",
                  code: "SECRET_KEY = os.environ.get('SECRET_KEY')",
                },
              ]}
            />

            {/* FAQ Card */}
            <FAQCard title="Django Key FAQs" icon={HelpCircle} faqs={djangoFAQs} defaultOpenIndex={0} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <InfoCard
              title="Key Information"
              icon={Shield}
              items={[
                { label: "Length", value: `${keyLength} characters` },
                {
                  label: "Characters",
                  value: includeSpecial ? "a-z, 0-9, symbols" : "a-z, 0-9",
                },
                { label: "Security", value: "Cryptographically secure" },
                { label: "Generated", value: `${history.length} keys` },
              ]}
            />

            {/* Alert Card */}
            <AlertCard
              title="Security Note"
              message="Keep your secret key confidential and never commit it to version control. Use environment variables in production."
              icon={Shield}
            />

            {/* History Card */}
            <HistoryCard
              history={history}
              onLoadFromHistory={loadFromHistory}
              onClearHistory={clearHistory}
              onDeleteItem={deleteHistoryItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}