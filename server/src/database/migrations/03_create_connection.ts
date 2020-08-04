import Knex from 'knex';

// Trata das alterações queremos fazer no banco de dados
export async function up(knex: Knex) {
    return knex.schema.createTable('connection', table => {
        table.increments('id').primary();

        // Relacionamento entre professor e as aulas           
        table.integer('user_id').notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');

        // Pega o tempo exato que o aluno entrou em contanto com o professor
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    });
}

// Trata de desfazer as aterações que fizemos no banco de dados
export async function down(knex: Knex) {
    return knex.schema.dropTable('connection');
}