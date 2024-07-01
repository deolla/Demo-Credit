"use strict";
// this file will contain the logic for the wallet controller
// the controller will be responsible for handling wallet related requests
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
exports.getWalletBalance = exports.getWallets = void 0;
const db_1 = __importDefault(require("../database/db"));
// this can be use if in future implementations roles [admin, user] will be added to the user. 
const getWallets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wallets = yield (0, db_1.default)('wallets').select();
        return res.status(200).json(wallets);
    }
    catch (err) {
        console.error('Error fetching wallets:', err.message);
        return res.status(500).json({ message: 'Failed to fetch wallets', error: err.message });
    }
});
exports.getWallets = getWallets;
const getWalletBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const wallet_id = id === null || id === void 0 ? void 0 : id.toString().split('/')[0];
        if (!wallet_id) {
            return res.status(400).json({ message: 'Wallet ID is required' });
        }
        const wallet = yield (0, db_1.default)('wallets')
            .where('id', wallet_id)
            .first();
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }
        const response = { balance: wallet.balance };
        // return user wallet balance
        return res.status(200).json(response);
    }
    catch (error) {
        console.error('Error fetching wallet balance:', error.message);
        return res.status(500).json({ message: 'Failed to fetch wallet balance', error: error.message });
    }
});
exports.getWalletBalance = getWalletBalance;
