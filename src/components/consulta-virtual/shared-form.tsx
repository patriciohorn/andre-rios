import { formOptions } from "@tanstack/react-form";
import z from "zod";
import { calcBmi } from "@/lib/helpers";

const requiredString = (message: string) => z.string().trim().min(1, message);

const calculateAge = (
  day: string | number,
  month: string | number,
  year: string | number,
) => {
  const dob = new Date(Number(year), Number(month) - 1, Number(day));
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hadBirthday =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  return hadBirthday ? age : age - 1;
};

export const BIRTH_GENDERS = [
  "female",
  "male",
  "other",
  "prefer_not_to_say",
] as const;

export const DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();

export const YEARS = Array.from({ length: 82 }, (_, i) =>
  String(currentYear - 18 - i),
);

export const COUNTRIES = [
  { value: "USA", label: "United States" },
  { value: "Mexico", label: "Mexico" },
  { value: "Other", label: "Other" },
] as const;

export const REFERRAL_SOURCES = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "realself", label: "RealSelf" },
  { value: "friends_relatives", label: "Friends or relatives" },
  { value: "other", label: "Other" },
] as const;

export const PROCEDURES = [
  "breast_augmentation_with_implants",
  "breast_lift",
  "breast_reduction",
  "breast_augmentation_with_fat",
  "hyperhidrosis",
  "botulinum_toxin",
  "fillers",
  "abdominoplasty",
  "brachioplasty",
  "gynecomastia_thorax_liposuction",
  "liposuction",
  "mommy_makeover",
  "massive_weight_loss",
  "torsoplasty",
  "thigh_lift",
  "lipoinfiltration",
  "other",
] as const;

export const SURGERY_YEARS = [
  currentYear,
  currentYear + 1,
  currentYear + 2,
].map(String);

// Personal Information
export const personalInfoSchema = z
  .object({
    firstName: requiredString("First name is required"),
    lastName: requiredString("Last name is required"),
    birthGender: z.enum(BIRTH_GENDERS, {
      message: "Please select an option",
    }),
    dobDay: requiredString("Select a day"),
    dobMonth: requiredString("Select a month"),
    dobYear: requiredString("Select a year"),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),
    address: z.string().trim(),
    city: requiredString("City is required"),
    country: requiredString("Country is required"),
    occupation: z.string().trim(),
    heightFt: z
      .string()
      .trim()
      .min(1, "Enter your height")
      .pipe(
        z.coerce
          .number()
          .min(3, "Minimum height is 3 feet")
          .max(8, "Maximum height is 8 feet"),
      ),
    heightIn: z
      .string()
      .trim()
      .min(1, "Enter inches")
      .pipe(
        z.coerce
          .number()
          .min(0, "Minimum is 0")
          .max(11, "Maximum is 11 inches"),
      ),

    weightLbs: z
      .string()
      .trim()
      .min(1, "Enter your weight")
      .pipe(
        z.coerce
          .number()
          .min(50, "Minimum weight is 50 lbs")
          .max(600, "Maximum weight is 600 lbs"),
      ),
    hadWeightLossSurgery: z.boolean(),
    referralSource: z
      .enum([
        "facebook",
        "instagram",
        "realself",
        "tiktok",
        "friends_relatives",
        "other",
      ])
      .or(z.literal("")),
    referralOther: z.string().trim(),
    desiredSurgeryMonth: z.string(),
    desiredSurgeryYear: z.boolean(),
  })
  .refine(
    (data) => calculateAge(data.dobDay, data.dobMonth, data.dobYear) >= 18,
    {
      message: "You must be at least 18 years old to submit a consultation",
      path: ["dobYear"],
    },
  )
  .refine(
    (data) => {
      const bmi = calcBmi(data.heightFt, data.heightIn, data.weightLbs);
      return bmi === null || bmi <= 32.9;
    },
    {
      message:
        "Your BMI should be below 32.9 to be eligible for the virtual consultation",
      path: ["weightLbs"],
    },
  )
  .refine(
    (data) => {
      // check if there's no date selected like february 31,
      const date = new Date(
        Number(data.dobYear),
        Number(data.dobMonth) - 1,
        Number(data.dobDay),
      );
      return date.getDate() === Number(data.dobDay);
    },
    { message: "The selected date is not valid", path: ["dobDay"] },
  )
  .refine(
    (data) =>
      data.referralSource !== "other" ||
      (data.referralOther?.trim().length ?? 0) > 0,
    {
      message: "Please tell us how you heard about us",
      path: ["referralOther"],
    },
  );

