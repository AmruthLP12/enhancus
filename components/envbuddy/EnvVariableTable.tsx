import { useState } from "react";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Trash2, Eye, EyeOff } from "lucide-react";
import { EnvVariable, EnvVariableTableProps } from "@/types/envbuddy";
import { v4 as uuidv4 } from "uuid";

const SortableTableRow = ({
  variable,
  index,
  errors,
  handleUpdate,
  handleDelete,
  visibility,
  toggleVisibility,
}: {
  variable: EnvVariable;
  index: number;
  errors: Record<string, string>;
  handleUpdate: (id: string, field: keyof EnvVariable, value: any) => void;
  handleDelete: (id: string) => void;
  visibility: Record<string, boolean>;
  toggleVisibility: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: variable.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className={errors[variable.id] ? "border-red-500" : ""}>
      <TableCell>
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="h-4 w-4" />
        </div>
      </TableCell>
      <TableCell>
        <Input
          value={variable.key}
          onChange={(e) => handleUpdate(variable.id, "key", e.target.value)}
          placeholder="e.g., DATABASE_URL"
          className={errors[variable.id] ? "border-red-500" : ""}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Input
            type={variable.isSecret && !visibility[variable.id] ? "password" : "text"}
            value={variable.value}
            onChange={(e) => handleUpdate(variable.id, "value", e.target.value)}
            placeholder="e.g., postgres://user:pass@host:5432/db"
            className={errors[variable.id] ? "border-red-500" : ""}
          />
          {variable.isSecret && (
            <Button variant="ghost" size="sm" onClick={() => toggleVisibility(variable.id)}>
              {visibility[variable.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Input
          value={variable.description || ""}
          onChange={(e) => handleUpdate(variable.id, "description", e.target.value)}
          placeholder="e.g., Main DB for staging"
        />
      </TableCell>
      <TableCell>
        <Switch
          checked={variable.optional}
          onCheckedChange={(checked) => handleUpdate(variable.id, "optional", checked)}
        />
      </TableCell>
      <TableCell>
        <Switch
          checked={variable.isSecret}
          onCheckedChange={(checked) => handleUpdate(variable.id, "isSecret", checked)}
        />
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" onClick={() => handleDelete(variable.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export const EnvVariableTable = ({ variables, onUpdate, errors }: EnvVariableTableProps) => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAdd = () => {
    const newVariable: EnvVariable = {
      id: uuidv4(),
      key: "",
      value: "",
      description: "",
      optional: false,
      isSecret: false,
    };
    onUpdate([...variables, newVariable]);
  };

  const handleUpdate = (id: string, field: keyof EnvVariable, value: any) => {
    const updated = variables.map((v) => (v.id === id ? { ...v, [field]: value } : v));
    onUpdate(updated);
  };

  const handleDelete = (id: string) => {
    onUpdate(variables.filter((v) => v.id !== id));
  };

  const toggleVisibility = (id: string) => {
    setVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = variables.findIndex((v) => v.id === active.id);
      const newIndex = variables.findIndex((v) => v.id === over?.id);
      const reordered = Array.from(variables);
      const [moved] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, moved);
      onUpdate(reordered);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleAdd} className="mb-4">
        + Add Variable
      </Button>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={variables.map((v) => v.id)} strategy={verticalListSortingStrategy}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-20">Optional</TableHead>
                <TableHead className="w-20">Secret</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variables.map((variable, index) => (
                <SortableTableRow
                  key={variable.id}
                  variable={variable}
                  index={index}
                  errors={errors}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  visibility={visibility}
                  toggleVisibility={toggleVisibility}
                />
              ))}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
      {Object.values(errors).length > 0 && (
        <div className="text-red-500 text-sm">
          {Object.values(errors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};