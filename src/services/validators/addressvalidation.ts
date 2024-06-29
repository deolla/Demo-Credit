// src/utils/addressValidation.ts

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEO_KEY || '';

// Define the address validation function using Geoapify API
export async function validateAddress(address: any): Promise<boolean> {
  const encodedAddress = encodeURIComponent(
    `${address.street}, ${address.city}, ${address.country}, ${address.zip}`
  );
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const { features } = response.data;

    if (features && features.length > 0) {
      // Address is valid
      return true;
    } else {
      // Address is invalid
      return false;
    }
  } catch (error) {
    console.error('Error validating address:', error);
    throw new Error('Address validation failed');
  }
}
