// Note: This test stiil need to be updated.. There are several errors in the code. In progressS
// My relationship with tests? Let's just say it's a bit like my relationship with Mondays: we don't quite see eye to eye.

import request from 'supertest';
import app from '../src/server';
import knex1 from './setup';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

describe('User API', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await knex1.migrate.latest();

    userId = uuidv4();
    await knex1('users').insert({
      id: userId,
      name: 'Existing User',
      email: 'test@example.com',
      password: 'hashedPassword',
      address: JSON.stringify({
        street: '7, Udo Close, Mayeg',
        city: 'Ogun',
        country: 'Nigeria',
        zip: '110113'
      }),
      age: 30,
      phone: '08054789000'
    });


    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
  });

  afterAll(async () => {
    await knex1.migrate.rollback();
  });

  describe('User API', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          name: 'Test User',
          email: 'newuser@example.com',
          address: {
            street: '4, Udo Close, Mayegun',
            city: 'Lagos',
            country: 'Nigeria',
            zip: '110113'
          },
          age: 27,
          phone: '08054789324',
          password: 'justrandom'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('userId');
    });

    it('should not register with missing fields', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          email: 'test@example.com',
          password: 'justrandom'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'All fields are required for registration');
    });

    it('should not register with existing email', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          name: 'Existing User',
          email: 'test@example.com',
          address: {
            street: '7, Udo Close, Mayegun',
            city: 'Ogun',
            country: 'Nigeria',
            zip: '110113'
          },
          age: 30,
          phone: '08054789000',
          password: 'justrandom'
        });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('message', 'Email already in use');
    });

    it('should not login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'notuser@example.com',
          password: 'justrandom'
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    });

    it('should handle missing email field', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          password: 'justrandom'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email and password are required');
    });

    it('should handle missing password field', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email and password are required');
    });

    it('should handle empty request body', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email and password are required');
    });

    it('should get all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should get user by ID', async () => {
      const response = await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${token}`)
        .query({ id: userId });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
    });

    it('should get user by email', async () => {
      const response = await request(app)
        .get(`/api/user/email/${(await request(app).get('/api/user').set('Authorization', `Bearer ${token}`).query({ id: userId })).body.email}`)
        .set('Authorization', `Bearer ${token}`);
    
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('email', 'test@example.com');
    });

    it('should update user', async () => {
      const response = await request(app)
        .put(`/api/user/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          field: 'name',
          value: 'SpongeBob SquarePants'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', "User's name updated successfully");
    });

    it('should delete user by ID', async () => {
      const response = await request(app)
        .delete(`/api/user/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });
  });

  describe('Wallet API', () => {
    let walletId: string;

    beforeAll(async () => {
      const wallet = await knex1('wallets').insert({
        id: uuidv4().toString(),
        balance: 1000
      }).returning('*');
      walletId = wallet[0].id;
    });

    afterEach(async () => {
        await knex1('wallets').where('id', walletId).del();
      });
  

    it('should fetch all wallets', async () => {
      const response = await request(app)
        .get('/api/wallets')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should fetch wallet balance', async () => {
      const response = await request(app)
        .get('/api/wallet/balance')
        .set('Authorization', `Bearer ${token}`)
        .query({ id: walletId });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('balance');
      expect(response.body.balance).toBe(1000);
    });

    it('should return 400 if wallet ID is missing', async () => {
      const response = await request(app)
        .get('/api/wallet/balance')
        .set('Authorization', `Bearer ${token}`)
        .query({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Wallet ID is required');
    });

    it('should return 404 if wallet not found', async () => {
      const response = await request(app)
        .get('/api/wallet/balance')
        .set('Authorization', `Bearer ${token}`)
        .query({ id: 'not123id' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Wallet not found');
    });
  });
});
