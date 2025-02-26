import { differenceInYears, format } from "date-fns";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  BlobProvider,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    // fontFamily: 'Roboto',
    fontSize: 11,
    color: "#0A0A0A",
  },
  header: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
  },

  section: {
    marginBottom: 0,
  },

  title: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
    border: "1px solid #E5E5E5",
  },

  label: {
    fontSize: 11,
    fontWidth: "medium",
    width: 200,
    marginRight: 10,
    paddingVertical: 5,
    paddingLeft: 10,
  },

  input: {
    color: "#292524",
    flex: 1,
    fontSize: 10,
    borderLeft: "1px solid #E5E5E5",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  fieldRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRight: "1px solid #E5E5E5",
    borderLeft: "1px solid #E5E5E5",
    borderBottom: "1px solid #E5E5E5",
  },

  imageGrid: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  imagesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
    flexWrap: "wrap",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    objectFit: "cover",
    maxWidth: 250,
  },

  bulletItems: {
    flexDirection: "column",
    gap: 4,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  date: {
    textAlign: "right",
  },

  inputContainer: {
    color: "#292524",
    flex: 1,
    fontSize: 10,
    borderLeft: "1px solid #E5E5E5",
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: "column",
  },
});

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function toDate(value: any): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

interface PdfCreatorProps {
  formData: Record<string, any>; // Use a more specific type if possible
}

