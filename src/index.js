const express = require('express');

const app = express();
/**
 * MÉTODOS HTTP:
 * 
 * GET: Buscar informações no back-end;
 * POST: Criar uma informação no back-end;
 * PUT/ PATCH: Alterar uma informação no back-end;
 * DETELE: Deletar uma informaçãono back-end;
 */

app.get("/projects", (request, response) => {
  return response.json([
    'Projeto 1',
    'Projeto 2',
  ]);
});

app.post("/projects", (request, response) => {
  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ]);
});

// https://localhost:3333/projects/2
app.put("/projects/:id", (request, response) => {
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