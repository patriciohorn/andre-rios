import { useState } from 'react';
import { EligibilityCheckForm } from './EligibilityCheckForm';
import { ConsultationForm } from './ConsultationForm';
import { useToast } from '@/components/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { CircleCheck } from 'lucide-react';

export function VirtualConsultationForm() {
  const [isEligible, setIsEligible] = useState(false);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  function handleEligibilityStatus(eligible: boolean, eligibilityData: any) {
    setIsEligible(eligible);
    setFormData((prevData) => ({
      ...prevData,
      ...eligibilityData
    }));
  }

  function handleFormSubmit(consultationData: any) {
    const combinedData = { ...formData, ...consultationData };
    setFormData(combinedData);
    toast({
      title: 'Pacient Information',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(combinedData, null, 2)}</code>
        </pre>
      )
    });
    setIsSubmitted(true);
  }

  return (
    <section className="mt-20 min-h-screen">
      {isSubmitted ? (
        <div className="p-4 py-10 bg-green-100 text-green-800 rounded-md text-center flex flex-col gap-y-8 items-center">
          <div className="space-y-4">
            <CircleCheck className="text-green-900 w-full h-12" />
            <p className="max-w-prose text-lg">
              Received! Dr. Ríos will review your submission in the next 7-10 BUSINESS DAYS * and
              get back to you with more information
            </p>
          </div>
          <p className="text-green-600 text-sm max-w-prose">
            * Please excuse any delays, Dr. Ríos reviews and replies to every submission himself,
            but he has a very busy schedule and usually works on his emails between surgeries and
            PreOp/PostOp consultations.
          </p>
        </div>
      ) : !isEligible ? (
        <EligibilityCheckForm onEligibilityStatusChange={handleEligibilityStatus} />
      ) : (
        <ConsultationForm onFormSubmit={handleFormSubmit} />
      )}
      <Toaster />
    </section>
  );
}
