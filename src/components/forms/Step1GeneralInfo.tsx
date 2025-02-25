import { cn } from "@/lib/utils";
import { format, differenceInYears } from "date-fns";
import { useState, useEffect, useMemo } from "react";

// Icons
import { Info, CalendarIcon } from "lucide-react";

// Shadcn Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const months = [
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

const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

const maxYearAllowed = new Date().getFullYear() - 18;

export const Step1GeneralInfo = ({ form }: any) => {
  const [dateOfBirthTouched, setDateOfBirthTouched] = useState(false);

  const dateOfBirth = form.watch("dateOfBirth");
  const weight = form.watch("weight");
  const heightFt = form.watch("heightFt");
  const heightIn = form.watch("heightIn");
  const reference = form.watch("reference");

  const age = useMemo(() => {
    if (!dateOfBirth) return null;
    return differenceInYears(new Date(), dateOfBirth);
  }, [dateOfBirth]);

  const isValidAge = age !== null && age >= 18 && age <= 60;

  const calculateBmi = (
    heightFt: number | undefined,
    heightIn: number | undefined,
    weight: number | undefined
  ) => {
    if (
      heightFt === undefined ||
      heightIn === undefined ||
      weight === undefined
    ) {
      return null;
    }

    if (heightFt <= 0 || heightIn < 0 || weight <= 0) {
      return null;
    }

    const totalHeightInches = heightFt * 12 + heightIn;
    const totalHeightMeters = totalHeightInches * 0.0254;
    const totalWeightKilograms = weight * 0.453592;
    const bmi = totalWeightKilograms / (totalHeightMeters * totalHeightMeters);

    return Number(bmi.toFixed(1));
  };

  const bmi = useMemo(() => {
    return calculateBmi(heightFt, heightIn, weight);
  }, [heightFt, heightIn, weight]);

  const bmiError = useMemo(() => {
    if (!weight || !heightFt || !heightIn) return null;

    if (bmi !== null && bmi > 32.9) {
      return "Your BMI should be below 32.9 to be eligible for the virtual consultation";
    }
    return null;
  }, [bmi, weight, heightFt, heightIn]);

  const hadSurgery = form.watch("hadSurgery");

  const handleSurgeryChange = (value: any) => {
    form.setValue("surgeryType", null);
    if (!value) {
      form.setValue("surgeryType", undefined);
    }
  };

  const handleDateChange = (date: any) => {
    form.setValue("dateOfBirth", date);
    setDateOfBirthTouched(true);
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* Names Field */}
        <div className="grid sm:grid-cols-2 gap-4">
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
            <FormItem>
              <FormLabel>Birth Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Date of Birth & Age */}
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " flex justify-start h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className=" w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={handleDateChange}
                      fromYear={1950}
                      toYear={maxYearAllowed}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Age (calculated)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Age"
                value={age !== null ? age : ""}
                readOnly
              />
            </FormControl>
          </FormItem>
          {dateOfBirthTouched && !isValidAge && (
            <div
              className="sm:col-span-2 flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-300 animate-fade-down animate-duration-300 animate-ease-in-out"
              role="alert"
            >
              <Info className="flex-shrink-0 inline w-5 h-5 fill-red-800 text-red-50 me-3" />
              Your age must be between 18 and 60 to proceed with the evaluation
            </div>
          )}
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

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@gmail.com" {...field} />
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
        </div>

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
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === undefined
                            ? ""
                            : Number(e.target.value)
                        )
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
                      placeholder="Enter inches"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
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
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
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
              <Input
                type="number"
                value={bmi !== null ? bmi.toFixed(2) : ""}
                readOnly
              />
            </FormControl>
            {bmiError && (
              <div
                className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-300 animate-fade-down animate-duration-300 animate-ease-in-out"
                role="alert"
              >
                <Info className="flex-shrink-0 inline w-5 h-5 fill-red-800 text-red-50 me-3" />
                {bmiError}
              </div>
            )}
            {bmi !== null && bmi >= 31 && bmi <= 32.9 && (
              <div
                className="flex items-center p-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 animate-fade-down animate-duration-300 animate-ease-in-out"
                role="alert"
              >
                <Info className="flex-shrink-0 inline w-5 h-5 me-3 fill-yellow-800 text-yellow-50" />
                <span>
                  You can still get an evaluation, but you need to know that we
                  can't proceed with surgery unless you're below a 31 BMI{" "}
                  <strong>AT THE DAY OF SURGERY</strong>
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
                    const booleanValue = value === "true";
                    field.onChange(booleanValue);
                    handleSurgeryChange(booleanValue);
                  }}
                  defaultValue={field.value ? "true" : "false"}
                  className="flex flex-col space-y-1"
                >
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
          <>
            <FormField
              control={form.control}
              name="surgeryType"
              render={({ field }) => (
                <FormItem
                  className={cn(
                    "space-y-3 animate-ease-in-out animate-duration-300",
                    hadSurgery ? "animate-fade-down" : "animate-fade-up"
                  )}
                >
                  <FormLabel>
                    If yes, please specify the type of surgery:
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="gastric-sleeve" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Gastric Sleeve
                        </FormLabel>
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
                        <FormLabel className="font-normal">
                          Weight loss without surgery
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weightLoss"
              render={({ field }) => (
                <FormItem className="animate-ease-in-out animate-duration-300 animate-fade-down">
                  <FormLabel>
                    How many lbs (kg) did you lose from your highest weight?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the amount (e.g., 20 lbs / 9 kg)"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
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
                  <SelectItem value="friend-or-relative">
                    Friend or Relative
                  </SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {(reference === "friend-or-relative" || reference === "others") && (
          <FormField
            control={form.control}
            name="referralSource"
            render={({ field }) => (
              <FormItem className="animate-ease-in-out animate-duration-300 animate-fade-down">
                <FormLabel>Please specify/elaborate</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter details here (e.g., friend's name or other sources)"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div>
          <p className="text-sm mb-2">
            When would you like to book your surgery?
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="procedureMonth"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Esimated month</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
      </form>
    </Form>
  );
};
