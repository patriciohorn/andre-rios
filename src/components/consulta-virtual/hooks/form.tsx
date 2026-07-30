import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext, useFormContext } from "./form-context.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FormInput } from "../components/FormInput.tsx";
import { FormBase } from "../components/FormBase.tsx";
import { FormSelect } from "../components/FormSelect.tsx";
import { FormCheckbox } from "../components/FormCheckbox.tsx";
import { FormTextarea } from "../components/FormTextarea.tsx";

function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting}>
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    FormBase,
    FormInput,
    FormSelect,
    FormCheckbox,
    FormTextarea,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
