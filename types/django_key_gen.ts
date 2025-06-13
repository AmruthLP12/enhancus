import { LucideIcon } from "lucide-react";

export interface HistoryItem {
  id: string | number;
  label: string;
  timestamp: string;
  [key: string]: any; // Allow additional flexible properties
}

export interface InfoCardProps {
  title?: string;
  icon?: LucideIcon;
  items: { label: string; value: string | number }[];
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

export interface AlertCardProps {
  message: string;
  icon?: LucideIcon;
  title?: string;
}

export interface CodeGuideCardProps {
  title?: string;
  sections: { title: string; code: string }[];
}

export interface HistoryCardProps<T extends HistoryItem> {
  history: T[];
  onLoadFromHistory: (item: T) => void;
  onClearHistory: () => void;
  onDeleteItem: (id: string | number) => void;
  labelKey?: keyof T; // Key for display label
  favoriteKey?: keyof T; // Key for favorite status
  timestampKey?: keyof T; // Key for timestamp
}

export interface StrengthIndicatorProps {
  score: number;
  label?: string;
  thresholds?: { high: number; medium: number };
  colors?: { high: string; medium: string; low: string };
}

export interface DisplayFieldProps {
  value: string;
  label?: string;
  visible?: boolean;
  onToggleVisibility?: () => void;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  toggleIcons?: [LucideIcon, LucideIcon]; // [visible, hidden]
}

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

export interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}