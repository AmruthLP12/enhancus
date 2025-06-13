import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { BreadcrumbItem } from "@/types/django_key_gen";
import { Button } from "@/components/ui/button";

interface HeaderCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  breadcrumbs?: BreadcrumbItem[];
  actions?: Array<{
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost" | "link";
  }>;
  className?: string;
}

export const HeaderCard = ({
  title,
  description,
  icon: Icon,
  breadcrumbs = [],
  actions,
  className = "",
}: HeaderCardProps) => (
  <div className={`text-center mb-8 ${className}`}>
    {breadcrumbs.length > 0 && (
      <nav className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        {breadcrumbs.map((item, index) => (
          <span key={item.href} className="flex items-center gap-1">
            {index > 0 && <span className="mx-1">/</span>}
            <Link
              href={item.href}
              className={`flex items-center gap-1 hover:text-primary transition-colors ${
                index === breadcrumbs.length - 1 ? "text-foreground font-medium" : ""
              }`}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.label}
            </Link>
          </span>
        ))}
      </nav>
    )}
    {actions && (
      <div className="flex gap-2 justify-center mb-8">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || "outline"}
            size="sm"
            className="gap-2"
            onClick={action.onClick}
          >
            {action.icon && <action.icon className="h-4 w-4" />}
            {action.label}
          </Button>
        ))}
      </div>
    )}
    <div className="flex items-center justify-center gap-3 mb-4">
      {Icon && (
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-8 w-8 text-primary" />
        </div>
      )}
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
    {description && (
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
    )}
  </div>
);