// General Info

export const generalInfoSchema = z
  .object({
    desiredProcedures: z
      .array(z.enum(PROCEDURES))
      .min(1, "Please select at least one procedure"),
    desiredProcedureOther: z.string().trim(),
    dislikesAndDesires: requiredString(
      "Tell us what you would like to change and what your expectations are",
    ),
    interestedInChestSurgery: z.boolean(),
    chestSurgeryGoals: z.string().trim(),
  })
  .refine(
    (data) =>
      // if the patient selected 'other', THEN the description field is required
      !data.desiredProcedures.includes("other") ||
      data.desiredProcedureOther.trim().length > 0,
    {
      message: "Please describe the procedure you're interested in",
      path: ["desiredProcedureOther"],
    },
  )
  .refine(
    (data) =>
      !data.interestedInChestSurgery ||
      data.chestSurgeryGoals.trim().length > 0,
    {
      message: "Please describe your chest surgery goals",
      path: ["chestSurgeryGoals"],
    },
  );

// Medical History
const illnessItem = z.object({
  condition: requiredString("Please specify the condition"),
  yearDiagnosed: requiredString("Please specify the year of diagnosis"),
  description: z.string().trim().optional(),
});

const allergyItem = z.object({
  allergicTo: requiredString("Please specify what you're allergic to"),
  reaction: requiredString("Please describe the reaction"),
});

const medicationItem = z.object({
  name: requiredString("Medication name is required"),
  dose: requiredString("Dose is required"),
  frequency: requiredString("Frequency is required"),
  purpose: z.string().trim().optional(),
});

const hivMedicationItem = z.object({
  name: requiredString("Medication name is required"),
  dosage: requiredString("Dosage is required"),
  frequency: requiredString("Frequency is required"),
});

const surgeryItem = z.object({
  procedures: requiredString("Please specify the procedure"),
  year: requiredString("Please specify the year"),
  reason: z.string().trim().optional(),
});

