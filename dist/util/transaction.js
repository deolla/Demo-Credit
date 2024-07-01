"use strict";
// this file contains the functions that will be used to fund and withdraw from the wallet
// it contains the functions fundWallet and withdrawFromWallet
// the fundWallet function will be used to fund the wallet
// the withdrawFromWallet function will be used to withdraw from the wallet
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
exports.fundWallet = fundWallet;
exports.withdrawFromWallet = withdrawFromWallet;
const db_1 = __importDefault(require("../database/db"));
function fundWallet(walletId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.default)('wallets').where('id', walletId).increment('balance', amount);
        }
        catch (err) {
            throw new Error(`Failed to fund wallet: ${err.message}`);
        }
    });
}
function withdrawFromWallet(walletId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.default)('wallets').where('id', walletId).decrement('balance', amount);
        }
        catch (err) {
            throw new Error(`Failed to withdraw from wallet: ${err.message}`);
        }
    });
}
