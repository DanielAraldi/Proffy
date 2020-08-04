import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
// Faz a conversão para que o express entenda o JSON
app.use(express.json());
app.use(routes);

// Route params: Indica qual recurso eu quero atulizar ou deletar
// Query params: Usado para paginação, filtros, ordenação...

app.listen(3333); // Porta