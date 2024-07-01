"use strict";
// this file contains the address validation function.
// it uses the Geoapify API to validate the address provided by the user.
// The function takes an address object as an argument and returns a boolean value indicating whether the address is valid or not.
// The function uses the Geoapify API to geocode the address and check if any features are returned.
// If features are returned, the address is considered valid; otherwise, it is considered invalid.
// The function throws an error if the address validation fails.
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
exports.validateAddress = validateAddress;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apiKey = process.env.GEO_KEY || '';
function validateAddress(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const encodedAddress = encodeURIComponent(`${address.street}, ${address.city}, ${address.country}, ${address.zip}`);
        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;
        try {
            const response = yield axios_1.default.get(url);
            const { features } = response.data;
            if (features && features.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error('Error validating address:', error);
            throw new Error('Address validation failed');
        }
    });
}
