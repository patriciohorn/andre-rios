import { type ReactNode } from "react";
import { useFieldContext } from "../hooks/form-context";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

export type FormControlProps = {
  label?: string;
  hideLabel?: boolean;
  description?: string;
  placeholder?: string;
  type?: string;
  className?: string;
};

type FormBaseProps = FormControlProps & {
  children: ReactNode;
  horizontal?: boolean;
  controlFirst?: boolean;
  className?: string;
};

export function FormBase({
  children,
  label,
  hideLabel,
  description,
  controlFirst,
  horizontal,
  className,
}: FormBaseProps) {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const labelElement = label ? (
    <>
      <FieldLabel
        htmlFor={field.name}
        className={hideLabel ? "sr-only" : undefined}
      >
        {label}
      </FieldLabel>
      {description && !hideLabel && (
        <FieldDescription>{description}</FieldDescription>
      )}
    </>
  ) : null;
  const errorElem = isInvalid && (
    <FieldError errors={field.state.meta.errors} />
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
      className={cn(className)}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {errorElem}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {errorElem}
        </>
      )}
    </Field>
  );
}
