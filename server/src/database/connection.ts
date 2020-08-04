import knex from 'knex'; // Permite você escreve sql por javascript
import path from 'path';

// migrations: Controlam a versão do banco de dados

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true, // Se o valor não ser informado é preechido com Null no banco de dados
});

export default db;