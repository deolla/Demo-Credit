// this file contains the schema for the transfer fund model
// using yup for validation.

import * as yup from 'yup';
const { v4: uuidv4 } = require('uuid');

export const transferFundsSchema: yup.Schema<any> = yup.object().shape({
    id: yup.string().required('ID is required').default(() => uuidv4()),
    from_walletId: yup.string().required('From Wallet ID is required'),
    to_walletId: yup.string().required('To Wallet ID is required'),
    amount: yup.number().required('Amount is required').positive('Amount must be a positive number').default(0.0),
    description: yup.string().nullable().default(null),
    transaction_type: yup.string().oneOf(['credit', 'debit']).required('Transaction Type is required'),
    created_at: yup.date().default(() => new Date()).required(),
    currency: yup.string().required('Currency is required'),
}).noUnknown();
