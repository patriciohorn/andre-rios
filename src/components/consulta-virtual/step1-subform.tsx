import {
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldDescription,
} from "../ui/field";
import { withForm } from "./hooks/form";
import { personalInfoSchema, wizardFormOpts } from "./shared-form";
import {
  BIRTH_GENDERS,
  DAYS,
  MONTHS,
  YEARS,
  COUNTRIES,
  SURGERY_YEARS,
  REFERRAL_SOURCES,
} from "./shared-form";
import { SelectItem } from "@/components/ui/select";
import { cleanLabel, getBmiStatus } from "@/lib/helpers";

export const PersonalInfoForm = withForm({
  ...wizardFormOpts,
  props: {
    step: 0,
    setStep: (_step: number) => {},
  },
  render: function Render({ form, step, setStep }) {
    return (
      <form.FormGroup
        name="personalInfo"
        validators={{
          onDynamic: personalInfoSchema,
        }}
        onGroupSubmit={({ value: _value }) => {
          setStep(step + 1);
        }}
        onGroupSubmitInvalid={() => {
          // Just like a form, you can also handle invalid submits at the group level, which is useful for multi-step wizards to prevent going to the next step if the current step is invalid
        }}
      >
        {(formGroup) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              formGroup.handleSubmit();
            }}
          >
            {/* About patient */}
            {/* <FieldLegend>About you</FieldLegend>
            <FieldDescription>
              Tell us who you are so we can prepare your consultation.
            </FieldDescription> */}
            <FieldGroup className="gap-8">
              <div className="grid sm:grid-cols-2 gap-4">
                <form.AppField name="personalInfo.firstName">
                  {(field) => (
                    <field.FormInput label="First Name" placeholder="Maria" />
                  )}
                </form.AppField>
                <form.AppField name="personalInfo.lastName">
                  {(field) => (
                    <field.FormInput label="Last Name" placeholder="González" />
                  )}
                </form.AppField>
              </div>

              {/* ~~~~ Birth Gender ~~~~  */}
              <div>
                <form.AppField name="personalInfo.birthGender">
                  {(field) => (
                    <field.FormSelect
                      label="Gender"
                      placeholder="Select an option"
                    >
                      {BIRTH_GENDERS.map((gender: string) => (
                        <SelectItem key={gender} value={gender}>
                          {cleanLabel(gender)}
                        </SelectItem>
                      ))}
                    </field.FormSelect>
                  )}
                </form.AppField>
              </div>

              {/* ~~~~ Date of birth ~~~~ */}

              <div>
                <FieldLegend variant="label" className="mb-0">
                  Date of birth
                </FieldLegend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                  <form.AppField name="personalInfo.dobMonth">
                    {(field) => (
                      <field.FormSelect hideLabel placeholder="Month">
                        {MONTHS.map((month: string, i) => (
                          <SelectItem key={month} value={(i + 1).toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </field.FormSelect>
                    )}
                  </form.AppField>

                  <form.AppField name="personalInfo.dobDay">
                    {(field) => (
                      <field.FormSelect
                        label="Birth day"
                        hideLabel
                        placeholder="Day"
                      >
                        {DAYS.map((day: string) => (
                          <SelectItem key={day} value={day}>
                            {Number(day) >= 10 ? day : `0${day}`}
                          </SelectItem>
                        ))}
                      </field.FormSelect>
                    )}
                  </form.AppField>

                  <form.AppField name="personalInfo.dobYear">
                    {(field) => (
                      <field.FormSelect
                        label="Birth year"
                        hideLabel
                        placeholder="Year"
                      >
                        {YEARS.map((year: string) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </field.FormSelect>
                    )}
                  </form.AppField>
                </div>
              </div>
              {/* ~~~~ Contact Info ~~~~ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="personalInfo.email">
                  {(field) => (
                    <field.FormInput
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                    />
                  )}
                </form.AppField>
                <form.AppField name="personalInfo.phone">
                  {(field) => (
                    <field.FormInput
                      label="Phone number"
                      type="tel"
                      placeholder="+1 619 555 0100"
                    />
                  )}
                </form.AppField>
              </div>

              {/* ~~~~ Address ~~~~  */}
              {/* div is only for styling so gap stame the same due to children of formgroup, Going to update Field later*/}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="personalInfo.occupation">
                  {(field) => (
                    <field.FormInput
                      label="Occupation"
                      placeholder="Nurse, teacher, etc."
                    />
                  )}
                </form.AppField>
                <form.AppField name="personalInfo.address">
                  {(field) => (
                    <field.FormInput
                      label="Address"
                      placeholder="1234 Sunset Blvd"
                    />
                  )}
                </form.AppField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="personalInfo.city">
                  {(field) => (
                    <field.FormInput label="City" placeholder="San Diego" />
                  )}
                </form.AppField>
                <form.AppField name="personalInfo.country">
                  {(field) => (
                    <field.FormSelect
                      label="Country"
                      placeholder="Select your country"
                    >
                      {COUNTRIES.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </field.FormSelect>
                  )}
                </form.AppField>
              </div>

              {/* Other country */}

              <div>
                <form.Subscribe
                  selector={(state) => state.values.personalInfo.country}
                >
                  {(source) =>
                    source === "Other" ? (
                      <form.AppField name="personalInfo.countryOther">
                        {(field) => (
                          <field.FormInput
                            label="Which country?"
                            placeholder="Australia"
                          />
                        )}
                      </form.AppField>
                    ) : null
                  }
                </form.Subscribe>
              </div>

              {/* ~~~~ Measurements ~~~~ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <form.AppField name="personalInfo.heightFt">
                  {(field) => (
                    <field.FormInput label="Height (feet)" placeholder="Feet" />
                  )}
                </form.AppField>
                <form.AppField name="personalInfo.heightIn">
                  {(field) => (
                    <field.FormInput
                      label="Height (inches)"
                      placeholder="Inches"
                    />
                  )}
                </form.AppField>
                <form.AppField name="personalInfo.weightLbs">
                  {(field) => (
                    <field.FormInput
                      label="Weight (lbs)"
                      placeholder="Pounds"
                    />
                  )}
                </form.AppField>
              </div>

              {/* ~~~~ Live BMI ~~~~ */}
              <form.Subscribe
                selector={(state) => [
                  state.values.personalInfo.heightFt,
                  state.values.personalInfo.heightIn,
                  state.values.personalInfo.weightLbs,
                ]}
              >
                {([ft, inches, lbs]) => {
                  const { bmi, status } = getBmiStatus(ft, inches, lbs);
                  if (status === "empty" || bmi === null) return null;

                  return (
                    <div
                      className={`rounded-lg border p-4 text-sm ${
                        status === "blocked"
                          ? "border-red-200 bg-red-50 text-red-800"
                          : status === "warning"
                            ? "border-amber-200 bg-amber-50 text-amber-900"
                            : "border-emerald-200 bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      <p className="font-medium">
                        Your BMI is {bmi.toFixed(1)}
                      </p>
                      {status === "blocked" && (
                        <p className="mt-1">
                          Your BMI should be below 32.9 to be eligible for the
                          virtual consultation.
                        </p>
                      )}
                      {status === "warning" && (
                        <p className="mt-1">
                          You can still get an evaluation, but please note we
                          can't proceed with surgery unless you're below a 31
                          BMI at the day of surgery.
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Subscribe>

              {/* ~~~~ Weight Loss Surgery ~~~~ */}
              <div>
                <form.AppField name="personalInfo.hadWeightLossSurgery">
                  {(field) => (
                    <field.FormCheckbox
                      label="Have you had weight loss surgery?"
                      className=""
                    />
                  )}
                </form.AppField>
              </div>

              {/* ~~~~ Planning & referral ~~~~ */}
              <div>
                <FieldLegend variant="label" className="mb-0">
                  When are you planning to have surgery?
                </FieldLegend>
                <div className="grid grid-cols-2 gap-3">
                  <form.AppField name="personalInfo.desiredSurgeryMonth">
                    {(field) => (
                      <field.FormSelect placeholder="Month">
                        {MONTHS.map((month: string) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </field.FormSelect>
                    )}
                  </form.AppField>
                  <form.AppField name="personalInfo.desiredSurgeryYear">
                    {(field) => (
                      <field.FormSelect placeholder="Year">
                        {SURGERY_YEARS.map((year: string) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </field.FormSelect>
                    )}
                  </form.AppField>
                </div>
              </div>

              {/* ~~~~ Referral Source ~~~~ */}
              <div>
                <form.AppField name="personalInfo.referralSource">
                  {(field) => (
                    <field.FormSelect
                      label="How did you hear about us? (optional)"
                      placeholder="Select an option"
                    >
                      {REFERRAL_SOURCES.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </field.FormSelect>
                  )}
                </form.AppField>
              </div>

              {/* ~~~~ Conditional — only when "other" in Referral is selected ~~~~ */}
              <div>
                <form.Subscribe
                  selector={(state) => state.values.personalInfo.referralSource}
                >
                  {(source) =>
                    source === "other" ? (
                      <form.AppField name="personalInfo.referralOther">
                        {(field) => (
                          <field.FormInput
                            label="Please tell us how you heard about us"
                            placeholder="Tell us where you found us"
                          />
                        )}
                      </form.AppField>
                    ) : null
                  }
                </form.Subscribe>
              </div>
            </FieldGroup>

            <div className="flex justify-end">
              <form.AppForm>
                <form.SubscribeButton label="Next" />
              </form.AppForm>
            </div>
          </form>
        )}
      </form.FormGroup>
    );
  },
});
