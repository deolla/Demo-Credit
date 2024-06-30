// register and login route tested.
import request from 'supertest';
import app from '../src/server';
import knex1 from './setup';

describe('Auth API', () => {
  afterAll(async () => {
    await knex1.migrate.rollback();
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        address: {
          street: '7, Naruto Close',
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
        email: 'testuser@example.com',
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
          street: '4, Naruto Close',
          city: 'Lagos',
          country: 'Nigeria',
          zip: '110113'
        },
        age: 30,
        phone: '08054789000',
        password: 'justrandom'
      });

    expect(response.status).toBe(409); // Conflict status code
    expect(response.body).toHaveProperty('message', 'Email already in use');
  });

  it('should login a user with valid credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'test@example.com',
        password: 'justrandom'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not login with incorrect password', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'test@example.com',
        password: 'incorrectPassword'
      });

    expect(response.status).toBe(401); 
    expect(response.body).toHaveProperty('message', 'Invalid password');
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
});
