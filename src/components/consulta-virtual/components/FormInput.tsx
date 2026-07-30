import { Input } from "@/components/ui/input";
import { FormBase, type FormControlProps } from "./FormBase";
import { useFieldContext } from "../hooks/form-context";
import type { ComponentProps } from "react";

export function FormInput({
  type = "text",
  placeholder,
  ...baseProps
}: FormControlProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...baseProps}>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        placeholder={placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
    </FormBase>
  );
}
