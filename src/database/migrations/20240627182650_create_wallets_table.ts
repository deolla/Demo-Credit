import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('wallets', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').notNullable().references('id').inTable('users');
        table.decimal('balance', 10, 2).defaultTo(0.00);
        table.string('currency').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('wallets');
}

