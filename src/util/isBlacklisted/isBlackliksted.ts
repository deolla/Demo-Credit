// this file is responsible for checking if a user is blacklisted or not
// it contains the function that checks the karma database for a user's identity
// it gets the blacklisted api url and the token from the environment variables
// it sends a get request to the blacklisted api with the user's identity
// if the user is blacklisted, it returns true, else it returns false
// it logs any errors that occur during the process

import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BLACKLISTEDAPIURL = 'https://adjutor.lendsqr.com/verification/karma';
const TOKEN = process.env.TOKEN

const isBlacklisted = async (identity: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${BLACKLISTEDAPIURL}/${encodeURIComponent(identity)}`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });

    if (response.status === 401) {
      throw new Error('Unauthorized access');
    }

    if (response.status === 404) {
      // Identity not found in karma database
      console.warn('Identity not found in karma database');
      return false;
    }

    if (!response.data || response.data.status !== 'success') {
      throw new Error('Failed to fetch blacklist status');
    }

    const { data } = response.data;
    return !!data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        console.error(`Error checking blacklist: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`);
        if (axiosError.response.status === 404) {
          console.warn('Identity not found in karma database');
          return false;
        }
      } else if (axiosError.request) {
        console.error(`No response received: ${axiosError.request}`);
      } else {
        console.error(`Error setting up request: ${axiosError.message}`);
      }
    } else {
      // Generic error checking
      console.error(`Error checking blacklist: ${err}`);
    }
    throw new Error('Error checking blacklist');
  }
};

export { isBlacklisted };
