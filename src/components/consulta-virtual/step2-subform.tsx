import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldDescription,
} from "../ui/field";
import { withForm } from "./hooks/form";
import { generalInfoSchema, wizardFormOpts } from "./shared-form";
import { PROCEDURES } from "./shared-form";
import { cleanLabel } from "@/lib/helpers";
import { Checkbox } from "@/components/ui/checkbox";

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
            <FieldSet>
              <FieldLegend>General Information</FieldLegend>
              <FieldDescription>
                We're going to ask you some questions
              </FieldDescription>
              <FieldGroup>
                {/* Desired Procedures */}
                <form.AppField name="generalInfo.desiredProcedures">
                  {(field) => (
                    <Field>
                      <FieldLabel>Procedures you're interested in</FieldLabel>
                      <FieldDescription>
                        Select all that apply.
                      </FieldDescription>
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
                                onCheckedChange={(isChecked) =>
                                  field.handleChange(
                                    isChecked
                                      ? [...field.state.value, procedure]
                                      : field.state.value.filter(
                                          (p) => p !== procedure,
                                        ),
                                  )
                                }
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
                  selector={(state) =>
                    state.values.generalInfo.desiredProcedures
                  }
                >
                  {(desiredProcedures) =>
                    desiredProcedures.includes("other") && (
                      <form.AppField name="generalInfo.desiredProcedureOther">
                        {(field) => (
                          <field.FormInput
                            label="Please specify the procedure"
                            placeholder="Enter procedure"
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
                      label="What are your dislikes and desires?"
                      placeholder="Enter your dislikes and desires"
                    />
                  )}
                </form.AppField>

                {/* ~~~~ CHEST SURGERY GOALS ~~~~ */}
                <form.AppField name="generalInfo.interestedInChestSurgery">
                  {(field) => (
                    <field.FormCheckbox label="Are you interested in chest surgery?" />
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
                            label="Please describe your chest surgery goals"
                            placeholder="Enter your chest surgery goals"
                          />
                        )}
                      </form.AppField>
                    )
                  }
                </form.Subscribe>
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
