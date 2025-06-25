"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaintBucket } from "lucide-react";
import ColorPickerCard from "@/components/tailwindforge/ColorPickerCard";
import PreviewCard from "@/components/tailwindforge/PreviewCard";
import ExportCard from "@/components/tailwindforge/ExportCard";
import ThemeToggle from "@/components/tailwindforge/ThemeToggle";
import {FAQCard} from "@/components/FAQCard";
import {HeaderCard} from "@/components/HeaderCard";
import { tailwindForgeFAQs } from "@/data/tailwindForgeFAQ";
import { useColorStore } from "@/components/tailwindforge/store";

export default function TailwindForgePage() {
  const { loadConfig } = useColorStore();

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return (
    <div className="container mx-auto px-4 py-16">
      <HeaderCard
        title="TailwindForge"
        icon={PaintBucket}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "TailwindForge", href: "/tailwind-forge" },
        ]}
      />
      <div className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <PreviewCard />
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <ColorPickerCard />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeToggle />
              </CardContent>
            </Card>
            <ExportCard />
            <FAQCard faqs={tailwindForgeFAQs} />
          </div>
        </div>
      </div>
    </div>
  );
}