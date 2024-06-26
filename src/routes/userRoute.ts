// this file contains the routes for the user endpoints
// it contains the routes for getting all users, getting a user by id, getting a user by email,
// updating a user, and deleting a user
import express from 'express';
import {getUsers, getUserById, getUserByEmail, updateUser, deleteUserById } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();


router.get('/users', authenticateToken, getUsers);
router.get('/user?', authenticateToken, getUserById);
router.get('/user/:email', authenticateToken, getUserByEmail)
router.put('/user/:id',  authenticateToken, updateUser);
router.delete('/user/:id', authenticateToken, deleteUserById);

export default router;
