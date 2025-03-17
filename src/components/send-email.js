import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vahoberkaci@gmail.com', // Replace with your email
        pass: 'Vahoo123', // Replace with your email password or app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: 'vaxosheylashvili21@gmail.com',
      subject: `Contact form submission from ${name}`,
      text: message,
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}