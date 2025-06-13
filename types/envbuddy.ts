export interface EnvVariable {
  id: string;
  key: string;
  value: string;
  description?: string;
  optional: boolean;
  isSecret: boolean;
}

export interface EnvVariableTableProps {
  variables: EnvVariable[];
  onUpdate: (variables: EnvVariable[]) => void;
  errors: Record<string, string>;
}

export interface EnvImportCardProps {
  onImport: (variables: EnvVariable[]) => void;
}