import React from 'react';
import { differenceInYears } from 'date-fns';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    // lineHeight: 1.5,
    backgroundColor: '#E4E4E4',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#D1D5DC',
  },

  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  input: {
    // no styles yet
  },

  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRight: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

const fieldLabels: Record<string, string> = {
  hasIllness: 'Patient has Illness',
  illnesses: 'Illness Details',
  hasAllergies: 'Patient has allergies',
  allergies: 'Allergy details',
  diabetes: 'Patient has diabetes',
  diabetesType: 'Type of diabetes',
  hgbResult: 'Last HGB A1C result',
  heartCondition: 'Patient has a Heart Condition',
  heartConditionDetails: 'Heart Condition Details',
  heartSymptoms: 'Patient has Heart Symptoms',
  heartSymptomsDetails: 'Heart Symptoms Details',
  hasThyroidCondition: 'Patient has a Thyroid Condition',
  thyroidConditionType: 'Thyroid Condition Type',
  thyroidYearDiagnosis: 'Year of Thyroid Diagnosis',
  otherThyroidCondition: 'Other Thyroid Condition Details',
  isThyroidControlled: 'Is Thyroid Condition Controlled',
  deepVein: 'History of Deep Vein Thrombosis/Blood Clots',
  deepVeinDetails: 'Deep Vein History Details',
  highBloodPresure: 'Patient has High Blood Pressure',
  cholesterol: 'Patient has High Cholesterol',
  kidenyOrUrinary: 'Patient has a Kidney/Urinary Disorder',
  asthma: 'Patient has Asthma',
  orthopedic: 'Patient has Orthopedic Problems',
  orthopedicDetails: 'Orthopedic Details',
  breathingProblems: 'Patient has Breathing/Respiratory Problems',
  breathingProblemsDetails: 'Breathing Problem Details',
  mentalCondition: 'Mental Condition',
  otherMentalCondition: 'Other Mental Condition Details',
  reflux: 'Patient suffers from Reflux/Heartburn/Gastritis',
  refluxDetails: 'Reflux Details',
  liverDisease: 'Patient has a Liver Disease',
  liverDiseaseDetails: 'Liver Disease Details',
  anemiaOrBleeding: 'Patient has Anemia/Bleeding Disorder',
  anemiaOrBleedingDetails: 'Anemia/Bleeding Details',
  swellingOrVaricose: 'Patient has Leg Swelling/Varicose Veins',
  swellingOrVaricoseDetails: 'Leg Swelling/Varicose Veins Details',
  infectiousDisease: 'Patient has an Infectious Disease',
  infectiousDiseaseDetails: 'Infectious Disease Details',
  hivPositive: 'Patient is HIV Positive',
  hivMedications: 'HIV Medications',
  lastViralLoadDate: 'Last Undetectable Viral Load Date',
  drinkAlcohol: 'Patient Drinks Alcohol',
  alcoholFrequency: 'Alcohol Consumption Frequency',
  smokedOrVape: 'Patient has Smoked or Vaped',
  currentSmokingAmount: 'Current Smoking Amount',
  currentSmokingSince: 'Current Smoking Since',
  pastSmokingAmount: 'Past Smoking Amount',
  pastSmokingSince: 'Past Smoking Since',
  recreationalDrugUse: 'Patient uses Recreational Drugs',
  drugUseDetails: 'Recreational Drug Use Details',
  currentMedication: 'Patient is on Medication',
  medications: 'Current Medications',
  antidepressants:
    'Patient takes Antidepressants/Anxiety/Sleeping Pills',
  previousSurgeries: 'Patient has had Previous Surgeries',
  surgeries: 'Surgery Details',
};

// Helper function to render field values. If the value is an array,
// it maps over the array and returns a formatted string for each entry.
const renderFieldValue = (key: string, value: any) => {
  if (Array.isArray(value)) {
    return value
      .map((item, idx) => {
        if (typeof item === 'object' && item !== null) {
          // For objects (like an illness record), we join its key-value pairs.
          const itemText = Object.entries(item)
            .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
            .join(', ');
          return `${itemText}${idx < value.length - 1 ? '\n' : ''}`;
        }
        return `${item}${idx < value.length - 1 ? ', ' : ''}`;
      })
      .join('');
  } else if (value instanceof Date) {
    return value.toLocaleDateString();
  } else if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  return value?.toString() || '';
};

