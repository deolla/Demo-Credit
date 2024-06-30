// this file contains the functions that will be used to fund and withdraw from the wallet
// it contains the functions fundWallet and withdrawFromWallet
// the fundWallet function will be used to fund the wallet
// the withdrawFromWallet function will be used to withdraw from the wallet

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
