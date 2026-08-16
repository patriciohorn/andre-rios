import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldDescription,
  // FieldSeparator,
} from "@/components/ui/field";
import type { DeepKeysOfType } from "@tanstack/react-form";
import { withForm } from "./hooks/form";
import { RepeatableRows } from "./components/RepeatableRows";
import {
  medicalHistorySchema,
  wizardFormOpts,
  MENTAL_HEALTH_CONDITIONS,
  DIABETES_TYPES,
  THYROID_TYPES,
  SMOKING_STATUS,
} from "./shared-form";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cleanLabel } from "@/lib/helpers";

export const MedicalHistoryForm = withForm({
  ...wizardFormOpts,
  props: {
    step: 2,
    setStep: (_step: number) => {},
  },
  render: function Render({ form, step, setStep }) {
    /** Clears detail fields when their parent toggle is turned off */
    const clearOnFalse = (
      ...paths: DeepKeysOfType<typeof wizardFormOpts.defaultValues, string>[]
    ) => ({
      onChange: ({ value }: { value: boolean }) => {
        if (!value) paths.forEach((p) => form.setFieldValue(p, ""));
      },
    });

    return (
      <form.FormGroup
        name="medicalHistory"
        validators={{ onDynamic: medicalHistorySchema }}
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
            className="space-y-8"
          >
            {/* ═══ CONDITIONS ═══ */}
            <FieldSet>
              <FieldLegend>Medical conditions</FieldLegend>
              <FieldDescription>
                Check any condition that applies to you. Dr. Ríos needs this to
                assess your surgical risk.
              </FieldDescription>

              <FieldGroup>
                {/* ── Ongoing illnesses ── */}
                <form.AppField
                  name="medicalHistory.hasIllness"
                  listeners={{
                    onChange: ({ value }) => {
                      if (!value)
                        form.setFieldValue("medicalHistory.illness", []);
                    },
                  }}
                >
                  {(field) => (
                    <field.FormCheckbox label="I have an ongoing illness or medical condition" />
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasIllness}
                >
                  {(has) =>
                    has && (
                      <RepeatableRows
                        form={form}
                        name="medicalHistory.illness"
                        label="Your conditions"
                        addLabel="Add condition"
                        emptyItem={{
                          condition: "",
                          yearDiagnosed: "",
                          description: "",
                        }}
                        renderRow={(i) => (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <form.AppField
                                name={`medicalHistory.illness[${i}].condition`}
                              >
                                {(f) => (
                                  <f.FormInput
                                    label="Condition"
                                    placeholder="Lupus, Crohn's disease..."
                                  />
                                )}
                              </form.AppField>
                              <form.AppField
                                name={`medicalHistory.illness[${i}].yearDiagnosed`}
                              >
                                {(f) => (
                                  <f.FormInput
                                    label="Year diagnosed"
                                    placeholder="2018"
                                  />
                                )}
                              </form.AppField>
                            </div>
                            <form.AppField
                              name={`medicalHistory.illness[${i}].description`}
                            >
                              {(f) => (
                                <f.FormTextarea
                                  label="How is it managed? (optional)"
                                  placeholder="Currently in remission, managed with medication..."
                                />
                              )}
                            </form.AppField>
                          </div>
                        )}
                      />
                    )
                  }
                </form.Subscribe>

                {/* ── Diabetes ── */}
                <form.AppField
                  name="medicalHistory.hasDiabetes"
                  listeners={clearOnFalse(
                    "medicalHistory.diabetes.diabetesType",
                    "medicalHistory.diabetes.hgba1cResult",
                  )}
                >
                  {(field) => <field.FormCheckbox label="I have diabetes" />}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasDiabetes}
                >
                  {(has) =>
                    has && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6">
                        <form.AppField name="medicalHistory.diabetes.diabetesType">
                          {(f) => (
                            <f.FormSelect
                              label="Type"
                              placeholder="Select type"
                            >
                              {DIABETES_TYPES.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </f.FormSelect>
                          )}
                        </form.AppField>
                        <form.AppField name="medicalHistory.diabetes.hgba1cResult">
                          {(f) => (
                            <f.FormInput
                              label="Last HbA1c result (optional)"
                              placeholder="6.8"
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Heart condition ── */}
                <form.AppField
                  name="medicalHistory.hasHeartCondition"
                  listeners={clearOnFalse(
                    "medicalHistory.heartConditionDetails",
                  )}
                >
                  {(field) => (
                    <field.FormCheckbox label="I have a heart condition" />
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasHeartCondition}
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.heartConditionDetails">
                          {(f) => (
                            <f.FormTextarea
                              label="Please describe it"
                              placeholder="Mitral valve prolapse diagnosed in 2017, monitored annually..."
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Heart symptoms ── */}
                <form.AppField
                  name="medicalHistory.heartSymptoms"
                  listeners={clearOnFalse(
                    "medicalHistory.heartSymptomsDetails",
                  )}
                >
                  {(field) => (
                    <field.FormCheckbox label="I experience chest pain, palpitations or shortness of breath" />
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.heartSymptoms}
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.heartSymptomsDetails">
                          {(f) => (
                            <f.FormTextarea
                              label="Describe your symptoms"
                              placeholder="Occasional palpitations during intense exercise..."
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Thyroid ── */}
                <form.AppField
                  name="medicalHistory.hasThyroidCondition"
                  listeners={{
                    onChange: ({ value }) => {
                      if (!value) {
                        form.setFieldValue("medicalHistory.thyroid.type", "");
                        form.setFieldValue(
                          "medicalHistory.thyroid.yearDiagnosed",
                          "",
                        );
                        form.setFieldValue(
                          "medicalHistory.thyroid.isControlled",
                          false,
                        );
                      }
                    },
                  }}
                >
                  {(field) => (
                    <field.FormCheckbox label="I have a thyroid condition" />
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasThyroidCondition}
                >
                  {(has) =>
                    has && (
                      <div className="space-y-3 pl-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <form.AppField name="medicalHistory.thyroid.type">
                            {(f) => (
                              <f.FormSelect
                                label="Type"
                                placeholder="Select type"
                              >
                                {THYROID_TYPES.map(({ value, label }) => (
                                  <SelectItem key={value} value={value}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </f.FormSelect>
                            )}
                          </form.AppField>
                          <form.AppField name="medicalHistory.thyroid.yearDiagnosed">
                            {(f) => (
                              <f.FormInput
                                label="Year diagnosed"
                                placeholder="2013"
                              />
                            )}
                          </form.AppField>
                        </div>
                        <form.AppField name="medicalHistory.thyroid.isControlled">
                          {(f) => (
                            <f.FormCheckbox label="My condition is currently controlled" />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── DVT ── */}
                <form.AppField
                  name="medicalHistory.hasDVT"
                  listeners={clearOnFalse("medicalHistory.dvtDetails")}
                >
                  {(field) => (
                    <field.FormCheckbox label="I've had blood clots or deep vein thrombosis (DVT)" />
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasDVT}
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.dvtDetails">
                          {(f) => (
                            <f.FormTextarea
                              label="When did it happen and how was it treated?"
                              placeholder="DVT in left leg in 2020, treated with anticoagulants for 6 months..."
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Simple toggles, no detail needed ── */}
                <form.AppField name="medicalHistory.hasHighBloodPressure">
                  {(f) => <f.FormCheckbox label="I have high blood pressure" />}
                </form.AppField>
                <form.AppField name="medicalHistory.hasHighCholesterol">
                  {(f) => <f.FormCheckbox label="I have high cholesterol" />}
                </form.AppField>
                <form.AppField name="medicalHistory.hasKidneyDisorder">
                  {(f) => <f.FormCheckbox label="I have a kidney disorder" />}
                </form.AppField>
                <form.AppField name="medicalHistory.hasAsthma">
                  {(f) => <f.FormCheckbox label="I have asthma" />}
                </form.AppField>

                {/* ── Orthopedic ── */}
                <form.AppField
                  name="medicalHistory.hasOrthopedicProblems"
                  listeners={clearOnFalse("medicalHistory.orthopedicDetails")}
                >
                  {(f) => (
                    <f.FormCheckbox label="I have orthopedic or joint problems" />
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) =>
                    s.values.medicalHistory.hasOrthopedicProblems
                  }
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.orthopedicDetails">
                          {(f) => (
                            <f.FormTextarea
                              label="Please describe it"
                              placeholder="Chronic lower back pain from a herniated disc..."
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Respiratory ── */}
                <form.AppField
                  name="medicalHistory.hasRespiratoryProblems"
                  listeners={clearOnFalse("medicalHistory.respiratoryDetails")}
                >
                  {(f) => (
                    <f.FormCheckbox label="I have respiratory problems or sleep apnea" />
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) =>
                    s.values.medicalHistory.hasRespiratoryProblems
                  }
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.respiratoryDetails">
                          {(f) => (
                            <f.FormTextarea
                              label="Please describe it"
                              placeholder="Mild sleep apnea, I use a CPAP machine nightly..."
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Reflux ── */}
                <form.AppField
                  name="medicalHistory.hasReflux"
                  listeners={clearOnFalse("medicalHistory.refluxDetails")}
                >
                  {(f) => <f.FormCheckbox label="I have acid reflux or GERD" />}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasReflux}
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.refluxDetails">
                          {(f) => (
                            <f.FormTextarea
                              label="Please describe it"
                              placeholder="Diagnosed in 2015, controlled with daily medication..."
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Liver ── */}
                <form.AppField
                  name="medicalHistory.hasLiverDisease"
                  listeners={clearOnFalse("medicalHistory.liverDiseaseDetails")}
                >
                  {(f) => <f.FormCheckbox label="I have liver disease" />}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasLiverDisease}
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.liverDiseaseDetails">
                          {(f) => (
                            <f.FormTextarea
                              label="Please describe it"
                              placeholder="Mild fatty liver detected in 2022, monitored annually..."
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Bleeding disorder ── */}
                <form.AppField
                  name="medicalHistory.hasBleedingDisorder"
                  listeners={clearOnFalse(
                    "medicalHistory.bleedingDisorderDetails",
                  )}
                >
                  {(f) => (
                    <f.FormCheckbox label="I have a bleeding or clotting disorder" />
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasBleedingDisorder}
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.bleedingDisorderDetails">
                          {(f) => (
                            <f.FormTextarea
                              label="Please describe it"
                              placeholder="Von Willebrand disease type 1, mild form..."
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Varicose veins ── */}
                <form.AppField
                  name="medicalHistory.hasVericoseVeins"
                  listeners={clearOnFalse(
                    "medicalHistory.vericoseVeinsDetails",
                  )}
                >
                  {(f) => <f.FormCheckbox label="I have varicose veins" />}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasVericoseVeins}
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.vericoseVeinsDetails">
                          {(f) => (
                            <f.FormTextarea
                              label="Please describe them"
                              placeholder="Moderate varicose veins in both legs, more pronounced on the right..."
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Infectious disease ── */}
                <form.AppField
                  name="medicalHistory.hasInfectiousDisease"
                  listeners={clearOnFalse(
                    "medicalHistory.infectiousDiseaseDetails",
                  )}
                >
                  {(f) => (
                    <f.FormCheckbox label="I have or have had an infectious disease" />
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasInfectiousDisease}
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.infectiousDiseaseDetails">
                          {(f) => (
                            <f.FormTextarea
                              label="Please describe it"
                              placeholder="Latent tuberculosis, completed treatment in 2018..."
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Mental health ── */}
                <form.AppField
                  name="medicalHistory.mentalHealthCondition"
                  listeners={{
                    onChange: ({ value }) => {
                      if (value !== "other")
                        form.setFieldValue(
                          "medicalHistory.mentalHealthOther",
                          "",
                        );
                    },
                  }}
                >
                  {(f) => (
                    <f.FormSelect
                      label="Mental health condition"
                      description="Select 'None' if this doesn't apply to you."
                      placeholder="Select an option"
                    >
                      {MENTAL_HEALTH_CONDITIONS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {cleanLabel(c)}
                        </SelectItem>
                      ))}
                    </f.FormSelect>
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) =>
                    s.values.medicalHistory.mentalHealthCondition
                  }
                >
                  {(condition) =>
                    condition === "other" && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.mentalHealthOther">
                          {(f) => (
                            <f.FormInput
                              label="Please describe your condition"
                              placeholder="Enter condition"
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>
              </FieldGroup>
            </FieldSet>

            {/* <FieldSeparator /> */}

            {/* ═══ ALLERGIES ═══ */}
            <FieldSet>
              <FieldLegend>Allergies</FieldLegend>
              <FieldDescription>
                Include allergies to medications, latex, anesthesia or anything
                else.
              </FieldDescription>

              <FieldGroup>
                <form.AppField
                  name="medicalHistory.hasAllergies"
                  listeners={{
                    onChange: ({ value }) => {
                      if (!value)
                        form.setFieldValue("medicalHistory.allergies", []);
                    },
                  }}
                >
                  {(f) => <f.FormCheckbox label="I have allergies" />}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasAllergies}
                >
                  {(has) =>
                    has && (
                      <RepeatableRows
                        form={form}
                        name="medicalHistory.allergies"
                        label="Your allergies"
                        addLabel="Add allergy"
                        emptyItem={{ allergicTo: "", reaction: "" }}
                        renderRow={(i) => (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <form.AppField
                              name={`medicalHistory.allergies[${i}].allergicTo`}
                            >
                              {(f) => (
                                <f.FormInput
                                  label="Allergic to"
                                  placeholder="Penicillin"
                                />
                              )}
                            </form.AppField>
                            <form.AppField
                              name={`medicalHistory.allergies[${i}].reaction`}
                            >
                              {(f) => (
                                <f.FormInput
                                  label="Reaction"
                                  placeholder="Rash and hives"
                                />
                              )}
                            </form.AppField>
                          </div>
                        )}
                      />
                    )
                  }
                </form.Subscribe>
              </FieldGroup>
            </FieldSet>

            {/* <FieldSeparator /> */}

            {/* ═══ MEDICATIONS ═══ */}
            <FieldSet>
              <FieldLegend>Medications</FieldLegend>
              <FieldDescription>
                List everything you take regularly, including supplements and
                birth control.
              </FieldDescription>

              <FieldGroup>
                <form.AppField
                  name="medicalHistory.takesMedication"
                  listeners={{
                    onChange: ({ value }) => {
                      if (!value)
                        form.setFieldValue("medicalHistory.medications", []);
                    },
                  }}
                >
                  {(f) => (
                    <f.FormCheckbox label="I take medication regularly" />
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.takesMedication}
                >
                  {(has) =>
                    has && (
                      <RepeatableRows
                        form={form}
                        name="medicalHistory.medications"
                        label="Your medications"
                        addLabel="Add medication"
                        emptyItem={{
                          name: "",
                          dose: "",
                          frequency: "",
                          purpose: "",
                        }}
                        renderRow={(i) => (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <form.AppField
                              name={`medicalHistory.medications[${i}].name`}
                            >
                              {(f) => (
                                <f.FormInput
                                  label="Medication"
                                  placeholder="Metformin"
                                />
                              )}
                            </form.AppField>
                            <form.AppField
                              name={`medicalHistory.medications[${i}].dose`}
                            >
                              {(f) => (
                                <f.FormInput
                                  label="Dose"
                                  placeholder="1000mg"
                                />
                              )}
                            </form.AppField>
                            <form.AppField
                              name={`medicalHistory.medications[${i}].frequency`}
                            >
                              {(f) => (
                                <f.FormInput
                                  label="Frequency"
                                  placeholder="Twice daily"
                                />
                              )}
                            </form.AppField>
                            <form.AppField
                              name={`medicalHistory.medications[${i}].purpose`}
                            >
                              {(f) => (
                                <f.FormInput
                                  label="What is it for? (optional)"
                                  placeholder="Type 2 diabetes"
                                />
                              )}
                            </form.AppField>
                          </div>
                        )}
                      />
                    )
                  }
                </form.Subscribe>

                {/* ── Psych meds ── */}
                <form.AppField
                  name="medicalHistory.takesPsychMeds"
                  listeners={{
                    onChange: ({ value }) => {
                      if (!value)
                        form.setFieldValue("medicalHistory.psychMeds", []);
                    },
                  }}
                >
                  {(f) => (
                    <f.FormCheckbox label="I take psychiatric medication" />
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.takesPsychMeds}
                >
                  {(has) =>
                    has && (
                      <RepeatableRows
                        form={form}
                        name="medicalHistory.psychMeds"
                        label="Psychiatric medications"
                        addLabel="Add medication"
                        emptyItem={{
                          name: "",
                          dose: "",
                          frequency: "",
                          purpose: "",
                        }}
                        renderRow={(i) => (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <form.AppField
                              name={`medicalHistory.psychMeds[${i}].name`}
                            >
                              {(f) => (
                                <f.FormInput
                                  label="Medication"
                                  placeholder="Escitalopram"
                                />
                              )}
                            </form.AppField>
                            <form.AppField
                              name={`medicalHistory.psychMeds[${i}].dose`}
                            >
                              {(f) => (
                                <f.FormInput label="Dose" placeholder="10mg" />
                              )}
                            </form.AppField>
                            <form.AppField
                              name={`medicalHistory.psychMeds[${i}].frequency`}
                            >
                              {(f) => (
                                <f.FormInput
                                  label="Frequency"
                                  placeholder="Once daily"
                                />
                              )}
                            </form.AppField>
                            <form.AppField
                              name={`medicalHistory.psychMeds[${i}].purpose`}
                            >
                              {(f) => (
                                <f.FormInput
                                  label="What is it for? (optional)"
                                  placeholder="Anxiety"
                                />
                              )}
                            </form.AppField>
                          </div>
                        )}
                      />
                    )
                  }
                </form.Subscribe>
              </FieldGroup>
            </FieldSet>

            {/* <FieldSeparator /> */}

            {/* ═══ HIV ═══ */}
            <FieldSet>
              <FieldLegend>HIV status</FieldLegend>
              <FieldDescription>
                This information is confidential and only used to plan your care
                safely.
              </FieldDescription>

              <FieldGroup>
                <form.AppField
                  name="medicalHistory.isHIVPositive"
                  listeners={{
                    onChange: ({ value }) => {
                      if (!value) {
                        form.setFieldValue("medicalHistory.hivMedications", []);
                        form.setFieldValue(
                          "medicalHistory.hivLastUndetectableViralLoad",
                          "",
                        );
                      }
                    },
                  }}
                >
                  {(f) => <f.FormCheckbox label="I am HIV positive" />}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.isHIVPositive}
                >
                  {(has) =>
                    has && (
                      <div className="space-y-4">
                        <RepeatableRows
                          form={form}
                          name="medicalHistory.hivMedications"
                          label="Your antiretroviral medication"
                          addLabel="Add medication"
                          emptyItem={{ name: "", dosage: "", frequency: "" }}
                          renderRow={(i) => (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <form.AppField
                                name={`medicalHistory.hivMedications[${i}].name`}
                              >
                                {(f) => (
                                  <f.FormInput
                                    label="Medication"
                                    placeholder="Biktarvy"
                                  />
                                )}
                              </form.AppField>
                              <form.AppField
                                name={`medicalHistory.hivMedications[${i}].dosage`}
                              >
                                {(f) => (
                                  <f.FormInput
                                    label="Dosage"
                                    placeholder="50/200/25mg"
                                  />
                                )}
                              </form.AppField>
                              <form.AppField
                                name={`medicalHistory.hivMedications[${i}].frequency`}
                              >
                                {(f) => (
                                  <f.FormInput
                                    label="Frequency"
                                    placeholder="Once daily"
                                  />
                                )}
                              </form.AppField>
                            </div>
                          )}
                        />
                        <form.AppField name="medicalHistory.hivLastUndetectableViralLoad">
                          {(f) => (
                            <f.FormInput
                              label="Last undetectable viral load (optional)"
                              type="date"
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>
              </FieldGroup>
            </FieldSet>

            {/* <FieldSeparator /> */}

            {/* ═══ SURGERIES ═══ */}
            <FieldSet>
              <FieldLegend>Previous surgeries</FieldLegend>

              <FieldGroup>
                <form.AppField
                  name="medicalHistory.hasPreviousSurgeries"
                  listeners={{
                    onChange: ({ value }) => {
                      if (!value)
                        form.setFieldValue("medicalHistory.surgeries", []);
                    },
                  }}
                >
                  {(f) => <f.FormCheckbox label="I've had surgery before" />}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.hasPreviousSurgeries}
                >
                  {(has) =>
                    has && (
                      <RepeatableRows
                        form={form}
                        name="medicalHistory.surgeries"
                        label="Your surgeries"
                        addLabel="Add surgery"
                        emptyItem={{ procedures: "", year: "", reason: "" }}
                        renderRow={(i) => (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <form.AppField
                                name={`medicalHistory.surgeries[${i}].procedures`}
                              >
                                {(f) => (
                                  <f.FormInput
                                    label="Procedure"
                                    placeholder="C-Section"
                                  />
                                )}
                              </form.AppField>
                              <form.AppField
                                name={`medicalHistory.surgeries[${i}].year`}
                              >
                                {(f) => (
                                  <f.FormInput
                                    label="Year"
                                    placeholder="2019"
                                  />
                                )}
                              </form.AppField>
                            </div>
                            <form.AppField
                              name={`medicalHistory.surgeries[${i}].reason`}
                            >
                              {(f) => (
                                <f.FormInput
                                  label="Reason (optional)"
                                  placeholder="Childbirth"
                                />
                              )}
                            </form.AppField>
                          </div>
                        )}
                      />
                    )
                  }
                </form.Subscribe>
              </FieldGroup>
            </FieldSet>

            {/* <FieldSeparator /> */}

            {/* ═══ LIFESTYLE ═══ */}
            <FieldSet>
              <FieldLegend>Lifestyle</FieldLegend>
              <FieldDescription>
                Smoking and alcohol affect healing, so please be honest — this
                stays between you and Dr. Ríos.
              </FieldDescription>

              <FieldGroup>
                {/* ── Smoking ── */}
                <form.AppField
                  name="medicalHistory.smokingStatus"
                  listeners={{
                    onChange: ({ value }) => {
                      if (value === "no") {
                        form.setFieldValue(
                          "medicalHistory.smokingAmountPerDay",
                          "",
                        );
                        form.setFieldValue("medicalHistory.smokingSince", "");
                      }
                    },
                  }}
                >
                  {(f) => (
                    <f.FormSelect
                      label="Do you smoke?"
                      placeholder="Select an option"
                    >
                      {SMOKING_STATUS.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </f.FormSelect>
                  )}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.smokingStatus}
                >
                  {(status) =>
                    status !== "no" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6">
                        <form.AppField name="medicalHistory.smokingAmountPerDay">
                          {(f) => (
                            <f.FormInput
                              label="How much per day?"
                              placeholder="Half a pack"
                            />
                          )}
                        </form.AppField>
                        <form.AppField name="medicalHistory.smokingSince">
                          {(f) => (
                            <f.FormInput
                              label={
                                status === "quit"
                                  ? "When did you quit?"
                                  : "Since when?"
                              }
                              placeholder={
                                status === "quit"
                                  ? "Quit in 2017"
                                  : "Since age 18"
                              }
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Alcohol ── */}
                <form.AppField
                  name="medicalHistory.drinksAlcohol"
                  listeners={clearOnFalse("medicalHistory.alcoholDetails")}
                >
                  {(f) => <f.FormCheckbox label="I drink alcohol" />}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.drinksAlcohol}
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.alcoholDetails">
                          {(f) => (
                            <f.FormInput
                              label="How often?"
                              placeholder="2 to 3 glasses of wine per week"
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>

                {/* ── Recreational drugs ── */}
                <form.AppField
                  name="medicalHistory.usesRecreationalDrug"
                  listeners={clearOnFalse(
                    "medicalHistory.recreationalDrugDetails",
                  )}
                >
                  {(f) => <f.FormCheckbox label="I use recreational drugs" />}
                </form.AppField>

                <form.Subscribe
                  selector={(s) => s.values.medicalHistory.usesRecreationalDrug}
                >
                  {(has) =>
                    has && (
                      <div className="pl-6">
                        <form.AppField name="medicalHistory.recreationalDrugDetails">
                          {(f) => (
                            <f.FormInput
                              label="Which ones and how often?"
                              placeholder="Marijuana, about once a week"
                            />
                          )}
                        </form.AppField>
                      </div>
                    )
                  }
                </form.Subscribe>
              </FieldGroup>
            </FieldSet>

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
