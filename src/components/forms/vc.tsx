import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, type UseFormWatch } from "react-hook-form";
// import { useToast } from '@/components/hooks/use-toast';
// import { Toaster } from '@/components/ui/toaster';
import PdfCreator from "./PdfCreator";
import { pdf } from "@react-pdf/renderer";
import PatientDocument from "./PatientDocument";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { Step1GeneralInfo } from "./Step1GeneralInfo";
import { Step2Expectations } from "./Step2Expectations";
import { Step3MedicalHistory } from "./Step3MedicalHistory";
import { Step4UploadPictures } from "./Step4UploadPictures";
import { CircleCheck } from "lucide-react";

const personalInformationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  gender: z.enum(["female", "male", "other"], {
    required_error: "Please select a gender",
  }),
  dateOfBirth: z.date({
    required_error: "Date of Birth is required to calculate your age",
  }),
  address: z.string().min(3, "Address must be filled"),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^[0-9()-\s]+$/, {
      message: "Invalid phone number format",
    }),
  occupation: z.string().min(2, "Occupation is required"),
  heightFt: z.number().optional(),
  heightIn: z.number().optional(),
  weight: z.number().min(1, "Weight is required"),
  hadSurgery: z.boolean(),
  surgeryType: z.string().optional(),
  reference: z.string().min(2, "Please select one option"),
  procedureMonth: z.string().min(2, "Please select one option"),
  procedureYear: z.string().min(2, "Please select one option"),
});

const generalInformationSchema = z.object({
  // General fields
  desiredProcedure: z.string().min(1, "Desired procedure is required"),
  otherProcedure: z.string().optional(),
  dislikesAndDesires: z
    .string()
    .min(1, "Please tell us a little about your dislikes and desires"),

  // Women fields
  breastSurgery: z
    .enum(["yes", "no"], {
      required_error: "Please select an option",
    })
    .optional(),
  cupSize: z.string().optional(),
  breastImplants: z
    .enum(["yes", "no"], {
      required_error: "Please select an option",
    })
    .optional(),
  breastAugmentationBefore: z
    .enum(["yes", "no"], {
      required_error: "Please select an option",
    })
    .optional(),
  hasBeenPregnant: z
    .enum(["yes", "no"], {
      required_error: "Please select an option",
    })
    .optional(),
  timesPregnant: z.string().optional(),
  delivered: z.enum(["Vaginal", "C-Section", "Both", "Other"]).optional(),
  birthControl: z
    .enum([
      "None",
      "Tubal ligation",
      "IUD",
      "Pills",
      "Condom",
      "Hormone replacement therapy",
      "Hormone implant",
      "Secondary to surgical procedure (hysterectomy)",
      "Other",
    ])
    .optional(),
  otherBirthControl: z.string().optional(),
  currentlyPregnant: z
    .enum(["yes", "no"], {
      required_error: "Please select an option",
    })
    .optional(),
  breastFeeding: z
    .enum(["yes", "no"], {
      required_error: "Please select an option",
    })
    .optional(),

  // Male fields
  chestSurgery: z
    .enum(["yes", "no"], {
      required_error: "Please select an option",
    })
    .optional(),
  chestExpectation: z.string().optional(),
});

/* ============================
   Medical History Schema
   ============================ */
