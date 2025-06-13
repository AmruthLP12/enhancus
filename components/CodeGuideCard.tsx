import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CodeGuideCardProps } from "@/types/django_key_gen";

export const CodeGuideCard = ({ title = "Usage Guide", sections }: CodeGuideCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="text-sm">
            <p className="font-medium mb-2">{section.title}</p>
            <code className="block bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
              {section.code}
            </code>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);