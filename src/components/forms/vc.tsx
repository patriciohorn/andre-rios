import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, type UseFormWatch } from 'react-hook-form';
import { useToast } from '@/components/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

import { Step1GeneralInfo } from './Step1GeneralInfo';
import { Step2Expectations } from './Step2Expectations';
import { Step3MedicalHistory } from './Step3MedicalHistory';
import { Step4UploadPictures } from './Step4UploadPictures';
import { CircleCheck } from 'lucide-react';

const personalInformationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters.'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters.'),
  gender: z.enum(['female', 'male', 'other'], {
    required_error: 'Please select a gender'
  }),
  dateOfBirth: z.date({
    required_error: 'Date of Birth is required to calculate your age'
  }),
  address: z.string().min(3, 'Address must be filled'),
  email: z.string().email('Invalid email address.'),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .regex(/^[0-9()-\s]+$/, { message: 'Invalid phone number format' }),
  occupation: z.string().min(2, 'Occupation is required'),
  heightFt: z.number().optional(),
  heightIn: z.number().optional(),
  weight: z.number().min(1, 'Weight is required'),
  hadSurgery: z.boolean(),
  surgeryType: z.string().optional(),
  reference: z.string().min(2, 'Please select one option'),
  procedureMonth: z.string().min(2, 'Please select one option'),
  procedureYear: z.string().min(2, 'Please select one option')
});

const generalInformationSchema = z.object({
  // General fields
  desiredProcedure: z.string().min(1, 'Desired procedure is required'),
  otherProcedure: z.string().optional(),
  dislikesAndDesires: z.string().min(1, 'Please tell us a little about your dislikes and desires'),

  // Women fields
  breastSurgery: z.enum(['yes', 'no'], { required_error: 'Please select an option' }).optional(),
  cupSize: z.string().optional(),
  breastImplants: z.enum(['yes', 'no'], { required_error: 'Please select an option' }).optional(),
  breastAugmentationBefore: z
    .enum(['yes', 'no'], { required_error: 'Please select an option' })
    .optional(),
  hasBeenPregnant: z.enum(['yes', 'no'], { required_error: 'Please select an option' }).optional(),
  timesPregnant: z.string().optional(),
  delivered: z.enum(['Vaginal', 'C-Section', 'Both', 'Other']).optional(),
  birthControl: z
    .enum([
      'None',
      'Tubal ligation',
      'IUD',
      'Pills',
      'Condom',
      'Hormone replacement therapy',
      'Hormone implant',
      'Secondary to surgical procedure (hysterectomy)',
      'Other'
    ])
    .optional(),
  otherBirthControl: z.string().optional(),
  currentlyPregnant: z
    .enum(['yes', 'no'], { required_error: 'Please select an option' })
    .optional(),
  breastFeeding: z.enum(['yes', 'no'], { required_error: 'Please select an option' }).optional(),

  // Male fields
  chestSurgery: z.enum(['yes', 'no'], { required_error: 'Please select an option' }).optional(),
  chestExpectation: z.string().optional()
});

