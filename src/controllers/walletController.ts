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

// export const getWalletBalance = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
//     const { wallet_id } = req.params;

//     try {
//         const wallet: Wallet = await db('wallets')
//             .where('id', wallet_id)
//             .first();

//         if (!wallet) {
//             return res.status(404).json({ message: 'Wallet not found' });
//         }

//         return res.status(200).json({ balance: wallet.balance });
//     }
//     catch (error: any) {
//         console.error('Error fetching wallet balance:', error.message);
//         return res.status(500).json({ message: 'Failed to fetch wallet balance', error: error.message });
//     }
// }

export const getWalletBalance = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { id } = req.query; // Assuming 'id' is passed as a query parameter

    try {
        // Splitting id to get the actual wallet_id
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

        // Return only the balance field
        const response = { balance: wallet.balance }; // Creating an object with just the balance field

        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error fetching wallet balance:', error.message);
        return res.status(500).json({ message: 'Failed to fetch wallet balance', error: error.message });
    }
};

// User should be able to delete wallet since wallet is created automaically when user register.
// export const deleteWallet = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
//     const { id } = req.query; // Assuming 'id' is passed as a query parameter

//     try {
//         // Splitting id to get the actual wallet_id
//         const wallet_id = id?.toString().split('/')[0];

//         if (!wallet_id) {
//             return res.status(400).json({ message: 'Wallet ID is required' });
//         }

//         const deletedRows = await db<Wallet>('wallets')
//             .where('id', wallet_id)
//             .delete();

//         if (deletedRows === 0) {
//             return res.status(404).json({ message: 'Wallet not found' });
//         }

//         return res.status(200).json({ message: 'Wallet deleted successfully' });
//     } catch (err: any) {
//         console.error('Error deleting wallet:', err.message);
//         return res.status(500).json({ message: 'Failed to delete wallet', error: err.message });
//     }
// };