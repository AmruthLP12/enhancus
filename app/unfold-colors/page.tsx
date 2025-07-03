"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, PaintBucket, Sparkles, RotateCcw, Home } from "lucide-react";
import { ColorPicker } from "@/components/unfoldcolors/ColorPicker";
import { HeaderCard } from "@/components/HeaderCard";
import { FAQCard } from "@/components/FAQCard";
import { InfoCard } from "@/components/InfoCard";
import { unfoldColorsFAQs } from "@/data/unfoldColorsFAQ";
import { Colors, BaseColors, FontColors } from "@/types/unfoldColors";
import { generateShades, generateRandomRGB } from "@/utils/colorUtils";
import Link from "next/link";
import Counter from "@/components/analytics/Counter";

const defaultBaseColors: BaseColors = {
  primary: "40 110 180", // primary.500
  secondary: "70 110 60", // secondary.500
  success: "60 120 50", // success.500
  warning: "230 130 40", // warning.500
  danger: "180 40 40", // danger.500
  font: {
    subtle: "120 120 130",
    default: "50 50 60",
    important: "20 20 25",
  },
};

export default function UnfoldColorsPage() {
  const [baseColors, setBaseColors] = useState<BaseColors>(defaultBaseColors);
  const [copied, setCopied] = useState(false);
  const [modifiedCount, setModifiedCount] = useState(0);

  const colors: Colors = {
    primary: generateShades(baseColors.primary),
    secondary: generateShades(baseColors.secondary),
    success: generateShades(baseColors.success),
    warning: generateShades(baseColors.warning),
    danger: generateShades(baseColors.danger),
    font: {
      subtle: baseColors.font.subtle,
      default: baseColors.font.default,
      important: baseColors.font.important,
    },
  };

  const generatePythonDict = () => {
    const colorDict = Object.entries(colors)
      .map(([colorName, value]) => {
        if (colorName === "font") {
          const fontColors = {
            subtle: value.subtle,
            default: value.default,
            important: value.important,
          };
          const inner = Object.entries(fontColors)
            .map(([k, v]) => `            "${k}": "${v}"`)
            .join(",\n");
          return `        "${colorName}": {\n${inner}\n        }`;
        }
        const inner = Object.entries(value)
          .map(([k, v]) => `            "${k}": "${v}"`)
          .join(",\n");
        return `        "${colorName}": {\n${inner}\n        }`;
      })
      .join(",\n");
    return `"COLORS": {\n${colorDict}\n    }`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatePythonDict());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleRandomize = () => {
    setBaseColors({
      primary: generateRandomRGB(),
      secondary: generateRandomRGB(),
      success: generateRandomRGB(),
      warning: generateRandomRGB(),
      danger: generateRandomRGB(),
      font: {
        subtle: generateRandomRGB(),
        default: generateRandomRGB(),
        important: generateRandomRGB(),
      },
    });
    setModifiedCount(0);
  };

  const handleReset = () => {
    setBaseColors(defaultBaseColors);
    setModifiedCount(0);
  };

  const handleColorChange = (category: keyof BaseColors, value: string, shade?: string) => {
    setBaseColors((prev) => {
      if (category === "font" && shade) {
        return {
          ...prev,
          font: {
            ...prev.font,
            [shade as keyof FontColors]: value,
          },
        };
      }
      if (shade) {
        return {
          ...prev,
          font: {
            ...prev.font,
            [shade as keyof FontColors]: value,
          },
        };
      }
      return {
        ...prev,
        [category]: value,
      };
    });
    setModifiedCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
      <Counter page="unfold-colors" className="text-right px-10 py-2" />
      <div className="container mx-auto px-4 max-w-6xl">
        <HeaderCard
          title="Unfold Colors"
          description="Generate color schemes for Django Unfold by selecting base colors."
          icon={PaintBucket}
          breadcrumbs={[
            { label: "Home", href: "/", icon: Home },
            { label: "Unfold Colors", href: "/unfold-colors" },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3 space-y-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  I&apos;m Feeling Lucky
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button
                    onClick={handleRandomize}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    Generate Random Colors
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset to Default
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/unfold-colors/advanced">Advanced Mode</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Base Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(baseColors).map(([category, value]) => (
                    <div key={category}>
                      {typeof value === "string" ? (
                        <ColorPicker
                          label={category.charAt(0).toUpperCase() + category.slice(1)}
                          value={value}
                          onChange={(newValue) =>
                            handleColorChange(category as keyof BaseColors, newValue)
                          }
                        />
                      ) : (
                        <div className="space-y-2">
                          <h3 className="font-medium">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </h3>
                          {Object.entries(value).map(([shade, shadeValue]) => (
                            <ColorPicker
                              key={`${category}-${shade}`}
                              label={shade.charAt(0).toUpperCase() + shade.slice(1)}
                              value={shadeValue as string}
                              onChange={(newValue) =>
                                handleColorChange(category as keyof BaseColors, newValue, shade)
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preview Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Textarea
                    value={generatePythonDict()}
                    readOnly
                    rows={20}
                    className="font-mono text-sm pr-12"
                  />
                  <Button
                    onClick={handleCopy}
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <FAQCard
              title="Unfold Colors FAQs"
              icon={PaintBucket}
              faqs={unfoldColorsFAQs}
              defaultOpenIndex={0}
            />
          </div>

          <div className="space-y-6">
            <InfoCard
              title="Color Stats"
              icon={PaintBucket}
              items={[
                {
                  label: "Total Base Colors",
                  value: Object.keys(baseColors).length + Object.keys(baseColors.font).length - 1,
                },
                { label: "Modified Colors", value: modifiedCount },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}