"use strict";
// this file contains the function that creates a wallet for a user
// it imports the wallet schema and the database connection
// it generates a unique wallet id and sets the default currency to NGN
// it creates a wallet object and validates it using the wallet schema/database connection
// it inserts the wallet object into the database and returns the wallet object
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
exports.createWallet = void 0;
const db_1 = __importDefault(require("../../database/db"));
const wallet_1 = require("../../models/wallet");
const uuid_1 = require("uuid");
const createWallet = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const walletId = (0, uuid_1.v4)();
    const defaultCurrency = 'NGN';
    const wallet = {
        id: walletId,
        userId: userId,
        currency: defaultCurrency,
        balance: 0.01,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    yield wallet_1.schema.validate(wallet, { abortEarly: false });
    yield (0, db_1.default)('wallets').insert(wallet);
    return wallet;
});
exports.createWallet = createWallet;
