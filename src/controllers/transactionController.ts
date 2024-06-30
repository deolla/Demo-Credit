// This file contains the controller functions for handling transactions
// The functions are used as the callback functions for the routes
// The functions are fundAccount, transferFunds, getTransactions, getTransactionsFromSpecificWallet,
// deleteAllTransactions, deleteTransactionById, and withdrawFunds.

import { Request, Response } from "express";
import db from "../database/db";
import { schema as transactionSchema } from "../models/transaction";
import { transferFundsSchema } from "../models/transferFund";
import { v4 as uuidv4 } from "uuid";

export const fundAccount = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { wallet_id, amount, description, transaction_type, currency } =
    req.body;

  try {
    // Check transaction
    await transactionSchema.validate({
      id: uuidv4(),
      from_walletId: null,
      to_walletId: wallet_id,
      amount,
      description,
      currency,
      transaction_type: transaction_type,
      createdAt: new Date(),
    });

    // Perform the transaction
    await db.transaction(async (trx) => {
      await trx("wallets").where("id", wallet_id).increment("balance", amount);

      // Record the transaction
      await trx("transactions").insert({
        id: uuidv4(),
        from_walletId: null,
        to_walletId: wallet_id,
        amount,
        description,
        currency,
        transaction_type: transaction_type,
        createdAt: new Date(),
      });
    });

    return res.status(200).json({ message: "Funds added successfully" });
  } catch (error: any) {
    console.error("Error funding account:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to fund account", error: error.message });
  }
};

export const transferFunds = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const {
    from_walletId,
    to_walletId,
    amount,
    transaction_type,
    description,
    currency,
  } = req.body;

  try {
    // Validate transaction data
    await transferFundsSchema.validate({
      id: uuidv4(),
      from_walletId,
      to_walletId,
      amount,
      description,
      currency,
      transaction_type: transaction_type,
      createdAt: new Date(),
    });

    await db.transaction(async (trx) => {
      // Decrease balance
      await trx("wallets")
        .where("id", from_walletId)
        .decrement("balance", amount);

      // Increase balance in the receiving wallet
      await trx("wallets")
        .where("id", to_walletId)
        .increment("balance", amount);

      // Record the transaction
      await trx("transactions").insert({
        id: uuidv4(),
        from_walletId,
        to_walletId,
        amount,
        description,
        currency,
        transaction_type: transaction_type,
        createdAt: new Date(),
      });
    });

    return res.status(200).json({ message: "Funds transferred successfully" });
  } catch (error: any) {
    console.error("Error transferring funds:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to transfer funds", error: error.message });
  }
};

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const transactions = await db("transactions").select();
    return res.status(200).json(transactions);
  } catch (error: any) {
    console.error("Error fetching transactions:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to fetch transactions", error: error.message });
  }
};

export const getTransactionsFromSpecificWallet = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { id: wallet_id } = req.query;

  if (!wallet_id) {
    return res
      .status(400)
      .json({ message: "wallet_id query parameter is required" });
  }

  try {
    const transactions = await db("transactions")
      .where("from_walletId", wallet_id)
      .orWhere("to_walletId", wallet_id)
      .select();

    return res.status(200).json(transactions);
  } catch (error: any) {
    console.error("Error fetching wallet transactions:", error.message);
    return res
      .status(500)
      .json({
        message: "Failed to fetch wallet transactions",
        error: error.message,
      });
  }
};

export const deleteAllTransactions = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    await db("transactions").delete();
    return res
      .status(200)
      .json({ message: "Transactions deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting transactions:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to delete transactions", error: error.message });
  }
};

export const deleteTransactionById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { id } = req.query;

    try {
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid ID parameter' });
        }
        const deletedCount = await db('transactions')
            .where('id', id)
            .delete();

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting transaction:', error.message);
        return res.status(500).json({ message: 'Failed to delete transaction', error: error.message });
    }
};

export const withdrawFunds = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { wallet_id, amount, description, transaction_type } = req.body;

    try {

        if (!wallet_id || !amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Invalid request' });
        }
 
        const wallet = await db('wallets').where('id', wallet_id).first();
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        if (wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        await db.transaction(async (trx) => {
            await trx('wallets').where('id', wallet_id).decrement('balance', amount);

            // Record the transaction
            await trx('transactions').insert({
                id: uuidv4(),
                from_walletId: wallet_id,
                to_walletId: null,
                amount,
                description,
                currency: wallet.currency,
                transaction_type,
                createdAt: new Date(),
            });
        });
        return res.status(200).json({ message: 'Funds withdrawn successfully' });
    } catch (error: any) {
        console.error('Error withdrawing funds:', error.message);
        return res.status(500).json({ message: 'Failed to withdraw funds', error: error.message });
    }
};
