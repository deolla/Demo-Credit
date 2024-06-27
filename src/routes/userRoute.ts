import express from 'express';
import {getUsers, getUserById, getUserByEmail, updateUser, deleteUserById } from '../controllers/userController'

const router = express.Router();


router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.get('/email/:email', getUserByEmail)
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUserById);

export default router;
