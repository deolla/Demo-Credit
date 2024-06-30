// this file is used to generate a random token for email verification
// it uses the crypto module to generate a random token

import crypto from 'crypto';

export function generateVerificationToken(length: number = 40): string {
    return crypto.randomBytes(length).toString('hex');
}