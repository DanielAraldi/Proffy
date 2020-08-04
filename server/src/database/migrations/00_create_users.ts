import Knex from 'knex';

// Trata das alterações queremos fazer no banco de dados
export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
}

// Trata de desfazer as aterações que fizemos no banco de dados
export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}