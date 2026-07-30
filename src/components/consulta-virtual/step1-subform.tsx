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
            <FieldSet>
              <FieldLegend>About you</FieldLegend>
              <FieldDescription>
                Tell us who you are so we can prepare your consultation.
              </FieldDescription>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <form.AppField name="personalInfo.firstName">
                    {(field) => <field.FormInput label="First Name" />}
                  </form.AppField>
                  <form.AppField name="personalInfo.lastName">
                    {(field) => <field.FormInput label="Last Name" />}
                  </form.AppField>
                </div>
                <form.AppField name="personalInfo.birthGender">
                  {(field) => (
                    <field.FormSelect label="Birth Gender">
                      {BIRTH_GENDERS.map((gender: string) => (
                        <SelectItem key={gender} value={gender}>
                          {cleanLabel(gender)}
                        </SelectItem>
                      ))}
                    </field.FormSelect>
                  )}
                </form.AppField>

                <FieldLegend variant="label">Date of birth</FieldLegend>
                <div className="grid grid-cols-3">
                  <form.AppField name="personalInfo.dobMonth">
                    {(field) => (
                      <field.FormSelect
                        label="Birth month"
                        hideLabel
                        placeholder="Select month"
                      >
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
                        placeholder="Select day"
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
                        placeholder="Select year"
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
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <form.AppField name="personalInfo.email">
                    {(field) => <field.FormInput label="Email" type="email" />}
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

                <form.AppField name="personalInfo.address">
                  {(field) => <field.FormInput label="Address (optional)" />}
                </form.AppField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <form.AppField name="personalInfo.city">
                    {(field) => <field.FormInput label="City" />}
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
              </FieldGroup>
            </FieldSet>

            {/* ── Measurements ──────────────────────────── */}
            <FieldSet>
              <FieldLegend>Height and weight</FieldLegend>
              <FieldDescription>
                Dr. Ríos uses these to assess whether you're a candidate for
                surgery. Please be as accurate as possible.
              </FieldDescription>

              <FieldGroup>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <form.AppField name="personalInfo.heightFt">
                    {(field) => <field.FormInput label="Height (feet)" />}
                  </form.AppField>
                  <form.AppField name="personalInfo.heightIn">
                    {(field) => <field.FormInput label="Height (inches)" />}
                  </form.AppField>
                  <form.AppField name="personalInfo.weightLbs">
                    {(field) => <field.FormInput label="Weight (lbs)" />}
                  </form.AppField>
                </div>
                {/* Live BMI feedback */}
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

                {/* Weight Loss Surgery  */}
                <form.AppField name="personalInfo.hadWeightLossSurgery">
                  {(field) => (
                    <field.FormCheckbox label="Have you had weight loss surgery?" />
                  )}
                </form.AppField>

                {/* ── Planning & referral ───────────────────── */}
                <FieldSet>
                  <FieldLegend>Planning your procedure</FieldLegend>
                  <FieldDescription>
                    This helps us understand your timeline and how you found us.
                  </FieldDescription>

                  <FieldGroup>
                    <FieldLabel>
                      When would you like to have surgery? (optional)
                    </FieldLabel>
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

                    {/* Conditional — only when "other" is selected */}
                    <form.Subscribe
                      selector={(state) =>
                        state.values.personalInfo.referralSource
                      }
                    >
                      {(source) =>
                        source === "other" ? (
                          <form.AppField name="personalInfo.referralOther">
                            {(field) => (
                              <field.FormInput label="Please tell us how you heard about us" />
                            )}
                          </form.AppField>
                        ) : null
                      }
                    </form.Subscribe>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </FieldSet>

            <form.AppForm>
              <form.SubscribeButton label="Next" />
            </form.AppForm>
            {/* formGroup contains errorMaps and errors, just like forms and fields */}
            <pre>{JSON.stringify(formGroup.state.meta.errorMap, null, 2)}</pre>
          </form>
        )}
      </form.FormGroup>
    );
  },
});
