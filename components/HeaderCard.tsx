import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface HeaderCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  navButton?: {
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
    href?: string;
  };
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
  navButton,
  actions,
  className = "",
}: HeaderCardProps) => (
  <div className={`text-center mb-8 ${className}`}>
    <div className="flex items-center gap-4 mb-8">
      {navButton && (
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={navButton.onClick}
          {...(navButton.href ? { as: "a", href: navButton.href } : {})}
        >
          <navButton.icon className="h-4 w-4" />
          {navButton.label}
        </Button>
      )}
      {actions && (
        <div className="flex gap-2">
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
    </div>
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