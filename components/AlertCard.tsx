import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCardProps } from "@/types/django_key_gen";

export const AlertCard = ({ message, icon: Icon, title }: AlertCardProps) => (
  <Alert>
    {Icon && <Icon className="h-4 w-4" />}
    <AlertDescription>
      {title && <strong>{title}: </strong>}
      {message}
    </AlertDescription>
  </Alert>
);