// Create Document Component
function PatientDocument({ formData }: PdfCreatorProps) {
  const dob = format(formData.dateOfBirth, "dd/MMM/yyyy");
  const age = dob ? differenceInYears(new Date(), dob) : "NA";
  const creationDate = new Date();
  const formattedDate = format(creationDate, "dd/MMM/yyyy");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Virtual Consultation Form</Text>
          <Text style={styles.date}>Date: {formattedDate}</Text>
        </View>
        {/* ////// Personal Information //////*/}
        <View style={styles.section}>
          <Text style={styles.title}>Patient Information</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Name</Text>
            <Text
              style={styles.input}
            >{`${formData.firstName.trim()} ${formData.lastName.trim()}`}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Date of birth</Text>
            <Text style={styles.input}>{dob}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.input}>
              {differenceInYears(new Date(), formData.dateOfBirth)}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.input}>{capitalize(formData.gender)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.input}>{formData.email}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.input}>{formData.phone}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.input}>{formData.address}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Occupation</Text>
            <Text style={styles.input}>{capitalize(formData.occupation)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Height</Text>
            <Text style={styles.input}>
              {formData.heightFt || formData.heightIn
                ? `${formData.heightFt}ft ${formData.heightIn}in`
                : "NA"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Weight</Text>
            <Text style={styles.input}>{`${formData.weight} lbs`}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Weight loss surgery history</Text>
            <Text style={styles.input}>
              {formData.hadSurgery ? "Yes" : "No"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Reference</Text>
            <Text style={styles.input}>{capitalize(formData.reference)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Estimated surgery date</Text>
            <Text style={styles.input}>
              {`${capitalize(formData.procedureMonth)} ${
                formData.procedureYear
              }`}
            </Text>
          </View>
        </View>

        {/* ////// General Information //////*/}
        <View style={styles.section}>
          <Text style={styles.title}>General Information</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Desired procedure</Text>
            <Text style={styles.input}>
              {formData.desiredProcedure &&
              formData.desiredProcedure.toLowerCase() === "other"
                ? formData.otherProcedure
                : capitalize(formData.desiredProcedure)}
            </Text>
          </View>

          {formData.desiredProcedure.toLowerCase() === "other" && (
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Specific procedure</Text>
              <Text style={styles.input}>{formData.otherProcedure}</Text>
            </View>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>
              Treatment area: Concerns and desired outcomes
            </Text>
            <Text style={styles.input}>
              {capitalize(formData.dislikesAndDesires)}
            </Text>
          </View>

          {formData.gender === "female" && (
            <>
              <View style={styles.fieldRow}>
                <Text style={styles.label}>Breast surgery interest</Text>
                <Text style={styles.input}>
                  {capitalize(formData.breastSurgery)}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Current cup size</Text>
                <Text style={styles.input}>{capitalize(formData.cupSize)}</Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Breast implant interest</Text>
                <Text style={styles.input}>
                  {capitalize(formData.breastImplants)}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Prior breast augmentation</Text>
                <Text style={styles.input}>
                  {capitalize(formData.breastAugmentationBefore)}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Has been pregnant</Text>
                <Text style={styles.input}>
                  {capitalize(formData.hasBeenPregnant)}
                </Text>
              </View>

              {formData.hasBeenPregnant === "yes" && (
                <>
                  <View style={styles.fieldRow}>
                    <Text style={styles.label}>Times pregnant</Text>
                    <Text style={styles.input}>{formData.timesPregnant}</Text>
                  </View>

                  <View style={styles.fieldRow}>
                    <Text style={styles.label}>Delivery method</Text>
                    <Text style={styles.input}>{formData.delivered}</Text>
                  </View>
                </>
              )}

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Birth control used</Text>
                <Text style={styles.input}>{formData.birthControl}</Text>
              </View>

              {formData.birthControl.toLowerCase() === "other" && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Other birth control used</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.otherBirthControl)}
                  </Text>
                </View>
              )}

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Currently pregnant</Text>
                <Text style={styles.input}>
                  {capitalize(formData.currentlyPregnant)}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Currently breastfreeding</Text>
                <Text style={styles.input}>
                  {capitalize(formData.breastFeeding)}
                </Text>
              </View>
            </>
          )}

          {formData.gender === "male" && (
            <>
              <View style={styles.fieldRow}>
                <Text style={styles.label}>Chest surgery interest</Text>
                <Text style={styles.input}>
                  {capitalize(formData.chestSurgery)}
                </Text>
              </View>

              {formData.chestSurgery === "yes" && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Chest surgery expectations</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.chestExpectation)}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>

        {/* ////// Medical History //////*/}

        <View style={styles.section}>
          <Text style={styles.title}>Medical History</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Illness history</Text>
            <Text style={styles.input}>{capitalize(formData.hasIllness)}</Text>
          </View>

          {formData.hasIllness === "yes" && formData.illnesses.length > 0 && (
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Illness details</Text>
              <View style={styles.inputContainer}>
                {formData.illnesses.map(
                  (
                    { condition, yearDiagnosed, description }: any,
                    index: number
                  ) => (
                    <View key={`illness-${index}`} style={styles.bulletItems}>
                      <Text>• Condition: {capitalize(condition)}</Text>
                      <Text>• Year Diagnosed: {capitalize(yearDiagnosed)}</Text>
                      <Text>• Description: {capitalize(description)}</Text>
                    </View>
                  )
                )}
              </View>
            </View>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Allergies history</Text>
            <Text style={styles.input}>
              {capitalize(formData.hasAllergies)}
            </Text>
          </View>

          {formData.hasAllergies === "yes" && formData.allergies.length > 0 && (
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Allergies details</Text>
              <View style={styles.inputContainer}>
                {formData.allergies.map(
                  ({ allergicTo, reaction }: any, index: number) => (
                    <View key={`allergies-${index}`} style={styles.bulletItems}>
                      <Text>• Allergic to: {capitalize(allergicTo)}</Text>
                      <Text>• Reaction: {capitalize(reaction)}</Text>
                    </View>
                  )
                )}
              </View>
            </View>
          )}
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Diabetes history</Text>
            <Text style={styles.input}>{capitalize(formData.diabetes)}</Text>
          </View>
          {formData.diabetes === "yes" && (
            <>
              <View style={styles.fieldRow}>
                <Text style={styles.label}>Diabetes type</Text>
                <Text style={styles.input}>
                  {capitalize(formData.diabetesType)}
                </Text>
              </View>
              <View style={styles.fieldRow}>
                <Text style={styles.label}>Last HGB A1C result</Text>
                <Text style={styles.input}>
                  {capitalize(formData.hgbResult)}
                </Text>
              </View>
            </>
          )}
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Heart condition history</Text>
            <Text style={styles.input}>
              {capitalize(formData.heartCondition)}
            </Text>
          </View>
          {formData.heartCondition === "yes" && (
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Heart condition details</Text>
              <Text style={styles.input}>
                {capitalize(formData.heartConditionDetails)}
              </Text>
            </View>
          )}
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Heart Symptoms history</Text>
            <Text style={styles.input}>
              {capitalize(formData.heartSymptoms)}
            </Text>
          </View>
          {formData.heartSymptoms === "yes" && (
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Heart symptoms details</Text>
              <Text style={styles.input}>
                {capitalize(formData.heartSymptomsDetails)}
              </Text>
            </View>
          )}
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Thyroid Condition history</Text>
            <Text style={styles.input}>
              {capitalize(formData.hasThyroidCondition)}
            </Text>
          </View>
          {formData.hasThyroidCondition === "yes" && (
            <>
              <View style={styles.fieldRow}>
                <Text style={styles.label}>Thyroid condition type</Text>
                <Text style={styles.input}>
                  {formData.thyroidConditionType}
                </Text>
              </View>
              {formData.thyroidYearDiagnosis && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Thyroid diagnosis year</Text>
                  <Text style={styles.input}>
                    {formData.thyroidYearDiagnosis}
                  </Text>
                </View>
              )}
              {formData.otherThyroidCondition && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>
                    Other thyroid condition details
                  </Text>
                  <Text style={styles.input}>
                    {capitalize(formData.otherThyroidCondition)}
                  </Text>
                </View>
              )}

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Thyroid condition controlled</Text>
                <Text style={styles.input}>
                  {capitalize(formData.isThyroidControlled)}
                </Text>
              </View>
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>
              Deep Vein Thrombosis/Blood Clots history
            </Text>
            <Text style={styles.input}>{capitalize(formData.deepVein)}</Text>
          </View>

          {formData.deepVein === "yes" && (
            <>
              {formData.deepVeinDetails && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>DVT/PE history details</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.deepVeinDetails)}
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>High blood pressure</Text>
            <Text style={styles.input}>
              {capitalize(formData.highBloodPresure)}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>High cholesterol</Text>
            <Text style={styles.input}>{capitalize(formData.cholesterol)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Kidney/Urinary disorder</Text>
            <Text style={styles.input}>
              {capitalize(formData.kidenyOrUrinary)}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Asthma</Text>
            <Text style={styles.input}>{capitalize(formData.asthma)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Orthopedic problems</Text>
            <Text style={styles.input}>{capitalize(formData.orthopedic)}</Text>
          </View>

          {formData.orthopedic === "yes" && (
            <>
              {formData.orthopedicDetails && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Orthopedic details</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.orthopedicDetails)}
                  </Text>
                </View>
              )}
            </>
          )}
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Breathing/Respiratory problems</Text>
            <Text style={styles.input}>
              {capitalize(formData.breathingProblems)}
            </Text>
          </View>

          {formData.breathingProblems === "yes" && (
            <>
              {formData.breathingProblemsDetails && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Breathing problem details</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.breathingProblemsDetails)}
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>
              Mental condition, psychiatric or chronic pain
            </Text>
            <Text style={styles.input}>
              {capitalize(formData.mentalCondition)}
            </Text>
          </View>

          {formData.mentalCondition === "yes" && (
            <>
              {formData.otherMentalCondition && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>
                    Other mental condition details
                  </Text>
                  <Text style={styles.input}>
                    {capitalize(formData.otherMentalCondition)}
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>
              Suffers from Reflux/Heartburn/Gastritis
            </Text>
            <Text style={styles.input}>{capitalize(formData.reflux)}</Text>
          </View>

          {formData.reflux === "yes" && (
            <>
              {formData.refluxDetails && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Reflux details</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.refluxDetails)}
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Liver Disease</Text>
            <Text style={styles.input}>
              {capitalize(formData.liverDisease)}
            </Text>
          </View>

          {formData.liverDisease === "yes" && (
            <>
              {formData.liverDiseaseDetails && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Liver disease details</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.liverDiseaseDetails)}
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Anemia/Bleeding disorder</Text>
            <Text style={styles.input}>
              {capitalize(formData.anemiaOrBleeding)}
            </Text>
          </View>

          {formData.anemiaOrBleeding === "yes" && (
            <>
              {formData.anemiaOrBleedingDetails && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Anemia/Bleeding details</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.anemiaOrBleedingDetails)}
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Leg Swelling/Varicose veins</Text>
            <Text style={styles.input}>
              {capitalize(formData.swellingOrVaricose)}
            </Text>
          </View>

          {formData.swellingOrVaricose === "yes" && (
            <>
              {formData.swellingOrVaricoseDetails && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>
                    Leg Swelling/Varicose veins details
                  </Text>
                  <Text style={styles.input}>
                    {capitalize(formData.swellingOrVaricoseDetails)}
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Infectious Disease</Text>
            <Text style={styles.input}>
              {capitalize(formData.infectiousDisease)}
            </Text>
          </View>

          {formData.infectiousDisease === "yes" && (
            <>
              {formData.infectiousDiseaseDetails && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Infectious disease details</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.infectiousDiseaseDetails)}
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>HIV Positive</Text>
            <Text style={styles.input}>{capitalize(formData.hivPositive)}</Text>
          </View>

          {formData.hivPositive === "yes" && (
            <>
              {formData.hivMedications.length > 0 && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>HIV medications</Text>
                  <View style={styles.inputContainer}>
                    {formData.hivMedications.map(
                      (
                        { medicationName, dosage, frequency }: any,
                        index: number
                      ) => (
                        <View
                          key={`hivMedication-${index}`}
                          style={styles.bulletItems}
                        >
                          <Text>
                            • Medication Name: {capitalize(medicationName)}
                          </Text>
                          <Text>• Dosage: {capitalize(dosage)}</Text>
                          <Text>• Frequency: {capitalize(frequency)}</Text>
                        </View>
                      )
                    )}
                  </View>
                </View>
              )}

              {formData.lastViralLoadDate && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>
                    HIV last undetectable viral load date
                  </Text>
                  <Text style={styles.input}>
                    {format(formData.lastViralLoadDate, "dd/MMM/yy")}
                  </Text>
                </View>
              )}
            </>
          )}
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Drinks alcohol</Text>
            <Text style={styles.input}>
              {capitalize(formData.drinkAlcohol)}
            </Text>
          </View>

          {formData.drinkAlcohol === "yes" && (
            <>
              {formData.alcoholFrequency && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>
                    Alcohol consumption frequency
                  </Text>
                  <Text style={styles.input}>
                    {capitalize(formData.alcoholFrequency)}
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Smoked or vaped</Text>
            <Text style={styles.input}>
              {capitalize(formData.smokedOrVape)}
            </Text>
          </View>

          {formData.smokedOrVape === "yes" && (
            <>
              {formData.currentSmokingAmount && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Current smoking amount</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.currentSmokingAmount)}
                  </Text>
                </View>
              )}
              {formData.currentSmokingSince && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Current smoking since</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.currentSmokingSince)}
                  </Text>
                </View>
              )}
            </>
          )}

          {formData.smokedOrVape === "quit" && (
            <>
              {formData.pastSmokingAmount && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Past smoking amount</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.pastSmokingAmount)}
                  </Text>
                </View>
              )}
              {formData.pastSmokingSince && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Past smoking since</Text>
                  <Text style={styles.input}>
                    {capitalize(formData.pastSmokingSince)}
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Patient uses recreational drugs</Text>
            <Text style={styles.input}>
              {capitalize(formData.recreationalDrugUse)}
            </Text>
          </View>

          {formData.recreationalDrugUse === "yes" && (
            <>
              {formData.drugUseDetails && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>
                    Recreational drug use details
                  </Text>
                  <Text style={styles.input}>
                    {capitalize(formData.drugUseDetails)}
                  </Text>
                </View>
              )}
            </>
          )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Currently medicated</Text>
            <Text style={styles.input}>
              {capitalize(formData.currentMedication)}
            </Text>
          </View>

          {formData.currentMedication === "yes" && (
            <>
              {formData.medications.length > 0 && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Current medications</Text>
                  <View style={styles.inputContainer}>
                    {formData.medications.map(
                      (
                        { medicationName, dosage, frequency, purpose }: any,
                        index: number
                      ) => (
                        <View
                          key={`medications-${index}`}
                          style={styles.bulletItems}
                        >
                          <Text>
                            • Medication Name: {capitalize(medicationName)}
                          </Text>
                          <Text>• Dosage: {capitalize(dosage)}</Text>
                          <Text>• Frequency: {capitalize(frequency)}</Text>
                          <Text>• Purpose: {capitalize(purpose)}</Text>
                        </View>
                      )
                    )}
                  </View>
                </View>
              )}
            </>
          )}
          <View style={styles.fieldRow}>
            <Text style={styles.label}>
              Takes antidepressants, anxiety or sleeping pills
            </Text>
            <Text style={styles.input}>
              {capitalize(formData.antidepressants)}
            </Text>
          </View>

          {formData.antidepressants === "yes" &&
            formData.mentalHealthMedications.length > 0 && (
              <View style={styles.fieldRow}>
                <Text style={styles.label}>
                  Current mental health medications
                </Text>
                <View style={styles.inputContainer}>
                  {formData.mentalHealthMedications.map(
                    (
                      { medicationName, dosage, frequency, purpose }: any,
                      index: number
                    ) => (
                      <View
                        key={`mentalHealthMedication-${index}`}
                        style={styles.bulletItems}
                      >
                        <Text>
                          • Medication Name: {capitalize(medicationName)}
                        </Text>
                        <Text>• Dosage: {capitalize(dosage)}</Text>
                        <Text>• Frequency: {capitalize(frequency)}</Text>
                        <Text>• Purpose: {capitalize(purpose)}</Text>
                      </View>
                    )
                  )}
                </View>
              </View>
            )}

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Previous surgeries</Text>
            <Text style={styles.input}>
              {capitalize(formData.previousSurgeries)}
            </Text>
          </View>

          {formData.previousSurgeries === "yes" && (
            <>
              {formData.surgeries.length > 0 && (
                <View style={styles.fieldRow}>
                  <Text style={styles.label}>Surgery details</Text>
                  <View style={styles.inputContainer}>
                    {formData.surgeries.map(
                      (
                        { surgeryName, surgeryYear, surgeryReason }: any,
                        index: number
                      ) => (
                        <View
                          key={`surgeryDetails-${index}`}
                          style={styles.bulletItems}
                        >
                          <Text>• Surgery Name: {capitalize(surgeryName)}</Text>
                          <Text>• Surgery Year: {capitalize(surgeryYear)}</Text>
                          <Text>
                            • Surgery Reason: {capitalize(surgeryReason)}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                </View>
              )}
            </>
          )}
        </View>
        {/* ////// Images Upload //////*/}
        <View style={styles.section} break>
          <Text style={styles.title}>Patient Photos</Text>
          <View style={styles.imageGrid}>
            <View style={styles.imagesRow}>
              {formData.frontPhotoDataUrl && (
                <Image
                  style={styles.image}
                  src={formData.frontPhotoDataUrl}
                ></Image>
              )}
              {formData.backPhotoDataUrl && (
                <Image
                  style={styles.image}
                  src={formData.backPhotoDataUrl}
                ></Image>
              )}
            </View>

            <View style={styles.imagesRow} break>
              {formData.leftPhotoDataUrl && (
                <Image
                  style={styles.image}
                  src={formData.leftPhotoDataUrl}
                ></Image>
              )}
              {formData.rightPhotoDataUrl && (
                <Image
                  style={styles.image}
                  src={formData.rightPhotoDataUrl}
                ></Image>
              )}

              {formData.additionalPhotos &&
                formData.additionalPhotos.length > 0 && (
                  <View style={styles.imagesRow} break>
                    {formData.additionalPhotos.map(
                      (photo: string, index: number) => (
                        <Image
                          key={`additional-${index}`}
                          style={styles.image}
                          src={photo}
                        />
                      )
                    )}
                  </View>
                )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PatientDocument;
