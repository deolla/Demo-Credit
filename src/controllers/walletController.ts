// this file will contain the logic for the wallet controller
// the controller will be responsible for handling wallet related requests

import db from '../database/db'
import {schema as schemaWallet, Wallet } from '../models/wallet'
import { Request, Response } from 'express';

// this can be use if in future implementations roles [admin, user] will be added to the user. 
export const getWallets = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
        const wallets = await db<Wallet>('wallets').select();
        return res.status(200).json(wallets);
    } catch (err: any) {
        console.error('Error fetching wallets:', err.message);
        return res.status(500).json({ message: 'Failed to fetch wallets', error: err.message });
    }
};

export const getWalletBalance = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { id } = req.query;

    try{
        const wallet_id = id?.toString().split('/')[0];

        if (!wallet_id) {
            return res.status(400).json({ message: 'Wallet ID is required' });
        }
        const wallet: Wallet | undefined = await db<Wallet>('wallets')
            .where('id', wallet_id)
            .first();

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }
        const response = { balance: wallet.balance };
        // return user
        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error fetching wallet balance:', error.message);
        return res.status(500).json({ message: 'Failed to fetch wallet balance', error: error.message });
    }
};