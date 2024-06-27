import express from 'express';
import { register } from '../controllers/registrationController';

const router = express.Router();

router.post('/register', register);

export default router;
