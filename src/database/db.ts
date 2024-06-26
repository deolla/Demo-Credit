import knex from 'knex';
import configs from './knexfile';

const env = process.env.NODE_ENV || 'development';
const configOptions = configs[env];

const db = knex(configOptions)

export default db