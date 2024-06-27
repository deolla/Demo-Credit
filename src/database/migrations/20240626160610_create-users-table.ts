import type { Knex } from "knex";
const { v4: uuidv4 } = require('uuid');


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generated_v4()'));
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.integer('age').notNullable();
        table.string('phone').notNullable();
        table.json('address').notNullable();
        table.boolean('isblacklisted').notNullable().defaultTo(false);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.timestamp('deletedAt').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}

