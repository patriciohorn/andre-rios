// import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { revalidateLogic } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import { useAppForm } from "./hooks/form";
import {
  generalInfoSchema,
  personalInfoSchema,
  wizardFormOpts,
} from "./shared-form";
import { PersonalInfoForm } from "./step1-subform";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GeneralInfoForm } from "./step2-subform";

export function ConsultaWizard() {
  const [step, setStep] = useState(1);
  const form = useAppForm({
    ...wizardFormOpts,
    validationLogic: revalidateLogic(),
    validators: {
      // onDynamic is only used when `form.handleSubmit` is called itself.
      // When `form.FormGroup`'s `handleSubmit` is called, it will only validate the current step's schema.
      // This means that this schema will not be called when the user submits the form group, but instead when they submit the entire form.
      onDynamic: z.object({
        personalInfo: personalInfoSchema,
        generalInfo: generalInfoSchema,
      }),
    },
    onSubmit: ({ value }) => {
      alert(`Form submitted: ${JSON.stringify(value)}`);
    },
  });
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{`Step ${step + 1}`}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <>
          {step === 0 && (
            <PersonalInfoForm form={form} step={step} setStep={setStep} />
          )}
          {step === 1 && (
            <GeneralInfoForm form={form} step={step} setStep={setStep} />
          )}
          {step === 2 && (
            <div>
              <h2>Step 3</h2>
            </div>
          )}
        </>
      </CardContent>
    </Card>
  );
}