const medicalHistoryBaseSchema = z.object({
  hasIllness: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  illnesses: z
    .array(
      z.object({
        condition: z.string(),
        yearDiagnosed: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  hasAllergies: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  allergies: z
    .array(
      z.object({
        allergicTo: z.string(),
        reaction: z.string(),
      })
    )
    .optional(),
  diabetes: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  diabetesType: z.string(),
  hgbResult: z.string(),
  heartCondition: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  heartConditionDetails: z.string(),
  heartSymptoms: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  heartSymptomsDetails: z.string(),
  hasThyroidCondition: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  thyroidConditionType: z.string(),
  thyroidYearDiagnosis: z.string(),
  otherThyroidCondition: z.string(),
  isThyroidControlled: z
    .union([z.enum(["yes", "no"]), z.literal("")])
    .optional(),
  deepVein: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  deepVeinDetails: z.string(),
  highBloodPresure: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),

  cholesterol: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  kidenyOrUrinary: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  asthma: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  orthopedic: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  orthopedicDetails: z.string(),
  breathingProblems: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  breathingProblemsDetails: z.string(),
  mentalCondition: z
    .enum([
      "none",
      "fibromyalgia",
      "depression",
      "anxiety",
      "panic attacks",
      "ocd",
      "personality disorders",
      "other",
    ])
    .optional(),
  otherMentalCondition: z.string(),
  reflux: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  refluxDetails: z.string(),
  liverDisease: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  liverDiseaseDetails: z.string(),
  anemiaOrBleeding: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  anemiaOrBleedingDetails: z.string(),
  swellingOrVaricose: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  swellingOrVaricoseDetails: z.string(),
  infectiousDisease: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  infectiousDiseaseDetails: z.string(),
  hivPositive: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  hivMedications: z
    .array(
      z.object({
        medicationName: z.string(),
        dosage: z.string(),
        frequency: z.string(),
      })
    )
    .optional(),
  lastViralLoadDate: z.date().nullable().optional(),
  drinkAlcohol: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  alcoholFrequency: z.string(),
  smokedOrVape: z.enum(["yes", "quit", "no"], {
    required_error: "You need to select an option.",
  }),
  currentSmokingAmount: z.string(),
  currentSmokingSince: z.string(),
  pastSmokingAmount: z.string(),
  pastSmokingSince: z.string(),
  recreationalDrugUse: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  drugUseDetails: z.string(),
  currentMedication: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  medications: z
    .array(
      z.object({
        medicationName: z.string(),
        dosage: z.string(),
        frequency: z.string(),
        purpose: z.string(),
      })
    )
    .optional(),
  antidepressants: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  mentalHealthMedications: z
    .array(
      z.object({
        medicationName: z.string(),
        dosage: z.string(),
        frequency: z.string(),
        purpose: z.string(),
      })
    )
    .optional(),
  previousSurgeries: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  surgeries: z
    .array(
      z.object({
        surgeryName: z.string(),
        surgeryYear: z.string(),
        surgeryReason: z.string(),
      })
    )
    .optional(),
});

const medicalHistorySchema = medicalHistoryBaseSchema.superRefine(
  (data, ctx) => {
    // Illness details required only if hasIllness === 'yes'
    if (data.hasIllness === "yes") {
      if (!data.illnesses || data.illnesses.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide details for your illnesses",
          path: ["illnesses"],
        });
      } else {
        data.illnesses.forEach((item, index) => {
          if (item.condition.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Condition is required",
              path: ["illnesses", index, "condition"],
            });
          }
          if (item.yearDiagnosed.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Year diagnosed is required",
              path: ["illnesses", index, "yearDiagnosed"],
            });
          }
          if (item.description.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Description is required",
              path: ["illnesses", index, "description"],
            });
          }
        });
      }
    }

    // Allergies required only if hasAllergies === 'yes'
    if (data.hasAllergies === "yes") {
      if (!data.allergies || data.allergies.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide details for your allergies",
          path: ["allergies"],
        });
      } else {
        data.allergies.forEach((item, index) => {
          if (item.allergicTo.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Allergic to is required",
              path: ["allergies", index, "allergicTo"],
            });
          }
          if (item.reaction.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Reaction is required",
              path: ["allergies", index, "reaction"],
            });
          }
        });
      }
    }

    // Diabetes: if yes, require diabetesType and hgbResult
    if (data.diabetes === "yes") {
      if (data.diabetesType.trim() === "" || data.hgbResult.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide your diabetes type and last HGB A1C result",
          path: ["diabetesType"],
        });
      }
    }

    // Heart condition: if yes, require details
    if (
      data.heartCondition === "yes" &&
      data.heartConditionDetails.trim() === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your heart condition",
        path: ["heartConditionDetails"],
      });
    }

    // Heart symptoms: if yes, require details
    if (
      data.heartSymptoms === "yes" &&
      data.heartSymptomsDetails.trim() === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your heart symptoms",
        path: ["heartSymptomsDetails"],
      });
    }

    // Thyroid: if hasThyroidCondition is yes, require thyroidConditionType
    if (data.hasThyroidCondition === "yes") {
      if (data.thyroidConditionType.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select the type of your thyroid condition",
          path: ["thyroidConditionType"],
        });
      }
      // And if the type is 'other', require otherThyroidCondition details
      if (
        data.thyroidConditionType === "other" &&
        data.otherThyroidCondition.trim() === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide details for your thyroid condition",
          path: ["otherThyroidCondition"],
        });
      }
    }

    // Deep vein: if yes, require details
    if (data.deepVein === "yes" && data.deepVeinDetails.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your deep vein history",
        path: ["deepVeinDetails"],
      });
    }

    // Orthopedic: if yes, require details
    if (data.orthopedic === "yes" && data.orthopedicDetails.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your orthopedic problems",
        path: ["orthopedicDetails"],
      });
    }

    // Breathing problems: if yes, require details
    if (
      data.breathingProblems === "yes" &&
      data.breathingProblemsDetails.trim() === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your breathing problems",
        path: ["breathingProblemsDetails"],
      });
    }

    // Mental condition: if 'other', require details
    if (
      data.mentalCondition === "other" &&
      data.otherMentalCondition.trim() === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your mental condition",
        path: ["otherMentalCondition"],
      });
    }

    // Reflux: if yes, require details
    if (data.reflux === "yes" && data.refluxDetails.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your reflux/heartburn symptoms",
        path: ["refluxDetails"],
      });
    }

    // Liver disease: if yes, require details
    if (data.liverDisease === "yes" && data.liverDiseaseDetails.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your liver disease",
        path: ["liverDiseaseDetails"],
      });
    }

    // Anemia or bleeding: if yes, require details
    if (
      data.anemiaOrBleeding === "yes" &&
      data.anemiaOrBleedingDetails.trim() === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your anemia or bleeding disorder",
        path: ["anemiaOrBleedingDetails"],
      });
    }

    // Swelling or varicose veins: if yes, require details
    if (
      data.swellingOrVaricose === "yes" &&
      data.swellingOrVaricoseDetails.trim() === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Please provide details for your leg swelling or varicose veins",
        path: ["swellingOrVaricoseDetails"],
      });
    }

    // Infectious disease: if yes, require details
    if (
      data.infectiousDisease === "yes" &&
      data.infectiousDiseaseDetails.trim() === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your infectious disease",
        path: ["infectiousDiseaseDetails"],
      });
    }

    // HIV: if yes, require at least one medication with valid details
    if (data.hivPositive === "yes") {
      if (!data.hivMedications || data.hivMedications.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide details for your HIV medications",
          path: ["hivMedications"],
        });
      } else {
        data.hivMedications.forEach((item, index) => {
          if (item.medicationName.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Name of medication is required",
              path: ["hivMedications", index, "medicationName"],
            });
          }
          if (item.dosage.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Dosage is required",
              path: ["hivMedications", index, "dosage"],
            });
          }
          if (item.frequency.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Frequency is required",
              path: ["hivMedications", index, "frequency"],
            });
          }
        });
      }
    }

    // Alcohol: if yes, require details
    if (data.drinkAlcohol === "yes" && data.alcoholFrequency.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your alcohol consumption",
        path: ["alcoholFrequency"],
      });
    }

    // Smoking: if smokedOrVape === 'yes', require current smoking details
    if (data.smokedOrVape === "yes") {
      if (
        data.currentSmokingAmount.trim() === "" ||
        data.currentSmokingSince.trim() === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide details for your current smoking habits",
          path: ["currentSmokingAmount"],
        });
      }
    }

    // Smoking: if smokedOrVape === 'quit', require past smoking details
    if (data.smokedOrVape === "quit") {
      if (
        data.pastSmokingAmount.trim() === "" ||
        data.pastSmokingSince.trim() === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide details for your past smoking habits",
          path: ["pastSmokingAmount"],
        });
      }
    }

    // Recreational drug use: if yes, require details
    if (
      data.recreationalDrugUse === "yes" &&
      data.drugUseDetails.trim() === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide details for your recreational drug use",
        path: ["drugUseDetails"],
      });
    }

    // Current medication: if yes, require at least one medication with valid details
    if (data.currentMedication === "yes") {
      if (!data.medications || data.medications.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide details for your current medications",
          path: ["medications"],
        });
      } else {
        data.medications.forEach((item, index) => {
          if (item.medicationName.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Medication name is required",
              path: ["medications", index, "medicationName"],
            });
          }
          if (item.dosage.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Dosage is required",
              path: ["medications", index, "dosage"],
            });
          }
          if (item.frequency.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Frequency is required",
              path: ["medications", index, "frequency"],
            });
          }
          if (item.purpose.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Purpose is required",
              path: ["medications", index, "purpose"],
            });
          }
        });
      }
    }

    // Previous surgeries: if yes, require at least one surgery with valid details
    if (data.previousSurgeries === "yes") {
      if (!data.surgeries || data.surgeries.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide details for your previous surgeries",
          path: ["surgeries"],
        });
      } else {
        data.surgeries.forEach((item, index) => {
          if (item.surgeryName.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Surgery name is required",
              path: ["surgeries", index, "surgeryName"],
            });
          }
          if (item.surgeryYear.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Surgery year is required",
              path: ["surgeries", index, "surgeryYear"],
            });
          }
          if (item.surgeryReason.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Surgery reason is required",
              path: ["surgeries", index, "surgeryReason"],
            });
          }
        });
      }
    }
  }
);

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `File size must not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`,
  });

