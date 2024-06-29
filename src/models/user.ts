import * as yup from 'yup';
const { v4: uuidv4 } = require('uuid');

// Define the shape of the data
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
  password: string;
  isblacklisted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

// Define a validation schema
export const schema: yup.Schema<User> = yup.object().shape({
  id: yup.string().required('ID is required').default(() => uuidv4()),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer'),
  phone: yup.string().required('Phone number must be provided').matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
  address: yup.object().shape({
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    zip: yup.string().required('Zip code is required'),
  }).required(),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  isblacklisted: yup.boolean().default(false).required('Blacklist status is required'),
  createdAt: yup.date().default(() => new Date()).required(),
  updatedAt: yup.date().default(() => new Date()).required(),
}).noUnknown();