import { useState } from 'react';
import { EligibilityCheckForm } from './EligibilityCheckForm';
import { ConsultationForm } from './ConsultationForm';

export function VirtualConsultationForm() {
  const [isEligible, setIsEligible] = useState(false);
  const [formData, setFormData] = useState({});

  function handleEligibilityStatus(eligible: boolean) {
    setIsEligible(eligible);
  }

  // function handleFormSubmit(data: any) {
  //   setFormData((prevData) => [...prevData, data]);
  //   console.log(formData);
  // }

  return (
    <section className="mt-20">
      {!isEligible ? (
        <EligibilityCheckForm
          onEligibilityStatusChange={handleEligibilityStatus}
          onFormSubmit={(data) => console.log(data)}
        />
      ) : (
        <ConsultationForm />
      )}
    </section>
  );
}
