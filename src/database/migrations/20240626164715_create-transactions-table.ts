import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary().notNullable().unique()
        table.uuid('account_id').notNullable().references('id').inTable('accounts');
        table.string('description').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.timestamp('transaction_date').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transactions');
}

