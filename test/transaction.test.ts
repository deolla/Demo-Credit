// Note: This test stiil need to be updated.. There are several errors in the code. In progressS
// My relationship with tests? Let's just say it's a bit like my relationship with Mondays: we don't quite see eye to eye.

import request from 'supertest';
import app from '../src/server';
import knex1 from './setup';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

describe('Wallet Operations API', () => {
  let token: string;
  let userId: string;
  let walletId: string;

  beforeAll(async () => {
    await knex1.migrate.latest();

    userId = uuidv4();
    await knex1('users').insert({
      id: userId,
      name: 'Existing User',
      email: 'testuser@example.com',
      password: 'hashedPassword',
      address: JSON.stringify({
        street: '7, Udo Close, Mayegun',
        city: 'Ogun',
        country: 'Nigeria',
        zip: '110113'
      }),
      age: 30,
      phone: '08054789000'
    });

    walletId = uuidv4();
    await knex1('wallets').insert({
      id: walletId,
      user_id: userId,
      balance: 0
    });

    // Generate a test token
    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
  });

  afterAll(async () => {
    await knex1.migrate.rollback();
  });

  describe('getTransactions', () => {
    it('should fetch all transactions', async () => {
      const response = await request(app)
        .get('/api/transactions')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('getTransactionsFromSpecificWallet', () => {
    it('should fetch transactions from a specific wallet', async () => {
      const response = await request(app)
        .get(`/api/transactions/wallet?id=${walletId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should return 400 error when wallet_id parameter is missing', async () => {
      const response = await request(app)
        .get('/api/transactions/wallet')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'wallet_id query parameter is required');
    });
  });

  describe('deleteAllTransactions', () => {
    it('should delete all transactions', async () => {
      const response = await request(app)
        .delete('/api/transactions')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Transactions deleted successfully');
    });
  });

  describe('deleteTransactionById', () => {
    it('should delete a specific transaction by ID', async () => {
      // Assuming you have a transaction ID available in your database
      const transactionId = uuidv4();
      await knex1('transactions').insert({
        id: transactionId,
        from_walletId: walletId,
        to_walletId: null,
        amount: 100,
        description: 'Test transaction',
        currency: 'USD',
        transaction_type: 'deposit',
        createdAt: new Date()
      });

      const response = await request(app)
        .delete(`/api/transactions?id=${transactionId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Transaction deleted successfully');
    });

    it('should return 400 error when invalid ID parameter is provided', async () => {
      const response = await request(app)
        .delete('/api/transactions?id=invalid_id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid ID parameter');
    });
  });

  describe('withdrawFunds', () => {
    it('should withdraw funds from a wallet', async () => {
      const amount = 50;

      const response = await request(app)
        .post('/api/withdraw')
        .set('Authorization', `Bearer ${token}`)
        .send({
          wallet_id: walletId,
          amount,
          description: 'Withdraw funds test',
          transaction_type: 'withdraw',
          currency: 'USD'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Funds withdrawn successfully');
    });

    it('should return 404 error when wallet is not found', async () => {
      const response = await request(app)
        .post('/api/withdraw')
        .set('Authorization', `Bearer ${token}`)
        .send({
          wallet_id: 'invalid_wallet_id',
          amount: 50,
          description: 'Withdraw funds test',
          transaction_type: 'withdraw',
          currency: 'USD'
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Wallet not found');
    });

    it('should return 400 error when insufficient funds', async () => {
      const amount = 10000;

      const response = await request(app)
        .post('/api/withdraw')
        .set('Authorization', `Bearer ${token}`)
        .send({
          wallet_id: walletId,
          amount,
          description: 'Withdraw funds test',
          transaction_type: 'withdraw',
          currency: 'USD'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Insufficient funds');
    });

    it('should return 400 error when invalid request parameters', async () => {
      const response = await request(app)
        .post('/api/withdraw')
        .set('Authorization', `Bearer ${token}`)
        .send({
          amount: 'invalid_amount',
          description: 'Withdraw funds test',
          transaction_type: 'withdraw',
          currency: 'USD'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid request');
    });
  });

});
