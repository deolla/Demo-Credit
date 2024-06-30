import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary().notNullable().unique()
        table.uuid('from_walletId').nullable().references('id').inTable('wallets').onDelete('CASCADE');
        table.uuid('to_walletId').nullable().references('id').inTable('wallets').onDelete('CASCADE');
        table.decimal('amount', 10, 2).notNullable();
        table.string('description').nullable();
        table.string('currency').nullable().defaultTo('NGN');
        table.enum('transaction_type', ['credit', 'debit']).notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transactions');
}
