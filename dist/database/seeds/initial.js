"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const uuid_1 = require("uuid");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex('transactions').del();
        yield knex('wallets').del();
        yield knex('users').del();
        // Common timestamp
        const currentTime = new Date();
        // seed entries for users
        const user1Id = (0, uuid_1.v4)();
        const user2Id = (0, uuid_1.v4)();
        yield knex('users').insert([
            {
                id: user1Id,
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'ev137ren6hemz',
                age: 30,
                phone: '12345678901',
                address: { street: '123 Main St', city: 'Anytown', zip: '12345' },
                isblacklisted: false,
                createdAt: currentTime,
                updatedAt: currentTime,
                deletedAt: null,
            },
            {
                id: user2Id,
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: 'cygrerv57yrui',
                age: 25,
                phone: '09876543210',
                address: { street: '456 Elm St', city: 'Othertown', zip: '67890' },
                isblacklisted: false,
                createdAt: currentTime,
                updatedAt: currentTime,
                deletedAt: null,
            },
        ]);
        // seed entries for wallets
        const wallet1Id = (0, uuid_1.v4)();
        const wallet2Id = (0, uuid_1.v4)();
        yield knex('wallets').insert([
            {
                id: wallet1Id,
                userId: user1Id,
                currency: 'NGN',
                balance: 1000.00,
                createdAt: currentTime,
                updatedAt: currentTime,
            },
            {
                id: wallet2Id,
                userId: user2Id,
                currency: 'NGN',
                balance: 2000.00,
                createdAt: currentTime,
                updatedAt: currentTime,
            },
        ]);
        // seed entries for transactions
        yield knex('transactions').insert([
            {
                id: (0, uuid_1.v4)(),
                from_walletId: null,
                to_walletId: wallet2Id,
                amount: 500.00,
                description: 'Deposit',
                currency: 'NGN',
                transaction_type: 'credit',
                createdAt: currentTime,
            },
            {
                id: (0, uuid_1.v4)(),
                from_walletId: wallet1Id,
                to_walletId: wallet2Id,
                amount: 100.00,
                description: 'Payment for services',
                currency: 'NGN',
                transaction_type: 'debit',
                createdAt: currentTime,
            },
        ]);
    });
}
