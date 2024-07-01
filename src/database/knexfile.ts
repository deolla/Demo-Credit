import { Knex } from "knex";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

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
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds')
    },
    debug: true,
    useNullAsDefault: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: 'democredit',
      user: 'root',
      password: 'deolla',
      host: 'localhost',
      port: 5432,
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
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: 5432,
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
