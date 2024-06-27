// Purpose: Controller for user registration.
// Uses the user model and database connection.
// Validates incoming data using the user schema.
// Encrypts the user password using bcrypt.
// Checks if the user already exists in the database.
// Checks if the user is blacklisted using the isBlacklisted function.
// Generates a verification token and sends a verification email.
// Returns appropriate responses based on the registration process.


import { Request, Response } from 'express';
const { v4: uuidv4 } = require('uuid');
import bcrypt from 'bcrypt';
import { isBlacklisted } from '../util/isBlacklisted/isBlackliksted';
import { schema as userSchema, User } from '../models/user';
import db from '../database/db';
import { generateVerificationToken } from '../util/validators/verificationToken';
import { sendVerificationEmail } from '../util/validators/emailvalidation';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, age, phone, address } = req.body;

  try {
    // Validate incoming data using Yup schema
    await userSchema.validate({
      name,
      email,
      password,
      age,
      phone,
      address,
    }, { abortEarly: false });

    // Check if the user already exists
    const existingUser = await db<User>('users').where('email', email).first();
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Check if the user is blacklisted
    let isBlacklistedUser = false;
    try {
      isBlacklistedUser = await isBlacklisted(email);
    } catch (blacklistError: any) { // Explicitly define the type as 'any'
      console.error(`Error checking blacklist: ${blacklistError}`);
      return res.status(500).json({ message: 'Error checking blacklist', error: blacklistError.message });
    }

    // Use bcrypt to encrypt user password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      age,
      phone,
      address,
      password: hash,
      isblacklisted: isBlacklistedUser,
      createdAt: new Date(), // Make sure this column exists in your database
      updatedAt: new Date(),
      deletedAt: null,
    };

    // Save to the database
    const [userId] = await db<User>('users').insert(newUser);

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return res.status(200).json({
      message: 'User created successfully. Please check your email to verify your account.',
      userId,
    });
  } catch (err: any) {
    console.error(`Error creating User: ${err}`);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: err.errors
      });
    }
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        message: 'User already exists',
      });
    }
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message
    });
  }
};
