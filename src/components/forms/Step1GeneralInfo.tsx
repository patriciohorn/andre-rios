import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

// Icons
import { Info, CalendarIcon } from 'lucide-react';

// Shadcn Components
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// Form Schema
const generalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender'
  }),
  dateOfBirth: z.date({
    required_error: 'Date of Birth is required to calculate your age'
  }),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .regex(/^[0-9()-\s]+$/, { message: 'Invalid phone number format' }),
  occupation: z.string().min(2, 'Please enter your occupation'),
  heightFt: z.number(),
  heightIn: z.number(),
  weight: z.number(),
  hadSurgery: z.boolean(),
  surgeryType: z.enum(['gastric-sleeve', 'bypass', 'lapband', 'weight-loss']).optional(),
  reference: z.enum([
    'facebook',
    'instagram',
    'realself',
    'tiktok',
    'friend-or-relative',
    'others'
  ]),
  procedureMonth: z.string().min(1, 'Please select an estimated year for the procedure'),
  procedureYear: z.string().min(1, 'Please select an estimated year for the procedure')
});

export const Step1GeneralInfo = ({ onNext }: any) => {
  const form = useForm<z.infer<typeof generalInfoSchema>>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      address: '',
      email: '',
      phone: '',
      occupation: '',
      heightFt: undefined,
      heightIn: undefined,
      weight: undefined,
      hadSurgery: false,
      surgeryType: undefined,
      procedureMonth: '',
      procedureYear: ''
    }
  });
  const [age, setAge] = useState<number | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiError, setBmiError] = useState<string | null>(null);
  const [hadSurgery, setHadSurgery] = useState(false);

  // Variables
  const maxBmi = 32.9;
  const year = new Date().getFullYear();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const years = Array.from({ length: 5 }, (_, i) => year + i);

  // Watch Fields
  const { watch } = form;
  const dateOfBirth = watch('dateOfBirth');
  const weight = watch('weight');
  const heightFt = watch('heightFt');
  const heightIn = watch('heightIn');

  // Age calculation
  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge);
    } else {
      setAge(null);
    }
  }, [dateOfBirth]);

  // BMI calculation
  useEffect(() => {
    if (weight && heightFt !== undefined && heightIn !== undefined) {
      const totalHeightInches = heightFt * 12 + heightIn;
      const calculatedBmi = (weight / (totalHeightInches * totalHeightInches)) * 703;
      setBmi(calculatedBmi);
      if (calculatedBmi > maxBmi) {
        setBmiError(
          `Your BMI should be below ${maxBmi} to be eligible for the virtual consultation`
        );
      } else {
        setBmiError(null);
      }
    }
  });

  // Event handlers
  const onSubmit = () => {
    if (!bmiError) {
      onNext();
    }
  };

  const handleSurgeryChange = (value: boolean) => {
    setHadSurgery(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        {/* Names Field */}
        <div className="grid sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
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
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Date of Birth & Age */}
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        ' flex justify-start h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
                      toYear={2024}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Age (calculated)"
                value={age !== null ? age : ''}
                readOnly
              />
            </FormControl>
          </FormItem>
        </div>
        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Occupation */}
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Occupation" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Height, Weight  && BMI Calulation*/}
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-6 ">
            <FormField
              control={form.control}
              name="heightFt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (ft)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter feet"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
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
                      placeholder="Enter inches"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (lbs)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your weight"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* BMI  Calculation*/}
          <FormItem>
            <FormLabel>BMI (calculated)</FormLabel>
            <FormControl>
              <Input type="number" value={bmi !== null ? bmi.toFixed(2) : ''} readOnly />
            </FormControl>
            {bmiError && (
              <div
                className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-300 animate-fade-down animate-duration-300 animate-ease-in-out"
                role="alert">
                <Info className="flex-shrink-0 inline w-5 h-5 fill-red-800 text-red-50 me-3" />
                {bmiError}
              </div>
            )}
            {bmi !== null && bmi >= 31 && bmi <= 32.9 && (
              <div
                className="flex items-center p-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 animate-fade-down animate-duration-300 animate-ease-in-out"
                role="alert">
                <Info className="flex-shrink-0 inline w-5 h-5 me-3 fill-yellow-800 text-yellow-50" />
                <span>
                  You can still get an evaluation, but you need to know that we can't proceed with
                  surgery unless you're below a 31 BMI <strong>AT THE DAY OF SURGERY</strong>
                </span>
              </div>
            )}
          </FormItem>
        </div>
        <FormField
          control={form.control}
          name="hadSurgery"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Have you had weight loss surgery?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    const booleanValue = value === 'true';
                    field.onChange(booleanValue);
                    handleSurgeryChange(booleanValue);
                  }}
                  defaultValue={field.value ? 'true' : 'false'}
                  className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {hadSurgery && (
          <FormField
            control={form.control}
            name="surgeryType"
            render={({ field }) => (
              <FormItem
                className={cn(
                  'space-y-3 animate-ease-in-out animate-duration-300',
                  hadSurgery ? 'animate-fade-down' : 'animate-fade-up'
                )}>
                <FormLabel>If yes, please select an option:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="gastric-sleeve" />
                      </FormControl>
                      <FormLabel className="font-normal">Gastric Sleeve</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="bypass" />
                      </FormControl>
                      <FormLabel className="font-normal">Bypass</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="lapband" />
                      </FormControl>
                      <FormLabel className="font-normal">Lap band</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="weight-loss" />
                      </FormControl>
                      <FormLabel className="font-normal">Weight loss without surgery</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about us?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="realself">Realself</SelectItem>
                  <SelectItem value="tiktok">Tik Tok</SelectItem>
                  <SelectItem value="friend-or-relative">Friend or Relative</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <p className="text-sm mb-2">When would you like to book your surgery?</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="procedureMonth"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Esimated month</FormLabel> */}
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an estimated month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {months.map((month: string) => (
                        <SelectItem key={month} value={month.toLowerCase()}>
                          {month}
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
              name="procedureYear"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Estimated year</FormLabel> */}
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an estimated year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
};
