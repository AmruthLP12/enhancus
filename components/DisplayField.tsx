import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Star } from "lucide-react";
import { DisplayFieldProps } from "@/types/django_key_gen";

export const DisplayField = ({
  value,
  label = "Value",
  visible = false,
  onToggleVisibility,
  favorite = false,
  onToggleFavorite,
  toggleIcons = [Eye, EyeOff],
}: DisplayFieldProps) => {
  const [VisibleIcon, HiddenIcon] = toggleIcons;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex gap-2">
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFavorite}
              className={favorite ? "text-yellow-500" : ""}
            >
              <Star className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
            </Button>
          )}
          {onToggleVisibility && (
            <Button variant="ghost" size="sm" onClick={onToggleVisibility}>
              {visible ? (
                <HiddenIcon className="h-4 w-4" />
              ) : (
                <VisibleIcon className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
      <Textarea
        readOnly
        value={visible ? value : "●".repeat(value.length)}
        className="font-mono text-sm resize-none min-h-[100px] transition-all"
      />
    </div>
  );
};
