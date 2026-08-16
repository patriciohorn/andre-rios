const steps = [0, 1, 2, 3];

type Step = {
  activeStep: number;
};
const cardTitle = [
  "Personal Information",
  "General Information",
  "Medical History",
  "Photos & Submitting",
];
export function Stepper({ activeStep }: Step) {
  return (
    <div className="mb-4 sm:mb-16">
      {/* Circles + connectors */}
      <div className="flex items-center justify-between px-8 sm:px-0 sm:w-[480px] sm:mx-auto">
        {steps.map((step) => {
          const isCompleted = step < activeStep;
          const isCurrent = step === activeStep;

          return (
            <div
              key={step}
              className={`relative w-8 h-8 rounded-full flex items-center justify-center shrink-0
                ${isCurrent || isCompleted ? "bg-[#101820] text-white" : "bg-white text-black border border-neutral-300"}
                after:content-[''] after:absolute after:h-[1px] after:left-full after:top-1/2 after:-translate-y-1/2
                after:w-[calc(100%+1rem)] sm:after:w-[117px]
                after:transition-colors after:duration-300
                last:after:hidden
                ${isCompleted ? "after:bg-[#101820]" : "after:bg-neutral-300"}`}
            >
              <span className="text-base sm:text-lg">{step + 1}</span>

              {/* Desktop labels */}
              <span
                className={`hidden sm:block absolute top-10 text-sm text-center 
                  ${isCurrent || isCompleted ? "text-neutral-600" : "text-neutral-400"}`}
              >
                {cardTitle[step]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile labels */}
      <p className="sm:hidden mt-4 text-center text-sm font-medium">
        {cardTitle[activeStep]}
      </p>

      <p className="sr-only" aria-live="polite">
        Step {activeStep + 1} of {steps.length}: {cardTitle[activeStep]}
      </p>
    </div>
  );
}
