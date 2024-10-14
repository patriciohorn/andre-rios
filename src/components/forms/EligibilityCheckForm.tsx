'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { CalendarIcon, Divide } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';

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

// Icons
import { CircleCheck, CircleAlert, CircleX } from 'lucide-react';

const formSchema = z.object({
  heightCm: z.number().optional(),
  heightFt: z.number().optional(),
  heightIn: z.number().optional(),
  weight: z.number().positive(),
  dob: z.date({
    required_error: 'Date is required',
    invalid_type_error: 'Format invalid'
  }),
  surgery: z.boolean().default(false),
  pregnant: z.boolean().default(false)
});

interface EligibilityCheckFormProps {
  onEligibilityStatusChange: (eligible: boolean, eligibilityData: any) => void;
}

export function EligibilityCheckForm({ onEligibilityStatusChange }: EligibilityCheckFormProps) {
  const [bmi, setBmi] = useState<number | null>(null);
  const [isMetric, setIsMetric] = useState(true);
  const [age, setAge] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const { watch, setValue } = form;
  const heightCm = watch('heightCm');
  const heightFt = watch('heightFt');
  const heightIn = watch('heightIn');
  const weight = watch('weight');
  const dob = watch('dob');

  useEffect(() => {
    calculateBMI();
  }, [heightCm, heightFt, heightIn, weight, isMetric]);

  useEffect(() => {
    if (dob) {
      calculateAge(dob);
    }
  }, [dob]);

  function calculateBMI() {
    let height: number;
    if (isMetric) {
      height = heightCm || 0;
    } else {
      height = (heightFt || 0) * 12 + (heightIn || 0);
    }

    if (height > 0 && weight > 0) {
      let bmiValue: number;
      if (isMetric) {
        bmiValue = weight / Math.pow(height / 100, 2);
      } else {
        bmiValue = (weight * 703) / Math.pow(height, 2);
      }
      setBmi(parseFloat(bmiValue.toFixed(1)));
    } else {
      setBmi(null);
    }
  }

  function calculateAge(dateOfBirth: Date) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    let eligible = true;
    form.clearErrors();

    if (bmi !== null && bmi >= 32.9) {
      eligible = false;
      form.setError('weight', {
        type: 'manual',
        message: 'Your BMI should be below 32.9 to be eligible for the virtual consultation.'
      });
    }

    if (age !== null && age > 60) {
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

    const height = isMetric ? data.heightCm : (data.heightFt || 0) * 12 + (data.heightIn || 0);

    onEligibilityStatusChange(eligible, {
      ...data,
      bmi: bmi || undefined,
      age: age || undefined,
      dob: dob ? formatDate(dob) : undefined
    });
  }

  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h2 className="mb-4 text-xl font-bold text-gray-900">Pre-Consultation Requirements</h2>
        <p className="text-gray-700">
          Please fill out the information asked below to confirm that you meet criteria to proceed
          with your virtual consultation.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold leading-7 text-gray-900">
                Step 1: Calculate your BMI
              </CardTitle>
              <CardDescription className="mt-1 text-sm leading-6 text-gray-600">
                To proceed, please enter your height and weight below to get your BMI value. Your
                BMI should be below 32.9 to be eligible for the virtual consultation and
                <strong> below 31 at the day of surgery.</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div className="flex items-center justify-between mb-4">
                <Label htmlFor="unit-toggle">Unit System</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="unit-toggle">{isMetric ? 'Metric' : 'Imperial'}</Label>
                  <Switch
                    id="unit-toggle"
                    checked={!isMetric}
                    onCheckedChange={() => {
                      setIsMetric(!isMetric);
                      setValue('heightCm', 0);
                      setValue('heightFt', 0);
                      setValue('heightIn', 0);
                      setValue('weight', 0);
                    }}
                  />
                </div>
              </div>
              {isMetric ? (
                <FormField
                  control={form.control}
                  name="heightCm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="cm"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? Number(e.target.value) : '')
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="heightFt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (ft)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="ft"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number(e.target.value) : '')
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="heightIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (in)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="in"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number(e.target.value) : '')
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isMetric ? 'Weight (kg)' : 'Weight (lbs)'}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={isMetric ? 'kg' : 'lbs'}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : '')
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {bmi !== null && (
                <div
                  className={cn(
                    `mt-6 p-4 rounded-md flex flex-col gap-2`,
                    bmi <= 31
                      ? 'bg-green-100'
                      : bmi > 31 && bmi <= 32.9
                        ? 'bg-yellow-50'
                        : 'bg-red-50'
                  )}>
                  <p
                    className={cn(
                      `text-lg font-semibold`,
                      bmi <= 31
                        ? 'text-green-800'
                        : bmi > 31 && bmi <= 32.9
                          ? 'text-yellow-800'
                          : 'text-red-800'
                    )}>
                    Your BMI: {bmi}
                  </p>
                  {bmi <= 31 ? (
                    <div className="flex items-center gap-2 text-green-800">
                      <CircleCheck size={16} />
                      <p className="text-sm">
                        Your BMI is below 31, you're elegible for virtual consultation
                      </p>
                    </div>
                  ) : bmi > 31 && bmi <= 32.9 ? (
                    <div className="flex items-start gap-2 text-yellow-800">
                      <CircleAlert size={16} className="w-4 h-4 flex-shrink-0 mt-1" />
                      <p className="text-sm">
                        If you're between a BMI of 31 to 32.9, you can still get an evaluation, but
                        you need to know that we can't proceed with surgery unless you're below a 31
                        BMI <strong>AT THE DAY OF SURGERY</strong>
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-800">
                      <CircleX size={16} />
                      <p className="text-sm">
                        Your BMI should be below 32.9 to be eligible for the virtual consultation.
                      </p>
                    </div>
                  )}
                  <p></p>
                </div>
              )}
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
                          onSelect={field.onChange}
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
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className=""
                      />
                    </FormControl>
                    <div className="flex flex-col gap-2 space-y-1">
                      <FormLabel className="text-sm">
                        At least 6 months after your weight loss surgery
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
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className=""
                      />
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
