// this file contains the address validation function.
// it uses the Geoapify API to validate the address provided by the user.
// The function takes an address object as an argument and returns a boolean value indicating whether the address is valid or not.
// The function uses the Geoapify API to geocode the address and check if any features are returned.
// If features are returned, the address is considered valid; otherwise, it is considered invalid.
// The function throws an error if the address validation fails.

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEO_KEY || '';

export async function validateAddress(address: any): Promise<boolean> {
  const encodedAddress = encodeURIComponent(
    `${address.street}, ${address.city}, ${address.country}, ${address.zip}`
  );
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const { features } = response.data;

    if (features && features.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error validating address:', error);
    throw new Error('Address validation failed');
  }
}
