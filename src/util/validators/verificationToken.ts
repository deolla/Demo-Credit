import crypto from 'crypto';

export function generateVerificationToken(length: number = 40): string {
    return crypto.randomBytes(length).toString('hex');
}