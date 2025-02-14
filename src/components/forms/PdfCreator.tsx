import { differenceInYears } from 'date-fns';

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
      {/* <BlobProvider
        document={<PatientDocument formData={formData} />}>
        {({ blob, url, loading, error }) => {
          if (loading) return <span>Loading document...</span>;
          if (error) return <span>Error generating document</span>;

          const sendPdfViaWeb3Forms = async () => {
            if (!blob) {
              console.error('PDF Blob is null');
              return;
            }

            const pdfFile = new File([blob], 'consultation.pdf', {
              type: 'application/pdf',
            });

            const data = new FormData();
            data.append(
              'access_key',
              'a70c68f0-6956-4c18-8559-d54f9a8fb017'
            ); // replace with your key
            data.append('doctorEmail', 'patriciohorn4@gmail.com'); // or dynamically set it
            data.append('attachment', pdfFile);

            try {
              const response = await fetch(
                'https://api.web3forms.com/submit',
                {
                  method: 'POST',
                  body: data,
                }
              );
              const result = await response.json();
              console.log('Email sent successfully:', result);
            } catch (err) {
              console.error('Error sending email:', err);
            }
          };
          return (
            <button onClick={sendPdfViaWeb3Forms}>
              Send PDF to Doctor via Web3Forms
            </button>
          );
        }}
      </BlobProvider> */}
      {/* <PDFDownloadLink
        document={<PatientDocument formData={formData} />}
        fileName={`${formData.firstName.trim()}_${formData.lastName.trim()}.pdf`}
        // Cast the render function as any to bypass strict type checking
        children={renderDownloadLink as any}
      /> */}
    </div>
  );
}

// export default PdfCreator;
