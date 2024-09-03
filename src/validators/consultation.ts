import { z } from 'zod';

import { zfd } from 'zod-form-data';

const COUNTRIES = ['Mexico', 'United States'] as const;
export const PROCEDURES = [
  'Breast Augmentation with Implants',
  'Breast Lift',
  'Breast Reduction',
  'Breast Augmentation with Fat',
  'Hyperhidrosis',
  'Botulinum Toxin (Botox)',
  'Fillers',
  'Abdmonioplasty',
  'Brachioplasty',
  'Gynecomastia Thorax Liposuction',
  'Liposuction',
  'Mommy Makeover',
  'Massive Weight Loss',
  'Torsoplasty',
  'Thigh Lift',
  'Lipoinfiltration'
] as const;

const GENDERS = ['Male', 'Female'] as const;

export const consultationSchema = z.object({
  // Step 1
  firstName: z.string().min(3, { message: 'Please enter a valid name' }).max(200),
  lastName: z.string().min(3, { message: 'Please enter a valid name' }).max(200),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z
    .string({ message: 'Phone number must be 10 digits' })
    .min(10, { message: 'Phone number must be 10 digits' })
    .max(10, { message: 'Phone number must be 10 digits' })
    .refine((val) => !isNaN(val as unknown as number), {
      message: 'Phone number must be 10 digits'
    }),
  country: z.enum(COUNTRIES, { message: 'Please select a country' }),
  procedure: z.enum(PROCEDURES, { message: 'Please select a procedure' }),
  procedureDate: z.date({ message: 'Please select a date' }),
  gender: z.enum(GENDERS, { message: 'Please select a gender' }),
  procedureMessage: z.string({ message: 'Please tell us about your procedure expectations' }),

  // Step 2
  allergies: z.string().min(2).max(160),
  medication: z.string().min(2).max(160),
  diagnosedDiseases: z.string().min(2).max(160),
  smoking: z.string().min(2).max(160),
  drinking: z.string().min(2).max(160),
  drugUse: z.string().min(2).max(160),
  previousSurgeries: z.string().min(2).max(160),
  birthControl: z.string().min(2).max(160),
  thrombosisHistory: z.string().min(2).max(160),
  pregnancyDetails: z.string().min(2).max(160),
  pregnancyChance: z.string().min(2).max(160),
  specialDiet: z.string().min(2).max(160),

  // Step 3
  frontPhoto: z.instanceof(File),
  backPhoto: z.instanceof(File),
  leftSidePhoto: z.instanceof(File),
  rightSidePhoto: z.instanceof(File)
});
