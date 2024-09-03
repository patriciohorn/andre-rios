import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { CircleAlert } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

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
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const formSchema = z.object({
  ft: z.number(),
  in: z.number(),
  lbs: z.number(),
  bmi: z.string().optional(),
  dob: z.date({
    required_error: 'A date of birth is required.'
  }),
  surgery: z.boolean().default(false).optional(),
  pregnant: z.boolean().default(false).optional()
});

export function EligibilityCheckForm({ onEligibilityStatusChange }:  { onEligibilityStatusChange: (eligible: boolean, data: { feet: number; inches: number;  weight: number; dob: Date }) => void }) {
  const [bmi, setBmi] = useState<string>('');
  const [dob, setDob] = useState<Date | null>(null);
  const [age, setAge] = useState<number | null>(null);
  // const [isEligible, setIsEligible] = useState(false);

  console.log(age);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ft: 0,
      in: 0,
      lbs: 0,
      bmi: '',
      surgery: false,
      pregnant: false
    }
  });

  useEffect(() => {
    calculateBMI(); // Recalculate BMI whenever height or weight changes
  }, [form.watch('ft'), form.watch('in'), form.watch('lbs')]);

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    let eligible = true;

    form.clearErrors(); 

    if (Number(bmi) > 31) {
      eligible = false;
      form.setError('bmi', {
        type: 'manual',
        message: 'Sorry. Your BMI must be below 31 to access our virtual consultation.'
      });
    }

    if (typeof age === 'number' && age > 60) {
      eligible = false;
      form.setError('dob', {
        type: 'manual',
        message: 'Sorry. Your age must be below 60 to access our virtual consultation.'
      });
    }

    if (!data.surgery) {
      eligible = false;
      form.setError('surgery', {
        type: 'manual',
        message: 'You must be at least 10 months post-surgery to access our virtual consultation.'
      });
    }

    if (!data.pregnant) {
      eligible = false;
      form.setError('pregnant', {
        type: 'manual',
        message:
          'You must be at least 6 months post-pregnancy/breastfeeding to access our virtual consultation.'
      });
    }

    onEligibilityStatusChange(eligible, {feet: data.ft, inches: data.in, weight: data.lbs, dob: data.dob })
  }

  function calculateAge(dateOfBirth: Date) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    let monthsDiff = today.getMonth() - birthDate.getMonth();
    let daysDiff = today.getDay() - birthDate.getDay();
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  }

  function handleDobChange(dob: Date | null) {
    if (dob) {
      setDob(dob);
      calculateAge(dob);
    }
  }

  function calculateBMI() {
    const values = form.getValues();
    const heightInInches = values.ft * 12 + values.in;
    const weight = values.lbs;

    // Check if height and weight are greater than 0 to avoid division by zero
    if (heightInInches > 0 && weight > 0) {
      const bmiValue = (weight / (heightInInches * heightInInches)) * 703;
      setBmi(bmiValue.toFixed(1));
    } else {
      setBmi(''); // Clear BMI value if inputs are not valid
    }
  }

  return (
    <div className="flex flex-col space-y-8">
      <div>
       <h2 className="mb-4 text-xl font-bold text-gray-900">Pre-Consultation Requisites</h2>
       <p className="text-gray-700">Please fill out the information asked below to confirm that you meet criteria to proceed with your virtual consultation.</p>   
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold leading-7 text-gray-900">
              Step 1: Calculate your BMI
            </CardTitle>
            <CardDescription className="mt-1 text-sm leading-6 text-gray-600">
              To proceed, please enter your height and weight below to get your BMI value. Your BMI
              should be below 31 to be eligible for the virtual consultation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (feet)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Feet"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="in"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (inches)</FormLabel>
                    <FormControl className="">
                      <Input
                        placeholder="Inches"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="lbs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pounds "
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="button" className="w-full" onClick={calculateBMI}>
              Calculate your BMI
            </Button> */}
            <div className="flex flex-col space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="bmi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BMI:</FormLabel>
                      <FormControl>
                        <Input placeholder="BMI" {...field} value={bmi} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold leading-7 text-gray-900">
              Step 2: Select date of birth
            </CardTitle>
            <CardDescription className="mt-1 text-sm leading-6 text-gray-600">
              Your date of birth is used to calculate your age. Age should be below 60 to be
              eligible for the virtual consultation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] justify-start text-left font-normal',
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
                          handleDobChange(date ?? null);
                        }}
                        fromYear={1950}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold leading-7 text-gray-900">
              Step 3: Eligibility Confirmation
            </CardTitle>
            <CardDescription className="mt-1 text-sm leading-6 text-gray-600">
              Please confirm that you meet both of the following pre-consultation criteria.
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <FormField
              control={form.control}
              name="surgery"
              render={({ field }) => (
                <FormItem className="rounded-md p-4 flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="" />
                  </FormControl>
                  <div className="flex flex-col gap-2 space-y-1">
                    <FormLabel className="text-sm">
                      At least 10 months after your weight loss surgery
                    </FormLabel>
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pregnant"
              render={({ field }) => (
                <FormItem className="rounded-md p-4 flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="" />
                  </FormControl>
                  <div className="flex flex-col gap-2 space-y-1">
                    <FormLabel className="text-sm -mt-1">
                      At least 6 months after your pregnancy (and/or 6 months after breastfeeding,
                      if applicable).
                    </FormLabel>
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="ml-auto">
            Proceed to Virtual Consultation
          </Button>
        </div>
      </form>
      </Form>
    </div>
  );
}
