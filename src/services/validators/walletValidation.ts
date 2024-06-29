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