const medicalHistoryBase = z.object({
  hasIllness: z.boolean(),
  illness: z.array(illnessItem),
  hasAllergies: z.boolean(),
  allergies: z.array(allergyItem),
  hasDiabetes: z.boolean(),
  diabetes: z.object({
    diabetesType: z.enum(["type_1", "type_2"]).optional().or(z.literal("")),
    hgba1cResult: z.string().trim().optional(),
  }),
  hasHeartCondition: z.boolean(),
  heartConditionDetails: z.string().trim().optional(),
  heartSymptoms: z.boolean(),
  heartSymptomsDetails: z.string().trim().optional(),
  hasThyroidCondition: z.boolean(),
  thyroid: z.object({
    type: z
      .enum(["hypothyroidism", "hyperthyroidism", "other"])
      .optional()
      .or(z.literal("")),
    yearDiagnosed: z.string().trim().optional(),
    isControlled: z.boolean(),
    hasDVT: z.boolean(),
    dvtDetails: z.string().trim().optional(),
    hasHighBloodPressure: z.boolean(),
    hasHighCholesterol: z.boolean(),
    hasKidneyDisorder: z.boolean(),
    hasAsthma: z.boolean(),
    hasOrthopedicProblems: z.boolean(),
    orthopedicDetails: z.string().trim().optional(),
    hasRespiratoryProblems: z.boolean(),
    respiratoryDetails: z.string().trim().optional(),
    mentalHealthCondition: z.enum([
      "none",
      "fibromyalgia",
      "depression",
      "anxiety",
      "panic_attacks",
      "ocd",
      "personality_disorders",
      "other",
    ]),
    mentalHealthOther: z.string().trim().optional(),
    hasReflux: z.boolean(),
    refluxDetails: z.string().trim().optional(),
    hasLiverDisease: z.boolean(),
    liverDiseaseDetails: z.string().trim().optional(),
    hasBleedingDisorder: z.boolean(),
    bleedingDisorderDetails: z.string().trim().optional(),
    hasVericoseVeins: z.boolean(),
    vericoseVeinsDetails: z.string().trim().optional(),
    hasInfectiousDisease: z.boolean(),
    infectiousDiseaseDetails: z.string().trim().optional(),
    isHIVPositive: z.boolean(),
    hivMedications: z.array(hivMedicationItem),
    hivLastUndetectableViralLoad: z.string().trim().optional(),
    drinksAlcohol: z.boolean(),
    alcoholDetails: z.string().trim().optional(),
    smokingStatus: z.enum(["yes", "quit", "no"]),
    smokingAmountPerDay: z.string().trim().optional(),
    smokingSince: z.string().trim().optional(),
    usesRecreationalDrug: z.boolean(),
    recreationalDrugDetails: z.string().trim().optional(),
    takesMedication: z.boolean(),
    medications: z.array(medicationItem),
    takesPsychMeds: z.boolean(),
    psychMeds: z.array(medicationItem),
    hasPreviousSurgeries: z.boolean(),
    surgeries: z.array(surgeryItem),
  }),
  hasDVT: z.boolean(),
  dvtDetails: z.string().trim().optional(),
  hasHighBloodPressure: z.boolean(),
  hasHighCholesterol: z.boolean(),
  hasKidneyDisorder: z.boolean(),
  hasAsthma: z.boolean(),
  hasOrthopedicProblems: z.boolean(),
  orthopedicDetails: z.string().trim().optional(),
  hasRespiratoryProblems: z.boolean(),
  respiratoryDetails: z.string().trim().optional(),
  mentalHealthCondition: z.enum([
    "none",
    "fibromyalgia",
    "depression",
    "anxiety",
    "panic_attacks",
    "ocd",
    "personality_disorders",
    "other",
  ]),
  mentalHealthOther: z.string().trim().optional(),
  hasReflux: z.boolean(),
  refluxDetails: z.string().trim().optional(),
  hasLiverDisease: z.boolean(),
  liverDiseaseDetails: z.string().trim().optional(),
  hasBleedingDisorder: z.boolean(),
  bleedingDisorderDetails: z.string().trim().optional(),
  hasVericoseVeins: z.boolean(),
  vericoseVeinsDetails: z.string().trim().optional(),
  hasInfectiousDisease: z.boolean(),
  infectiousDiseaseDetails: z.string().trim().optional(),
  isHIVPositive: z.boolean(),
  hivMedications: z.array(hivMedicationItem),
  hivLastUndetectableViralLoad: z.string().trim().optional(),
  drinksAlcohol: z.boolean(),
  alcoholDetails: z.string().trim().optional(),
  smokingStatus: z.enum(["yes", "quit", "no"]),
  smokingAmountPerDay: z.string().trim().optional(),
  smokingSince: z.string().trim().optional(),
  usesRecreationalDrug: z.boolean(),
  recreationalDrugDetails: z.string().trim().optional(),
  takesMedication: z.boolean(),
  medications: z.array(medicationItem),
  takesPsychMeds: z.boolean(),
  psychMeds: z.array(medicationItem),
  hasPreviousSurgeries: z.boolean(),
  surgeries: z.array(surgeryItem),
});

type medicalHistoryData = z.infer<typeof medicalHistoryBase>;

const requiredIf =
  (flagKey: keyof medicalHistoryData, detailKey: keyof medicalHistoryData) =>
  (data: medicalHistoryData): boolean => {
    if (!data[flagKey]) return true;
    const detail = data[detailKey];
    return typeof detail === "string" && detail.trim().length > 0;
  };

