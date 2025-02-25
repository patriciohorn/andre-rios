import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AlertError from "@/components/forms/AlertError";
import { RadioField } from "./RadioField";

export const Step2Expectations = ({ form, data }: any) => {
  const hasBeenPregnant = form.watch("hasBeenPregnant"); // Watch the pregnant field dynamically
  const desiredProcedure = form.watch("desiredProcedure"); // Watch the procedure field
  const birthControl = form.watch("birthControl"); // Watch the birth control field
  const currentlyPregnant = form.watch("currentlyPregnant") === "yes";
  const breastFeeding = form.watch("breastFeeding") === "yes";
  const chestSurgery = form.watch("chestSurgery");

  const procedures = [
    "Breast Augmentation with Implants",
    "Breast Lift",
    "Breast Reduction",
    "Breast Augmentation with Fat",
    "Hyperhidrosis",
    "Botulinum Toxin (Botox)",
    "Fillers",
    "Abdominoplasty (Tummy Tuck)",
    "Brachioplasty",
    "Gynecomastia Thorax Liposuction",
    "Liposuction",
    "Mommy Makeover",
    "Massive Weight Loss",
    "Torsoplasty",
    "Thigh Lift",
    "Lipoinfiltration",
    "Other",
  ];
  const deliveredProcedures = ["Vaginal", "C-Section", "Both", "Other"];
  const birthControls = [
    "None",
    "Tubal ligation",
    "IUD",
    "Pills",
    "Condom",
    "Hormone replacement therapy",
    "Hormone implant",
    "Secondary to surgical procedure (hysterectomy)",
    "Other",
  ];

  return (
    <Form {...form}>
      <form className="space-y-6 animate-fade-right animate-ease-in-out">
        {/* Desired Procedure */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="desiredProcedure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What’s your Desired Medical Procedure(s)?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a desired procedure or other" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {procedures.map((procedure) => (
                      <SelectItem value={procedure} key={procedure}>
                        {procedure}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {desiredProcedure === "Other" && (
            <FormField
              control={form.control}
              name="otherProcedure"
              render={({ field }) => (
                <FormItem>
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
              <FormLabel>
                What are your dislikes and desires of the area you are
                interested in treating with plastic surgery?
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

        <div>
          {data.gender !== "male" ? (
            // Female and Other Questions
            <div className="space-y-6">
              {/* Breast Surgery Question */}
              <FormField
                control={form.control}
                name="breastSurgery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you interested in breast surgery?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
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
                  <FormItem>
                    <FormLabel>
                      Are you interested in breast implants?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
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
                  <FormItem>
                    <FormLabel>
                      Have you had breast augmentation before?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
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

              {/* Pregnant Questions*/}
              <FormField
                control={form.control}
                name="hasBeenPregnant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Have you been pregnant?</FormLabel>
                    <RadioGroup
                      className="flex flex-col space-y-1"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              {hasBeenPregnant === "yes" && (
                <>
                  <FormField
                    control={form.control}
                    name="timesPregnant"
                    render={({ field }) => (
                      <FormItem className="animate-fade-down animate-ease-in-out animate-duration-300">
                        <FormLabel>
                          How many times have you been pregnant?
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the number of pregnancies"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="delivered"
                    render={({ field }) => (
                      <FormItem className="animate-fade-down animate-ease-in-out animate-duration-400">
                        <FormLabel>How were they delivered?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {deliveredProcedures.map((procedure) => (
                              <FormItem
                                key={procedure}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={procedure} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {procedure}
                                </FormLabel>
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
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a birth control" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {birthControls.map((control) => (
                            <SelectItem value={control} key={control}>
                              {control}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {birthControl === "Other" && (
                  <FormField
                    control={form.control}
                    name="otherBirthControl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Please specify other birth control used
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter birth control used"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="currentlyPregnant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Are you currently pregnant? (Applicants must wait at
                        least 6 months after delivery to apply)
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
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
                {currentlyPregnant && (
                  <AlertError errorMessage="Applicants must wait at least 6 months after delivery to apply" />
                )}
              </div>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="breastFeeding"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Are you breastfeeding? (Applicants must stop
                        breastfeeding at least 6 months before applying)
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
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
                {breastFeeding && (
                  <AlertError errorMessage="Applicants must stop breastfeeding at least 6 months before applying" />
                )}
              </div>
            </div>
          ) : (
            // Male Questions
            <div className="space-y-6">
              <RadioField
                form={form}
                nameField="chestSurgery"
                question="Are you interested in chest surgery?"
              />
              {chestSurgery === "yes" && (
                <FormField
                  control={form.control}
                  name="chestExpectation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What results do you hope to achieve with chest surgery?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your goals or expectations (e.g., a more defined chest, reduction in size)"
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
          )}
        </div>
      </form>
    </Form>
  );
};
