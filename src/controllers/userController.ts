// This file contains the controller functions for handling users
// The functions are used as the callback functions for the routes
 
import db from '../database/db'
import { Request, Response } from 'express';
import { schema as userSchema, User } from '../models/user'



export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await db<User>('users').select('*');
        res.status(200).json(users);
    } catch (err: any) {
        console.error(`Error fetching Users: ${err}`);
        res.status(500).json({
            message: 'Error getting users',
            error: err.message
        })
    }
};

export const getUserById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { id }= req.query;
    if (!id) return res.status(400).json({ message: 'User ID is required' });
    
    try {
        const user = await db<User>('users').where('id', id).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err: any) {
        console.error(`Error fetching User: ${err}`);
        return res.status(500).json({
            message: 'Error getting user',
            error: err.message
        })
    }
};

export const getUserByEmail = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { email } = req.params;
    console.log('Attempting to fetch user with email:', email);

    try {
        console.log(`Fetching user with email: ${email}`);
        const user = await db<User>('users').where('email', email).first();
        console.log('User found:', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err: any) {
        console.error(`Error fetching User: ${err}`);
        return res.status(500).json({
            message: 'Error getting user',
            error: err.message
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { field, value } = req.body;

    try {
        // Check if 'field' and 'value' are provided
        if (!field || !value) {
            return res.status(400).json({ message: 'Field and value are required' });
        }
        const updateFields: any = {};
        updateFields[field] = value;

        const updateCount = await db('users').where('id', id).update(updateFields);

        if (updateCount === 1) {
            return res.status(200).json({ message: `User's ${field} updated successfully` });
        } else {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
    } catch (err: any) {
        console.error(`Error updating user: ${err}`);
        return res.status(500).json({
            message: 'Error updating user',
            error: err.message,
        });
    }
};

export const deleteUserById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { id } = req.params;
    try {
        const existingUser = await db<User>('users').where('id', id).first();
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        await db<User>('users').where('id', id).delete();
        // returns deleted user.
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err: any) {
        console.error(`Error deleting User: ${err}`);
        return res.status(500).json({
            message: 'Error deleting user',
            error: err.message
        })
    }
}