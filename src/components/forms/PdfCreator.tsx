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
});

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
        <View style={styles.section}>
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
