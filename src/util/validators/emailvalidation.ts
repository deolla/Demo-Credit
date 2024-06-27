import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface EmailOptions {
    email: string;
    subject: string;
    message: string;
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});

export const sendEmail = async (options: EmailOptions): Promise<void> => {
    try {
        const mailOptions = {
            from: process.env.GMAIL,
            to: options.email,
            subject: options.subject,
            text: options.message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (e) {
        console.error(`Failed to send email: ${(e as Error).message}`);
        throw new Error('An error occurred sending email');
    }
};

export const sendVerificationEmail = async (email: string, verificationToken: string): Promise<void> => {
    const verificationLink = `http://127.0.0.1/verify-email?token=${verificationToken}`;

    const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: 'Verify Your Email Address',
        html: `<p>Please click <a href="${verificationLink}">here</a> to verify your email address.</p> <p>If you did not request this, please ignore this email.</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending verification email:', (error as Error).message);
        throw new Error('Failed to send verification email');
    }
};
