import { Knex } from "knex";

interface DemoConfig {
  [key: string]: Knex.Config;
}

const configs: DemoConfig = {
  development: {
    client: "mysql2",
    connection: {
      database: 'democredit',
      user: 'root',
      password: 'deolla'
    },
    debug: true,
    useNullAsDefault: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
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
      database: "my_db",
      user: "username",
      password: "password"
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
