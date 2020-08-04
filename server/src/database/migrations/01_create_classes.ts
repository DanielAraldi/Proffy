import Knex from 'knex';

// Trata das alterações queremos fazer no banco de dados
export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        // Relacionamento entre aula com o usuário que criou ela             
        table.integer('user_id').notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    });
}

// Trata de desfazer as aterações que fizemos no banco de dados
export async function down(knex: Knex) {
    return knex.schema.dropTable('classes');
}