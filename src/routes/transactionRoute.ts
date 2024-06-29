import express from 'express';
import { transferFunds, fundAccount, getTransactions, getTransactionsFromSpecificWallet, deleteAllTransactions, deleteTransactionById } from '../controllers/transactionController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/transfer', authenticateToken, transferFunds);
router.post('/transfer/fund_to_account', authenticateToken, fundAccount);
router.get('/transfer', authenticateToken, getTransactions);
router.get('/transfer/wallet?', authenticateToken, getTransactionsFromSpecificWallet); // query parameter by specific walletid
router.delete('/transfer/delete_all', authenticateToken, deleteAllTransactions);
router.delete('/transfer/del/?', authenticateToken, deleteTransactionById);

export default router;