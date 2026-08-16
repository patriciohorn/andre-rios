import { revalidateLogic } from "@tanstack/react-form";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@tanstack/react-form"; // ← NEW
import { useAppForm } from "./hooks/form";
import { wizardFormOpts } from "./shared-form";
import { PersonalInfoForm } from "./step1-subform";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GeneralInfoForm } from "./step2-subform";
import { MedicalHistoryForm } from "./step-3-subform";
import { PhotosForm } from "./step-4-subform";
import { Stepper } from "./components/Stepper";
import { Disclaimer } from "./components/Disclaimer";

// ── NEW: localStorage helpers (module scope) ──────────────
const STORAGE_KEY = "consultaVirtual";
const STEP_KEY = `${STORAGE_KEY}:step`;

const getSavedValues = () => {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const getSavedStep = () => {
  if (typeof window === "undefined") return 0;
  const saved = localStorage.getItem(STEP_KEY);
  return saved ? Number(saved) : 0;
};

const clearSavedForm = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STEP_KEY);
};
// ──────────────────────────────────────────────────────────

export function ConsultaWizard() {
  const [step, setStep] = useState(getSavedStep); // ← CHANGED
  const [submitError, setSubmitError] = useState("");
  const [hasAccepted, setHasAccepted] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const form = useAppForm({
    ...wizardFormOpts,
    defaultValues: getSavedValues() ?? wizardFormOpts.defaultValues, // ← NEW
    validationLogic: revalidateLogic(),
    validators: {},
    onSubmit: async ({ value }) => {
      const { personalInfo, generalInfo, medicalHistory, photos } = value;
      const { dobDay, dobMonth, dobYear, ...personalInfoRest } = personalInfo;

      const formData = {
        fullName: `${personalInfo.firstName} ${personalInfo.lastName}`,
        email: personalInfo.email,
        phone: personalInfo.phone,
        desiredProcedures: generalInfo.desiredProcedures,
        desiredSurgeryMonth: personalInfo.desiredSurgeryMonth,
        desiredSurgeryYear: personalInfo.desiredSurgeryYear,
        personalInfo: {
          ...personalInfoRest,
          dateOfBirth: new Date(
            Number(dobYear),
            Number(dobMonth) - 1,
            Number(dobDay),
          ).toISOString(),
          heightFt: Number(personalInfo.heightFt),
          heightIn: Number(personalInfo.heightIn),
          weightLbs: Number(personalInfo.weightLbs),
        },
        generalInfo,
        medicalHistory,
        photos,
      };

      try {
        const res = await fetch(
          `${import.meta.env.PUBLIC_API_URL}/api/consultas`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          },
        );

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(
            body.message || "Submission failed please refresh and try again",
          );
        }

        clearSavedForm(); // ← NEW
        window.location.href = "/consulta-virtual/gracias";
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitError("We couldn't send your consultation. Please try again.");
      }
    },
  });

  // ── NEW: persist on every change ──────────────────────
  const values = useStore(form.store, (state) => state.values);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    localStorage.setItem(STEP_KEY, String(step));
  }, [step]);
  // ──────────────────────────────────────────────────────

  if (!hasAccepted) {
    return (
      <Card className="bg-neutral-100 sm:p-6 sm:py-4 rounded-3xl">
        <Disclaimer onAccept={() => setHasAccepted(true)} />
      </Card>
    );
  }

  return (
    <Card
      className="bg-neutral-100 sm:p-6 sm:py-4 rounded-3xl scroll-m-20 sm:scroll-m-24"
      ref={topRef}
    >
      <CardHeader className="px-4 sm:px-6">
        <Stepper activeStep={step} />
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {submitError && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {submitError}
          </p>
        )}
        {step === 0 && (
          <PersonalInfoForm form={form} step={step} setStep={setStep} />
        )}
        {step === 1 && (
          <GeneralInfoForm form={form} step={step} setStep={setStep} />
        )}
        {step === 2 && (
          <MedicalHistoryForm form={form} step={step} setStep={setStep} />
        )}
        {step === 3 && <PhotosForm form={form} step={step} setStep={setStep} />}
      </CardContent>
    </Card>
  );
}
