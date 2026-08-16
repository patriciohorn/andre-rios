import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function Disclaimer({ onAccept }: { onAccept: () => void }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Before we begin</h1>

      <div className="mt-6 rounded-xl shadow-sm border border-amber-200 bg-amber-50 p-5">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-1" />
          <div className="space-y-3 text-sm text-amber-900">
            <p className="text-lg font-semibold">Important</p>
            <p>
              Please answer the questions as accurately and truthfully as
              possible. Any withholding of information about your medical
              history — such as your weight, illnesses, medications, drug,
              nicotine or alcohol usage, current or previous —{" "}
              <strong>will result in the cancellation of your surgery</strong>{" "}
              and unfortunately losing your deposit, and/or not being able to be
              our patient now or in the future.
            </p>
          </div>
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3">
        <Checkbox
          checked={checked}
          onCheckedChange={(v) => setChecked(v === true)}
          className="mt-0.5"
        />
        <span className="text-sm">
          I have read and understood the above, and I confirm that all the
          information I provide will be complete and truthful.
        </span>
      </label>

      <Button
        className="mt-8 w-full sm:w-auto"
        disabled={!checked}
        onClick={onAccept}
      >
        Start my consultation
      </Button>
    </div>
  );
}
