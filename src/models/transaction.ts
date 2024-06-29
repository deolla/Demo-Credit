import * as yup from 'yup';
const { v4: uuidv4 } = require('uuid');

export interface Transaction {
    id: string;
    from_walletId: string | null;
    to_walletId: string | null;
    amount: number;
    description?: string | null;
    currency?: string | null;
    transaction_type: 'credit' | 'debit';
    createdAt: Date;
}

export const schema: yup.Schema<Transaction> = yup.object().shape({
    id: yup.string().required('ID is required').default(() => uuidv4()),
    from_walletId: yup.string().nullable().default(null),
    to_walletId: yup.string().nullable().default(null),
    amount: yup.number().required('Amount is required').positive('Amount must be a positive number').default(0.0),
    description: yup.string().nullable().default(null),
    currency: yup.string().nullable().default('NGN'),
    transaction_type: yup.string().oneOf(['credit', 'debit']).required('Transaction Type is required').oneOf(['credit', 'debit']),
    createdAt: yup.date().default(() => new Date()).required(),
}).noUnknown();