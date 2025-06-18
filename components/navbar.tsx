"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

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
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Enhancus
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
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Enhancus
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <span className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-muted/50">
              Developer Utility Suite
            </span>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              Home
            </Button>
          </Link>
          <Link href="/key-gen">
            <Button variant="ghost" size="sm">
              Tools
            </Button>
          </Link>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ModeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0"
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
          <div className="container px-4 py-4 space-y-2">
            <div className="text-xs text-muted-foreground mb-3 px-2">
              Developer Utility Suite
            </div>
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Home
              </Button>
            </Link>
            <Link href="/key-gen" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Tools
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}