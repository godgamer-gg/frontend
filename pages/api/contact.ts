import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ResponseData = {
    success: boolean;
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res
            .status(405)
            .json({ success: false, message: 'Method not allowed' });
    }

    try {
        // Extract form data
        const { name, email, message } = req.body;

        // Validate form data
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required',
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address',
            });
        }

        // Create a transporter
        let transporter;
        let testAccount;

        // Check if we're in development mode and no SMTP credentials provided
        if (
            process.env.NODE_ENV === 'development' &&
            (!process.env.SMTP_HOST ||
                process.env.SMTP_HOST === 'your-smtp-server.com')
        ) {
            // Create a test account using Ethereal for development
            testAccount = await nodemailer.createTestAccount();

            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });

            console.log('Using Ethereal test account for email');
        } else {
            // Use provided SMTP settings
            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
        }

        // Configure email data
        const mailOptions = {
            from: `"GodGamer Contact Form" <${
                process.env.SMTP_USER || 'noreply@godgamer.gg'
            }>`,
            to: process.env.CONTACT_EMAIL || 'godgamerggcontact@gmail.com', // Where to send the contact form submissions
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // If using Ethereal, log the preview URL
        if (testAccount) {
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Your message has been sent successfully',
        });
    } catch (error) {
        console.error('Error sending contact email:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error, please try again later',
        });
    }
}
