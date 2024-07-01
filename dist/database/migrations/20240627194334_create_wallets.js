"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable('wallets', (table) => {
            table.uuid('id').primary().notNullable().unique();
            table.uuid('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
            ;
            table.string('currency', 20).notNullable().defaultTo('NGN');
            table.decimal('balance', 10, 2).notNullable().defaultTo(0.00);
            table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('wallets');
    });
}
