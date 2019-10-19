const express = require('express');

const routes = require('./routes');

const app = express();

// enable json parsing
app.use(express.json());

let requestsCount = 0;

// Global middleware that prints a count of how many requests have been made so far
app.use((req, res, next) => {
  requestsCount++;

  console.log(`Number of requests made so far: ${requestsCount}`);

  return next();
});

app.use(routes);

app.listen(3333);