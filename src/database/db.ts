import knex from 'knex';
import configs from './knexfile';
import dotenv from 'dotenv';


dotenv.config();

const env = process.env.NODE_ENV || 'development';
console.log(env);
const configOptions = configs[env];

console.log(`Using ${env} database configuration`, configOptions);

const db = knex(configOptions)

export default db