export const medicalHistorySchema = medicalHistoryBase
  .refine((data) => !data.hasIllness || data.illness.length > 0, {
    message: "Please add at least one illness",
    path: ["illness"],
  })
  .refine((data) => !data.hasAllergies || data.allergies.length > 0, {
    message: "Please add at least one allergy",
    path: ["allergies"],
  })
  .refine((data) => !data.takesMedication || data.medications.length > 0, {
    message: "Please add at least one medication",
    path: ["medications"],
  })
  .refine((data) => !data.takesPsychMeds || data.psychMeds.length > 0, {
    message: "Please add at least one medication",
    path: ["psychMeds"],
  })
  .refine((data) => !data.isHIVPositive || data.hivMedications.length > 0, {
    message: "Please add your HIV medication",
    path: ["hivMedications"],
  })
  .refine((data) => !data.hasPreviousSurgeries || data.surgeries.length > 0, {
    message: "Please add at least one previous surgery",
    path: ["surgeries"],
  })
  .refine(
    (data) =>
      !data.hasHeartCondition ||
      (data.heartConditionDetails?.trim().length ?? 0) > 0,
    {
      message: "Please describe your heart condition",
      path: ["heartConditionDetails"],
    },
  )
  .refine(requiredIf("hasHeartCondition", "heartConditionDetails"), {
    message: "Please describe your heart condition",
    path: ["heartConditionDetails"],
  })
  .refine(requiredIf("heartSymptoms", "heartSymptomsDetails"), {
    message: "Please describe your symptoms",
    path: ["heartSymptomsDetails"],
  })
  .refine(requiredIf("hasDVT", "dvtDetails"), {
    message: "Please provide more details",
    path: ["dvtDetails"],
  })
  .refine(requiredIf("hasOrthopedicProblems", "orthopedicDetails"), {
    message: "Please describe the orthopedic problem",
    path: ["orthopedicDetails"],
  })
  .refine(requiredIf("hasRespiratoryProblems", "respiratoryDetails"), {
    message: "Please describe the respiratory problem",
    path: ["respiratoryDetails"],
  })
  .refine(requiredIf("hasReflux", "refluxDetails"), {
    message: "Please provide more details",
    path: ["refluxDetails"],
  })
  .refine(requiredIf("hasLiverDisease", "liverDiseaseDetails"), {
    message: "Please provide more details",
    path: ["liverDiseaseDetails"],
  })
  .refine(requiredIf("hasBleedingDisorder", "bleedingDisorderDetails"), {
    message: "Please provide more details",
    path: ["bleedingDisorderDetails"],
  })
  .refine(requiredIf("hasVericoseVeins", "vericoseVeinsDetails"), {
    message: "Please provide more details",
    path: ["vericoseVeinsDetails"],
  })
  .refine(requiredIf("hasInfectiousDisease", "infectiousDiseaseDetails"), {
    message: "Please provide more details",
    path: ["infectiousDiseaseDetails"],
  })
  .refine(requiredIf("drinksAlcohol", "alcoholDetails"), {
    message: "Please tell us how often",
    path: ["alcoholDetails"],
  })
  .refine(requiredIf("usesRecreationalDrug", "recreationalDrugDetails"), {
    message: "Please provide more details",
    path: ["recreationalDrugDetails"],
  })
  .refine((data) => !data.hasDiabetes || data.diabetes.diabetesType, {
    message: "Please select your diabetes type",
    path: ["diabetes", "diabetesType"],
  })
  .refine((data) => !data.hasThyroidCondition || data.thyroid.type, {
    message: "Please select your thyroid condition type",
    path: ["thyroid", "type"],
  })
  .refine(
    (data) =>
      data.mentalHealthCondition !== "other" ||
      (data.mentalHealthOther?.trim().length ?? 0) > 0,
    { message: "Please describe your condition", path: ["mentalHealthOther"] },
  )
  .refine(
    (data) =>
      data.smokingStatus === "no" ||
      (data.smokingAmountPerDay?.trim().length ?? 0) > 0,
    {
      message: "Please tell us how much you smoke or used to smoke per day",
      path: ["smokingAmountPerDay"],
    },
  )
  .refine(
    (data) =>
      data.smokingStatus === "no" ||
      (data.smokingSince?.trim().length ?? 0) > 0,
    {
      message: "Please tell us since when, or when you quit smoking",
      path: ["smokingSince"],
    },
  );

