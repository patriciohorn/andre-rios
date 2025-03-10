import { differenceInYears } from 'date-fns';
import PatientDocument from './PatientDocument';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Font,
  BlobProvider,
} from '@react-pdf/renderer';

// Font.register({
//   family: 'Roboto',
//   fonts: [
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
//     },
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
//       fontWeight: 'medium',
//     },
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-semibold-webfont.ttf',
//       fontWeight: 'semibold',
//     },
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
//       fontWeight: 'bold',
//     },
//   ],
// });

// Create styles

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
        fileName={`${formData.firstName.trim()}_${formData.lastName.trim()}.pdf`}
        // Cast the render function as any to bypass strict type checking
        children={renderDownloadLink as any}
      />
    </div>
  );
}

export default PdfCreator;
