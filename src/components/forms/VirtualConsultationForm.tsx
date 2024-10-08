import { useState } from 'react';
import { EligibilityCheckForm } from './EligibilityCheckForm';
import { ConsultationForm } from './ConsultationForm';
import { useToast } from '@/components/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { CircleCheck } from 'lucide-react';
import { jsPDF } from 'jspdf';

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
    const height = combinedData.heightCm
      ? combinedData.heightCm
      : `${combinedData.heightFt}' ${combinedData.heightIn}`;
    const weightUnit = combinedData.heightCm ? 'kgs' : 'lbs';

    const doc = new jsPDF();
    doc.text('Pacient Information', 10, 10);
    doc.text(
      `Nombre: ${combinedData.firstName || 'N/A'} ${combinedData.lastName || 'N/A'}`,
      10,
      20
    );
    doc.text(`Email: ${combinedData.email || 'N/A'}`, 10, 30);
    doc.text(`Edad: ${combinedData.age || 'N/A'}`, 10, 40);
    doc.text(`Altura: ${height || 'N/A'}`, 10, 50);
    doc.text(`Peso: ${combinedData.weight || 'N/A'} ${weightUnit}`, 10, 60);
    doc.text(`BMI: ${combinedData.bmi || 'N/A'}`, 10, 70);
    doc.text(`Fecha de nacimiento: ${combinedData.dob || 'N/A'}`, 10, 80);
    doc.text(`Teléfono: ${combinedData.phone || 'N/A'}`, 10, 90);
    doc.text(`Procedimiento: ${combinedData.procedure || 'N/A'}`, 10, 100);
    doc.text(`Fecha cirugía: ${combinedData.procedureDate}`, 10, 110);
    doc.text(`Genero: ${combinedData.gender}`, 10, 120);
    doc.text(`Pais:  ${combinedData.country}`, 10, 130);
    doc.text(`Que esperan de la cirugía: ${combinedData.procedureMessage}`, 10, 140);
    doc.text(`Alergias: ${combinedData.allergies}`, 10, 150);
    doc.text(`Medicamentos: ${combinedData.medication}`, 10, 160);
    doc.text(`Enfermedades diagnosticadas: ${combinedData.diagnosedDiseases || 'N/A'}`, 10, 170);
    doc.text(`¿Fuma? En caso afirmativo, ¿con qué frecuencia?: ${combinedData.smoking}`, 10, 180);
    doc.text(`¿Bebe? En caso afirmativo, ¿con qué frecuencia?: ${combinedData.drinking}`, 10, 190);
    doc.text(`Consumo de drogas recreativas: ${combinedData.drugUse}`, 10, 200);
    doc.text(`Cirugias previas: ${combinedData.drugUse}`, 10, 210);
    doc.text(`Metodo anticonceptivo: ${combinedData.drugUse || 'N/A'}`, 10, 220);
    doc.text(
      `Historial de trombosis en familia: ${combinedData.thrombosisHistory || 'N/A'}`,
      10,
      230
    );
    doc.text(
      `Número de embarazos y tipo de parto: ${combinedData.pregnancyDetails || 'N/A'}`,
      10,
      240
    );
    doc.text(
      `¿Hay alguna posibilidad de que estés embarazada?: ${combinedData.pregnancyChance || 'N/A'}`,
      10,
      250
    );
    doc.text(`Dieta especial:`, 10, 260);

    doc.save(`Pacient_${combinedData.firstName}_${combinedData.lastName}_Information.pdf`);

    toast({
      title: 'Pacient Information',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(combinedData, null, 2)}</code>
        </pre>
      )
    });
    console.log(combinedData);
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
