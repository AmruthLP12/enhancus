"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Copy,
  Check,
  PaintBucket,
  Sparkles,
  RotateCcw,
  Home,
} from "lucide-react";
import { ColorPicker } from "@/components/unfoldcolors/ColorPicker";
import { HeaderCard } from "@/components/HeaderCard";
import { FAQCard } from "@/components/FAQCard";
import { InfoCard } from "@/components/InfoCard";
import { unfoldColorsFAQs } from "@/data/unfoldColorsFAQ";
import {
  Colors,
  ShadeKeys,
  FontColors,
  ColorShades,
} from "@/types/unfoldColors";
import { generateRandomRGB } from "@/utils/colorUtils";
import Link from "next/link";

const generateRandomShades = (): { [K in ShadeKeys]: string } => {
  const shades: ShadeKeys[] = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ];
  return shades.reduce((acc, shade) => {
    acc[shade] = generateRandomRGB();
    return acc;
  }, {} as { [K in ShadeKeys]: string });
};

const defaultColors: Colors = {
  primary: {
    50: "230 240 250",
    100: "200 220 240",
    200: "160 190 230",
    300: "110 160 210",
    400: "70 130 190",
    500: "40 110 180",
    600: "30 90 150",
    700: "20 70 110",
    800: "15 50 80",
    900: "10 30 50",
    950: "5 15 25",
  },
  secondary: {
    50: "240 245 230",
    100: "210 220 190",
    200: "180 200 160",
    300: "140 170 120",
    400: "100 140 90",
    500: "70 110 60",
    600: "60 90 50",
    700: "45 70 40",
    800: "30 50 25",
    900: "20 30 15",
    950: "10 15 10",
  },
  success: {
    50: "235 245 230",
    100: "210 230 200",
    200: "180 210 160",
    300: "140 180 120",
    400: "100 150 90",
    500: "60 120 50",
    600: "50 100 40",
    700: "40 80 30",
    800: "30 60 20",
    900: "20 40 10",
    950: "10 20 5",
  },
  warning: {
    50: "255 245 230",
    100: "255 230 190",
    200: "255 210 150",
    300: "255 180 110",
    400: "255 150 70",
    500: "230 130 40",
    600: "200 110 30",
    700: "160 90 20",
    800: "120 70 15",
    900: "90 50 10",
    950: "50 30 5",
  },
  danger: {
    50: "255 235 235",
    100: "255 200 200",
    200: "240 160 160",
    300: "220 110 110",
    400: "200 70 70",
    500: "180 40 40",
    600: "150 30 30",
    700: "110 20 20",
    800: "80 15 15",
    900: "50 10 10",
    950: "25 5 5",
  },
  font: {
    subtle: "120 120 130",
    default: "50 50 60",
    important: "20 20 25",
  },
};

export default function UnfoldColorsAdvancedPage() {
  const [colors, setColors] = useState<Colors>(defaultColors);
  const [copied, setCopied] = useState(false);
  const [modifiedCount, setModifiedCount] = useState(0);

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
        const inner = Object.entries(value as ColorShades)
          .map(([k, v]) => `            "${k}": "${v}"`)
          .join(",\n");
        return `        "${colorName}": {\n${inner}\n        }`;
      })
      .join(",\n");
    return `"COLORS": {\n${colorDict}\n`;
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
    setColors({
      primary: generateRandomShades(),
      secondary: generateRandomShades(),
      success: generateRandomShades(),
      warning: generateRandomShades(),
      danger: generateRandomShades(),
      font: {
        subtle: generateRandomRGB(),
        default: generateRandomRGB(),
        important: generateRandomRGB(),
      },
    });
    setModifiedCount(0);
  };

  const handleReset = () => {
    setColors(defaultColors);
    setModifiedCount(0);
  };

  const handleColorChange = (
    category: keyof Colors,
    shade: string,
    value: string
  ) => {
    setColors((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [shade]: value,
      },
    }));
    setModifiedCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <HeaderCard
          title="Unfold Colors Advanced"
          description="Customize individual shades for Django Unfold color schemes."
          icon={PaintBucket}
          breadcrumbs={[
            { label: "Home", href: "/", icon: Home },
            { label: "Unfold Colors", href: "/unfold-colors" },
            { label: "Advanced", href: "/unfold-colors/advanced" },
          ]}
        />
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3 space-y-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  I'm Feeling Lucky
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
                    <Link href="/unfold-colors">Basic Mode</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customize Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(colors).map(([category, value]) => (
                    <AccordionItem key={category} value={category}>
                      <AccordionTrigger>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {Object.entries(
                            category === "font"
                              ? (value as FontColors)
                              : (value as ColorShades)
                          ).map(([shade, colorValue]) => (
                            <ColorPicker
                              key={`${category}-${shade}`}
                              label={shade}
                              value={colorValue as string}
                              onChange={(newValue) =>
                                handleColorChange(
                                  category as keyof Colors,
                                  shade,
                                  newValue
                                )
                              }
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
                  label: "Total Shades",
                  value: Object.values(colors).reduce(
                    (acc, val) => acc + Object.keys(val).length,
                    0
                  ),
                },
                { label: "Modified Shades", value: modifiedCount },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
