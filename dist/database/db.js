"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || 'production';
console.log(env);
const configOptions = knexfile_1.default[env];
console.log(`Using ${env} database configuration`, configOptions);
const db = (0, knex_1.default)(configOptions);
exports.default = db;
