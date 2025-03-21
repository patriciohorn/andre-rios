const nodemailer = require('nodemailer');
const sharp = require('sharp');

exports.handler = async (event, context) => {
  try {
    // Destructuring the incoming JSON body
    const { pdfBase64, doctorEmail, fileName } = JSON.parse(
      event.body
    );
    if (!pdfBase64 || !doctorEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }
    const pdfFileName = fileName || 'consultation.pdf';
    const base64Data = pdfBase64.replace(
      /^data:application\/pdf;base64,/,
      ''
    );
    const pdfBuffer = Buffer.from(base64Data, 'base64');

    // 1. Compress Images
    // const imageAttachments = [];
    // if (imageDataURLs && imageDataURLs.length > 0) {
    //   for (let i = 0; i < imageDataURLs.length; i++) {
    //     const imageDataURL = imageDataURLs[i];
    //     try {
    //       const buffer = Buffer.from(
    //         imageDataURL.split(',')[1],
    //         'base64'
    //       );

    //       // Compress the image using Sharp
    //       const compressedBuffer = await sharp(buffer)
    //         .resize({ width: 800, height: 600, fit: 'inside' }) // Adjust as needed
    //         .jpeg({ quality: 70 }) // Adjust quality
    //         .toBuffer();

    //       // Create attachment object
    //       imageAttachments.push({
    //         filename: `image_${i + 1}.jpg`,
    //         content: compressedBuffer,
    //         encoding: 'base64', // Important: Ensure correct encoding
    //       });
    //     } catch (imageError) {
    //       console.error('Error compressing image:', imageError);
    //       // Handle image compression error (e.g., skip the image)
    //     }
    //   }
    // }

    // 2. Nodemailer Setup
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // 3. Email Options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: doctorEmail,
      subject: 'New Patient Consultation PDF.',
      text: 'Please find attached the consultation form PDF.',
      attachments: [
        {
          filename: pdfFileName,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent succesfully' }),
    };
  } catch (error) {
    console.error('Error sending email', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error sending email',
        error: error.message,
      }),
    };
  }
};
