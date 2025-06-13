import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { StrengthIndicatorProps } from "@/types/django_key_gen";

export const StrengthIndicator = ({
  score,
  label = "Strength",
  thresholds = { high: 80, medium: 60 },
  colors = { high: "bg-green-500", medium: "bg-yellow-500", low: "bg-red-500" },
}: StrengthIndicatorProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <Label className="text-sm font-medium">{label}</Label>
      <Badge
        variant={
          score >= thresholds.high
            ? "default"
            : score >= thresholds.medium
            ? "secondary"
            : "destructive"
        }
      >
        {score}% {label}
      </Badge>
    </div>
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${
          score >= thresholds.high
            ? colors.high
            : score >= thresholds.medium
            ? colors.medium
            : colors.low
        }`}
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);
