import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "../ui/field";
import { withForm } from "./hooks/form";
import {
  DESIRED_CUP_SIZES,
  generalInfoSchema,
  wizardFormOpts,
} from "./shared-form";
import { CUP_SIZES, PROCEDURES } from "./shared-form";
import { SelectItem } from "@/components/ui/select";
import { cleanLabel } from "@/lib/helpers";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const GeneralInfoForm = withForm({
  ...wizardFormOpts,
  props: {
    step: 1,
    setStep: (_step: number) => {},
  },
  render: function Render({ form, step, setStep }) {
    return (
      <form.FormGroup
        name="generalInfo"
        validators={{
          onDynamic: generalInfoSchema,
        }}
        onGroupSubmit={({ value: _value }) => {
          setStep(step + 1);
        }}
        onGroupSubmitInvalid={() => {}}
      >
        {(formGroup) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              formGroup.handleSubmit();
            }}
          >
            <FieldGroup className="space-y-4 pb-4">
              {/* ~~~~ DESIRED PROCEDURES ~~~~ */}
              <form.AppField name="generalInfo.desiredProcedures">
                {(field) => (
                  <Field>
                    <FieldLabel>Procedures you're interested in</FieldLabel>
                    <FieldDescription>Select all that apply.</FieldDescription>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
                      {PROCEDURES.map((procedure) => {
                        const checked = field.state.value.includes(procedure);
                        return (
                          <label
                            key={procedure}
                            className="flex items-center gap-2 rounded-lg py-1 px-2 cursor-pointer hover:bg-muted/50"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(isChecked) => {
                                field.handleChange(
                                  isChecked
                                    ? [...field.state.value, procedure]
                                    : field.state.value.filter(
                                        (p) => p !== procedure,
                                      ),
                                );
                                // Clear the detail field when "other" is unchecked
                                if (procedure === "other" && !isChecked) {
                                  form.setFieldValue(
                                    "generalInfo.desiredProcedureOther",
                                    "",
                                  );
                                }
                              }}
                            />
                            <span className="text-sm">
                              {cleanLabel(procedure)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {field.state.meta.isTouched &&
                      !field.state.meta.isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                  </Field>
                )}
              </form.AppField>
              {/* ~~~~ OTHER PROCEDURE ~~~~ */}
              <form.Subscribe
                selector={(state) => state.values.generalInfo.desiredProcedures}
              >
                {(desiredProcedures) =>
                  desiredProcedures.includes("other") && (
                    <form.AppField name="generalInfo.desiredProcedureOther">
                      {(field) => (
                        <field.FormInput
                          label="Which procedure are you interested in?"
                          placeholder="Rhinoplasty, otoplasty, etc."
                        />
                      )}
                    </form.AppField>
                  )
                }
              </form.Subscribe>
              {/* ~~~~ DISLIKES AND DESIRES ~~~~ */}
              <form.AppField name="generalInfo.dislikesAndDesires">
                {(field) => (
                  <field.FormTextarea
                    label="What would you like to change?"
                    description="Describe what bothers you and what results you're hoping for. The more detail, the better."
                    placeholder="I've had two children and I'd like a flatter stomach and more definition at my waist..."
                  />
                )}
              </form.AppField>
              {/* ~~~~ CURRENT CUP SIZE ~~~~ */}
              <div className="grid sm:grid-cols-2">
                <form.AppField name="generalInfo.currentCupSize">
                  {(field) => (
                    <field.FormSelect
                      label="Current cup size"
                      placeholder="Select an option"
                    >
                      {CUP_SIZES.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </field.FormSelect>
                  )}
                </form.AppField>
                {/* ~~~~ DESIRED CUP SIZE ~~~~ */}
                <form.AppField name="generalInfo.desiredCupSize">
                  {(field) => (
                    <field.FormSelect
                      label="Desired cup size"
                      placeholder="Select an option"
                    >
                      {DESIRED_CUP_SIZES.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </field.FormSelect>
                  )}
                </form.AppField>
              </div>

              {/* ~~~~ BREAST IMPLANTS ~~~~ */}
              <form.AppField
                name="generalInfo.hasBreastImplants"
                listeners={{
                  onChange: ({ value }) => {
                    if (!value) {
                      form.setFieldValue("generalInfo.implantSize", "");
                      form.setFieldValue("generalInfo.implantBrand", "");
                      form.setFieldValue("generalInfo.implantPlacement", "");
                    }
                  },
                }}
              >
                {(field) => (
                  <field.FormCheckbox label="I currently have breast implants" />
                )}
              </form.AppField>
              <form.Subscribe
                selector={(state) => state.values.generalInfo.hasBreastImplants}
              >
                {(hasBreastImplants) =>
                  hasBreastImplants && (
                    <div className="grid md:grid-cols-3 gap-2">
                      <form.AppField name="generalInfo.implantSize">
                        {(field) => <field.FormInput label="Implant size" />}
                      </form.AppField>
                      <form.AppField name="generalInfo.implantBrand">
                        {(field) => <field.FormInput label="Brand" />}
                      </form.AppField>
                      <form.AppField name="generalInfo.implantPlacement">
                        {(field) => <field.FormInput label="Placement" />}
                      </form.AppField>
                    </div>
                  )
                }
              </form.Subscribe>
              {/* ~~~~ CHEST SURGERY ~~~~ */}
              <form.AppField
                name="generalInfo.interestedInChestSurgery"
                listeners={{
                  onChange: ({ value }) => {
                    if (!value) {
                      form.setFieldValue("generalInfo.chestSurgeryGoals", "");
                    }
                  },
                }}
              >
                {(field) => (
                  <field.FormCheckbox label="I'm also interested in breast or chest surgery" />
                )}
              </form.AppField>
              <form.Subscribe
                selector={(state) =>
                  state.values.generalInfo.interestedInChestSurgery
                }
              >
                {(interestedInChestSurgery) =>
                  interestedInChestSurgery && (
                    <form.AppField name="generalInfo.chestSurgeryGoals">
                      {(field) => (
                        <field.FormTextarea
                          label="What are your goals for chest surgery?"
                          placeholder="I'd like to go from an A cup to a full C with a natural look..."
                        />
                      )}
                    </form.AppField>
                  )
                }
              </form.Subscribe>
            </FieldGroup>

            <div className="flex items-center justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
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
