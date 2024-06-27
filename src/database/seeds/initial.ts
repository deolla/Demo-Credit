import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('transactions').del();
    await knex('accounts').del();
    await knex('users').del();

    // Insert users and get their ids
    const users = [
        { id: uuidv4(), name: "kohn Drtbg", email: "deo@example.com", password: "d5r34578yjh5", age: 36, isblacklisted: true, phone: "555-555-5555" },
        { id: uuidv4(), name: "pane vzde", email: "fej@example.com", password: "tynxwbtgzvszfc", age: 25, isblacklisted: false, phone: "558-425-5890" },
        { id: uuidv4(), name: "Jim ton", email: "ryengh@example.com", password: "bgnbgtfvbjhmnbk", age: 26, isblacklisted: false, phone: "865-236-219" }
    ];

    await knex("users").insert(users);

    // Insert accounts and get their ids
    const accounts = [
        { id: uuidv4(), user_id: users[0].id, account_number: 'QSBGNB1236R28', balance: 1000.00, created_at: new Date(), updated_at: new Date() },
        { id: uuidv4(), user_id: users[1].id, account_number: '74CVVEGNX2651', balance: 2000.00, created_at: new Date(), updated_at: new Date() },
        { id: uuidv4(), user_id: users[2].id, account_number: 'A745DGRU8QBDJ', balance: 3000.00, created_at: new Date(), updated_at: new Date() },
    ];

    await knex("accounts").insert(accounts);

    // Insert transactions
    const transactions = [
        { id: uuidv4(), account_id: accounts[0].id, description: 'Deposit', amount: 100.00, type: 'credit', created_at: new Date(), updated_at: new Date() },
        { id: uuidv4(), account_id: accounts[1].id, description: 'Deposit', amount: 200.00, type: 'credit', created_at: new Date(), updated_at: new Date() },
        { id: uuidv4(), account_id: accounts[2].id, description: 'Deposit', amount: 300.00, type: 'credit', created_at: new Date(), updated_at: new Date() },
    ];

    await knex("transactions").insert(transactions);
}
