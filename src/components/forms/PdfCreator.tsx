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

interface PdfCreatorProps {
  formData: Record<string, any>; // Use a more specific type if possible
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },

  sectionHeader: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
  },

  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },

  subHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
  },
});

// A mapping from your form field keys to a friendly label/question.
const fieldLabels: Record<string, string> = {
  hasIllness: 'Patient has Illness',
  illnesses: 'Illness Details',
  hasAllergies: 'Patient has Allergies',
  allergies: 'Allergy Details',
  diabetes: 'Patient has Diabetes',
  diabetesType: 'Type of Diabetes',
  hgbResult: 'Last HGB A1C Result',
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
const renderDownloadLink = ({ loading }: any) => {
  return loading ? (
    <span>Loading document...</span>
  ) : (
    <span>Download now!</span>
  );
};

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

// Create Document Component
function PatientDocument({ formData }: PdfCreatorProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={styles.section}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
            Patient Information:
          </Text>
          <Text>First Name: {formData.firstName}</Text>
          <Text>Last Name: {formData.lastName}</Text>
          <Text>Gender: {capitalize(formData.gender)}</Text>
          <Text>
            Date of birth:{' '}
            {differenceInYears(new Date(), formData.dateOfBirth)}
          </Text>
          <Text>Email: {formData.email}</Text>
          <Text>Phone: {formData.phone}</Text>
          <Text>Address: {formData.address}</Text>
          <Text>Occupation: {formData.occupation}</Text>
          <Text>
            Height: {`${formData.heightFt}' ${formData.heightIn}"`}
          </Text>
          <Text>Weight: {`${formData.weight} lbs`}</Text>
          <Text>
            Have you had weight loss surgery?:{' '}
            {formData.hadSurgery ? 'Yes' : 'No'}
          </Text>
          <Text>Reference: {capitalize(formData.reference)}</Text>
          <Text>
            Estimated surgery date:{' '}
            {`${capitalize(formData.procedureMonth)} ${formData.procedureYear}`}
          </Text>
        </View>
        <View style={styles.section}>
          <Text>General Information</Text>
          <Text>
            Desired Medical Procedure(s):{' '}
            {capitalize(formData.desiredProcedure)}
          </Text>
          <Text>
            Specific Procedure:{' '}
            {formData.desiredProcedure
              ? 'NA'
              : formData.otherProcedure}
          </Text>
          <Text>
            Treatment Area. Concerns and Desired Outcomes:{' '}
            {formData.dislikesAndDesires}
          </Text>
          <Text>
            Interested in breast surgery:{' '}
            {capitalize(formData.breastSurgery)}
          </Text>
          <Text>
            Current Cup Size: {capitalize(formData.cupSize)}
          </Text>
          <Text>
            Interested in breast implants?:{' '}
            {capitalize(formData.breastImplants)}
          </Text>
          <Text>
            Had breast augmentation before:{' '}
            {capitalize(formData.breastAugmentationBefore)}
          </Text>
          <Text>
            Has been pregnant: {capitalize(formData.hasBeenPregnant)}
          </Text>
          <Text>
            Times pregnant:{' '}
            {formData.timesPregnant === 'yes'
              ? formData.timesPregnant
              : 'NA'}
          </Text>
          <Text>
            Delivery Method:{' '}
            {formData.desiredProcedure === 'yes'
              ? formData.delivered
              : 'NA'}
          </Text>
          <Text>Birth control used: {formData.birthControl}</Text>
          <Text>
            Other birth control used:{' '}
            {formData.birthControl === 'other'
              ? formData.birthControl
              : 'NA'}
          </Text>
          <Text>
            Currently Pregnant:{' '}
            {capitalize(formData.currentlyPregnant)}
          </Text>
          <Text>
            Currently Breastfreeding:{' '}
            {capitalize(formData.breastFeeding)}
          </Text>
          <Text>
            Interested in chest Surgery:{' '}
            {formData.gender === 'male'
              ? capitalize(formData.chestSurgery)
              : 'NA'}
          </Text>
          <Text>
            Chest surgery expectation:{' '}
            {formData.gender === 'male'
              ? capitalize(capitalize(formData.chestExpectations))
              : 'NA'}
          </Text>
        </View> */}
        <View>
          <Text style={styles.sectionHeader}>Medical History</Text>
          {Object.entries(fieldLabels).map(([fieldKey, label]) => {
            // Only render if the formData has this field.
            // (Optionally, you could check if the value is non-empty.)
            if (formData[fieldKey] === undefined) return null;
            return (
              <Text key={fieldKey} style={styles.text}>
                {label}:{' '}
                {renderFieldValue(fieldKey, formData[fieldKey])}
              </Text>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}

function PdfCreator({ formData }: PdfCreatorProps) {
  return (
    <div>
      <PDFDownloadLink
        document={<PatientDocument formData={formData} />}
        fileName="patientInformation.pdf"
        // Cast the render function as any to bypass strict type checking
        children={renderDownloadLink as any}
      />
    </div>
  );
}

export default PdfCreator;
