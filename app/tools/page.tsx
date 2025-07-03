"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    ArrowRight,
    Filter,
    Grid3X3,
    List,
    Search,
    Star
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock tools data - replace with actual import
import { tools } from "@/data/tools";
import Counter from "@/components/analytics/Counter";

const categories = [...new Set(tools.map((tool) => tool.category))];

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const availableTools = filteredTools.filter(
    (tool) => tool.status === "Available"
  );
  const comingSoonTools = filteredTools.filter(
    (tool) => tool.status === "Coming Soon"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Counter page="tools" className="text-right px-10 py-2" />
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Developer Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive collection of utilities to enhance your development
            workflow
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-background/60 backdrop-blur border rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-background border border-input rounded-md px-3 py-2 text-sm"
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Stats */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-muted-foreground">
            Showing {filteredTools.length} of {tools.length} tools
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              {availableTools.length} Available
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              {comingSoonTools.length} Coming Soon
            </span>
          </div>
        </div>

        {/* Available Tools */}
        {availableTools.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="h-6 w-1 bg-primary rounded-full"></span>
              Available Now
            </h2>
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {availableTools.map((tool) => {
                const IconComponent = tool.icon;

                return (
                  <Card
                    key={tool.id}
                    className={`group relative transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 border-2 hover:border-primary/30 ${
                      viewMode === "grid" ? "hover:-translate-y-1" : ""
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

                    <CardHeader
                      className={viewMode === "list" ? "pb-3" : "pb-3"}
                    >
                      <div
                        className={`flex items-start ${
                          viewMode === "list" ? "gap-4" : "justify-between"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                              {tool.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {tool.category}
                              </Badge>
                              <Badge className="text-xs bg-green-500/10 text-green-700 dark:text-green-400">
                                Available
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm mb-4 leading-relaxed">
                        {tool.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={tool.href} >
                        <Button className="w-full group-hover:bg-primary/90 transition-all duration-200 cursor-pointer">
                          Launch Tool
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Coming Soon Tools */}
        {comingSoonTools.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="h-6 w-1 bg-muted-foreground rounded-full"></span>
              Coming Soon
            </h2>
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {comingSoonTools.map((tool) => {
                const IconComponent = tool.icon;

                return (
                  <Card
                    key={tool.id}
                    className="group transition-all duration-300 hover:shadow-lg border-2 opacity-75"
                  >
                    <CardHeader className="pb-3">
                      <div
                        className={`flex items-start ${
                          viewMode === "list" ? "gap-4" : "justify-between"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-muted text-muted-foreground">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight">
                              {tool.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {tool.category}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {tool.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm mb-4 leading-relaxed">
                        {tool.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button disabled className="w-full">
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
