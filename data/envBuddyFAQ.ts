import { FAQItem } from "@/types/types";
import { HelpCircle } from "lucide-react";

export const envBuddyFAQs: FAQItem[] = [
  {
    question: "What is EnvBuddy?",
    answer:
      "EnvBuddy is a tool for managing environment variables, allowing you to create, edit, import, and export .env files, .env.example templates, or JSON configurations for your projects.",
    icon: HelpCircle,
  },
  {
    question: "How do I mark a variable as optional?",
    answer:
      "Toggle the 'Optional' switch in the table for any variable. Optional variables are prefixed with a comment (#) in .env.example exports and don't require a value.",
    icon: HelpCircle,
  },
  {
    question: "Can I import existing .env files?",
    answer:
      "Yes, you can paste .env content into the text area or upload a .env file. EnvBuddy will parse and populate the table with the variables.",
    icon: HelpCircle,
  },
  {
    question: "Is my data secure?",
    answer:
      "EnvBuddy runs in your browser and optionally saves data to localStorage. No data is sent to servers unless you explicitly export and share the files.",
    icon: HelpCircle,
  },
];
