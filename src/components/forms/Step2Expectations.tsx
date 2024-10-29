import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Shadcn components
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Form Schema
const ExpectationsSchema = z.object({
  desiredProcedure: z.string().min(1, 'Desired procedure is required'),
  otherProcedure: z.string().optional(),
  dislikesAndDesires: z.string().min(1, 'Please tell us a little about your dislikes and desires'),
  breastSurgery: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  cupSize: z.string(),
  breastImplants: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  breastAugmentationBefore: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  hasBeenPregnant: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  timesPregnant: z.string().optional(),
  delivered: z.enum(['Vaginal', 'C-Section', 'Both', 'Other']),
  birthControl: z.string().min(1, 'Please select a birth control'),
  otherBirthControl: z.string().optional(),
  currentlyPregnant: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  breastFeeding: z.enum(['yes', 'no'], { required_error: 'Please select an option' })
});

// Component
export const Step2Expectations = ({ onNext, onBack }: any) => {
  const form = useForm<z.infer<typeof ExpectationsSchema>>({
    resolver: zodResolver(ExpectationsSchema),
    defaultValues: {
      desiredProcedure: '',
      otherProcedure: '',
      dislikesAndDesires: '',
      cupSize: '',
      timesPregnant: '',
      birthControl: ''
    }
  });
  const [procedure, setProcedure] = useState<string | null>('');
  const [pregnant, setPregnant] = useState<boolean | null>(null);
  const [birthControl, setBirthControl] = useState<string | null>('');

  const procedures = [
    'Breast Augmentation with Implants',
    'Breast Lift',
    'Breast Reduction',
    'Breast Augmentation with Fat',
    'Hyperhidrosis',
    'Botulinum Toxin (Botox)',
    'Fillers',
    'Abdominoplasty (Tummy Tuck)',
    'Brachioplasty',
    'Gynecomastia Thorax Liposuction',
    'Liposuction',
    'Mommy Makeover',
    'Massive Weight Loss',
    'Torsoplasty',
    'Thigh Lift',
    'Lipoinfiltration',
    'Other'
  ];
  const deliveredProcedures = ['Vaginal', 'C-Section', 'Both', 'Other'];
  const birthControls = [
    'None',
    'Tubal ligation',
    'IUD',
    'Pills',
    'Condom',
    'Hormone replacement therapy',
    'Hormone implant',
    'Secondary to surgical procedure (hysterectomy)',
    'Other'
  ];

  const onSubmit = (data: any) => {
    if (procedure === 'Other' && !data.otherProcedure) {
      form.setError('otherProcedure', { type: 'manual', message: 'Please specify the procedure' });
      return;
    }

    if (pregnant && !data.timesPregnant) {
      form.setError('timesPregnant', {
        type: 'manual',
        message: 'Please specify how many times have you been pregnant'
      });
      return;
    }
    onNext();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-8 animate-fade-right animate-ease-in-out">
        {/* Desired Procedure */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="desiredProcedure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What’s your Desired Medical Procedure(s) ?</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setProcedure(value);
                  }}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a desired procedure or other" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {procedures.map((procedure: string) => (
                      <SelectItem value={procedure}>{procedure}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {procedure === 'Other' && (
            <FormField
              control={form.control}
              name="otherProcedure"
              render={({ field }) => (
                <FormItem className="animate-fade-down animate-ease-in-out animate-duration-300">
                  <FormLabel>Please specify the procedure</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the procedure" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        {/* Desires & Dislikes */}
        <FormField
          control={form.control}
          name="dislikesAndDesires"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                What are your dislikes and desires of the area you are interested in treating with
                plastic surgery?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your dislikes and desires"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Breast Surgery Question */}
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="breastSurgery"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Are you interested in breast surgery?</FormLabel>
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
          <FormField
            control={form.control}
            name="cupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your current cup size?</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a cup size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Breast Implants */}
          <FormField
            control={form.control}
            name="breastImplants"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Are you interested in breast implants?</FormLabel>
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
          {/* Breast Augmentation */}
          <FormField
            control={form.control}
            name="breastAugmentationBefore"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Have you had breast augmentation before?</FormLabel>
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

        {/* Pregnant Questions*/}
        <FormField
          control={form.control}
          name="hasBeenPregnant"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Have you been pregnant?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setPregnant(value === 'yes');
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

        {pregnant && (
          <>
            <FormField
              control={form.control}
              name="timesPregnant"
              render={({ field }) => (
                <FormItem className="animate-fade-down animate-ease-in-out animate-duration-300">
                  <FormLabel>How many times have you been pregnant?</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the number of pregnancies" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="delivered"
              render={({ field }) => (
                <FormItem className="space-y-3 animate-fade-down animate-ease-in-out animate-duration-400">
                  <FormLabel>How were they delivered?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1">
                      {deliveredProcedures.map((procedure) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={procedure} />
                          </FormControl>
                          <FormLabel className="font-normal">{procedure}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Birth Control */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="birthControl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth control used</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setBirthControl(value);
                  }}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a birth control" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {birthControls.map((control) => (
                      <SelectItem value={control}>{control}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {birthControl === 'Other' && (
            <FormField
              control={form.control}
              name="otherBirthControl"
              render={({ field }) => (
                <FormItem className=" animate-fade-down animate-ease-in-out animate-duration-300">
                  <FormLabel>Please specify other birth control used</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter birth control used" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormField
          control={form.control}
          name="currentlyPregnant"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Are you currently pregnant? (You need to be at least 6 months after delivering to
                apply)
              </FormLabel>
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
        <FormField
          control={form.control}
          name="breastFeeding"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Are you breastfeeding? (You need to have stopped at least 6 months prior to
                applying)
              </FormLabel>
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
        <div className="flex gap-6">
          <Button type="button" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};