const medicalHistorySchema = (watch: UseFormWatch<any>) =>
  z.object({
    hasIllness: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    illnesses:
      watch('hasIllness') === 'yes'
        ? z
            .array(
              z.object({
                condition: z.string().min(1, 'Condition is required'),
                yearDiagnosed: z.string().min(1, 'Year diagnosed is required'),
                description: z.string().min(1, 'Description is required')
              })
            )
            .optional()
        : z.array(z.any()).optional(),
    hasAllergies: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    allergies:
      watch('hasAllergies') === 'yes'
        ? z
            .array(
              z.object({
                allergicTo: z.string().min(1, 'Allergic to is required'),
                reaction: z.string().min(1, 'Reaction is required')
              })
            )
            .optional()
        : z.array(z.any()).optional(),
    diabetes: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    diabetesType:
      watch('diabetes') === 'yes'
        ? z
            .enum(['type 1', 'type 2'], { required_error: 'You need to select an option' })
            .optional()
        : z.string().optional(),
    hgbResult:
      watch('diabetes') === 'yes'
        ? z.string().min(1, 'Please provide your last hgb A1c').optional()
        : z.string().optional(),
    heartCondition: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    heartConditionDetails:
      watch('heartCondition') === 'yes'
        ? z.string().min(1, 'Please provide details of your condition').optional()
        : z.string().optional(),
    heartSymptoms: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    heartSymptomsDetails:
      watch('heartSymptoms') === 'yes'
        ? z.string().min(1, 'Please provide details of your symptoms').optional()
        : z.string().optional(),
    hasThyroidCondition: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    thyroidConditionType:
      watch('hasThyroidCondition') === 'yes' ? z.string().optional() : z.string().optional(),
    thyroidYearDiagnosis:
      watch('hasThyroidCondition') === 'yes' ? z.string().optional() : z.string().optional(),
    otherThyroidCondition:
      watch('hasThyroidCondition') === 'yes' && watch('thyroidConditionType') === 'other'
        ? z.string().optional()
        : z.string().optional(),
    isThyroidControlled:
      watch('hasThyroidCondition') === 'yes'
        ? z
            .enum(['yes', 'no'], {
              required_error: 'Please select an option'
            })
            .optional()
        : z.string().optional(),
    deepVein: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    deepVeinDetails: watch('deepVein') === 'yes' ? z.string().optional() : z.string().optional(),
    highBloodPresure: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    cholesterol: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    kidenyOrUrinary: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    asthma: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    orthopedic: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    orthopedicDetails:
      watch('orthopedic') === 'yes' ? z.string().optional() : z.string().optional(),
    breathingProblems: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    breathingProblemsDetails:
      watch('breathingProblems') === 'yes' ? z.string().optional() : z.string().optional(),
    mentalCondition: z.string().min(1, 'Please choose an option'),
    otherMentalCondition:
      watch('mentalCondition') === 'other' ? z.string().optional() : z.string().optional(),
    reflux: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    refluxDetails: watch('reflux') === 'yes' ? z.string().optional() : z.string().optional(),
    liverDisease: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    liverDiseaseDetails:
      watch('liverDisease') === 'yes' ? z.string().optional() : z.string().optional(),
    anemiaOrBleeding: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    anemiaOrBleedingDetails:
      watch('anemiaOrBleeding') === 'yes' ? z.string().optional() : z.string().optional(),
    swellingOrVaricose: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    swellingOrVaricoseDetails:
      watch('swellingOrVaricose') === 'yes' ? z.string().optional() : z.string().optional(),
    infectiousDisease: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    infectiousDiseaseDetails:
      watch('infectiousDisease') === 'yes' ? z.string().optional() : z.string().optional(),
    hivPositive: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    hivMedications:
      watch('hivPositive') === 'yes'
        ? z
            .array(
              z.object({
                medicationName: z.string().min(1, 'Name of medication is required'),
                dosage: z.string().min(1, 'Dosage is required'),
                frequency: z.string().min(1, 'Frequency is required')
              })
            )
            .optional()
        : z.array(z.any()).optional(),
    lastViralLoadDate:
      watch('hivPositive') === 'yes'
        ? z.date({
            required_error: 'A date of last viral load is required'
          })
        : z.date().optional(),
    drinkAlcohol: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    alcoholFrequency:
      watch('drinkAlcohol') === 'yes' ? z.string().optional() : z.string().optional(),
    smokedOrVape: z.enum(['yes', 'quit', 'no'], {
      required_error: 'You need to select an option.'
    }),
    currentSmokingAmount:
      watch('smokedOrVape') === 'yes' ? z.string().optional() : z.string().optional(),
    currentSmokingSince:
      watch('smokedOrVape') === 'yes' ? z.string().optional() : z.string().optional(),
    pastSmokingAmount:
      watch('smokedOrVape') === 'quit' ? z.string().optional() : z.string().optional(),
    pastSmokingSince:
      watch('smokedOrVape') === 'quit' ? z.string().optional() : z.string().optional(),
    recreationalDrugUse: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    drugUseDetails:
      watch('recreationalDrugUse') === 'yes' ? z.string().optional() : z.string().optional(),
    currentMedication: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    medications:
      watch('currentMedication') === 'yes'
        ? z
            .array(
              z.object({
                medicationName: z.string().min(1, 'Condition is required'),
                dosage: z.string().min(1, 'Year diagnosed is required'),
                frequency: z.string().min(1, 'Description is required'),
                purpose: z.string().min(1, 'Description is required')
              })
            )
            .optional()
        : z.array(z.any()).optional(),
    antidepressants: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    takingSupplements: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    previousSurgeries: z.enum(['yes', 'no'], {
      required_error: 'You need to select an option.'
    }),
    surgeries:
      watch('previousSurgeries') === 'yes'
        ? z
            .array(
              z.object({
                surgeryName: z.string().min(1, 'Condition is required'),
                surgeryYear: z.string().min(1, 'Year diagnosed is required'),
                surgeryReason: z.string().min(1, 'Description is required')
              })
            )
            .optional()
        : z.array(z.any()).optional()
  });

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const fileSchema = z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
  message: `File size must not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`
});

