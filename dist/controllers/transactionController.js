"use strict";
// This file contains the controller functions for handling transactions
// The functions are used as the callback functions for the routes
// The functions are fundAccount, transferFunds, getTransactions, getTransactionsFromSpecificWallet,
// deleteAllTransactions, deleteTransactionById, and withdrawFunds.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawFunds = exports.deleteTransactionById = exports.deleteAllTransactions = exports.getTransactionsFromSpecificWallet = exports.getTransactions = exports.transferFunds = exports.fundAccount = void 0;
const db_1 = __importDefault(require("../database/db"));
const transaction_1 = require("../models/transaction");
const transferFund_1 = require("../models/transferFund");
const uuid_1 = require("uuid");
const fundAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { wallet_id, amount, description, transaction_type, currency } = req.body;
    try {
        // Check transaction
        yield transaction_1.schema.validate({
            id: (0, uuid_1.v4)(),
            from_walletId: null,
            to_walletId: wallet_id,
            amount,
            description,
            currency,
            transaction_type: transaction_type,
            createdAt: new Date(),
        });
        // Perform the transaction
        yield db_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
            yield trx("wallets").where("id", wallet_id).increment("balance", amount);
            // Record the transaction
            yield trx("transactions").insert({
                id: (0, uuid_1.v4)(),
                from_walletId: null,
                to_walletId: wallet_id,
                amount,
                description,
                currency,
                transaction_type: transaction_type,
                createdAt: new Date(),
            });
        }));
        return res.status(200).json({ message: "Funds added successfully" });
    }
    catch (error) {
        console.error("Error funding account:", error.message);
        return res
            .status(500)
            .json({ message: "Failed to fund account", error: error.message });
    }
});
exports.fundAccount = fundAccount;
const transferFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from_walletId, to_walletId, amount, transaction_type, description, currency, } = req.body;
    try {
        // Validate transaction data
        yield transferFund_1.transferFundsSchema.validate({
            id: (0, uuid_1.v4)(),
            from_walletId,
            to_walletId,
            amount,
            description,
            currency,
            transaction_type: transaction_type,
            createdAt: new Date(),
        });
        yield db_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
            // Decrease balance
            yield trx("wallets")
                .where("id", from_walletId)
                .decrement("balance", amount);
            // Increase balance in the receiving wallet
            yield trx("wallets")
                .where("id", to_walletId)
                .increment("balance", amount);
            // Record the transaction
            yield trx("transactions").insert({
                id: (0, uuid_1.v4)(),
                from_walletId,
                to_walletId,
                amount,
                description,
                currency,
                transaction_type: transaction_type,
                createdAt: new Date(),
            });
        }));
        return res.status(200).json({ message: "Funds transferred successfully" });
    }
    catch (error) {
        console.error("Error transferring funds:", error.message);
        return res
            .status(500)
            .json({ message: "Failed to transfer funds", error: error.message });
    }
});
exports.transferFunds = transferFunds;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield (0, db_1.default)("transactions").select();
        return res.status(200).json(transactions);
    }
    catch (error) {
        console.error("Error fetching transactions:", error.message);
        return res
            .status(500)
            .json({ message: "Failed to fetch transactions", error: error.message });
    }
});
exports.getTransactions = getTransactions;
const getTransactionsFromSpecificWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: wallet_id } = req.query;
    if (!wallet_id) {
        return res
            .status(400)
            .json({ message: "wallet_id query parameter is required" });
    }
    try {
        const transactions = yield (0, db_1.default)("transactions")
            .where("from_walletId", wallet_id)
            .orWhere("to_walletId", wallet_id)
            .select();
        return res.status(200).json(transactions);
    }
    catch (error) {
        console.error("Error fetching wallet transactions:", error.message);
        return res
            .status(500)
            .json({
            message: "Failed to fetch wallet transactions",
            error: error.message,
        });
    }
});
exports.getTransactionsFromSpecificWallet = getTransactionsFromSpecificWallet;
const deleteAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)("transactions").delete();
        return res
            .status(200)
            .json({ message: "Transactions deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting transactions:", error.message);
        return res
            .status(500)
            .json({ message: "Failed to delete transactions", error: error.message });
    }
});
exports.deleteAllTransactions = deleteAllTransactions;
const deleteTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid ID parameter' });
        }
        const deletedCount = yield (0, db_1.default)('transactions')
            .where('id', id)
            .delete();
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        return res.status(200).json({ message: 'Transaction deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting transaction:', error.message);
        return res.status(500).json({ message: 'Failed to delete transaction', error: error.message });
    }
});
exports.deleteTransactionById = deleteTransactionById;
const withdrawFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { wallet_id, amount, description, transaction_type } = req.body;
    try {
        if (!wallet_id || !amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Invalid request' });
        }
        const wallet = yield (0, db_1.default)('wallets').where('id', wallet_id).first();
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }
        if (wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        yield db_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
            yield trx('wallets').where('id', wallet_id).decrement('balance', amount);
            // Record the transaction
            yield trx('transactions').insert({
                id: (0, uuid_1.v4)(),
                from_walletId: wallet_id,
                to_walletId: null,
                amount,
                description,
                currency: wallet.currency,
                transaction_type,
                createdAt: new Date(),
            });
        }));
        return res.status(200).json({ message: 'Funds withdrawn successfully' });
    }
    catch (error) {
        console.error('Error withdrawing funds:', error.message);
        return res.status(500).json({ message: 'Failed to withdraw funds', error: error.message });
    }
});
exports.withdrawFunds = withdrawFunds;
