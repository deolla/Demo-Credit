import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    const hasColumn = await knex.schema.hasColumn('transactions', 'to_walletId');
    
    if (!hasColumn) {
        await knex.schema.alterTable('transactions', (table) => {
            table.uuid('to_walletId').nullable().references('id').inTable('wallets').onDelete('CASCADE');
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (table) => {
        table.dropForeign(['to_walletId']);
        table.dropColumn('to_walletId');
    });
}
