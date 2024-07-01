"use strict";
// this file contains information about the wallet model and the schema for validating wallet data using yup
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const yup = __importStar(require("yup"));
const { v4: uuidv4 } = require('uuid');
exports.schema = yup.object().shape({
    id: yup.string().required('ID is required').default(() => uuidv4()),
    userId: yup.string().required('User ID is required'),
    currency: yup.string().required('Currency is required').default('NGN'),
    balance: yup.number().required('Balance is required').positive('Balance must be a positive number').default(0.0),
    createdAt: yup.date().default(() => new Date()).required(),
    updatedAt: yup.date().default(() => new Date()).required(),
}).noUnknown();
