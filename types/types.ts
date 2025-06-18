import { LucideIcon } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
  icon?: LucideIcon;
}

export interface FAQCardProps {
  title?: string;
  faqs: FAQItem[];
  icon?: LucideIcon;
  defaultOpenIndex?: number; // Index of FAQ to be open by default
  className?: string;
}
