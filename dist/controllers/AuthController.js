"use strict";
// Purpose: Controller for user registration.
// Uses the user model and database connection.
// Validates incoming data using the user schema.
// Encrypts the user password using bcrypt.
// Checks if the user already exists in the database.
// Checks if the user is blacklisted using the isBlacklisted function.
// Generates a verification token and sends a verification email.
// Returns appropriate responses based on the registration process.
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
exports.login = exports.register = void 0;
const { v4: uuidv4 } = require('uuid');
const bcrypt_1 = __importDefault(require("bcrypt"));
const isBlackliksted_1 = require("../util/isBlacklisted/isBlackliksted");
const user_1 = require("../models/user");
const db_1 = __importDefault(require("../database/db"));
const verificationToken_1 = require("../services/validators/verificationToken");
const emailvalidation_1 = require("../services/validators/emailvalidation");
const walletValidation_1 = require("../services/validators/walletValidation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addressvalidation_1 = require("../services/validators/addressvalidation");
const dotenv_1 = __importDefault(require("dotenv"));
const JWT_SECRET = process.env.JWT_SECRET || '';
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, age, phone, address } = req.body;
    // check if feilds are provided
    if (!name || !email || !password || !address || !age || !phone) {
        return res.status(400).json({ message: 'All fields are required for registration' });
    }
    try {
        yield user_1.schema.validate({
            name,
            email,
            password,
            age,
            phone,
            address,
        }, { abortEarly: false });
        // Check if the user already exists
        const existingUser = yield (0, db_1.default)('users').where('email', email).first();
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }
        // Check if the user is blacklisted
        let isBlacklistedUser = false;
        try {
            isBlacklistedUser = yield (0, isBlackliksted_1.isBlacklisted)(email);
        }
        catch (blacklistError) { // Explicitly define the type as 'any'
            console.error(`Error checking blacklist: ${blacklistError}`);
            return res.status(500).json({ message: 'Error checking blacklist', error: blacklistError.message });
        }
        // Use bcrypt to encrypt user password
        const hash = yield bcrypt_1.default.hash(password, 10);
        const isValidAddress = yield (0, addressvalidation_1.validateAddress)(address);
        if (!isValidAddress) {
            return res.status(400).json({ message: 'Invalid address' });
        }
        // Create a new user object
        const newUser = {
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
        const [userId] = yield (0, db_1.default)('users').insert(newUser);
        // Create a wallet for the user
        yield (0, walletValidation_1.createWallet)(newUser.id);
        // Generate verification token
        const verificationToken = (0, verificationToken_1.generateVerificationToken)();
        // Send verification email
        yield (0, emailvalidation_1.sendVerificationEmail)(email, verificationToken);
        return res.status(200).json({
            message: 'User created successfully. Please check your email to verify your account.',
            userId,
        });
    }
    catch (err) {
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
});
exports.register = register;
// Login User.
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // check if fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const user = yield (0, db_1.default)('users').where({ email }).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the password is valid
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '5d' });
        return res.status(200).json({ message: 'Login successful', token });
    }
    catch (err) {
        // return and log error to console( for debuging purposes)
        console.error(`Error signing in user: ${err.message}`);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});
exports.login = login;