interface PdfCreatorProps {
  formData: Record<string, any>;
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function toDate(value: any): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

// Create Document Component
function PatientDocument({ formData }: PdfCreatorProps) {
  const dob = toDate(formData.dateOfBirth);
  const age = dob ? differenceInYears(new Date(), dob) : 'NA';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Consultation Form</Text>

        <View style={styles.section}>
          <Text style={styles.title}>Patient Information</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Name:</Text>
            <Text
              style={
                styles.input
              }>{`${formData.firstName} ${formData.lastName}`}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.input}>
              {dob ? dob.toLocaleDateString() : 'NA'}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.input}>
              {differenceInYears(new Date(), formData.dateOfBirth)}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.input}>
              {capitalize(formData.gender)}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.input}>{formData.email}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.input}>{formData.phone}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.input}>{formData.address}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Occupation:</Text>
            <Text style={styles.input}>{formData.occupation}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Height:</Text>
            <Text style={styles.input}>
              {formData.heightFt || formData.heightIn
                ? `${formData.heightFt}ft ${formData.heightIn}in`
                : 'NA'}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Weight:</Text>
            <Text
              style={styles.input}>{`${formData.weight} lbs`}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>
              Have you had weight loss surgery?:
            </Text>
            <Text style={styles.input}>
              {formData.hadSurgery ? 'Yes' : 'No'}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Reference:</Text>
            <Text style={styles.input}>
              {capitalize(formData.reference)}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Estimated surgery date:</Text>
            <Text style={styles.input}>
              {`${capitalize(formData.procedureMonth)} ${formData.procedureYear}`}
            </Text>
          </View>
        </View>

        {/* ////// General Information //////*/}
        <View style={styles.section}>
          <Text style={styles.title}>General Information</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Desired Procedure:</Text>
            <Text style={styles.input}>
              {formData.desiredProcedure &&
              formData.desiredProcedure.toLowerCase() === 'other'
                ? formData.otherProcedure
                : capitalize(formData.desiredProcedure)}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Specific Procedure:</Text>
            <Text style={styles.input}>
              {formData.desiredProcedure
                ? 'NA'
                : formData.otherProcedure}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>
              Treatment Area. Concerns and Desired Outcomes:
            </Text>
            <Text style={styles.input}>
              {formData.dislikesAndDesires}
            </Text>
          </View>

          {formData.gender === 'female' && (
            <>
              <View style={styles.fieldRow}>
                <Text style={styles.label}>
                  Interested in breast surgery:
                </Text>
                <Text style={styles.input}>
                  {capitalize(formData.breastSurgery)}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Current Cup Size:</Text>
                <Text style={styles.input}>
                  {capitalize(formData.cupSize)}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>
                  Interested in breast implants?:
                </Text>
                <Text style={styles.input}>
                  {capitalize(formData.breastImplants)}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>
                  Had breast augmentation before:
                </Text>
                <Text style={styles.input}>
                  {capitalize(formData.breastAugmentationBefore)}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Has been pregnant:</Text>
                <Text style={styles.input}>
                  {capitalize(formData.hasBeenPregnant)}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Times pregnant:</Text>
                <Text style={styles.input}>
                  {' '}
                  {formData.timesPregnant === 'yes'
                    ? formData.timesPregnant
                    : 'NA'}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Delivery Method:</Text>
                <Text style={styles.input}>
                  {' '}
                  {formData.desiredProcedure === 'yes'
                    ? formData.delivered
                    : 'NA'}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Birth control used:</Text>
                <Text style={styles.input}>
                  {formData.birthControl}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>
                  Other birth control used:
                </Text>
                <Text style={styles.input}>
                  {formData.otherBirthControl === 'other'
                    ? formData.otherBirthControl
                    : 'NA'}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>Currently Pregnant:</Text>
                <Text style={styles.input}>
                  {capitalize(formData.currentlyPregnant)}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>
                  Currently Breastfreeding:
                </Text>
                <Text style={styles.input}>
                  {formData.breastFeeding}
                </Text>
              </View>
            </>
          )}

          {formData.gender === 'male' && (
            <>
              <View style={styles.fieldRow}>
                <Text style={styles.label}>
                  Interested in chest Surgery:
                </Text>
                <Text style={styles.input}>
                  {capitalize(formData.chestSurgery)}
                </Text>
              </View>

              <View style={styles.fieldRow}>
                <Text style={styles.label}>
                  Chest surgery expectation:
                </Text>
                <Text style={styles.input}>
                  {formData.chestExpectations
                    ? capitalize(formData.chestExpectations)
                    : 'NA'}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* ////// Medical History //////*/}
        <View style={styles.section}>
          <Text style={styles.title}>Medical History</Text>

          {Object.entries(fieldLabels).map(([fieldKey, label]) => {
            // Only render if the formData has this field.
            // (Optionally, you could check if the value is non-empty.)
            if (formData[fieldKey] === undefined) return null;
            return (
              <View style={styles.fieldRow}>
                <Text key={fieldKey} style={styles.label}>
                  {label}:
                </Text>
                <Text key={fieldKey} style={styles.input}>
                  {renderFieldValue(fieldKey, formData[fieldKey]) ||
                    'NA'}
                </Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}

// ----------------
// Download Link Component
// ----------------

const renderDownloadLink = ({ loading }: any) => {
  return loading ? (
    <span>Loading document...</span>
  ) : (
    <span>Download now!</span>
  );
};

interface PdfCreatorProps {
  formData: Record<string, any>; // Use a more specific type if possible
}

function PdfCreator({ formData }: PdfCreatorProps) {
  return (
    <div>
      <PDFDownloadLink
        document={<PatientDocument formData={formData} />}
        fileName={`${formData.name}_${formData.lastName}.pdf`}
        // Cast the render function as any to bypass strict type checking
        children={renderDownloadLink as any}
      />
    </div>
  );
}

export default PdfCreator;