// Photos Step
export const photosSchema = z.object({
  front: z.string({ message: "Front view photo is required" }).url(),
  back: z.string({ message: "Back view photo is required" }).url(),
  leftSide: z.string({ message: "Left side view photo is required" }).url(),
  rightSide: z.string({ message: "Right side view photo is required" }).url(),
  additionalPhotos: z.array(z.string().url()).max(4),
});

// Inferred types
export type personalInfoData = z.infer<typeof personalInfoSchema>;
export type generalInfoData = z.infer<typeof generalInfoSchema>;
export type medicalHistoryFormData = z.infer<typeof medicalHistorySchema>;
export type photosData = z.infer<typeof photosSchema>;
export type Procedure = (typeof PROCEDURES)[number];

export const wizardFormOpts = formOptions({
  defaultValues: {
    personalInfo: {
      firstName: "",
      lastName: "",
      birthGender: "" as "" | "male" | "female" | "other" | "prefer_not_to_say",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      occupation: "",
      heightFt: "",
      heightIn: "",
      weightLbs: "",
      hadWeightLossSurgery: false,
      referralSource: "" as
        | ""
        | "facebook"
        | "instagram"
        | "realself"
        | "tiktok"
        | "friends_relatives"
        | "other",
      referralOther: "",
      desiredSurgeryMonth: "",
      desiredSurgeryYear: "",
    },
    generalInfo: {
      desiredProcedures: [] as Procedure[],
      desiredProcedureOther: "",
      dislikesAndDesires: "",
      interestedInChestSurgery: false,
      chestSurgeryGoals: "",
    },
    medicalHistory: {
      hasIllness: false,
      illness: [],
      hasAllergies: false,
      allergies: [],
      hasDiabetes: false,
      diabetes: { diabetesType: "", hgba1cResult: "" },
      hasHeartCondition: false,
      heartConditionDetails: "",
      heartSymptoms: false,
      heartSymptomsDetails: "",
      hasThyroidCondition: false,
      thyroid: { type: "", yearDiagnosed: "", isControlled: false },
      hasDVT: false,
      dvtDetails: "",
      hasHighBloodPressure: false,
      hasHighCholesterol: false,
      hasKidneyDisorder: false,
      hasAsthma: false,
      hasOrthopedicProblems: false,
      orthopedicDetails: "",
      hasRespiratoryProblems: false,
      respiratoryDetails: "",
      mentalHealthCondition: "none",
      mentalHealthOther: "",
      hasReflux: false,
      refluxDetails: "",
      hasLiverDisease: false,
      liverDiseaseDetails: "",
      hasBleedingDisorder: false,
      bleedingDisorderDetails: "",
      hasVericoseVeins: false,
      vericoseVeinsDetails: "",
      hasInfectiousDisease: false,
      infectiousDiseaseDetails: "",
      isHIVPositive: false,
      hivMedications: [],
      hivLastUndetectableViralLoad: "",
      drinksAlcohol: false,
      alcoholDetails: "",
      smokingStatus: "no",
      smokingAmountPerDay: "",
      smokingSince: "",
      usesRecreationalDrug: false,
      recreationalDrugDetails: "",
      takesMedication: false,
      medications: [],
      takesPsychMeds: false,
      psychMeds: [],
      hasPreviousSurgeries: false,
      surgeries: [],
    },
    photos: {
      front: null,
      back: null,
      leftSide: null,
      rightSide: null,
      additionalPhotos: [],
    },
  },
});
