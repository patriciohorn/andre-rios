const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  try {
    // Destructuring the incoming JSON body
    const { pdfBase64, doctorEmail, fileName } = JSON.parse(event.body);
    if (!pdfBase64 || !doctorEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields" }),
      };
    }
    const pdfFileName = fileName || "consultation.pdf";
    const base64Data = pdfBase64.replace(/^data:application\/pdf;base64,/, "");
    const pdfBuffer = Buffer.from(base64Data, "base64");

    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.mx",
      port: 587,
      secure: false,
      auth: {
        user: process.env.IONOS_SMTP_USER,
        pass: process.env.IONOS_SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.IONOS_SMTP_USER,
      to: doctorEmail,
      subject: "New Patient Consultation PDF.",
      text: "Please find attached the consultation form PDF.",
      attachments: [
        {
          filename: pdfFileName,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent succesfully" }),
    };
  } catch (error) {
    console.error("Error sending email", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error sending email",
        error: error.message,
      }),
    };
  }
};
