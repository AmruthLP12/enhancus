import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/data/tools";

const categories = [...new Set(tools.map((tool) => tool.category))];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Enhancus
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive utility suite for developers and power users.
            Enhance your workflow with our collection of essential tools.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="max-w-7xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <span className="h-6 w-1 bg-primary rounded-full"></span>
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools
                  .filter((tool) => tool.category === category)
                  .map((tool) => {
                    const IconComponent = tool.icon;
                    const isAvailable = tool.status === "Available";

                    return (
                      <Card
                        key={tool.id}
                        className={`group transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-2 hover:border-primary/20 ${
                          !isAvailable ? "opacity-70" : ""
                        }`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  isAvailable
                                    ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                                    : "bg-muted text-muted-foreground"
                                } transition-colors`}
                              >
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div>
                                <CardTitle className="text-lg leading-tight">
                                  {tool.title}
                                </CardTitle>
                              </div>
                            </div>
                            <Badge
                              variant={isAvailable ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {tool.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <CardDescription className="text-sm mb-4 line-clamp-2">
                            {tool.description}
                          </CardDescription>
                          {isAvailable ? (
                            <Link href={tool.href}>
                              <Button
                                className="w-full group-hover:bg-primary/90 transition-colors"
                                size="sm"
                              >
                                Launch Tool
                              </Button>
                            </Link>
                          ) : (
                            <Button disabled className="w-full" size="sm">
                              Coming Soon
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">
                More Tools Coming Soon
              </h3>
              <p className="text-muted-foreground mb-6">
                We're constantly adding new utilities to help streamline your
                development workflow. Stay tuned for updates!
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline">URL Shortener</Badge>
                <Badge variant="outline">Color Palette Generator</Badge>
                <Badge variant="outline">QR Code Generator</Badge>
                <Badge variant="outline">JSON Formatter</Badge>
                <Badge variant="outline">Regex Tester</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
