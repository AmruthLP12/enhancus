"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { tools } from "@/data/tools";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Open on Ctrl + K or Cmd + K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  // Filter out "Coming Soon" tools
  const availableTools = tools.filter((tool) => tool.status === "Available");

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tools (e.g., EnvBuddy, Colors)..." />
        <CommandList>
          <CommandEmpty>No tools found.</CommandEmpty>
          {availableTools.map((tool) => (
            <CommandItem
              key={tool.id}
              onSelect={() => handleSelect(tool.href)}
              className="flex items-start gap-2"
            >
              <tool.icon className="h-4 w-4 mt-1 text-primary" />
              <div>
                <p className="font-medium">{tool.title}</p>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </div>
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>

      {/* Trigger Button */}
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="sm"
        className="hidden md:flex px-3 py-1 text-sm h-9 items-center gap-2"
      >
        <Search className="h-4 w-4" />
        Search
        <kbd className="ml-2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
          Ctrl + K
        </kbd>
      </Button>
    </>
  );
}