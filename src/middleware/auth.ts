// this middleware is used to authenticate the user by verifying the token sent in the request header
// if the token is valid, the user is authenticated and the request is passed to the next middleware
// if the token is invalid, the user is not authenticated and an error response is sent back to the client.

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
