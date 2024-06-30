// this file contains information about the wallet model and the schema for validating wallet data using yup

import * as yup from 'yup';
const { v4: uuidv4 } = require('uuid');

export interface Wallet {
    id: string;
    userId: string;
    currency: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}

export const schema: yup.Schema<Wallet> = yup.object().shape({
    id: yup.string().required('ID is required').default(() => uuidv4()),
    userId: yup.string().required('User ID is required'),
    currency: yup.string().required('Currency is required').default('NGN'),
    balance: yup.number().required('Balance is required').positive('Balance must be a positive number').default(0.0),
    createdAt: yup.date().default(() => new Date()).required(),
    updatedAt: yup.date().default(() => new Date()).required(),
}).noUnknown();