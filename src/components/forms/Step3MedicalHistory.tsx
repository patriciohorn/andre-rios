import { useFieldArray } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Icons
import { Trash2, CalendarIcon } from 'lucide-react';

// Shadcn Components
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const Step3MedicalHistory = ({ form }: any) => {
  const errors = form.formState.errors;

  const {
    fields: illnessFields,
    append: appendIllness,
    remove: removeIllness
  } = useFieldArray({
    control: form.control,
    name: 'illnesses'
  });

  const {
    fields: allergiesFields,
    append: appendAllergy,
    remove: removeAllergy
  } = useFieldArray({
    control: form.control,
    name: 'allergies'
  });

  const {
    fields: hivMedicationsFields,
    append: appendHivMedication,
    remove: removeHivMedication
  } = useFieldArray({
    control: form.control,
    name: 'hivMedications'
  });

  const {
    fields: medicationFields,
    append: appendMedication,
    remove: removeMedication
  } = useFieldArray({
    control: form.control,
    name: 'medications'
  });

  const {
    fields: surgeryFields,
    append: appendSurgery,
    remove: removeSurgery
  } = useFieldArray({
    control: form.control,
    name: 'surgeries'
  });

  const illness = form.watch('hasIllness') === 'yes';
  const allergy = form.watch('hasAllergies') === 'yes';
  const hasDiabetes = form.watch('diabetes') === 'yes';
  const hasHeartCondition = form.watch('heartCondition') === 'yes';
  const hasHeartSymptoms = form.watch('heartSymptoms') === 'yes';
  const showThyroidOptions = form.watch('hasThyroidCondition') === 'yes';
  const otherThyroidCondition = form.watch('thyroidConditionType') === 'other';
  const hasDeepVeinHistory = form.watch('deepVein') === 'yes';
  const hasOrthopedicProblems = form.watch('orthopedic') === 'yes';
  const hasBreathingProblems = form.watch('breathingProblems') === 'yes';

  const mentalCondition = form.watch('mentalCondition') === 'other';

  const hasReflux = form.watch('reflux') === 'yes';

  const hasLiverDisease = form.watch('liverDisease') === 'yes';
  const hasAnemiaOrBleeding = form.watch('anemiaOrBleeding') === 'yes';
  const hasSwellingOrVaricose = form.watch('swellingOrVaricose') === 'yes';
  const hasInfectiousDisease = form.watch('infectiousDisease') === 'yes';
  const isHivPositive = form.watch('hivPositive') === 'yes';
  const showAlcoholFrequency = form.watch('drinkAlcohol') === 'yes';
  const smokingStatus = form.watch('smokedOrVape') === 'yes';
  const quitSmoking = form.watch('smokedOrVape') === 'quit';
  const useDrugs = form.watch('recreationalDrugUse') === 'yes';
  const currentMedication = form.watch('currentMedication') === 'yes';
  const previousSurgeries = form.watch('previousSurgeries') === 'yes';

  return (
    <Form {...form}>
      <form className="space-y-8 animate-fade-right animate-ease-in-out">
        {/* Illness */}
        <div className="space-y-6">
          {/* hasIllness */}
          <FormField
            control={form.control}
            name="hasIllness"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Have you had any illnesses or conditions you've been previously diagnosed with
                  (ever)?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      // setIllness(value === 'yes');
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {illness && (
            <div className="flex flex-col animate-fade-down animate-ease-in-out animate-duration-300">
              <div className="flex items-center mb-2">
                <FormLabel>History of Illness</FormLabel>
                <Button
                  type="button"
                  size="sm"
                  className="mt-2 sm:ml-auto"
                  onClick={() =>
                    appendIllness({ condition: '', yearDiagnosed: '', description: '' })
                  }>
                  Add Illness
                </Button>
              </div>
              {illnessFields.map((item: any, index: any) => (
                <div
                  key={item.id}
                  className="animate-fade-down animate-ease-in-out animate-duration-300 flex flex-col sm:flex-row gap-4 sm:items-end  bg-gray-300 p-4 border rounded-md mb-2">
                  <FormField
                    control={form.control}
                    name={`illnesses.${index}.condition`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Condition / Diagnosis</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter condition" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`illnesses.${index}.yearDiagnosed`}
                    render={({ field }) => (
                      <FormItem className="flex-1 ">
                        <FormLabel>When You Were Diagnosed</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter year" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`illnesses.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="flex-1 ">
                        <FormLabel>Please describe</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="ml-auto"
                      aria-label="Delete"
                      onClick={() => removeIllness(index)}>
                      <Trash2 className="shrink-0 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Allergies  */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="hasAllergies"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have any allergies?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {allergy && (
            <div className="flex flex-col animate-fade-down animate-ease-in-out animate-duration-300">
              <div className="flex items-center mb-2">
                <FormLabel>Allergies</FormLabel>
                <Button
                  type="button"
                  size="sm"
                  className="mt-2 sm:ml-auto"
                  onClick={() => appendAllergy({ allergicTo: '', reaction: '' })}>
                  Add Allergy
                </Button>
              </div>
              {allergiesFields.map((item: any, index: any) => (
                <div
                  key={item.id}
                  className="animate-fade-down animate-ease-in-out animate-duration-300 flex flex-col sm:flex-row gap-4 sm:items-end  bg-gray-300 p-4 border rounded-md mb-2">
                  <FormField
                    control={form.control}
                    name={`allergies.${index}.allergicTo`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Allergic to</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter allergy" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`allergies.${index}.reaction`}
                    render={({ field }) => (
                      <FormItem className="flex-1 ">
                        <FormLabel>Reaction you have</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter reaction" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="ml-auto"
                      aria-label="Delete"
                      onClick={() => removeAllergy(index)}>
                      <Trash2 className="shrink-0 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Diabetes  */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="diabetes"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have any diabetes?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasDiabetes && (
            <div className="animate-down space-y-6">
              <FormField
                control={form.control}
                name="diabetesType"
                render={({ field }) => (
                  <FormItem className="space-y-3 ">
                    <FormLabel>Type of diabetes</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="type 1" />
                          </FormControl>
                          <FormLabel className="font-normal">Type 1</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="type 2" />
                          </FormControl>
                          <FormLabel className="font-normal">Type 2</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hgbResult"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last HGB A1C result</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your last HGB A1C result"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* Heart Condition */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="heartCondition"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have a heart condition?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasHeartCondition && (
            <FormField
              control={form.control}
              name="heartConditionDetails"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>Please describe your heart condition</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details of your condition, including any symptoms, diagnosis, and treatment"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Heart Symptoms */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="heartSymptoms"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Do you have any heart symptoms like: chest pain, extreme fatigue, dizziness, and
                  shortenss of breath or palpitations?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasHeartSymptoms && (
            <FormField
              control={form.control}
              name="heartConditionDetails"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>
                    Please describe your heart symptoms like: chest pain, extreme fatigue,
                    dizziness, and shortenss of breath or palpitations
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details of your heart symptoms "
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Thyroid */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="hasThyroidCondition"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have a thyroid condition?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {showThyroidOptions && (
            <div className="space-y-6 animate-down">
              <FormField
                control={form.control}
                name="thyroidConditionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Thyroid Condition</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hypothyroidism">Hypothyroidism</SelectItem>
                        <SelectItem value="hyperthyroidism">Hyperthyroidism</SelectItem>
                        <SelectItem value="gravesDisease">Graves disease</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {otherThyroidCondition && (
                <FormField
                  control={form.control}
                  name="otherThyroidCondition"
                  render={({ field }) => (
                    <FormItem className="animate-down">
                      <FormLabel>Please describe your thyroid condition</FormLabel>
                      <FormControl>
                        <Input placeholder="Provide details of your condition" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="thyroidYearDiagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of Thyroid Diagnosis</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isThyroidControlled"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Is the thyroid condition controlled?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        {/* deepVein */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="deepVein"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Do you have any history of Deep Vein Thrombosis/Blood Clots (DVT) or Pulmonary
                  Thromboebolism (PE)?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasDeepVeinHistory && (
            <FormField
              control={form.control}
              name="deepVeinDetails"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>Please provide details of your DVT/PE history</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Include the date of diagnosis and any treatment received"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* High Blood */}
        <FormField
          control={form.control}
          name="highBloodPresure"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you suffer from high blood pressure?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Cholesterol */}
        <FormField
          control={form.control}
          name="cholesterol"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you have high cholesterol?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Kidney */}
        <FormField
          control={form.control}
          name="kidenyOrUrinary"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you have a kidney or urinary disorder?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Asthma */}
        <FormField
          control={form.control}
          name="asthma"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you suffer from asthma?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* orthopedic */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="orthopedic"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have any orthopedic problems?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasOrthopedicProblems && (
            <FormField
              control={form.control}
              name="orthopedicDetails"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>Please describe your orthopedic problem(s)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details about the condition"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* breathingProblems */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="breathingProblems"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have any breathing or respiratory problems?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasBreathingProblems && (
            <FormField
              control={form.control}
              name="breathingProblemsDetails"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>Please describe your breathing or respiratory problem(s)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Include details about symptoms, diagnosis, and any treatment or medication"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Mental Condition */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="mentalCondition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Do you have history of mental condition, illness (psychiatric) or chronic pain?
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="fibromyalgia">Fibromyalgia</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="panic attacks">Panic attacks</SelectItem>
                    <SelectItem value="ocd">Obsessive compulsive disorder (OCD)</SelectItem>
                    <SelectItem value="personality disorders">Personality disorders</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {mentalCondition && (
            <FormField
              control={form.control}
              name="otherMentalCondition"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>Other condition(s)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please list more details"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Reflux, Heartburn and/or Gastritis */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="reflux"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you suffer from reflux, heartburn and/or gastritis?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasReflux && (
            <FormField
              control={form.control}
              name="refluxDetails"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>
                    Please describe your reflux, heartburn, or gastritis symptoms
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details on symptoms, frequency, and any treatment received"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Liver Disease */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="liverDisease"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have a liver disease?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasLiverDisease && (
            <FormField
              control={form.control}
              name="liverDiseaseDetails"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>Please describe your liver disease</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Include diagnosis, severity, and any ongoing treatment"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Anemia or Bleeding */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="anemiaOrBleeding"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have anemia or a bleeding disorder? </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasAnemiaOrBleeding && (
            <FormField
              control={form.control}
              name="anemiaOrBleedingDetails"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>Please describe your anemia or bleeding disorder</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details about the condition, including diagnosis, symptoms, and treatment"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        {/* SwellingOrVaricose */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="swellingOrVaricose"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you suffer from leg swelling or varicose veins?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasSwellingOrVaricose && (
            <FormField
              control={form.control}
              name="swellingOrVaricoseDetails"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>Please describe your leg swelling or varicose veins</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Include symptoms, affected areas, and any treatment or management"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        {/* infectous disease */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="infectiousDisease"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have an infectious disease?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasInfectiousDisease && (
            <FormField
              control={form.control}
              name="infectiousDiseaseDetails"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>Please describe your infectious disease</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details about the disease, diagnosis date, and any treatment received"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* HIV */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="hivPositive"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Are you HIV positive?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isHivPositive && (
            <>
              <div className="flex flex-col animate-fade-down animate-ease-in-out animate-duration-300">
                <div className="flex items-center mb-2">
                  <FormLabel>Please list what medications you are taking for HIV</FormLabel>
                  <Button
                    type="button"
                    size="sm"
                    className="mt-2 sm:ml-auto"
                    onClick={() =>
                      appendHivMedication({ medicationName: '', dosage: '', frequency: '' })
                    }>
                    Add Medication
                  </Button>
                </div>
                {hivMedicationsFields.map((item: any, index: any) => (
                  <div
                    key={item.id}
                    className="animate-fade-down animate-ease-in-out animate-duration-300 flex flex-col sm:flex-row gap-4 sm:items-end  bg-gray-300 p-4 border rounded-md mb-2">
                    <FormField
                      control={form.control}
                      name={`hivMedications.${index}.medicationName`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Name of Medication</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter medication name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`hivMedications.${index}.dosage`}
                      render={({ field }) => (
                        <FormItem className="flex-1 ">
                          <FormLabel>Dosage</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter dosage" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`hivMedications.${index}.frequency`}
                      render={({ field }) => (
                        <FormItem className="flex-1 ">
                          <FormLabel>How Often You Take It</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter dosage" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="ml-auto"
                        aria-label="Delete"
                        onClick={() => removeHivMedication(index)}>
                        <Trash2 className="shrink-0 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <FormField
                control={form.control}
                name="lastViralLoadDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>When was your last undetectable viral load?</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}>
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
        {/* drink alcohol */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="drinkAlcohol"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you drink alcohol?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {showAlcoholFrequency && (
            <FormField
              control={form.control}
              name="alcoholFrequency"
              render={({ field }) => (
                <FormItem className="mt-4 animate-down">
                  <FormLabel>How often and how much do you drink?</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe frequency" {...field} />
                  </FormControl>
                  <FormDescription>
                    ex: glass of wine daily, ocassional 4-5 times a year, weekends, etc.{' '}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        {/* Smoking or Vape */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="smokedOrVape"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Have you ever smoked or vaped?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="quit" />
                      </FormControl>
                      <FormLabel className="font-normal">I quit smoking</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {smokingStatus && (
            <div className="space-y-4 animate-down">
              <FormField
                control={form.control}
                name="currentSmokingAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much do you smoke?</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter estimated" {...field} />
                    </FormControl>
                    <FormDescription>e.g. 1 pack a day</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentSmokingSince"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Since when do you smoke?</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter estimated" {...field} />
                    </FormControl>
                    <FormDescription>e.g., started 10 years ago</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {quitSmoking && (
            <div className="space-y-4 animate-down">
              <FormField
                control={form.control}
                name="pastSmokingAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much did you smoke, and how long did you smoke for?</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter estimated" {...field} />
                    </FormControl>
                    <FormDescription>e.g., 1 pack a day, smoked for 10 years</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pastSmokingSince"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How long ago did you quit smoking?</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter estimated" {...field} />
                    </FormControl>
                    <FormDescription>e.g., quit over 2 years ago</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        {/* Drug Use */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="recreationalDrugUse"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Recreational drug use?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {useDrugs && (
            <FormField
              control={form.control}
              name="drugUseDetails"
              render={({ field }) => (
                <FormItem className="animate-down">
                  <FormLabel>Please explain your recreational drug use</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide details" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>e.g., frequency and types of substances used</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Current Medication */}
        <FormField
          control={form.control}
          name="currentMedication"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you currently take any medication?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {currentMedication && (
          <div className="space-y-6 animate-fade-down">
            <div className="flex items-center mb-2">
              <FormLabel>Current Medications</FormLabel>
              <Button
                type="button"
                size="sm"
                className="ml-auto"
                onClick={() =>
                  appendMedication({
                    medicationName: '',
                    dosage: '',
                    frequency: '',
                    purpose: ''
                  })
                }>
                Add Medication
              </Button>
            </div>

            {/* Iterate through the medication fields */}
            {medicationFields.map((item, index) => (
              <div
                key={item.id}
                className="grid gap-4 sm:items-end bg-gray-300 p-4 border rounded-md mb-2">
                <div className="grid sm:grid-cols-2 items-center gap-x-8 gap-y-4">
                  <FormField
                    control={form.control}
                    name={`medications.${index}.medicationName`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Name of Medication</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Ibuprofen" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`medications.${index}.dosage`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Dosage</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 200 mg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid sm:grid-cols-2 items-center gap-x-8 gap-y-4">
                  <FormField
                    control={form.control}
                    name={`medications.${index}.frequency`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>How Often</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Twice a day" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`medications.${index}.purpose`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Purpose (Condition Treated)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Pain relief for arthritis" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="ml-auto"
                  aria-label="Delete"
                  onClick={() => removeMedication(index)}>
                  <Trash2 className="shrink-0 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        {/* Antidepressants */}
        <FormField
          control={form.control}
          name="antidepressants"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you take antidepressants, anxiety pills or sleeping pills?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Supplements & Vitamins */}
        <FormField
          control={form.control}
          name="takingSupplements"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you take antidepressants, anxiety pills or sleeping pills?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-6">
          {/* Previous Surgeries */}
          <FormField
            control={form.control}
            name="previousSurgeries"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Have you had any previous surgeries ?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {previousSurgeries && (
            <div className="flex flex-col animate-fade-down animate-ease-in-out animate-duration-300">
              <div className="flex items-center mb-2">
                <FormLabel>History of Surgeries</FormLabel>
                <Button
                  type="button"
                  size="sm"
                  className="mt-2 sm:ml-auto"
                  onClick={() =>
                    appendSurgery({ surgeryName: '', surgeryYear: '', surgeryReason: '' })
                  }>
                  Add Surgery
                </Button>
              </div>
              {surgeryFields.map((item: any, index: any) => (
                <div
                  key={item.id}
                  className="animate-fade-down animate-ease-in-out animate-duration-300 flex flex-col sm:flex-row gap-4 sm:items-end  bg-gray-300 p-4 border rounded-md mb-2">
                  <FormField
                    control={form.control}
                    name={`surgery.${index}.surgeryName`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Surgery name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter surgery name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`surgery.${index}.surgeryYear`}
                    render={({ field }) => (
                      <FormItem className="flex-1 ">
                        <FormLabel>Surgery Year </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter year (YYYY)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`surgery.${index}.surgeryReason`}
                    render={({ field }) => (
                      <FormItem className="flex-1 ">
                        <FormLabel>Please describe</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter surgery reason" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="ml-auto"
                      aria-label="Delete"
                      onClick={() => removeSurgery(index)}>
                      <Trash2 className="shrink-0 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};
