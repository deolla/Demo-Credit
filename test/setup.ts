import knex from 'knex';
import configs from '../src/database/knexfile';

const knex1 = knex(configs.test);

beforeAll(async () => {
  await knex1.migrate.latest();
  await knex1.seed.run();
});

afterAll(async () => {
   await knex1.migrate.rollback();
   await knex1.destroy();
});

export default knex1;
