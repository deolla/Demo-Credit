"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const configs = {
    development: {
        client: "mysql2",
        connection: {
            database: 'democredit',
            user: 'root',
            password: 'deolla',
            host: 'localhost',
            port: 3306
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        },
        debug: true,
        useNullAsDefault: true,
    },
    environment: {
        client: "mysql2",
        connection: {
            database: "democredit",
            user: "root",
            password: "deolla",
            host: "127.0.0.1",
            port: 3306,
        },
        debug: true,
        useNullAsDefault: true,
    },
    test: {
        client: "mysql2",
        connection: {
            database: 'democredit_test',
            user: 'root',
            password: 'deolla',
            host: 'localhost',
            port: parseInt(process.env.DB_PORT || '3306'),
        },
        migrations: {
            directory: path_1.default.join(__dirname, 'migrations'),
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'seeds')
        },
        debug: true,
        useNullAsDefault: true,
    },
    staging: {
        client: "postgresql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },
    production: {
        client: "postgresql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
};
exports.default = configs;