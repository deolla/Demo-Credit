"use strict";
// this file is used to generate a random token for email verification
// it uses the crypto module to generate a random token
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationToken = generateVerificationToken;
const crypto_1 = __importDefault(require("crypto"));
function generateVerificationToken(length = 40) {
    return crypto_1.default.randomBytes(length).toString('hex');
}
