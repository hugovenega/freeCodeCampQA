const express = require('express');
const bodyParser = require('body-parser');
const { expect } = require('chai');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const Issue = require('./models/issues');
const Project = require('./models/projects');

const apiRoutes = require('./routes/api');
const fccTestingRoutes = require('./routes/fcctesting');
const runner = require('./test-runner');

const app = express();


// For FCC testing purposes
fccTestingRoutes(app);

// Routing for API
apiRoutes(app);

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// Start our server and tests!
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(() => {
      try {
        runner.run();
      } catch (e) {
        const error = e;
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 3500);
  }
});

module.exports = app; // for testing
