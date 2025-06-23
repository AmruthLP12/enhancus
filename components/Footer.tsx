import Link from "next/link";
import { Github, Globe, Heart, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Section - Branding */}
          <div className="flex flex-col items-center lg:items-start gap-2">
            <p className="flex items-center gap-2 text-sm font-medium">
              <span className="text-foreground">Crafted with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span className="text-foreground">by Amruth L P</span>
            </p>
            <p className="text-xs text-muted-foreground max-w-md text-center lg:text-left">
              Full-stack developer passionate about creating elegant solutions
            </p>
          </div>

          {/* Right Section - Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="https://github.com/amruthlp12"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50 transition-all duration-200 text-sm text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link
              href="https://amruthlp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50 transition-all duration-200 text-sm text-muted-foreground hover:text-foreground"
            >
              <Globe className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Portfolio</span>
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="mailto:amruthlp12@gmail.com"
              className="group flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50 transition-all duration-200 text-sm text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Contact</span>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Amruth L P. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">•</span>
            <span>Built with Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}