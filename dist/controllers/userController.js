"use strict";
// This file contains the controller functions for handling users
// The functions are used as the callback functions for the routes
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
exports.deleteUserById = exports.updateUser = exports.getUserByEmail = exports.getUserById = exports.getUsers = void 0;
const db_1 = __importDefault(require("../database/db"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, db_1.default)('users').select('*');
        res.status(200).json(users);
    }
    catch (err) {
        console.error(`Error fetching Users: ${err}`);
        res.status(500).json({
            message: 'Error getting users',
            error: err.message
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (!id)
        return res.status(400).json({ message: 'User ID is required' });
    try {
        const user = yield (0, db_1.default)('users').where('id', id).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (err) {
        console.error(`Error fetching User: ${err}`);
        return res.status(500).json({
            message: 'Error getting user',
            error: err.message
        });
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    console.log('Attempting to fetch user with email:', email);
    try {
        console.log(`Fetching user with email: ${email}`);
        const user = yield (0, db_1.default)('users').where('email', email).first();
        console.log('User found:', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (err) {
        console.error(`Error fetching User: ${err}`);
        return res.status(500).json({
            message: 'Error getting user',
            error: err.message
        });
    }
});
exports.getUserByEmail = getUserByEmail;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { field, value } = req.body;
    try {
        // Check if 'field' and 'value' are provided
        if (!field || !value) {
            return res.status(400).json({ message: 'Field and value are required' });
        }
        const updateFields = {};
        updateFields[field] = value;
        const updateCount = yield (0, db_1.default)('users').where('id', id).update(updateFields);
        if (updateCount === 1) {
            return res.status(200).json({ message: `User's ${field} updated successfully` });
        }
        else {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
    }
    catch (err) {
        console.error(`Error updating user: ${err}`);
        return res.status(500).json({
            message: 'Error updating user',
            error: err.message,
        });
    }
});
exports.updateUser = updateUser;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const existingUser = yield (0, db_1.default)('users').where('id', id).first();
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield (0, db_1.default)('users').where('id', id).delete();
        // returns deleted user.
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        console.error(`Error deleting User: ${err}`);
        return res.status(500).json({
            message: 'Error deleting user',
            error: err.message
        });
    }
});
exports.deleteUserById = deleteUserById;
