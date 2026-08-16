// components/RepeatableRows.tsx
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

type RepeatableRowsProps<T> = {
  form: any;
  name: string;
  label: string;
  description?: string;
  addLabel: string;
  emptyItem: T;
  renderRow: (index: number) => ReactNode;
};

export function RepeatableRows<T>({
  form,
  name,
  label,
  description,
  addLabel,
  emptyItem,
  renderRow,
}: RepeatableRowsProps<T>) {
  return (
    <form.AppField name={name} mode="array">
      {(field: any) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>
          {description && <FieldDescription>{description}</FieldDescription>}
          <div className="space-y-3">
            {field.state.value.map((_: T, i: number) => (
              <div
                key={i}
                className="relative rounded-xl border border-border p-4 pr-12 bg-background"
              >
                {renderRow(i)}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => field.removeValue(i)}
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="default"
            className="w-fit"
            onClick={() => field.pushValue({ ...emptyItem })}
          >
            <Plus className="h-4 w-4" />
            {addLabel}
          </Button>

          {field.state.meta.isTouched && !field.state.meta.isValid && (
            <FieldError errors={field.state.meta.errors} />
          )}
        </Field>
      )}
    </form.AppField>
  );
}
