import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('transactions').del();
    await knex('wallets').del();
    await knex('users').del();

    // Common timestamp
    const currentTime = new Date();

    // seed entries for users
    const user1Id = uuidv4();
    const user2Id = uuidv4();

    await knex('users').insert([
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
    const wallet1Id = uuidv4();
    const wallet2Id = uuidv4();

    await knex('wallets').insert([
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
    await knex('transactions').insert([
        {
            id: uuidv4(),
            from_walletId: null,
            to_walletId: wallet2Id,
            amount: 500.00,
            description: 'Deposit',
            currency: 'NGN',
            transaction_type: 'credit',
            createdAt: currentTime,
        },
        {
            id: uuidv4(),
            from_walletId: wallet1Id,
            to_walletId: wallet2Id,
            amount: 100.00,
            description: 'Payment for services',
            currency: 'NGN',
            transaction_type: 'debit',
            createdAt: currentTime,
        },
    ]);
}
