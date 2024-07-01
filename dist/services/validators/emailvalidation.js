"use strict";
// this file is responsible for sending emails to users
// it contains the functions for sending verification emails.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: process.env.GMAIL,
            to: options.email,
            subject: options.subject,
            text: options.message
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    }
    catch (e) {
        console.error(`Failed to send email: ${e.message}`);
        throw new Error('An error occurred sending email');
    }
});
exports.sendEmail = sendEmail;
const sendVerificationEmail = (email, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationLink = `http://127.0.0.1/verify-email?token=${verificationToken}`;
    const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: 'Verify Your Email Address',
        html: `<p>Please click <a href="${verificationLink}">here</a> to verify your email address.</p><p>If you did not request this, please ignore this email.</p>`,
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log('Verification email sent: %s', info.messageId);
    }
    catch (error) {
        console.error('Error sending verification email:', error.message);
        throw new Error('Failed to send verification email');
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
