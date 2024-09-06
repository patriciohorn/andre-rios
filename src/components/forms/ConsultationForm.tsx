import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { consultationSchema, PROCEDURES } from '@/validators/consultation';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// ui components
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Icons
import { CalendarIcon } from 'lucide-react';
import { Asterisk } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png'];

const steps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: [
      'email',
      'firstName',
      'lastName',
      'phoneNumber',
      'procedure',
      'prospectiveSurgeryDate',
      'gender',
      'height',
      'weight',
      'countryRegion',
      'birthdate',
      'procedureExpectations'
    ]
  },
  {
    id: 'Step 2',
    name: 'Medical History',
    fields: [
      'allergies',
      'medication',
      'diagnosedDiseases',
      'smoking',
      'drinking',
      'drugUse',
      'previousSurgeries',
      'birthControl',
      'thrombosisHistory',
      'pregnancyDetails',
      'pregnancyChance',
      'specialDiet'
    ]
  },
  {
    id: 'Step 3',
    name: 'Photo Submission Guidelines',
    fields: ['facePicturesInstructions', 'breastPicturesInstructions', 'bodyPicturesInstructions']
  }
];

const submissionGuidelines = [
  'Face pictures must be taken from forehead to neck, from front and sides angles.',
  'Breast pictures must be taken from neck to abdomen, from front, sides and back angles and without clothes.',
  'Body pictures must be taken from neck to knees, from front, sides and back angles and without clothes.'
];

type Input = z.infer<typeof consultationSchema>;

