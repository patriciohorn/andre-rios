import { useState } from 'react';
import { Step1GeneralInfo } from './Step1GeneralInfo';
import { Step2Expectations } from './Step2Expectations';
import { Step3MedicalHistory } from './Step3MedicalHistory';
import { Step4UploadPictures } from './Step4UploadPictures';
export const ConsultationForm = () => {
  const [step, setStep] = useState(2);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFinalSubmit = () => {
    console.log('Submitted');
  };

  return (
    <div className="mt-20">
      {step === 0 && <Step1GeneralInfo onNext={handleNext} />}
      {step === 1 && <Step2Expectations onNext={handleNext} onBack={handleBack} />}
      {step === 2 && <Step3MedicalHistory onNext={handleNext} />}
      {step === 3 && <Step4UploadPictures onSubmit={handleFinalSubmit} />}
    </div>
  );
};
