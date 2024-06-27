import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('users', function(table) {
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.timestamp('deletedAt').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('users', function(table) {
        table.dropColumn('createdAt');
        table.dropColumn('updatedAt');
        table.dropColumn('deletedAt');
      });
}

