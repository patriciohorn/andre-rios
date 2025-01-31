import React from 'react';
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
  },

  header: {},
});

// Create Document Component
function PacientDocument({ formData }: PdfCreatorProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Patient Information: </Text>
          <Text>First Name: {formData.firstName} </Text>
          <Text>Last Name: {formData.lastName} </Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
}

function PdfCreator({ formData }: PdfCreatorProps) {
  return (
    <div>
      <PDFDownloadLink
        document={<PacientDocument formData={formData} />}
        fileName="patientInformation.pdf">
        {({ loading }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
    </div>
  );
}

export default PdfCreator;
