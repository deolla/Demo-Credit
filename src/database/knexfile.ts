import { Knex } from "knex";
import dotenv from 'dotenv';

dotenv.config();

console.log('Database Config:', {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  hostname: process.env.DB_HOST,
  portnumber: process.env.DB_PORT
});

interface DemoConfig {
  [key: string]: Knex.Config;
}

const configs: DemoConfig = {
  development: {
    client: "mysql2",
    connection: {
      database: 'democredit',
      user: 'root',
      password: 'deolla',
      host: 'localhost',
      port: 3306
    },
    debug: true,
    useNullAsDefault: true,
  },

  environment: {
    client: "mysql2",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
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

export default configs;
