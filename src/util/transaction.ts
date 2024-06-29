import db from '../database/db'
import { Wallet } from '../models/wallet'

export async function fundWallet(walletId: string, amount: number): Promise<void> {
    try {
        await db<Wallet>('wallets').where('id', walletId).increment('balance', amount);
    } catch (err: any) {
        throw new Error(`Failed to fund wallet: ${err.message}`);
    }
}


export async function withdrawFromWallet(walletId: string, amount: number): Promise<void> {
    try {
        await db<Wallet>('wallets').where('id', walletId).decrement('balance', amount);
    } catch (err: any) {
        throw new Error(`Failed to withdraw from wallet: ${err.message}`);
    }
}
