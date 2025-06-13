import { EnvVariable } from "@/types/envbuddy";
import { v4 as uuidv4 } from "uuid";

export function parseEnv(content: string): EnvVariable[] {
  const lines = content.split("\n").map((line) => line.trim());
  const variables: EnvVariable[] = [];

  for (const line of lines) {
    if (!line || line.startsWith("#")) continue;
    const [key, ...valueParts] = line.split("=");
    const value = valueParts.join("=").trim();
    if (key.trim()) {
      variables.push({
        id: uuidv4(),
        key: key.trim(),
        value,
        description: "",
        optional: false,
        isSecret: key.toLowerCase().includes("secret") || key.toLowerCase().includes("password"),
      });
    }
  }

  return variables;
}

export function exportEnv(variables: EnvVariable[]): string {
  return variables
    .map(({ key, value, description }) => {
      const lines = [];
      if (description) {
        lines.push(`# Description: ${description}`);
      }
      lines.push(`${key}=${value}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

export function exportEnvExample(variables: EnvVariable[]): string {
  return variables
    .map(({ key, optional }) => (optional ? `# ${key}=` : `${key}=`))
    .join("\n");
}

export function exportJson(variables: EnvVariable[]): string {
  const obj = variables.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  return JSON.stringify(obj, null, 2);
}

export function validateVariables(variables: EnvVariable[]): Record<string, string> {
  const errors: Record<string, string> = {};
  const keys = variables.map((v) => v.key);

  variables.forEach((variable, index) => {
    const id = variable.id;
    if (!variable.key.trim()) {
      errors[id] = "Key is required";
    } else if (keys.filter((k) => k === variable.key).length > 1) {
      errors[id] = "Duplicate key";
    }
    if (!variable.optional && !variable.value.trim()) {
      errors[id] = errors[id] ? `${errors[id]}; Value is required` : "Value is required";
    }
  });

  return errors;
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename; // ← this is enough for browser to name it .env
  a.click();

  URL.revokeObjectURL(url);
}

