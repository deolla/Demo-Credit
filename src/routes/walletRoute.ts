// this file contains the routes for the wallet controller
// the routes are /wallet, /wallet/balance, /wallet/delete

import express from 'express';
import { getWallets, getWalletBalance } from '../controllers/walletController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/wallet', authenticateToken, getWallets);
router.get('/wallet/balance?', authenticateToken, getWalletBalance); // queried by walletId
// router.delete('/wallet?', authenticateToken, deleteWallet); // queried by walletId

export default router;