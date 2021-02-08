const express = require('express');

const app = express();

app.use(express.json()); //falar para o express que a API vai receber informações em formato de JSON

/**
 * MÉTODOS HTTP:
 * 
 * GET: Buscar informações no back-end;
 * POST: Criar uma informação no back-end;
 * PUT/ PATCH: Alterar uma informação no back-end;
 * DETELE: Deletar uma informaçãono back-end;
 */
/**
 * TIPOS DE PARAMETROS
 * Query Params: Filtros e paginação;
 * Routes Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo na hora criar ou editar um recurso (JSON)
 */

app.get("/projects", (request, response) => {
  //Query Params
  const { title, owner } = request.query;
  console.log(title);
  console.log(owner);

  return response.json([
    'Projeto 1',
    'Projeto 2',
  ]);
});

app.post("/projects", (request, response) => {
  // Request Body
  const body = request.body; // ou desestruturar para pegar cada uma de forma separada
  //const { title, owner }= request.body;
  console.log(body);                // console.log(title);
  // console.log(owner);

  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ]);
});

// https://localhost:3333/projects/2
app.put("/projects/:id", (request, response) => {
  // Routes Params
  const { id } = request.params;
  console.log(id)

  return response.json([
    'Projeto 4',
    'Projeto 2',
    'Projeto 3',
  ]);
});

app.delete("/projects/:id", (request, response) => {
  return response.json([
    'Projeto 2',
    'Projeto 3',
  ]);
});

app.listen(3333, () => {
  console.log('Back-end started 👍');
});