const imageUploadSchema = z.object({
  frontPhoto: fileSchema.optional(),
  backPhoto: fileSchema.optional(),
  leftPhoto: fileSchema.optional(),
  rightPhoto: fileSchema.optional(),
  additionalPhotos: z
    .array(fileSchema)
    .max(3, 'You can upload up to 3 additional photos.')
    .optional()
});

const steps = ['Personal Information', 'General Information', 'Medical History', 'Upload Picture'];

export const ConsultationForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const personalInformationForm = useForm({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: null,
      address: '',
      email: '',
      phone: '',
      occupation: '',
      heightFt: undefined,
      heightIn: undefined,
      weight: undefined,
      bmi: '',
      hadSurgery: false,
      surgeryType: undefined,
      reference: '',
      procedureMonth: '',
      procedureYear: ''
    },
    mode: 'onSubmit'
  });

  const generalInformationForm = useForm({
    resolver: zodResolver(generalInformationSchema),
    defaultValues: {
      desiredProcedure: '',
      otherProcedure: '',
      dislikesAndDesires: '',
      breastSurgery: undefined,
      cupSize: '',
      breastImplants: undefined,
      breastAugmentationBefore: undefined,
      hasBeenPregnant: undefined,
      timesPregnant: '',
      delivered: undefined,
      birthControl: '',
      otherBirthControl: '',
      currentlyPregnant: undefined,
      breastFeeding: undefined,
      chestSurgery: undefined,
      chestExpectation: ''
    },
    mode: 'onSubmit'
  });

  const medicalHistoryForm = useForm({
    resolver: zodResolver(medicalHistorySchema(useForm().watch)),
    defaultValues: {
      hasIllness: '',
      illnesses: [{ condition: '', yearDiagnosed: '', description: '' }],
      hasAllergies: '',
      allergies: [{ allergicTo: '', reaction: '' }],
      diabetes: '',
      diabetesType: undefined,
      hgbResult: undefined,
      heartCondition: '',
      heartConditionDetails: undefined,
      heartSymptoms: '',
      heartSymptomsDetails: undefined,
      hasThyroidCondition: '',
      thyroidConditionType: undefined,
      thyroidYearDiagnosis: undefined,
      otherThyroidCondition: undefined,
      isThyroidControlled: undefined,
      deepVein: '',
      deepVeinDetails: undefined,
      highBloodPresure: '',
      cholesterol: '',
      kidenyOrUrinary: '',
      asthma: '',
      orthopedic: '',
      orthopedicDetails: undefined,
      breathingProblems: '',
      breathingProblemsDetails: undefined,
      mentalCondition: 'none',
      otherMentalCondition: undefined,
      reflux: '',
      refluxDetails: undefined,
      liverDisease: '',
      liverDiseaseDetails: undefined,
      anemiaOrBleeding: '',
      anemiaOrBleedingDetails: undefined,
      swellingOrVaricose: '',
      swellingOrVaricoseDetails: undefined,
      infectiousDisease: '',
      infectiousDiseaseDetails: undefined,
      hivPositive: '',
      hivMedications: [{ medicationName: '', dosage: '', frequency: '' }],
      lastViralLoadDate: undefined,
      drinkAlcohol: '',
      alcoholFrequency: undefined,
      smokedOrVape: '',
      currentSmokingAmount: undefined,
      currentSmokingSince: undefined,
      pastSmokingAmount: undefined,
      pastSmokingSince: undefined,
      recreationalDrugUse: '',
      drugUseDetails: undefined,
      currentMedication: '',
      medications: [{ medicationName: '', dosage: '', frequency: '', purpose: '' }],
      antidepressants: '',
      takingSupplements: '',
      previousSurgeries: '',
      surgeries: [{ surgeryName: '', surgeryYear: '', surgeryReason: '' }]
    },
    mode: 'onSubmit',
    shouldUnregister: true
  });

  const imageUploadForm = useForm({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      frontPhoto: null,
      backPhoto: null,
      leftPhoto: null,
      rightPhoto: null
    },
    mode: 'onSubmit'
  });

  const scrollToElement = (stepIndex: number) => {
    // stepRefs[stepIndex]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.scrollTo({ top: 208, behavior: 'smooth' });
  };

  const handleNextStep = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
    scrollToElement(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
    scrollToElement(currentStep - 1);
  };

  const handleSubmit = () => {
    // Validate form data using Zod schema
    const validationResult = imageUploadSchema.safeParse(formData);

    if (!validationResult.success) {
      // Show error messages for validation failures
      validationResult.error.errors.forEach((error) => {
        toast({
          title: 'Validation Error',
          description: `Error in ${error.path.join('.')}: ${error.message}`,
          variant: 'destructive' // Assuming your toast supports variants
        });
      });
    } else {
      // If validation passes, show success message
      toast({
        title: 'Pacient Information',
        description: (
          <pre className="mt-2 w-[320px] max-h-[60vh] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
          </pre>
        )
      });
      setIsSubmitted(true);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <Step1GeneralInfo form={personalInformationForm} />
          </div>
        );
      case 1:
        return (
          <div>
            <Step2Expectations form={generalInformationForm} data={formData} />
          </div>
        );
      case 2:
        return (
          <div>
            <Step3MedicalHistory form={medicalHistoryForm} />
          </div>
        );
      case 3:
        return (
          <div>
            <Step4UploadPictures form={imageUploadForm} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Toaster />
      {isSubmitted ? (
        <Card>
          <CardContent className="min-h-screen grid place-content-center">
            <div className="px-8 py-10 text-center flex flex-col gap-y-8 items-center bg-green-50 text-green-800 rounded-sm">
              <div className="space-y-4">
                <CircleCheck className="text-green-800 w-full h-12" />
                <p className="max-w-prose text-lg">
                  Received! Dr. Ríos will review your submission in the next 7-10 BUSINESS DAYS *
                  and get back to you with more information
                </p>
              </div>
              <p className="text-green-800 text-sm max-w-prose">
                * Please excuse any delays, Dr. Ríos reviews and replies to every submission
                himself, but he has a very busy schedule and usually works on his emails between
                surgeries and PreOp/PostOp consultations.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{steps[currentStep]}</CardTitle>
            {currentStep === steps.length - 1 && (
              <CardDescription className="animate-fade-right animate-ease-in-out">
                <p className="mt-4 mb-2 font-semibold text-[#020817]">How to take your pictures</p>
                Without any clothes (AND without underwear), from neck to knees and at the following
                angles
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            {currentStep === steps.length - 1 && (
              <p className="text-sm mt-10 text-foreground max-w-prose animate-fade-right animate-ease-in-out">
                Note: All photos uploaded will be kept secure and protected. They will not be shared
                without your consent.
              </p>
            )}
            <div className="mt-8 flex justify-between gap-3">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handlePreviousStep}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={() => {
                    const currentForm =
                      currentStep === 0
                        ? personalInformationForm
                        : currentStep === 1
                          ? generalInformationForm
                          : currentStep === 2
                            ? medicalHistoryForm
                            : imageUploadForm;

                    currentForm.handleSubmit((data) => handleNextStep(data))();
                  }}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
