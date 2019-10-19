const express = require('express');

const routes = express.Router();

// creating a projects array
const projects = [];

// Middleware to verify if a project with given ID exists
function checkProjectIdExists(req, res, next) {
  const { id } = req.params;
  const projectId = projects.findIndex((project) => project.id === id);

  if(!projects[projectId]) {
    return res.status(400).json({ error: 'Project with given ID does not exists' });
  }

  req.projectId = projectId;

  return next();
}

// Route of the homepage
routes.get('/', (req, res) => {
  return res.send(`This is the homepage! Come back later, we're busy coding the other pages :)`);
});

// Route to list all projects and their tasks
routes.get('/projects', (req, res) => {
  return res.json(projects);
});

// Route to create a new project
routes.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

// Route to edit a project
routes.put('/projects/:id', checkProjectIdExists, (req, res) => {
  const { title } = req.body;

  const project = projects[req.projectId];
  project.title = title;

  return res.json(project);
});

// Route to delete a project
routes.delete('/projects/:id', checkProjectIdExists, (req, res) => {
  projects.splice(req.projectId, 1);

  return res.send();
});

// Route to create a new task in a project
routes.post('/projects/:id/tasks', checkProjectIdExists, (req, res) => {
  const { title } = req.body;

  const project = projects[req.projectId];
  project.tasks.push(title);

  return res.json(project);
});

module.exports = routes;