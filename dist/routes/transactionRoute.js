"use strict";
// this file is used to define the routes for the transaction controller
// it contains the routes for transferring funds, funding an account,
// getting transactions, deleting transactions, and withdrawing funds
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/transfer', auth_1.authenticateToken, transactionController_1.transferFunds);
router.post('/transfer/fund_to_account', auth_1.authenticateToken, transactionController_1.fundAccount);
router.get('/transfer', auth_1.authenticateToken, transactionController_1.getTransactions);
router.get('/transfer/wallet?', auth_1.authenticateToken, transactionController_1.getTransactionsFromSpecificWallet); // query parameter by specific walletid
router.delete('/transfer/delete_all', auth_1.authenticateToken, transactionController_1.deleteAllTransactions);
router.delete('/transfer/del/?', auth_1.authenticateToken, transactionController_1.deleteTransactionById);
router.post('/withdraw', auth_1.authenticateToken, transactionController_1.withdrawFunds);
exports.default = router;
