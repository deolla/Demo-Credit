import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('wallets', (table) => {
        table.uuid('id').primary().notNullable().unique()
        table.uuid('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');;
        table.string('currency', 20).notNullable().defaultTo('NGN');
        table.decimal('balance', 10, 2).notNullable().defaultTo(0.00);
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('wallets');
}

