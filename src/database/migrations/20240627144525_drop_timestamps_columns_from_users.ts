import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('users', function(table) {
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
        table.dropColumn('deleted_at');
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('users', function(table) {
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').nullable();
      });
}

