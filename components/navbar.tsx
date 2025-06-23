"use client";
import { Code, Github, Globe, Menu, Settings, X, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { SearchCommand } from "@/components/search-command";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  E
                </span>
                <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse"></div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                EnhancUS
              </span>
            </Link>
          </div>
          <div className="h-9 w-9 rounded-md border bg-background"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="group flex items-center space-x-2 hover:opacity-80 transition-all duration-200 cursor-pointer"
          >
            <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-200">
              <span className="text-primary-foreground font-bold text-sm relative z-10">
                E
              </span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/0 to-primary/20 group-hover:from-primary/10 group-hover:to-primary/30 transition-all duration-200"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent group-hover:from-primary/80 group-hover:to-primary/80 transition-all duration-200">
                EnhancUS
              </span>
            </div>
          </Link>
          {/* Desktop Navigation Badge */}
          <div className="hidden lg:block">
            <span className="text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-muted/50 border border-muted flex items-center gap-1.5">
              <Zap className="h-3 w-3" />
              Developer Utility Suite
            </span>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-1">
          <Link href="/" className="cursor-pointer">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-muted/70 transition-colors cursor-pointer"
            >
              <Settings className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>

          <Link href="/tools" className="cursor-pointer">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-muted/70 transition-colors cursor-pointer"
            >
              <Code className="h-4 w-4 mr-2" />
              Tools
            </Button>
          </Link>

          <div className="w-px h-4 bg-border mx-2"></div>

          <Link
            href="https://github.com/amruthlp12"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-muted/70 transition-colors group cursor-pointer"
            >
              <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              GitHub
            </Button>
          </Link>
          <Link
            href="https://amruthlp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-muted/70 transition-colors group cursor-pointer"
            >
              <Globe className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Portfolio
            </Button>
          </Link>

          <div className="w-px h-4 bg-border mx-2"></div>

          <SearchCommand />
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <SearchCommand />
          <ModeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0 hover:bg-muted/70 transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container px-4 py-4 space-y-1">
            <div className="text-xs text-muted-foreground mb-4 px-2 flex items-center gap-1.5">
              <Zap className="h-3 w-3" />
              Developer Utility Suite
            </div>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer"
            >
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-muted/70 transition-colors cursor-pointer"
              >
                Home
              </Button>
            </Link>

            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer"
            >
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-muted/70 transition-colors cursor-pointer"
              >
                <Code className="h-4 w-4 mr-2" />
                Tools
              </Button>
            </Link>

            <div className="w-full h-px bg-border my-2"></div>

            <Link
              href="https://github.com/amruthlp12"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer"
            >
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-muted/70 transition-colors cursor-pointer"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </Link>
            <Link
              href="https://amruthlp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer"
            >
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-muted/70 transition-colors cursor-pointer"
              >
                <Globe className="h-4 w-4 mr-2" />
                Portfolio
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
