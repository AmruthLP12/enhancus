import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaintBucket } from "lucide-react";
import {HeaderCard} from "@/components/HeaderCard";
import Link from "next/link";

export default function TailwindForgeLanding() {
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
            <CardTitle>Welcome to TailwindForge</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              TailwindForge helps you create custom Tailwind CSS v4 color palettes with OKLCH support. Choose between Basic mode for core colors or Advanced mode for full customization, including chart and sidebar colors.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customize essential colors like background, primary, and foreground for a simple Tailwind CSS theme.
                  </p>
                  <Link href="/tailwind-forge/basic">
                    <Button>Go to Basic Mode</Button>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Advanced Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Fine-tune all colors, including charts and sidebars, for a comprehensive Tailwind CSS theme.
                  </p>
                  <Link href="/tailwind-forge/advanced">
                    <Button>Go to Advanced Mode</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}