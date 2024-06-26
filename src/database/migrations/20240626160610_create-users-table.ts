import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().notNullable().unique()
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.integer('age').notNullable();
        table.string('phone').unique().notNullable();
        table.float('float', 3, 2).notNullable();
        table.boolean('isblacklisted').defaultTo(false);
        table.string('password').notNullable();
        table.string('role').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

