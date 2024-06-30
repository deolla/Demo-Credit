// this file contains the function that creates a wallet for a user
// it imports the wallet schema and the database connection
// it generates a unique wallet id and sets the default currency to NGN
// it creates a wallet object and validates it using the wallet schema/database connection
// it inserts the wallet object into the database and returns the wallet object


import db from '../../database/db'
import { schema as walletSchema, Wallet } from '../../models/wallet';
import { v4 as uuidv4 } from 'uuid';

export const createWallet = async (userId: string): Promise<Wallet> => {
    const walletId = uuidv4();
    const defaultCurrency = 'NGN';

    const wallet: Wallet = {
        id: walletId,
        userId: userId,
        currency: defaultCurrency,
        balance: 0.01,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    
    await walletSchema.validate(wallet, { abortEarly: false });
    await db('wallets').insert(wallet);

    return wallet;
};