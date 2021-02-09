const express = require('express');
const { v4: uuidv4 } = require('uuid'); //colocar id no projeto instalar biblioteca=> uuid

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

/**
 * MIDDLEWARE: 
 * Interceptador de requisições que interrompe totalmente a requisição ou alterar os dados da requisição.
 */

const projects = [];

//MIDDLEWARE
function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.time(logLabel);

  next(); //proximo middleware

  console.timeEnd(logLabel);
}
app.use(logRequests);

app.get("/projects", (request, response) => {
  //Query Params
  const { title } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post("/projects", (request, response) => {
  // Request Body
  const { title, owner } = request.body

  const project = { id: uuidv4(), title, owner };

  projects.push(project);

  return response.json(project);
});

// https://localhost:3333/projects/2
app.put("/projects/:id", (request, response) => {
  // Routes Params
  const { id } = request.params;
  const { title, owner } = request.body

  const projectIndex = projects.findIndex(project => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found' });
  }

  const project = {
    id,
    title,
    owner,
  }

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found' });
  }
  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('Back-end started 👍');
});