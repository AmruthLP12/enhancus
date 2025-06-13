import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

import { parseEnv } from "@/utils/envUtils";
import { EnvImportCardProps } from "@/types/envbuddy";

export const EnvImportCard = ({ onImport }: EnvImportCardProps) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleTextImport = () => {
    try {
      const variables = parseEnv(text);
      onImport(variables);
      setText("");
      setError("");
    } catch (e) {
      setError("Invalid .env format");
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const variables = parseEnv(content);
          onImport(variables);
          setError("");
        } catch (e) {
          setError("Invalid .env file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import Environment Variables
        </CardTitle>
        <CardDescription>
          Paste .env content or upload a .env file to populate the table.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste .env content here, e.g., DATABASE_URL=postgres://..."
          rows={5}
        />
        <div className="flex gap-4">
          <Button onClick={handleTextImport}>Import from Text</Button>
          <Button variant="outline" asChild>
            <label className="cursor-pointer">
              <input type="file" accept=".env" className="hidden" onChange={handleFileImport} />
              Upload .env File
            </label>
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardContent>
    </Card>
  );
};