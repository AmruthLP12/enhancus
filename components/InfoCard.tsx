import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoCardProps } from "@/types/django_key_gen";


export const InfoCard = ({
  title = "Information",
  icon: Icon,
  items,
  badgeVariant = "secondary",
}: InfoCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5" />}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Badge variant={badgeVariant}>{item.label}</Badge>
            <span className="text-sm">{item.value}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);