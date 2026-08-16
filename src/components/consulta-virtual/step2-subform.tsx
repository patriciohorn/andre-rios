import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "../ui/field";
import { withForm } from "./hooks/form";
import { generalInfoSchema, wizardFormOpts } from "./shared-form";
import { PROCEDURES } from "./shared-form";
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
            <FieldGroup>
              {/* ~~~~ DESIRED PROCEDURES ~~~~ */}
              <form.AppField name="generalInfo.desiredProcedures">
                {(field) => (
                  <Field>
                    <FieldLabel>Procedures you're interested in</FieldLabel>
                    <FieldDescription>Select all that apply.</FieldDescription>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