export function ConsultationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [dop, setDop] = useState<Date | null>(null);
  const [isMale, setIsMale] = useState(false);

  const form = useForm<Input>({
    resolver: zodResolver(consultationSchema)
  });

  const onSubmit = (values: any) => {
    console.log(JSON.stringify(values));
    console.log(values.backPhoto);
  };

  const handleDopChange = (dop: Date | null) => {
    if (dop) {
      setDop(dop);
    }
  };

  const nextStep = () => {
    const step1Fields: Array<
      | 'firstName'
      | 'lastName'
      | 'email'
      | 'phone'
      | 'gender'
      | 'procedure'
      | 'procedureDate'
      | 'procedureMessage'
    > = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'gender',
      'procedure',
      'procedureDate',
      'procedureMessage'
    ];

    const step2Fields: Array<
      | 'allergies'
      | 'medication'
      | 'diagnosedDiseases'
      | 'smoking'
      | 'drinking'
      | 'drugUse'
      | 'previousSurgeries'
      | 'birthControl'
      | 'thrombosisHistory'
      | 'pregnancyDetails'
      | 'pregnancyChance'
      | 'specialDiet'
    > = [
      'allergies',
      'medication',
      'diagnosedDiseases',
      'smoking',
      'drinking',
      'drugUse',
      'previousSurgeries',
      'birthControl',
      'thrombosisHistory',
      'pregnancyDetails',
      'pregnancyChance',
      'specialDiet'
    ];

    if (currentStep === 0) {
      form.trigger(step1Fields as (keyof typeof form.getValues)[]);

      const fields = step1Fields.map((field) => form.getFieldState(field));
      const allFieldsValid = fields.every(
        (fieldState) => fieldState.isDirty && !fieldState.invalid
      );
      if (!allFieldsValid) return;
    }

    if (currentStep === 1) {
      form.trigger(step2Fields as (keyof typeof form.getValues)[]);
      const fields = step2Fields.map((field) => form.getFieldState(field));
      const allFieldsValid = fields.every(
        (fieldState) => fieldState.isDirty && !fieldState.invalid
      );
      if (!allFieldsValid) return;
    }

    setCurrentStep((step) => step + 1);
  };

  const prevStep = () => {
    setCurrentStep((step) => step - 1);
  };

  return (
    <>
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-primary-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-primary-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-primary-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step">
                  <span className="text-sm font-medium text-primary-600">{step.id}</span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8 mt-12')}>
          {/* {Step 1} */}
          <div className={cn('space-y-8', { hidden: currentStep != 0 })}>
            <div className="grid sm:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-gray-500">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {['Mexico', 'United States'].map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid sm:grid-cols-2 gap-8 items-end">
              <FormField
                control={form.control}
                name="procedure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Procedure</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-gray-500">
                          <SelectValue placeholder="Select a procedure" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PROCEDURES.map((procedure) => (
                          <SelectItem key={procedure} value={procedure}>
                            {procedure}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="procedureDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Prospective Surgery Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className=" w-auto p-0">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            handleDopChange(date ?? null);
                          }}
                          fromYear={2024}
                          toYear={2025}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setIsMale(value === 'Male');
                    }}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-gray-500">
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {['Male', 'Female'].map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="procedureMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you expect of your procedure?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about your expectations"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* {Step 2} */}
          <div className={cn('space-y-8', { hidden: currentStep != 1 })}>
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex flex-row items-center">
                    Allergies <Asterisk className="w-3 h-3 text-red-600 ms-1" />
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="List any allergies" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex flex-row items-center">
                    Medication <Asterisk className="w-3 h-3 text-red-600 ms-1" />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any medications or supplement used recently or currently"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diagnosedDiseases"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex flex-row items-center">
                    Diagnosed Diseases
                    <Asterisk className="w-3 h-3 text-red-600 ms-1" />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any diagnosed diseases"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="smoking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex items-center">
                    Do you smoke? If so, how often?
                    <Asterisk className="w-3 h-3 text-red-600 ms-1" />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Ocassionally">Ocassionally</SelectItem>
                      <SelectItem value="Daiky">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="drinking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex items-center">
                    Do you consume alcohol? If yes, how often?
                    <Asterisk className="w-3 h-3 text-red-600 ms-1" />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Ocassionally">Ocassionally</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="drugUse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex items-center">
                    Recreational Drug Use
                    <Asterisk className="w-3 h-3 ms-1 text-red-600" />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Ocassionally">Ocassionally</SelectItem>
                      <SelectItem value="Daiky">Regularly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousSurgeries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex flex-row items-center">
                    Previous Surgeries and Year
                    <Asterisk className="w-3 h-3 text-red-600 ms-1" />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any previous surgery and year"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthControl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`inline-flex items-center ${isMale ? 'text-gray-400' : ''}`}>
                    Do you take birth control?
                    <Asterisk className={`w-3 h-3 ms-1 ${!isMale ? 'text-red-600' : 'hidden'}`} />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isMale !== null ? isMale : !isMale}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thrombosisHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex items-center">
                    History of Thrombosis in Your Family?
                    <Asterisk className="w-3 h-3 ms-1 text-red-600" />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pregnancyDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`inline-flex items-center ${isMale ? 'text-gray-400' : ''}`}>
                    Number of Pregnancies and Type of Delivery
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide details if applicable"
                      className="resize-none"
                      {...field}
                      disabled={isMale !== null ? isMale : !isMale}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pregnancyChance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`inline-flex items-center ${isMale ? 'text-gray-400' : ''}`}>
                    Is There a Chance You Could Be Pregnant?
                    <Asterisk className={`w-3 h-3 ms-1 ${!isMale ? 'text-red-600' : 'hidden'}`} />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isMale !== null ? isMale : !isMale}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialDiet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex flex-row items-center">
                    Special Diet (Vegan, Gluten-Free) or Bariatric Surgery History
                    <Asterisk className="w-3 h-3 text-red-600 ms-1" />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Are you following any special diet?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* {Step 3} */}
          <div className={cn({ hidden: currentStep !== steps.length - 1 })}>
            <ul className="flex flex-col space-y-4 list-disc list-inside">
              {submissionGuidelines.map((guideline, idx) => (
                <li key={`guideline-${idx}`}>{guideline}</li>
              ))}
            </ul>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12 mt-12">
              <FormField
                control={form.control}
                name="frontPhoto"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel htmlFor="picture">Photo Front</FormLabel>
                    <FormControl>
                      <Input
                        id="front-photo"
                        type="file"
                        onChange={(event) => onChange(event.target.files && event.target.files[0])}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="backPhoto"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel htmlFor="picture">Photo - Back</FormLabel>
                    <FormControl>
                      <Input
                        id="back-photo"
                        type="file"
                        onChange={(event) => onChange(event.target.files && event.target.files[0])}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leftSidePhoto"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel htmlFor="picture">Photo - Left Side</FormLabel>
                    <FormControl>
                      <Input
                        id="left-photo"
                        type="file"
                        {...fieldProps}
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(event) => onChange(event.target.files && event.target.files[0])}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rightSidePhoto"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel htmlFor="picture">Photo - Right Side</FormLabel>
                    <FormControl>
                      <Input
                        id="right-photo"
                        type="file"
                        {...fieldProps}
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(event) => onChange(event.target.files && event.target.files[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* {Navigation & Submit} */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className={cn({ hidden: currentStep === 0 })}
              variant="outline"
              onClick={prevStep}>
              <ArrowLeft className="w-3 h-3 me-2" /> Prev Step
            </Button>
            <Button type="submit" className={cn({ hidden: currentStep !== steps.length - 1 })}>
              Submit
            </Button>
            <Button
              type="button"
              className={cn({ hidden: currentStep === steps.length - 1 })}
              variant="outline"
              onClick={nextStep}>
              Next Step <ArrowRight className="w-3 h-3 ms-2" />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
