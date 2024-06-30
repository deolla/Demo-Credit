// this file is used to define the routes for the transaction controller
// it contains the routes for transferring funds, funding an account,
// getting transactions, deleting transactions, and withdrawing funds

import express from 'express';
import { transferFunds, fundAccount, getTransactions, getTransactionsFromSpecificWallet, deleteAllTransactions, deleteTransactionById, withdrawFunds } from '../controllers/transactionController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/transfer', authenticateToken, transferFunds);
router.post('/transfer/fund_to_account', authenticateToken, fundAccount);
router.get('/transfer', authenticateToken, getTransactions);
router.get('/transfer/wallet?', authenticateToken, getTransactionsFromSpecificWallet); // query parameter by specific walletid
router.delete('/transfer/delete_all', authenticateToken, deleteAllTransactions);
router.delete('/transfer/del/?', authenticateToken, deleteTransactionById);
router.post('/withdraw', authenticateToken, withdrawFunds);

export default router;