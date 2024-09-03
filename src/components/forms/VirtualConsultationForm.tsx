import { useState } from 'react';
import { EligibilityCheckForm } from './EligibilityCheckForm';
import { ConsultationForm } from './ConsultationForm';

export function VirtualConsultationForm() {
  const [isEligible, setIsEligible] = useState(false);

  function handleEligibilityStatus(eligible: boolean) {
    setIsEligible(eligible);
  }

  return (
    <section className="mt-20">
      {!isEligible ? (
        <EligibilityCheckForm onEligibilityStatusChange={handleEligibilityStatus} />
      ) : (
        <ConsultationForm />
      )}
    </section>
  );
}
