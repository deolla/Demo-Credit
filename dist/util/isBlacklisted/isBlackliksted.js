"use strict";
// this file is responsible for checking if a user is blacklisted or not
// it contains the function that checks the karma database for a user's identity
// it gets the blacklisted api url and the token from the environment variables
// it sends a get request to the blacklisted api with the user's identity
// if the user is blacklisted, it returns true, else it returns false
// it logs any errors that occur during the process
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlacklisted = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BLACKLISTEDAPIURL = 'https://adjutor.lendsqr.com/verification/karma';
const TOKEN = process.env.TOKEN;
const isBlacklisted = (identity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${BLACKLISTEDAPIURL}/${encodeURIComponent(identity)}`, {
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
    }
    catch (err) {
        if (axios_1.default.isAxiosError(err)) {
            const axiosError = err;
            if (axiosError.response) {
                console.error(`Error checking blacklist: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`);
                if (axiosError.response.status === 404) {
                    console.warn('Identity not found in karma database');
                    return false;
                }
            }
            else if (axiosError.request) {
                console.error(`No response received: ${axiosError.request}`);
            }
            else {
                console.error(`Error setting up request: ${axiosError.message}`);
            }
        }
        else {
            // Generic error checking
            console.error(`Error checking blacklist: ${err}`);
        }
        throw new Error('Error checking blacklist');
    }
});
exports.isBlacklisted = isBlacklisted;
