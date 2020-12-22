const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

/**
 * Driver: Select + from users;
 * Query Builders: table('users').select(*).where('')
 * 
 * 
 */




/**
 * GET: buscar ou listar informação no backend
 * POST: criar uma informação no backend
 * PUT: alterar uma informação no backend
 * DELETE: deletar uma informação no backend
 */

/**
 * PARÂMETROS
 * Query: parametros nomeados enviados na rota (ex. localhost:3001/users?nome="Levi"&empresa="UESB")
 * Route params: São parâmetros utilizados para identificar um recurso (ex. /users/:id)
 * Request Body: corpo da requisição
 */

app.listen(3001);