const imageUploadSchema = z.object({
  frontPhoto: fileSchema.optional(),
  backPhoto: fileSchema.optional(),
  leftPhoto: fileSchema.optional(),
  rightPhoto: fileSchema.optional(),
  additionalPhotos: z
    .array(fileSchema)
    .max(3, "You can upload up to 3 additional photos.")
    .optional(),
});

const steps = [
  "Personal Information",
  "General Information",
  "Medical History",
  "Upload Picture",
];

function ConsultationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const personalInformationForm = useForm({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: null,
      address: "",
      email: "",
      phone: "",
      occupation: "",
      heightFt: undefined,
      heightIn: undefined,
      weight: undefined,
      bmi: "",
      hadSurgery: false,
      surgeryType: undefined,
      reference: "",
      referralSource: "",
      procedureMonth: "",
      procedureYear: "",
    },
    mode: "onSubmit",
  });
  const generalInformationForm = useForm({
    resolver: zodResolver(generalInformationSchema),
    defaultValues: {
      desiredProcedure: "",
      otherProcedure: "",
      dislikesAndDesires: "",
      breastSurgery: undefined,
      cupSize: "",
      breastImplants: undefined,
      breastAugmentationBefore: undefined,
      hasBeenPregnant: undefined,
      timesPregnant: "",
      delivered: undefined,
      birthControl: undefined,
      otherBirthControl: "",
      currentlyPregnant: undefined,
      breastFeeding: undefined,
      chestSurgery: undefined,
      chestExpectation: "",
    },
    mode: "onSubmit",
  });

  const medicalHistoryForm = useForm({
    resolver: zodResolver(medicalHistorySchema),
    defaultValues: {
      hasIllness: "",
      illnesses: [{ condition: "", yearDiagnosed: "", description: "" }],
      hasAllergies: "",
      allergies: [{ allergicTo: "", reaction: "" }],
      diabetes: "",
      diabetesType: "",
      hgbResult: "",
      heartCondition: "",
      heartConditionDetails: "",
      heartSymptoms: "",
      heartSymptomsDetails: "",
      hasThyroidCondition: "",
      thyroidConditionType: "",
      thyroidYearDiagnosis: "",
      otherThyroidCondition: "",
      isThyroidControlled: "",
      deepVein: "",
      deepVeinDetails: "",
      highBloodPresure: "",
      cholesterol: "",
      kidenyOrUrinary: "",
      asthma: "",
      orthopedic: "",
      orthopedicDetails: "",
      breathingProblems: "",
      breathingProblemsDetails: "",
      mentalCondition: "",
      otherMentalCondition: "",
      reflux: "",
      refluxDetails: "",
      liverDisease: "",
      liverDiseaseDetails: "",
      anemiaOrBleeding: "",
      anemiaOrBleedingDetails: "",
      swellingOrVaricose: "",
      swellingOrVaricoseDetails: "",
      infectiousDisease: "",
      infectiousDiseaseDetails: "",
      hivPositive: "",
      hivMedications: [{ medicationName: "", dosage: "", frequency: "" }],
      lastViralLoadDate: null,
      drinkAlcohol: "",
      alcoholFrequency: "",
      smokedOrVape: "",
      currentSmokingAmount: "",
      currentSmokingSince: "",
      pastSmokingAmount: "",
      pastSmokingSince: "",
      recreationalDrugUse: "",
      drugUseDetails: "",
      currentMedication: "",
      medications: [
        {
          medicationName: "",
          dosage: "",
          frequency: "",
          purpose: "",
        },
      ],
      antidepressants: "",
      mentalHealthMedications: [
        {
          medicationName: "",
          dosage: "",
          frequency: "",
          purpose: "",
        },
      ],
      previousSurgeries: "",
      surgeries: [{ surgeryName: "", surgeryYear: "", surgeryReason: "" }],
    },
    mode: "onSubmit",
    // shouldUnregister: true
  });

  const imageUploadForm = useForm({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      frontPhoto: null,
      backPhoto: null,
      leftPhoto: null,
      rightPhoto: null,
      additionalPhotos: [],
    },
    mode: "onSubmit",
  });

  const scrollToElement = (stepIndex: number) => {
    // stepRefs[stepIndex]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.scrollTo({ top: 100, behavior: "smooth" });
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
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateFormData = (newData: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const onError = (errors: any) => {
    console.error("Validation Errors:", errors);
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  const sendPdfEmail = async (formData: any) => {
    try {
      const doc = <PatientDocument formData={formData} />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const pdfBase64 = await blobToBase64(blob);
      const fileName = `ConsultationForm_${formData.lastName}_${formData.firstName}.pdf`;
      // Prepare the payload
      const payload = {
        pdfBase64,
        doctorEmail: "patriciohorn4@gmail.com",
        fileName,
      };

      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Email sent successfully", result);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      sendPdfEmail(formData);
    }
  }, [isSubmitted]);

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
            <Step4UploadPictures
              form={imageUploadForm}
              updateFormData={updateFormData}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isSubmitted ? (
        <>
          <Card className="px-8 py-10 bg-green-50/80">
            <CardContent className="grid place-content-center">
              <div className="text-center flex flex-col gap-y-8 items-center  text-green-800 rounded-sm">
                <div className="space-y-4">
                  <CircleCheck className="text-green-800 w-full h-12" />
                  <p className="max-w-prose text-lg">
                    Received! Dr. Ríos will review your submission in the next
                    7-10 BUSINESS DAYS * and get back to you with more
                    information
                  </p>
                </div>
                <p className="text-green-800 text-sm max-w-prose">
                  * Please excuse any delays, Dr. Ríos reviews and replies to
                  every submission himself, but he has a very busy schedule and
                  usually works on his emails between surgeries and PreOp/PostOp
                  consultations.
                </p>
              </div>
            </CardContent>
          </Card>
          {/* <PdfCreator formData={formData} /> */}
        </>
      ) : (
        <Card>
          <CardHeader className=" min-h-[90px]">
            <CardTitle className="text-2xl">{steps[currentStep]}</CardTitle>
            {currentStep === steps.length - 1 && (
              <CardDescription className="animate-fade-right animate-ease-in-out">
                <p className="mt-4 mb-2 font-semibold text-[#020817]">
                  How to take your pictures
                </p>
                Without any clothes (AND without underwear), from neck to knees
                and at the following angles
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            {currentStep === steps.length - 1 && (
              <p className="text-sm mt-10 text-foreground max-w-prose animate-fade-right animate-ease-in-out">
                Note: All photos uploaded will be kept secure and protected.
                They will not be shared without your consent.
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePreviousStep}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                className="ml-auto min-w-24"
                onClick={() => {
                  const currentForm =
                    currentStep === 0
                      ? personalInformationForm
                      : currentStep === 1
                      ? generalInformationForm
                      : currentStep === 2
                      ? medicalHistoryForm
                      : imageUploadForm;

                  currentForm.handleSubmit(
                    (data) => handleNextStep(data),
                    (errors) => onError(errors)
                  )();
                }}
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Submit</Button>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default ConsultationForm;
