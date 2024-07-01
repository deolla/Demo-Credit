"use strict";
// this file contains the model for the transaction entity
// and schema for the transaction entity using yup for validation.
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
    from_walletId: yup.string().nullable().default(null),
    to_walletId: yup.string().nullable().default(null),
    amount: yup.number().required('Amount is required').positive('Amount must be a positive number').default(0.0),
    description: yup.string().nullable().default(null),
    currency: yup.string().nullable().default('NGN'),
    transaction_type: yup.string().oneOf(['credit', 'debit']).required('Transaction Type is required').oneOf(['credit', 'debit']),
    createdAt: yup.date().default(() => new Date()).required(),
}).noUnknown();
