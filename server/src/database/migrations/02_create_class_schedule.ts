import Knex from 'knex';

// Trata das alterações queremos fazer no banco de dados
export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        // Relacionamento entre professor e as aulas           
        table.integer('class_id').notNullable().references('id').inTable('classes').onUpdate('CASCADE').onDelete('CASCADE');
    });
}

// Trata de desfazer as aterações que fizemos no banco de dados
export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
}