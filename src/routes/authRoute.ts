// this file is responsible for handling the routes for the authentication process
// the routes are /register and /login

import express from 'express';
import { register, login } from '../controllers/AuthController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
