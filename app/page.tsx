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
import { ArrowRight, Zap, Shield, Settings, Code, Sparkles, Users, Star } from "lucide-react";
import { tools } from "@/data/tools";

// Randomly select 3 available tools
const getRandomTools = (tools: any[], count: number) => {
  const availableTools = tools.filter((tool) => tool.status === "Available");
  const shuffled = [...availableTools].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, availableTools.length));
};

const featuredTools = getRandomTools(tools, 3);

const stats = [
  { label: "Active Tools", value: "4+", icon: Zap },
  { label: "Happy Users", value: "5k+", icon: Users },
  { label: "Lines of Code Saved", value: "50k+", icon: Code },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Developer Utility Suite
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-6">
              EnhancUS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Supercharge your development workflow with our comprehensive suite of 
              <span className="text-foreground font-medium"> essential tools</span> and utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools">
                <Button size="lg" className="group">
                  Explore All Tools
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#featured">
                <Button variant="outline" size="lg">
                  View Featured
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section id="featured" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular and essential development utilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredTools.map((tool) => {
              const IconComponent = tool.icon;
              const isAvailable = tool.status === "Available";

              return (
                <Card
                  key={tool.id}
                  className={`group relative transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 border-2 hover:border-primary/30 hover:-translate-y-1 ${
                    !isAvailable ? "opacity-75" : ""
                  }`}
                >
                  {tool.isPopular && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Popular
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-xl ${
                            isAvailable
                              ? "bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110"
                              : "bg-muted text-muted-foreground"
                          } transition-all duration-200`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                            {tool.title}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {tool.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm mb-6 leading-relaxed">
                      {tool.description}
                    </CardDescription>
                    {isAvailable ? (
                      <Link href={tool.href}>
                        <Button
                          className="w-full group-hover:bg-primary/90 transition-all duration-200"
                          size="sm"
                        >
                          Launch Tool
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="w-full" size="sm">
                        <Badge className="mr-2">{tool.status}</Badge>
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/tools">
              <Button variant="outline" size="lg" className="group">
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Coming Next</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're constantly expanding our toolkit with new utilities to boost your productivity
            </p>
          </div>

          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 via-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">More Powerful Tools</h3>
                <p className="text-muted-foreground mb-6">
                  Our roadmap includes exciting new utilities to streamline your development process
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                {[
                  "URL Shortener",
                  "Color Palette Generator", 
                  "QR Code Generator",
                  "JSON Formatter",
                  "Regex Tester",
                  "Base64 Encoder",
                  "Hash Generator",
                  "Password Generator",
                  "Image Optimizer",
                  "API Tester"
                ].map((tool, index) => (
                  <Badge key={index} variant="outline" className="justify-center py-2">
                    {tool}
                  </Badge>
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Want to suggest a new tool or feature?
                </p>
                <Link href="https://github.com/amruthlp12" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    Share Your Ideas
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}