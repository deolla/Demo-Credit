import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries in transactions
  await knex('transactions').del();

  // Deletes ALL existing entries in accounts
  await knex('accounts').del();

  // Deletes ALL existing entries in users
  await knex("users").del();

  // Seed data for users
  const users = [
    {
      id: uuidv4(),
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
      phone: '123-456-7890',
      float: 1.23,
      isblacklisted: false,
      password: await bcrypt.hash('password123', 10),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      age: 25,
      phone: '987-654-3210',
      float: 4.56,
      isblacklisted: false,
      password: await bcrypt.hash('password456', 10),
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      age: 28,
      phone: '555-555-5555',
      float: 7.89,
      isblacklisted: false,
      password: await bcrypt.hash('password789', 10),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  // Inserts seed entries for users
  await knex("users").insert(users);

  // Seed data for accounts
  const accounts = [
    {
      id: uuidv4(),
      user_id: users[0].id,
      account_number: 'ACC1234567890',
      balance: 1000.00,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      user_id: users[1].id,
      account_number: 'ACC0987654321',
      balance: 2500.50,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      user_id: users[2].id,
      account_number: 'ACC1122334455',
      balance: 500.75,
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  // Inserts seed entries for accounts
  await knex("accounts").insert(accounts);

  // Seed data for transactions
  const transactions = [
    {
      id: uuidv4(),
      account_id: accounts[0].id,
      description: 'Deposit',
      amount: 500.00,
      transaction_date: new Date()
    },
    {
      id: uuidv4(),
      account_id: accounts[1].id,
      description: 'Withdrawal',
      amount: 200.00,
      transaction_date: new Date()
    },
    {
      id: uuidv4(),
      account_id: accounts[2].id,
      description: 'Transfer',
      amount: 300.00,
      transaction_date: new Date()
    },
    {
        id: uuidv4(),
        account_id: accounts[0].id,
        description: 'Grocery Shopping',
        amount: -150.75,
        transaction_date: new Date()
      },
      {
        id: uuidv4(),
        account_id: accounts[1].id,
        description: 'Salary Deposit',
        amount: 2500.00,
        transaction_date: new Date()
      },
      {
        id: uuidv4(),
        account_id: accounts[2].id,
        description: 'Utility Bill Payment',
        amount: -200.00,
        transaction_date: new Date()
      }
  ];

  // Inserts seed entries for transactions
  await knex("transactions").insert(transactions);
    
}
